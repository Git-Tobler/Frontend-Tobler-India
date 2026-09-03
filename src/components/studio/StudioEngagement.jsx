import { useInViewAnimation } from '../../hooks/useInViewAnimation.js'
import StudioButton from './StudioButton.jsx'

/* The two-card block: what Swiss engineering means in practice, and what the
   Indian operation adds to it. Structurally the landing page's pricing pair —
   a dark card and a light one, offset to the right of the column — with the
   headline figure carrying a real number from the business instead of a price.

   The anchor ids are the redirect targets for the old /about/swiss-engineering
   and /about/india-presence routes and must not be renamed. */

const CARDS = [
  {
    id: 'swiss-engineering',
    dark: true,
    title: 'Swiss Engineering',
    lines: ['Precision that builds confidence.', 'Engineered to EN 12810–12812.'],
    figure: '30+',
    figureLabel: 'Years of engineering heritage',
    points: [
      'Exacting dimensional tolerances on every batch',
      'Load testing and structural validation before production',
      'Decades of field feedback fed back into design',
    ],
    delay: 0.1,
  },
  {
    id: 'india-presence',
    dark: false,
    title: 'India Presence',
    lines: ['Built for India’s growth.', 'Local manufacturing, local support.'],
    figure: '250,000+',
    figureLabel: 'Sq. ft. of manufacturing area',
    points: [
      'Dedicated production for Indian site conditions',
      'Regional engineering teams across major hubs',
      'Nationwide logistics and delivery network',
    ],
    delay: 0.2,
  },
]

function EngagementCard({ card, inView }) {
  const surface = card.dark
    ? 'bg-[#051A24] shadow-[inset_0_2px_8px_0_rgba(255,255,255,0.08)]'
    : 'bg-white shadow-[0_4px_16px_rgba(0,0,0,0.08)]'
  const title = card.dark ? 'text-[#F6FCFF]' : 'text-[#0D212C]'
  const body = card.dark ? 'text-[#E0EBF0]' : 'text-[#051A24]/70'

  return (
    <div
      id={card.id}
      className={`scroll-mt-28 rounded-[40px] pb-10 pl-10 pr-10 pt-3 md:pr-24 ${surface} ${
        inView ? 'animate-fade-in-up' : 'opacity-0'
      }`}
      style={{ animationDelay: `${card.delay}s` }}
    >
      <h3 className={`mt-8 text-[22px] font-medium ${title}`}>{card.title}</h3>

      <div className={`mt-3 text-sm leading-relaxed ${body}`}>
        {card.lines.map((line) => (
          <p key={line}>{line}</p>
        ))}
      </div>

      <p className={`mt-8 text-2xl ${title}`}>{card.figure}</p>
      <p className={`text-sm ${body}`}>{card.figureLabel}</p>

      <ul className={`mt-6 flex flex-col gap-2 text-sm leading-relaxed ${body}`}>
        {card.points.map((point) => (
          <li key={point} className="flex gap-3">
            <span aria-hidden="true">—</span>
            <span>{point}</span>
          </li>
        ))}
      </ul>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row md:gap-4">
        {card.dark ? (
          <>
            <StudioButton to="/contact">Start a chat</StudioButton>
            <StudioButton to="/products" variant="secondary">
              How it works
            </StudioButton>
          </>
        ) : (
          <StudioButton to="/contact" variant="tertiary">
            Start a chat
          </StudioButton>
        )}
      </div>
    </div>
  )
}

function StudioEngagement() {
  const [ref, inView] = useInViewAnimation()

  return (
    <section ref={ref} className="w-full px-6 py-12">
      <div className="grid grid-cols-1 gap-8 md:ml-auto md:max-w-4xl md:grid-cols-2 md:justify-end">
        {CARDS.map((card) => (
          <EngagementCard key={card.id} card={card} inView={inView} />
        ))}
      </div>
    </section>
  )
}

export default StudioEngagement
