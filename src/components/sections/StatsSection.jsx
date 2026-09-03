import Container from '../common/Container.jsx'
import { STATS } from '../../data/site.js'

/* Homepage stat row. Light and green rather than the previous dark band — on
   the restyled page a full-width near-black strip directly under the hero
   photograph read as a footer and cut the page in half. */
function StatsSection() {
  return (
    <section className="border-b border-shopify-border bg-white py-16 md:py-20">
      <Container>
        <div className="grid gap-12 sm:grid-cols-3 sm:gap-8">
          {STATS.map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="font-display text-5xl font-bold tracking-tight text-shopify-green md:text-6xl">
                {stat.value}
              </p>
              <p className="mx-auto mt-3 max-w-[16rem] text-sm normal-case leading-relaxed text-shopify-muted">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}

export default StatsSection
