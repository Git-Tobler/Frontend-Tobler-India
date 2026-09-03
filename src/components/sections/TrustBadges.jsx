import Container from '../common/Container.jsx'

function TrustBadges({ stats }) {
  return (
    <section className="py-16 md:py-20 bg-white border-y border-tobler-border">
      <Container>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <p className="text-h4 font-bold text-tobler-blue mb-2">{stat.value}</p>
              <p className="text-sm text-tobler-body leading-snug">{stat.label}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}

export default TrustBadges
