import { Eye, Target } from 'lucide-react'
import { useInViewAnimation } from '../../hooks/useInViewAnimation.js'

/* Vision and Mission, set as a diptych rather than two cards.

   The two are halves of one statement, so they are drawn as one bordered
   block split by a single hairline — not two objects floating apart with a
   gap between them. The right half inverts to navy so the pair carries
   hierarchy instead of reading as a mirrored, weightless symmetry.

   Voice is the site's own technical-drawing idiom rather than anything new:
   `figure-mono` index numerals (the utility is documented for exactly this),
   `dim-line` eyebrow rules, square corners — the same decision WhoWeAre made
   when it dropped its rounded card — and gold used as rules and numerals
   only, which is the dosage the colour tokens call for.

   Note `gold-deep` on the light half. The token file is explicit that #F7E500
   is "never body text on white"; #6E6300 is the only readable yellow at small
   sizes on a light ground, so the two halves cannot share one gold. */

const PILLARS = [
  {
    index: '01',
    icon: Eye,
    title: 'Vision',
    lede: 'Where we are going',
    copy: 'To be the trusted engineering partner for the construction industry by delivering Swiss engineered scaffolding and formwork solutions that raise the standards of safety, quality and performance.',
  },
  {
    index: '02',
    icon: Target,
    title: 'Mission',
    lede: 'What we do about it',
    copy: 'To help construction professionals build with confidence through reliable systems, engineering expertise, advanced manufacturing and long-term partnerships that hold up on site.',
  },
]

function OurPhilosophy() {
  const [ref, inView] = useInViewAnimation()
  const rise = inView ? 'animate-fade-in-up' : 'opacity-0'
  const at = (delay) => ({ animationDelay: `${delay}s` })

  return (
    <section id="philosophy" ref={ref} className="scroll-mt-28 bg-white py-20 md:py-28">
      <div className="mx-auto max-w-content px-6 md:px-10">
        {/* Header, left-aligned on a measure rather than centred: the copy
            below runs in two columns, and a centred stack above an asymmetric
            block leaves the section without a spine. */}
        <div className="max-w-2xl">
          <p className={`dim-line label-mono text-tobler-blue ${rise}`} style={at(0.05)}>
            <span>Our philosophy</span>
            <span className="dim-line-rule" />
          </p>

          <h2
            className={`mt-6 text-[34px] font-semibold leading-[1.05] tracking-tight text-tobler-heading md:text-[46px] ${rise}`}
            style={at(0.1)}
          >
            What drives
            <span className="block text-tobler-blue">every decision</span>
          </h2>

          <p
            className={`mt-6 text-base leading-relaxed text-tobler-body md:text-lg ${rise}`}
            style={at(0.15)}
          >
            Two halves of one statement — a clear view of where the company is going, and the
            work it does every day to get there.
          </p>
        </div>

        {/* The diptych. One border around the pair, one hairline between them:
            `divide-*` draws that seam without a spare element, and flips from
            horizontal to vertical at the breakpoint where the halves sit side
            by side. */}
        <div
          className={`mt-14 grid border border-tobler-border divide-y divide-tobler-border md:grid-cols-2 md:divide-x md:divide-y-0 ${rise}`}
          style={at(0.2)}
        >
          {PILLARS.map(({ index, icon: Icon, title, lede, copy }, i) => {
            const dark = i === 1
            return (
              <div
                key={title}
                className={`flex flex-col p-8 md:p-12 ${dark ? 'bg-tobler-bg-dark' : 'bg-white'}`}
              >
                {/* Index numeral and icon share one baseline row — the numeral
                    is the mark, the icon only seconds it. */}
                <div className="flex items-center justify-between">
                  <span
                    className={`figure-mono text-[40px] font-semibold leading-none md:text-[52px] ${
                      dark ? 'text-tobler-gold' : 'text-tobler-blue-dark'
                    }`}
                  >
                    {index}
                  </span>
                  <Icon
                    size={26}
                    className={dark ? 'text-tobler-gold' : 'text-tobler-blue'}
                    aria-hidden="true"
                  />
                </div>

                <span
                  className={`mt-8 block h-px w-full ${dark ? 'bg-tobler-gold/40' : 'bg-tobler-border'}`}
                />

                <h3
                  className={`mt-8 text-2xl font-semibold uppercase tracking-tight md:text-[28px] ${
                    dark ? 'text-white' : 'text-tobler-heading'
                  }`}
                >
                  {title}
                </h3>

                <p
                  className={`label-mono mt-2 ${dark ? 'text-tobler-gold' : 'text-tobler-gold-deep'}`}
                >
                  {lede}
                </p>

                <p
                  className={`mt-6 text-[15px] leading-relaxed ${
                    dark ? 'text-white/75' : 'text-tobler-body'
                  }`}
                >
                  {copy}
                </p>
              </div>
            )
          })}
        </div>

        {/* Closing statement, hung between two dimension rules so it reads as
            a caption to the pair rather than a third item in the list. */}
        <div
          className={`mt-14 flex items-center gap-6 ${rise}`}
          style={at(0.3)}
        >
          <span className="hidden h-px flex-1 bg-tobler-border sm:block" />
          <p className="max-w-2xl text-center text-sm leading-relaxed text-tobler-body sm:text-[15px]">
            We combine <span className="font-semibold text-tobler-heading">Swiss engineering
            precision</span> with a deep understanding of construction needs, to deliver
            solutions that create <span className="font-semibold text-tobler-blue">real
            value</span> for our partners.
          </p>
          <span className="hidden h-px flex-1 bg-tobler-border sm:block" />
        </div>
      </div>
    </section>
  )
}

export default OurPhilosophy
