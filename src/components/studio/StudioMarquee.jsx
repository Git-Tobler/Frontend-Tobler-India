import { cldImage } from '../../lib/cloudinary.js'
import { MARQUEE_TILES } from './studioMedia.js'

/* Edge-to-edge scrolling image strip.

   The list is rendered twice and the track translates by exactly -50%, so the
   second copy sits where the first started at the moment the animation loops —
   the seam is invisible and no JS is involved. Faster on mobile (10s) than on
   desktop (30s) because the visible window is narrower. */
function StudioMarquee() {
  const strip = [...MARQUEE_TILES, ...MARQUEE_TILES]

  return (
    <div className="mb-16 mt-16 w-full overflow-hidden md:mt-20" aria-hidden="true">
      <div className="animate-marquee flex w-max">
        {strip.map((tile, index) => (
          <img
            key={`${tile.id}-${index}`}
            /* Tiles run 500px tall with `w-auto`, so a landscape frame paints
               ~750 CSS px wide — 900 was barely 1.2x that and went soft on any
               retina display. */
            src={cldImage(tile.id, { w: 1400 })}
            alt=""
            loading="lazy"
            decoding="async"
            className="mx-3 h-[280px] w-auto rounded-2xl object-cover shadow-lg md:h-[500px]"
          />
        ))}
      </div>
    </div>
  )
}

export default StudioMarquee
