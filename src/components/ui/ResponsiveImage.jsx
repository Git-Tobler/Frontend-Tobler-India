import { useState } from 'react'
import MediaTile from './MediaTile.jsx'
import { cldImage, cldSrcSet, cldBlur } from '../../lib/cloudinary.js'

/* Swappable image slot for cards and hero media blocks — the single place
   photography enters the site.

   Pass `publicId` for a Cloudinary asset (preferred: the CDN then handles
   format, compression and per-breakpoint resizing) or `src` for a file in
   /public. Either way the wrapper owns sizing via `className`, so callers
   don't change when an asset moves between the two.

   When neither resolves — no id supplied yet, or the file 404s — it falls
   back to the MediaTile blueprint placeholder, which is why the site looked
   complete before any photo existed.

   `priority` marks the one above-the-fold image per page: it loads eagerly at
   high fetch priority instead of lazily, because a lazy LCP image is a
   guaranteed Lighthouse penalty. Everything else stays lazy. */
/* Literal class names, not `object-${fit}` — Tailwind scans source text, so an
   interpolated class is never generated and the style silently does nothing. */
const OBJECT_FIT = { cover: 'object-cover', contain: 'object-contain' }

function ResponsiveImage({
  publicId,
  src,
  alt = '',
  icon,
  label,
  iconSize,
  className = '',
  displayWidth = 1200,
  sizes = '100vw',
  priority = false,
  title,
  /* Callers that want the whole frame visible (headshots, logos) pass
     `contain`. It has to be a real prop: the <img> is absolutely positioned
     inside the wrapper, so an `object-contain` in `className` lands on the
     wrapper and never reaches the image. */
  objectFit = 'cover',
}) {
  const [failed, setFailed] = useState(false)

  const url = publicId ? cldImage(publicId, { w: displayWidth }) : src
  const showPhoto = Boolean(url) && !failed
  const blur = publicId && !failed ? cldBlur(publicId) : null

  return (
    <div
      className={`relative overflow-hidden ${className}`}
      /* The blurred 24px still holds the box's colour while the full file
         streams in, so the slot never flashes flat grey. */
      style={blur ? { backgroundImage: `url(${blur})`, backgroundSize: 'cover', backgroundPosition: 'center' } : undefined}
    >
      {showPhoto && (
        <img
          src={url}
          srcSet={publicId ? cldSrcSet(publicId, { displayWidth }) : undefined}
          sizes={publicId ? sizes : undefined}
          alt={alt}
          title={title}
          loading={priority ? 'eager' : 'lazy'}
          {...{
            /* Lowercase on purpose: React 18 drops the camelCase form with a
               warning — it only became a recognised prop in React 19. */
            fetchpriority: priority ? 'high' : undefined,
          }}
          decoding={priority ? 'sync' : 'async'}
          className={`absolute inset-0 h-full w-full ${OBJECT_FIT[objectFit] ?? OBJECT_FIT.cover}`}
          onError={() => setFailed(true)}
        />
      )}
      {!showPhoto && (
        <MediaTile icon={icon} label={label} iconSize={iconSize} className="absolute inset-0 h-full w-full" />
      )}
    </div>
  )
}

export default ResponsiveImage
