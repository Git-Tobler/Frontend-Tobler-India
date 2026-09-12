import { Link } from 'react-router-dom'
import { BadgePlus, Factory, Globe, ShieldCheck } from 'lucide-react'
import { useInViewAnimation } from '../../hooks/useInViewAnimation.js'
import scaffoldNode from '../../assets/images/Swiss engineering 1.png'
import towerAtSunset from '../../assets/images/who-we-are-2.png'

/* The About page opener — the dark "Who We Are" band.

   It is the one section on this otherwise white studio page that runs on the
   brand palette: the blueprint navy (#0A2240 -> #1B4E90) with the logo yellow
   as the only accent, the same pairing PageHero and the CTA bands use.

   The copy is the About hero's own copy — headline, the story paragraphs,
   the standards line and both calls to action — moved in here rather than
   duplicated, so the page still opens with one statement.

   Geometry: the photography sits in an absolutely-positioned panel on the
   right, skewed -10deg so every edge in the band runs on the same diagonal,
   with the images counter-skewed back to level inside their slabs. The scrim
   lives *inside* the skewed row so it fades along that diagonal instead of
   cutting a hard vertical seam across the blueprint grid. Below `lg` the panel
   is dropped for a short strip in the flow — same motif, phone height.

   Note the class handling: the animation classes are composed into each
   `className` by hand. Spreading a helper that returns `{ className }` after an
   explicit className silently replaces it, which is how the first pass of this
   section rendered with none of its layout classes applied. */

const STORY = [
  'For more than 30 years Tobler has built dependable construction systems backed by engineering expertise and long-term partnerships. From our Swiss engineering roots to our manufacturing base in India, every milestone has served one purpose: helping customers build with greater confidence.',
  'The company is engineering-led by design. Technical expertise, quality manufacturing and practical site experience sit in the same building, so the people who engineer a system are the people who stand behind it on site.',
]

const STANDARD_NOTE =
  'Systems engineered to EN 12810–12812, manufactured in India, supported nationwide.'

const PILLARS = [
  {
    icon: BadgePlus,
    title: 'Swiss Engineering',
    copy: 'Precision, quality and innovation at our core.',
  },
  {
    icon: Factory,
    title: 'Indian Manufacturing',
    copy: '250,000+ sq. ft. of production built to global standards.',
  },
  {
    icon: ShieldCheck,
    title: 'Built for Safety',
    copy: 'Load tested and validated for strength and stability.',
  },
  {
    icon: Globe,
    title: 'Trusted Worldwide',
    copy: 'A Tobler group company, delivering across Europe and Asia.',
  },
]

/* One diagonal photo slab. The wrapper carries the parent's -10deg skew, the
   inner box cancels it so the photograph itself stays upright, and the scale
   keeps the counter-skewed frame wider than the slot it has to fill.

   Each slab scrims itself rather than the row scrimming everything at once:
   a single overlay across the row would drag the yellow dividers down to olive
   along with the photography. `gradient` is the slab the headline column runs
   past, `soft` is the one out at the edge. */
const SCRIMS = {
  gradient: 'bg-gradient-to-r from-tobler-bg-dark via-tobler-bg-dark/55 to-tobler-bg-dark/10',
  soft: 'bg-tobler-bg-dark/25',
}

/* A plain <img> rather than ResponsiveImage: these two frames are bundled
   assets, so there is no Cloudinary ladder or 404 fallback for that component
   to add, and the slabs are narrow enough that the crop has to be aimed by
   hand — `position` is what keeps the subject (the embossed Tobler node, the
   two figures on the deck) inside a window this tall and this thin. */
function MediaSlab({ src, position = '50% 50%', scrim = 'soft', className = '' }) {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      <div className="absolute inset-0 scale-125 skew-x-[10deg]">
        <img
          src={src}
          alt=""
          className="h-full w-full object-cover"
          style={{ objectPosition: position }}
          loading="lazy"
          decoding="async"
        />
      </div>
      <div className={`absolute inset-0 ${SCRIMS[scrim]}`} />
    </div>
  )
}

