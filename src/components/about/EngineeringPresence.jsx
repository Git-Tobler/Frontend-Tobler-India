import { useInViewAnimation } from '../../hooks/useInViewAnimation.js'
import swissEngineering from '../../assets/images/Swiss engineering 1.png'
import indiaPresence from '../../assets/images/image (12).jpg'

/* The two capability bands on About: Swiss engineering, then India presence.

   Both ids are redirect targets for the retired /about/* routes listed in
   AppRoutes.jsx — do not rename `swiss-engineering` or `india-presence`.

   Geometry is the page's existing diagonal motif rather than a new one: the
   photograph sits in an absolutely-positioned panel skewed -10deg, with the
   image counter-skewed back to level inside it, exactly as WhoWeAre does a
   few sections above. `flip` mirrors both the skew and the column order so
   the second band leans the opposite way and reads as a pair with the first.

   The accent is the logo yellow as a hairline along the diagonal and a rule
   above the heading — the dosage the colour tokens call for. The reference
   this was built from used orange throughout; that is not a brand colour
   here, so it maps to navy and gold. */

const BANDS = [
  {
    id: 'swiss-engineering',
    title: ['Precision that', 'builds confidence'],
    image: swissEngineering,
    // The node detail is centre-right in frame; the panel is a tall slice, so
    // the crop is aimed by hand rather than left to a generic centre.
    position: '50% 50%',
    copy: 'Swiss engineering is the foundation of everything we do. Every Tobler system is designed with a focus on precision, structural performance, and practical functionality to help construction professionals achieve safer, faster, and more efficient project execution. It is this engineering philosophy that has earned Tobler the trust of customers across more than 80 countries.',
    points: [
      { number: 1, label: ['Engineered', 'for precision'] },
      { number: 2, label: ['Structural', 'performance'] },
      { number: 3, label: ['Practical', 'functionality'] },
      { number: 4, label: ['Trusted in', '80+ countries'] },
    ],
  },
  {
    id: 'india-presence',
    title: ['Built for', "India's growth"],
    image: indiaPresence,
    position: '50% 45%',
    flip: true,
    copy: "India is one of the world's fastest-growing construction markets, and Tobler is proud to support its progress through local manufacturing and engineering expertise. Backed by advanced production facilities in Ludhiana and Mumbai, we deliver Swiss engineered scaffolding and formwork systems with responsive technical support and dependable service across India.",
    points: [
      { number: 1, label: ['Made for', 'India'] },
      { number: 2, label: ['Local manufacturing', 'in Ludhiana & Mumbai'] },
      { number: 3, label: ['Responsive', 'technical support'] },
      { number: 4, label: ['Dependable service', 'across India'] },
    ],
  },
]

/* The photograph half. Skew shifts content sideways as a function of y and
   never vertically, so the panel can overhang left/right without the subject
   drifting past the top or bottom edge of the band. The inner box cancels the
   skew so the photograph itself stays upright; `scale-110` keeps the
   counter-skewed frame wider than the slot it has to fill. */
function Photo({ src, position, flip }) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-y-0 hidden w-[46%] lg:block ${
        flip ? '-left-[4%]' : '-right-[4%]'
      }`}
    >
      <div
        className={`absolute inset-0 overflow-hidden ${flip ? 'skew-x-[10deg]' : 'skew-x-[-10deg]'}`}
      >
        <div className={`absolute inset-0 scale-110 ${flip ? 'skew-x-[-10deg]' : 'skew-x-[10deg]'}`}>
          <img
            src={src}
            alt=""
            className="h-full w-full object-cover"
            style={{ objectPosition: position }}
            loading="lazy"
            decoding="async"
          />
        </div>
      </div>
      {/* Gold hairline riding the diagonal seam. */}
      <span
        className={`absolute inset-y-0 w-px bg-tobler-gold ${
          flip ? 'right-0 skew-x-[10deg]' : 'left-0 skew-x-[-10deg]'
        }`}
      />
    </div>
  )
}

function Band({ band, rise, at, order }) {
  const { id, title, image, position, copy, points, flip } = band

  return (
    <section id={id} className="scroll-mt-28">
      <div className="relative overflow-hidden border border-tobler-border bg-tobler-surface">
        <Photo src={image} position={position} flip={flip} />

        {/* Copy column. Held to just under half the band so the text never runs
            under the diagonal, which cuts further in the further down it goes. */}
        <div
          className={`relative px-6 py-12 md:px-12 md:py-16 lg:w-[54%] lg:py-20 ${
            flip ? 'lg:ml-auto lg:pl-14' : 'lg:pr-14'
          }`}
        >
          <span className={`block h-0.5 w-10 bg-tobler-gold ${rise}`} style={at(order + 0.1)} />

          <h2
            className={`mt-6 text-[32px] font-semibold leading-[1.05] tracking-tight text-tobler-heading md:text-[42px] ${rise}`}
            style={at(order + 0.15)}
          >
            {title[0]}
            <span className="block">{title[1]}</span>
          </h2>

          <span className={`mt-6 block h-0.5 w-10 bg-tobler-gold ${rise}`} style={at(order + 0.2)} />

          <p
            className={`mt-6 max-w-xl text-[15px] leading-relaxed text-tobler-body ${rise}`}
            style={at(order + 0.25)}
          >
            {copy}
          </p>

          {/* Phone/tablet stand-in for the diagonal panel — same photograph,
              same lean, at a height a small screen can carry. */}
          <div className={`mt-10 lg:hidden ${rise}`} style={at(order + 0.3)}>
            <div className="h-40 overflow-hidden skew-x-[-6deg]">
              <div className="h-full w-full scale-110 skew-x-[6deg]">
                <img
                  src={image}
                  alt=""
                  className="h-full w-full object-cover"
                  style={{ objectPosition: position }}
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </div>
          </div>

          {/* Capability row, split by hairlines the way the reference lays it
              out: two up on a phone, four across from `sm`. */}
          <div
            className={`mt-10 grid grid-cols-2 gap-y-8 border-t border-tobler-border pt-8 sm:grid-cols-4 ${rise}`}
            style={at(order + 0.35)}
          >
            {points.map(({ icon: Icon, number, label }, i) => (
              <div
                key={label.join(' ')}
                className={`px-2 text-center sm:px-3 ${
                  i % 2 === 1 ? 'border-l border-tobler-border' : ''
                } ${i === 0 ? 'sm:border-l-0' : 'sm:border-l sm:border-tobler-border'}`}
              >
                {Icon ? (
                  <Icon className="mx-auto h-7 w-7 text-tobler-blue" aria-hidden="true" />
                ) : (
                  <span
                    className="mx-auto flex h-7 w-7 items-center justify-center text-lg font-semibold text-tobler-blue"
                    aria-hidden="true"
                  >
                    {number}
                  </span>
                )}
                <p className="label-mono mt-3 text-[0.62rem] leading-[1.5] text-tobler-heading">
                  {label[0]}
                  <span className="block">{label[1]}</span>
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function EngineeringPresence() {
  const [ref, inView] = useInViewAnimation()
  const rise = inView ? 'animate-fade-in-up' : 'opacity-0'
  const at = (delay) => ({ animationDelay: `${delay}s` })

  return (
    <div ref={ref} className="mx-auto flex max-w-content flex-col gap-6 px-6 py-16 md:px-10 md:py-20">
      {BANDS.map((band, i) => (
        <Band key={band.id} band={band} rise={rise} at={at} order={i * 0.1} />
      ))}
    </div>
  )
}

export default EngineeringPresence
