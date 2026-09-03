// Cloudinary delivery URLs — pure string builders, no SDK and no network call
// at render time. Every asset ships through f_auto,q_auto so the CDN
// negotiates AVIF/WebP per browser and tunes compression per image, which is
// the largest Lighthouse win available here without touching layout.
//
// The cloud name comes from VITE_CLOUDINARY_CLOUD_NAME at build time. When
// it's missing every builder returns null; ResponsiveImage reads that as "no
// photo supplied" and renders the MediaTile placeholder instead, so the site
// builds and ships whether or not the media account is wired up yet.

const CLOUD = (import.meta.env?.VITE_CLOUDINARY_CLOUD_NAME || '').trim()

// Widths the srcset ladder offers, roughly 1.45x apart: close enough that the
// browser rarely over-downloads by much, far enough apart that the number of
// distinct derivatives Cloudinary has to cache stays small.
const LADDER = [400, 640, 900, 1280, 1800, 2400]

const params = (...parts) => parts.filter(Boolean).join(',')

// Transform components are joined with `/` so each applies in turn — a trim has
// to complete before the crop measures the frame, which a single comma group
// wouldn't guarantee.
function build(kind, publicId, ...steps) {
  if (!CLOUD || !publicId) return null
  return `https://res.cloudinary.com/${CLOUD}/${kind}/upload/${steps.filter(Boolean).join('/')}/${publicId}`
}

// The factory stills under tobler/site/screenshot-* were captured from video and
// carry black letterbox bars. Trimming them is a property of those source files
// rather than a decision any call site should have to remember, so it's applied
// here once instead of threading a flag through every component.
const needsTrim = (publicId) => publicId.startsWith('tobler/site/screenshot-')

// Delivery URL for one image. `c_fill` + `g_auto` is the default because every
// image slot on this site is a fixed-aspect box, and auto-gravity keeps the
// subject in frame when the box is a different shape than the original photo.
// `trim: true` opts any asset into the same e_trim pass — client logos ship as
// 1080x1440 portrait canvases with the mark floating in a sea of white, so
// without it they render as a speck inside a mostly-empty box.
export function cldImage(publicId, { w, h, crop = 'fill', gravity = 'auto', trim = false } = {}) {
  if (!CLOUD || !publicId) return null
  return build(
    'image',
    publicId,
    (trim || needsTrim(publicId)) && 'e_trim',
    params('f_auto', 'q_auto', `c_${crop}`, w && `w_${w}`, h && `h_${h}`, crop !== 'scale' && `g_${gravity}`)
  )
}

// srcset across the ladder, capped one rung past `displayWidth * 2` so a 600px
// card still gets a retina-capable option but is never offered a 2400px file.
export function cldSrcSet(publicId, { displayWidth = 1200, ...opts } = {}) {
  if (!CLOUD || !publicId) return undefined
  const target = displayWidth * 2
  const cap = LADDER.findIndex((w) => w >= target)
  const rungs = cap === -1 ? LADDER : LADDER.slice(0, cap + 1)
  return rungs.map((w) => `${cldImage(publicId, { ...opts, w })} ${w}w`).join(', ')
}

// 24px blurred still of the same asset, ~400 bytes, painted as a background
// behind the real photo so the box holds the image's own colour instead of
// flat grey while the full file streams in.
export function cldBlur(publicId) {
  if (!CLOUD || !publicId) return null
  return build('image', publicId, needsTrim(publicId) && 'e_trim', 'f_auto,q_auto:low,w_24,e_blur:400')
}

// Where a clip actually starts is a property of the file, the same way the
// letterbox trim above is, so it lives here instead of being remembered at each
// call site. Second 0 is not a safe default: `website_video_3` — the homepage
// hero — opens on a white flash, so the LCP poster was a blank white rectangle,
// and `Robotic Welding` spends its first twelve seconds on an aerial of the
// plant before the cell it is named after appears. The offset drives both the
// poster and the delivered file, so the tile opens on its own subject and stays
// there instead of cutting to it after a third of the clip has run.
const CLIP_START = {
  'Robotic Welding': 12,
}
const clipStart = (publicId) => CLIP_START[publicId] ?? 1

// Muted background video. `ac_none` strips the audio track — the hero video is
// silent by design, and dropping audio is a free ~10% off the file. Returns
// webm first so Chrome/Firefox take the smaller file and Safari falls to mp4.
// The poster is a still of the same asset, delivered as an image so the first
// paint never waits on video bytes.
// `crop: 'limit'` by default so a clip is never upscaled or re-framed — the
// production footage is natively 480x848, and stretching it to a wide box would
// show as soft, badly-cropped video.
export function cldVideo(publicId, { w = 720, h, crop = 'limit' } = {}) {
  if (!CLOUD || !publicId) return null
  const box = params(`c_${crop}`, `w_${w}`, h && `h_${h}`)
  const start = `so_${clipStart(publicId)}`
  return {
    poster: build('video', publicId, params('f_jpg', 'q_auto', box, start)),
    sources: [
      { src: build('video', publicId, params('f_webm', 'q_auto', box, 'ac_none', start)), type: 'video/webm' },
      { src: build('video', publicId, params('f_mp4', 'q_auto', box, 'ac_none', start)), type: 'video/mp4' },
    ],
  }
}

export const cloudinaryReady = Boolean(CLOUD)
