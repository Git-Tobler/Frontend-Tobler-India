import { Globe, MapPin, Users } from 'lucide-react'
import TimelineItem from '../ui/TimelineItem.jsx'
import { useInViewAnimation } from '../../hooks/useInViewAnimation.js'
import { TIMELINE } from '../../data/team.js'
import { STATS } from '../../data/site.js'

/* The About page's #timeline band — "Tobler Journey".

   Built from the heritage infographic: an eyebrow-and-rule header, nine
   milestone cards each with a circular photo, and a stat bar closing the
   section. The tinted ground, the dotted world-map watermark and the blue
   corner wedge are all here; what is not is the reference's hand-drawn
   connector weaving between columns.

   Reading order is the one deliberate departure. The reference runs its cards
   1-3-5 down the left column and 2-4-6 down the middle, so following the
   history means tracking the numbered badges rather than reading the page.
   That works on a printed sheet and does not survive a reflow to two columns
   or one. These cards are laid out row-major instead — 01 02 03 across, then
   04 05 06 — so visual order, DOM order and the badge numbers all agree at
   every breakpoint. The badges are kept because the sequence is still worth
   stating outright.

   `id="timeline"` is a redirect target for the retired /about/* routes in
   AppRoutes.jsx — do not rename it. */

const CLOSERS = [
  { icon: Globe, value: STATS.find((s) => s.label.includes('Heritage'))?.value || '30+', label: 'Years of Progress' },
  { icon: MapPin, value: 'Global', label: 'Presence' },
  { icon: Users, value: 'Stronger', label: 'Together' },
]

/* Dotted world map behind the header. Inline SVG rather than an asset: it is
   a decorative texture at 4% opacity, so shipping an image for it would cost
   a request and a download to render something barely visible. */
function MapWatermark() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 160 80"
      className="pointer-events-none absolute right-0 top-0 hidden h-[220px] w-[440px] text-tobler-blue opacity-[0.18] lg:block"
    >
      <defs>
        <pattern id="journey-dots" width="3" height="3" patternUnits="userSpaceOnUse">
          <circle cx="1.5" cy="1.5" r="0.62" fill="currentColor" />
        </pattern>
      </defs>
      {/* Coarse continental masses — enough to read as a world map at this
          size without carrying real geographic data. */}
      <g fill="url(#journey-dots)">
        <path d="M12 20h22l6 8-4 14H22l-8-12z" />
        <path d="M40 46h14l6 16-8 12h-8l-6-14z" />
        <path d="M70 14h26l6 6-6 10H74l-6-8z" />
        <path d="M74 34h20l4 10-8 12H78l-6-10z" />
        <path d="M104 16h34l8 10-6 16h-30l-8-12z" />
        <path d="M126 50h18l6 10-6 10h-14l-6-8z" />
      </g>
    </svg>
  )
}

function MilestoneTimeline() {
  const [ref, inView] = useInViewAnimation()
  const rise = inView ? 'animate-fade-in-up' : 'opacity-0'
  const at = (delay) => ({ animationDelay: `${delay}s` })

  return (
    <section id="timeline" ref={ref} className="scroll-mt-28 bg-white py-12">
      {/* The tinted sheet the infographic sits on. Rounded and inset rather
          than full-bleed, so it reads as one artefact on the white studio page
          instead of another edge-to-edge band. */}
      <div className="relative mx-auto max-w-content overflow-hidden rounded-[28px] bg-gradient-to-br from-[#F2F7FD] via-white to-[#E8F1FB] px-6 py-12 md:px-10 md:py-14 lg:px-12">
        <MapWatermark />

        {/* Blue corner wedge, bottom right. `rotate-45` on an oversized square
            gives the diagonal without a clip-path, so it stays crisp at any
            zoom. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-[140px] -right-[120px] hidden h-[320px] w-[420px] rotate-[-20deg] bg-tobler-blue md:block"
        />

        <div className="relative">
          {/* ---------------------------------------------------------- header */}
          <div>
            <div
              className={`flex items-center gap-3 ${rise}`}
              style={at(0.05)}
            >
              <span className="label-mono text-[11px] text-tobler-blue">Our heritage</span>
              <span className="h-px w-14 bg-tobler-blue/50" />
            </div>

            <h2
              className={`mt-3 text-[34px] font-bold uppercase leading-[0.95] tracking-tight text-[#0D212C] md:text-[46px] lg:text-[54px] ${rise}`}
              style={at(0.1)}
            >
              Tobler <span className="text-tobler-blue">Journey</span>
            </h2>

            <p
              className={`mt-3 text-lg text-[#0D212C] md:text-xl ${rise}`}
              style={at(0.15)}
            >
              Built on Vision. Driven by Progress.
            </p>

            <p
              className={`mt-4 max-w-md text-sm leading-relaxed text-tobler-body ${rise}`}
              style={at(0.2)}
            >
              From a single idea in Switzerland to a global presence, our journey is a
              story of innovation, expansion and unwavering commitment to safer,
              smarter construction.
            </p>
          </div>

          {/* ----------------------------------------------------------- cards */}
          {/* `gap-x-7` leaves room for the circle that overhangs each card's
              left edge; the cards themselves already carry the matching
              `pl-[52px]`. Rows are `items-stretch` by default, so every card in
              a row matches the tallest and the circles stay on one line. */}
          <ol
            className={`mt-12 grid grid-cols-1 gap-x-7 gap-y-8 sm:grid-cols-2 lg:grid-cols-3 ${rise}`}
            style={at(0.3)}
          >
            {TIMELINE.map((item, index) => (
              <TimelineItem key={item.year} item={item} index={index} />
            ))}
          </ol>

          {/* ----------------------------------------------------------- close */}
          <div
            className={`mt-12 flex flex-col gap-6 border-t border-tobler-border pt-8 sm:flex-row sm:items-center sm:gap-10 ${rise}`}
            style={at(0.35)}
          >
            {CLOSERS.map(({ icon: Icon, value, label }) => (
              <div key={label} className="flex items-center gap-3">
                <Icon className="h-7 w-7 shrink-0 text-tobler-blue" aria-hidden="true" />
                <div>
                  <p className="text-lg font-bold leading-tight text-[#0D212C]">{value}</p>
                  <p className="text-[13px] leading-tight text-tobler-body">{label}</p>
                </div>
              </div>
            ))}

            {/* Sits over the blue wedge on md and up, which is why it is white
                there and hidden below — on a phone the wedge is gone and white
                text would land on the tinted sheet. */}
            <p className="label-mono ml-auto hidden text-[11px] text-white md:block">
              People. Products. Progress.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default MilestoneTimeline
