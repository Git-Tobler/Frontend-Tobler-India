import { Factory, Ruler, Globe2 } from 'lucide-react'
import Container from '../common/Container.jsx'
import SectionTitle from '../common/SectionTitle.jsx'

const POINTS = [
  {
    icon: Ruler,
    title: 'Engineered to Exacting Tolerances',
    description:
      'All systems are designed and manufactured to Swiss precision standards, ensuring consistent performance across all projects.',
  },
  {
    icon: Factory,
    title: 'Manufactured Locally, Supported Nationally',
    description:
      'India-based manufacturing combined with responsive engineering support across all major construction regions.',
  },
  {
    icon: Globe2,
    title: 'Global Standards, Local Expertise',
    description:
      'Full compliance with EN 12810–12812 standards, backed by a team that understands India\'s unique site conditions.',
  },
]

function IntroSection() {
  return (
    <section className="bg-shopify-surface-warm py-24 md:py-30">
      <Container>
        <SectionTitle
          align="center"
          size="display"
          title="Engineering Better Construction."
          description="For over 30 years, we have been delivering Swiss engineered scaffolding and formwork solutions that support safer, more efficient construction. With a strong foundation in engineering and a growing presence in India, we partner with contractors, developers, and infrastructure leaders to build projects with confidence."
        />

        {/* Separated rounded cards rather than the previous hairline grid — the
            shared-border treatment belongs to the sharp-cornered inner pages. */}
        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {POINTS.map(({ icon: Icon, title, description }) => (
            <div
              key={title}
              className="rounded-card-lg border border-shopify-border bg-white p-8 transition-all duration-300 ease-premium hover:-translate-y-1 hover:shadow-raised"
            >
              <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-pill bg-shopify-green-tint">
                <Icon size={20} className="text-shopify-green" strokeWidth={1.5} />
              </div>
              <h3 className="mb-3 text-lg text-shopify-ink">{title}</h3>
              <p className="text-sm normal-case leading-relaxed text-shopify-body">{description}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}

export default IntroSection
