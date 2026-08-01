import { Factory, Ruler, Globe2 } from 'lucide-react'
import Container from '../common/Container.jsx'
import SectionTitle from '../common/SectionTitle.jsx'

const POINTS = [
  {
    icon: Ruler,
    num: '01',
    title: 'Engineered to Exacting Tolerances',
    description:
      'Every system is designed and manufactured to Swiss precision standards, ensuring consistent performance across every project.',
  },
  {
    icon: Factory,
    num: '02',
    title: 'Manufactured Locally, Supported Nationally',
    description:
      'India-based manufacturing combined with responsive engineering support across every major construction region.',
  },
  {
    icon: Globe2,
    num: '03',
    title: 'Global Standards, Local Expertise',
    description:
      'Full compliance with EN 12810\u201312812 standards, backed by a team that understands India\'s unique site conditions.',
  },
]

function IntroSection() {
  return (
    <section className="py-24 md:py-30">
      <Container>
        <SectionTitle
          eyebrow="ABOUT US"
          title="Engineering Better Construction."
          description="For over 30 years, we have been delivering Swiss engineered scaffolding and formwork solutions that support safer, more efficient construction. With a strong foundation in engineering and a growing presence in India, we partner with contractors, developers, and infrastructure leaders to build projects with confidence."
        />
        <div className="grid md:grid-cols-3 gap-px bg-tobler-border mt-16 border border-tobler-border">
          {POINTS.map(({ icon: Icon, num, title, description }) => (
            <div key={title} className="p-8 bg-white transition-colors duration-300 hover:bg-tobler-bg-light">
              <div className="flex items-center justify-between mb-6">
                <div className="w-11 h-11 bg-tobler-heading flex items-center justify-center">
                  <Icon size={19} className="text-white" strokeWidth={1.5} />
                </div>
                <span className="figure-mono text-xs text-tobler-body/40">{num}</span>
              </div>
              <h3 className="text-lg mb-3">{title}</h3>
              <p className="text-sm text-tobler-body leading-relaxed normal-case">{description}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}

export default IntroSection
