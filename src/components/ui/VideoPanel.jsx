import { useEffect, useRef, useState } from 'react'
import { cldVideo } from '../../lib/cloudinary.js'
import CornerMarks from './CornerMarks.jsx'

/* A single production clip, played in its own frame.

   Most of the factory footage is natively 480x848, so the frame defaults to
   portrait and lets the video fill it at its own aspect. One clip — the welding
   robot — is 848x480 landscape instead; pass `aspect` to match the source
   rather than cropping a wide clip down into a portrait box.

   Nothing downloads until the panel is actually near the viewport, and not at
   all under reduced-motion or save-data: the poster frame alone carries the
   section, so the video is pure enhancement and never blocks a paint.

   `priority` opts an above-the-fold panel out of lazy-loading its poster — a
   lazily-loaded LCP image is a guaranteed Lighthouse penalty. `width` is the
   delivery width ceiling; `c_limit` never upscales, so asking for more than the
   source has simply returns the native file.

   `fill` drops the aspect box and stretches the clip over its positioned
   parent instead — the full-bleed background case, where the section owns the
   height and the video just covers it. */
/* Literal class strings, not `object-${fit}` — Tailwind scans source text and
   never sees an interpolated name. It is also why `fit` is its own prop rather
   than something a caller appends via `mediaClassName`: object-cover and
   object-contain are the same utility group, so which one wins would depend on
   Tailwind's stylesheet order rather than on the caller's intent. */
const FIT = { cover: 'object-cover', contain: 'object-contain' }

function VideoPanel({
  publicId,
  label,
  className = '',
  mediaClassName = '',
  shouldPlay = true,
  aspect = 'aspect-[9/16]',
  width = 720,
  quality = 'auto',
  marks = false,
  priority = false,
  fill = false,
  fit = 'cover',
}) {
  const [play, setPlay] = useState(false)
  const ref = useRef(null)
  const videoRef = useRef(null)
  const media = cldVideo(publicId, { w: width, quality })

  useEffect(() => {
    if (priority) {
      setPlay(true)
      return
    }

    const node = ref.current
    if (!publicId || !node) return undefined
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined
    if (navigator.connection?.saveData) return undefined

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        setPlay(true)
        observer.disconnect()
      },
      { rootMargin: '200px' }
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [publicId, priority])

  /* `play` is in the deps because the <video> only exists once it flips true —
     without it this effect runs a single time against a null ref and playback
     never starts. */
  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    if (shouldPlay) {
      video.play().catch(() => {})
    } else {
      video.pause()
    }
  }, [shouldPlay, play])

  if (!media) return null

  return (
    <div
      ref={ref}
      className={`group overflow-hidden bg-tobler-bg-dark ${
        fill ? 'absolute inset-0' : `relative ${aspect}`
      } ${className}`}
    >
      <img
        src={media.poster}
        alt=""
        className={`absolute inset-0 h-full w-full ${FIT[fit]} ${mediaClassName}`}
        loading={priority ? 'eager' : 'lazy'}
        {...{
          /* Lowercase on purpose — see the same note in ResponsiveImage. */
          fetchpriority: priority ? 'high' : undefined,
        }}
      />
      {play && (
        <video
          ref={videoRef}
          autoPlay={shouldPlay}
          muted
          loop
          playsInline
          poster={media.poster}
          className={`absolute inset-0 h-full w-full ${FIT[fit]} [transform:translateZ(0)] ${mediaClassName}`}
        >
          {media.sources.map((s) => (
            <source key={s.type} src={s.src} type={s.type} />
          ))}
        </video>
      )}
      {marks && <CornerMarks always className="text-white/30" />}
      {label && (
        <span className="label-mono absolute bottom-4 left-4 right-4 text-white/70">{label}</span>
      )}
    </div>
  )
}

export default VideoPanel
