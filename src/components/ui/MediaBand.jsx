import { cldImage } from '../../lib/cloudinary.js'

/* A closing band with a photograph behind it instead of a flat tint.

   Several pages ended on a `bg-gradient-to-br from-tobler-blue/10 …` card —
   a newsletter sign-up, a "share your experience" CTA — which is where the
   site read as blue-on-blue with nothing in it. This keeps those blocks the
   same shape and copy but puts a real frame underneath, scrimmed hard enough
   that white type clears AA over any photo in the library.

   `rounded` is on by default because every current caller is a card inside a
   Container; pass `rounded={false}` for a full-bleed strip. */
function MediaBand({ imageId, children, className = '', rounded = true }) {
  const photo = cldImage(imageId, { w: 1600, h: 560 })

  return (
    <div
      className={`relative overflow-hidden bg-tobler-bg-dark ${
        rounded ? 'rounded-card' : ''
      } ${className}`}
    >
      {photo && (
        <img
          src={photo}
          alt=""
          aria-hidden="true"
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover"
        />
      )}
      {/* Flat first, gradient second. Callers centre their content as often as
          they left-align it, so the even layer is what guarantees contrast and
          the gradient only adds depth down the left edge — a purely
          left-to-right scrim leaves centred headings sitting on bare photo. */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-tobler-bg-dark/80" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-to-r from-tobler-bg-dark/45 to-transparent"
      />
      <div className="relative">{children}</div>
    </div>
  )
}

export default MediaBand
