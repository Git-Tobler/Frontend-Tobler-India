import { Link } from 'react-router-dom'
import { BadgePlus, Factory, Globe, ShieldCheck } from 'lucide-react'
import { useInViewAnimation } from '../../hooks/useInViewAnimation.js'
import scaffoldNode from '../../assets/images/image (13).jpg'

/* The About page opener — the dark "Who We Are" band.

   The photograph is the band. It runs full bleed behind the whole section
   rather than sitting in the two skewed slabs this used to carry, so there is
   no flat colour field for the copy to sit on and no second image competing
   with it. (who-we-are-2.png was the other slab and is no longer referenced
   here; the file is still in assets if it is wanted back.)

   Colour: the ground is a neutral charcoal (#15171A), not the brand navy
   (#0A2240). Two things were making this band read blue — the flat navy field
   itself, and the scrim, which painted the photography that same navy. The
   charcoal is near enough to neutral that the photograph keeps its own colour,
   and the image carries a `saturate(.6)` filter on top of that because the
   source frame has a cold cast of its own. The logo yellow is the only
   chromatic accent left, which is the point of doing it this way.

   #15171A is repeated as a literal in the scrim classes rather than pulled
   from a constant: Tailwind's JIT scans for complete class strings, so an
   interpolated value would never generate. If the ground moves, move every
   copy together or the scrims will seam against the base.

   Legibility: anything sitting out on the photograph — the standards note, the
   pillar panel — carries its own tinted, blurred backing. A border alone is
   not enough once there is a photograph rather than a flat field behind it.

   The copy is the About hero's own copy — headline, the story paragraphs,
   the standards line and both calls to action — moved in here rather than
   duplicated, so the page still opens with one statement.

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

function WhoWeAre() {
  const [ref, inView] = useInViewAnimation()
  const rise = inView ? 'animate-fade-in-up' : 'opacity-0'
  const at = (delay) => ({ animationDelay: `${delay}s` })

  return (
    <section id="who-we-are" ref={ref} className="scroll-mt-28 bg-white pb-8 md:pb-10">
      {/* Square-edged band running the full width — not a rounded card floating
          on the page. The white is the strip the section leaves above and below
          it, which is what keeps it from reading as a second full-screen hero.

          Stacking is DOM order rather than z-index: the photograph and the
          scrims are plain `absolute` and come first, the content wrapper is
          `relative` and comes last, so it paints over them. */}
      <div className="relative overflow-hidden bg-[#15171A] text-white">
        {/* Decorative, so it is hidden from assistive tech and carries empty
            alt text. Aimed right of centre — the copy column holds the left
            half, so the scaffolding has to sit in the half that stays open. */}
        <img
          src={scaffoldNode}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover"
          style={{ objectPosition: '68% 45%', filter: 'saturate(0.6) contrast(1.04)' }}
          loading="lazy"
          decoding="async"
        />

        {/* Phones: the copy runs the full width, so the whole frame is held
            down evenly. A left-weighted gradient here would leave the last
            lines of every paragraph sitting on bare photograph. */}
        <div aria-hidden="true" className="absolute inset-0 bg-[#15171A]/[0.88] lg:hidden" />

        {/* lg and up: solid behind the copy column, thinning across the frame
            so the scaffolding is actually readable on the right. */}
        <div
          aria-hidden="true"
          className="absolute inset-0 hidden bg-gradient-to-r from-[#15171A] from-30% via-[#15171A]/80 to-[#15171A]/25 lg:block"
        />

        {/* Vignette — keeps the band's square edges from cutting through a
            highlight in the photograph. */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-b from-[#15171A]/45 via-transparent to-[#15171A]/55"
        />

        {/* All that survives of the old skewed panel: one gold rule, on the
            same -10deg the band used to run every edge on. */}
        <div
          aria-hidden="true"
          className="absolute inset-y-0 right-[28%] hidden w-1 skew-x-[-10deg] bg-tobler-gold/70 lg:block"
        />

        <div className="relative mx-auto max-w-content px-6 py-8 md:px-10 md:py-9 lg:px-12 lg:py-11">
          <div className="lg:max-w-[52%]">
            {/* `text-white` is not inherited here — the base layer colours every
              heading with the near-black ink token. */}
            {/* Sized off the studio page's own headline scale rather than the
              site-wide `text-h1`, which is a full-bleed hero size and made the
              band taller than the viewport on its own. */}
            <h2
              className={`text-[30px] font-bold uppercase leading-[1] tracking-tight text-white md:text-[38px] lg:text-[44px] ${rise}`}
              style={at(0.1)}
            >
              Who we{' '}
              <span className="bg-gradient-to-r from-tobler-gold to-tobler-gold/80 bg-clip-text text-transparent">
                are
              </span>
            </h2>

            {/* Kicker sits beside the rule rather than under it — the band is
              height-constrained, so anything that can share a line does. */}
            <div className={`mt-3 flex items-center gap-3 ${rise}`} style={at(0.15)}>
              <span className="block h-1 w-16 shrink-0 bg-tobler-gold" />
              <span className="label-mono text-[10px] text-white/60">Swiss engineered</span>
            </div>

            <p
              className={`mt-4 max-w-xl text-lg leading-snug text-white md:text-xl ${rise}`}
              style={at(0.2)}
            >
              Build the next landmark, the precise way.
            </p>

            <div className="mt-3.5 flex max-w-xl flex-col gap-2.5 text-sm leading-[1.55] text-white/80">
              {STORY.map((paragraph, index) => (
                <p key={paragraph} className={rise} style={at(0.25 + index * 0.05)}>
                  {paragraph}
                </p>
              ))}
            </div>

            <p
              className={`mt-4 max-w-xl rounded-r border-l-2 border-tobler-gold bg-[#15171A]/70 py-2 pl-4 pr-5 text-[13px] leading-snug text-white backdrop-blur-sm ${rise}`}
              style={at(0.4)}
            >
              {STANDARD_NOTE}
            </p>

            {/* "Start a chat" was here alongside it and has been dropped —
                the studio bottom bar already carries that call to action on
                this page. */}
            <div
              className={`mt-5 flex flex-col gap-3 sm:flex-row sm:gap-4 ${rise}`}
              style={at(0.45)}
            >
              <Link
                to="/projects"
                className="rounded-btn label-mono inline-flex items-center justify-center bg-tobler-gold px-7 py-3 text-tobler-heading shadow-raised transition-all duration-300 hover:bg-tobler-gold-dark hover:shadow-lift active:scale-[0.98]"
              >
                View projects
              </Link>
            </div>

            {/* The four pillars as one bordered block split by hairline rules,
              not four floating cards. The rules are what make the row read as
              a grid: every cell stretches to the tallest, so the dividers run
              edge to edge and the three text rows share a baseline across all
              four columns.

              The icon sits *above* the title rather than beside it. Inline, it
              took 24px of a ~103px cell and "MANUFACTURING" no longer fitted
              on a line, so that title overflowed into the neighbouring cell.

              The reveal is on the block, not the cells: `animate-fade-in-up`
              starts at translateY(24px), which `overflow-hidden` would clip if
              each cell animated in on its own.

              Tinted and blurred because the block now sits on a photograph
              rather than a flat field — a bare border left the copy competing
              with the scaffolding behind it. Held narrower than the prose above
              so it stops short of the gold diagonal. */}
            <div
              className={`mt-6 grid grid-cols-2 overflow-hidden rounded-lg border border-white/15 bg-[#15171A]/65 backdrop-blur-sm sm:grid-cols-4 lg:max-w-[560px] ${rise}`}
              style={at(0.5)}
            >
              {PILLARS.map((pillar, index) => {
                const Icon = pillar.icon
                return (
                  <div
                    key={pillar.title}
                    className={`group border-white/15 px-3.5 py-3.5 transition-colors duration-300 hover:bg-tobler-gold/[0.08] ${
                      index % 2 === 1 ? 'border-l' : ''
                    } ${index >= 2 ? 'border-t' : ''} sm:border-t-0 ${
                      index === 0 ? 'sm:border-l-0' : 'sm:border-l'
                    }`}
                  >
                    <Icon className="h-4 w-4 text-tobler-gold" aria-hidden="true" />
                    {/* Two lines reserved. The titles run one or two lines, and
                      without a floor the copy under them started at a different
                      height in every cell. */}
                    <p className="label-mono mt-2.5 min-h-[26px] text-[0.65rem] leading-[1.25] text-white">
                      {pillar.title}
                    </p>
                    <p className="mt-1.5 text-[11px] leading-snug text-white/60 transition-colors duration-300 group-hover:text-white/80">
                      {pillar.copy}
                    </p>
                  </div>
                )
              })}
            </div>
          </div>
          {/* The phone stand-in strip that used to sit here is gone: the
              photograph is now the background at every width, so a second copy
              of it in the flow was both redundant and pure added height. */}
        </div>
      </div>
    </section>
  )
}

export default WhoWeAre