function WhoWeAre() {
  const [ref, inView] = useInViewAnimation()
  const rise = inView ? 'animate-fade-in-up' : 'opacity-0'
  const at = (delay) => ({ animationDelay: `${delay}s` })

  return (
    <section id="who-we-are" ref={ref} className="scroll-mt-28 bg-white pb-10 md:pb-14">
      {/* Square-edged band running the full width — not a rounded card floating
          on the page. The white is the strip the section leaves above and below
          it, which is what keeps it from reading as a second full-screen hero. */}
      <div className="relative overflow-hidden bg-tobler-bg-dark text-white">
        {/* Diagonal photo panel — decorative, so it is hidden from assistive
            tech and the slabs carry empty alt text. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 right-0 hidden w-[52%] lg:block"
        >
          {/* Full height, no vertical bleed: skewX shifts content sideways as a
              function of y and never vertically, so overhanging the band only
              pushed the two figures on the deck up past its top edge. */}
          <div className="absolute inset-y-0 -right-[6%] left-0 flex skew-x-[-10deg] gap-3">
            <MediaSlab
              src={scaffoldNode}
              position="55% 60%"
              scrim="gradient"
              className="flex-[3]"
            />
            <div className="w-4 bg-tobler-gold" />
            <MediaSlab src={towerAtSunset} position="68% 30%" className="flex-[2]" />
            <div className="w-1.5 bg-tobler-gold/70" />
          </div>
        </div>

        <div className="relative mx-auto max-w-content px-6 py-10 md:px-10 md:py-12 lg:px-12 lg:py-14">
          <div className="lg:max-w-[52%]">
            {/* `text-white` is not inherited here — the base layer colours every
              heading with the near-black ink token. */}
            {/* Sized off the studio page's own headline scale rather than the
              site-wide `text-h1`, which is a full-bleed hero size and made the
              band taller than the viewport on its own. */}
            <h2
              className={`mt-4 text-[32px] font-semibold uppercase leading-[0.95] tracking-tight text-white md:text-[42px] lg:text-[48px] ${rise}`}
              style={at(0.1)}
            >
              Who we
              <span className="block text-tobler-gold">are</span>
            </h2>

            <span className={`mt-4 block h-1 w-16 bg-tobler-gold ${rise}`} style={at(0.15)} />

            <p
              className={`mt-6 max-w-lg text-lg leading-snug text-white md:text-xl ${rise}`}
              style={at(0.2)}
            >
              Build the next landmark, the precise way.
            </p>

            <div className="mt-4 flex max-w-lg flex-col gap-3 text-sm leading-relaxed text-white/75">
              {STORY.map((paragraph, index) => (
                <p key={paragraph} className={rise} style={at(0.25 + index * 0.05)}>
                  {paragraph}
                </p>
              ))}
            </div>

            <p
              className={`mt-5 max-w-lg border-l-2 border-tobler-gold pl-4 text-[13px] leading-relaxed text-white ${rise}`}
              style={at(0.4)}
            >
              {STANDARD_NOTE}
            </p>

            {/* "Start a chat" was here alongside it and has been dropped —
                the studio bottom bar already carries that call to action on
                this page. */}
            <div
              className={`mt-6 flex flex-col gap-3 sm:flex-row sm:gap-4 ${rise}`}
              style={at(0.45)}
            >
              <Link
                to="/projects"
                className="rounded-btn label-mono inline-flex items-center justify-center bg-tobler-gold px-6 py-3 text-tobler-heading transition-colors duration-300 hover:bg-tobler-gold-dark"
              >
                View projects
              </Link>
            </div>

            {/* The four pillars, split by hairline rules the way the reference
              lays them out: two up on a phone, four across from `sm`. Held
              narrower than the prose above so the row and its dividers stop
              short of the diagonal photo edge, which cuts further left the
              lower down the band it runs. */}
            <div className="mt-8 grid grid-cols-2 gap-y-6 border-t border-white/10 pt-7 sm:grid-cols-4 lg:max-w-[520px]">
              {PILLARS.map((pillar, index) => {
                const Icon = pillar.icon
                return (
                  <div
                    key={pillar.title}
                    className={`border-white/10 px-3 text-center ${
                      index % 2 === 1 ? 'border-l' : ''
                    } ${index === 0 ? 'sm:border-l-0' : 'sm:border-l'} ${rise}`}
                    style={at(0.5 + index * 0.05)}
                  >
                    <Icon className="mx-auto h-6 w-6 text-tobler-gold" aria-hidden="true" />
                    <p className="label-mono mt-3 text-[0.7rem] text-white">{pillar.title}</p>
                    <p className="mt-1.5 text-[11px] leading-relaxed text-white/60">
                      {pillar.copy}
                    </p>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Phone/tablet stand-in for the diagonal panel. The reveal sits on the
            outer div on purpose: `animate-fade-in-up` ends on a `transform`
            of its own, so putting it on the skewed element cancels the skew. */}
          <div className={`mt-8 lg:hidden ${rise}`} style={at(0.6)}>
            <div className="flex h-32 skew-x-[-10deg] gap-3 overflow-hidden">
              <MediaSlab src={scaffoldNode} position="55% 60%" className="flex-[3]" />
              <div className="w-3 bg-tobler-gold" />
              <MediaSlab src={towerAtSunset} position="68% 30%" className="flex-[2]" />
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}

export default WhoWeAre
