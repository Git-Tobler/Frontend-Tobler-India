import ResponsiveImage from './ResponsiveImage.jsx'
import { MEDIA } from '../../data/media-map.js'

/* One milestone card on the About page's "Tobler Journey" band.

   Anatomy, following the reference infographic: a circular photo straddling
   the card's left edge, the year in blue, the title, the copy, and a large
   ghosted index number in the top-right corner.

   The circle is half in and half out of the card, so the card carries
   `pl-[52px]` (half the circle plus a gutter) and the circle is pulled left
   with a negative offset rather than sitting in a flex column. A flex row
   would reserve the circle's full width inside the card and lose the overlap
   that gives the row its shape.

   The photo comes from MEDIA.journey, keyed by the milestone's year string —
   that object is the swap point, so nothing here needs editing to change a
   circle. A year with no entry (or an explicit null) resolves to undefined and
   ResponsiveImage falls through to its MediaTile placeholder, which is why the
   row renders complete before all nine assets exist.

   The right-hand point is a rotated square rather than a `clip-path` on the
   card: clip-path would crop the drop shadow along with the corner, and the
   shadow is what lifts these cards off the tinted ground. */
function TimelineItem({ item, index }) {
  const publicId = MEDIA.journey?.[item.year] || undefined

  return (
    <li className="group relative pl-[52px]">
      {/* Circle. `top-1/2 -translate-y-1/2` centres it on the card whatever
          height the copy forces, so a two-line title does not knock it out of
          alignment with its neighbours. */}
      <div className="absolute left-0 top-1/2 z-10 h-[104px] w-[104px] -translate-y-1/2 rounded-full bg-white p-1 shadow-raised ring-1 ring-tobler-border/60 transition-transform duration-300 group-hover:scale-[1.04]">
        <ResponsiveImage
          publicId={publicId}
          alt=""
          displayWidth={220}
          sizes="104px"
          className="h-full w-full rounded-full"
        />
      </div>

      <div className="relative h-full overflow-visible rounded-2xl bg-white py-5 pl-[68px] pr-6 shadow-raised transition-shadow duration-300 group-hover:shadow-lift">
        {/* The point on the right edge. Same white and the same top-right
            corner radius so it reads as part of the card, not a badge. */}
        <span
          aria-hidden="true"
          className="absolute right-0 top-1/2 hidden h-7 w-7 -translate-y-1/2 translate-x-1/2 rotate-45 rounded-br-[4px] bg-white sm:block"
        />

        {/* Ghosted index. `tabular-nums` keeps 01 and 09 the same width so the
            numbers line up down the column. */}
        <span
          aria-hidden="true"
          className="figure-mono pointer-events-none absolute right-5 top-4 text-[26px] font-bold leading-none text-tobler-border/70"
        >
          {String(index + 1).padStart(2, '0')}
        </span>

        <p className="figure-mono text-[26px] font-bold leading-none tracking-tight text-tobler-blue">
          {item.year}
        </p>
        <h3 className="mt-1.5 max-w-[85%] text-[15px] font-bold leading-snug text-tobler-heading">
          {item.title}
        </h3>
        <p className="mt-1.5 text-[13px] leading-relaxed text-tobler-body normal-case">
          {item.description}
        </p>
      </div>
    </li>
  )
}

export default TimelineItem
