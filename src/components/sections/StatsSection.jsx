import Container from '../common/Container.jsx'
import { STATS } from '../../constants/siteConfig.js'

function StatsSection() {
  return (
    <section className="bg-tobler-heading py-14 md:py-16">
      <Container>
        <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-white/10">
          {STATS.map((stat, idx) => (
            <div key={stat.label} className={`px-5 md:px-8 ${idx === 0 ? 'pl-0' : ''}`}>
              <p className="figure-mono text-4xl md:text-5xl font-bold text-white mb-2">{stat.value}</p>
              <p className="label-mono text-white/45 leading-snug normal-case tracking-normal text-[11px]">
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
