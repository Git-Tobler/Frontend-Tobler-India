import { CheckCircle2 } from 'lucide-react'
import Container from '../common/Container.jsx'
import SectionTitle from '../common/SectionTitle.jsx'
import Button from '../common/Button.jsx'
import CornerMarks from '../ui/CornerMarks.jsx'
import swissEngineering from '../../assets/brand/swiss-engineering.png'

const FEATURES = [
  'Designed to EN 12810\u201312812 European engineering standards',
  'Rigorous multi-stage quality control across all production runs',
  'Load-tested and certified for demanding site conditions',
  'Continuous product innovation backed by decades of R&D',
]

function SwissEngineeringSection() {
  return (
    <section className="py-24 md:py-30 bg-tobler-bg-light">
      <Container>
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <SectionTitle
              title="Precision Isn't a Feature. It's the Foundation."
              description="All Tobler systems begin with the same engineering discipline established in Switzerland decades ago \u2014 rigorous tolerances, exhaustive testing, and a relentless focus on structural reliability."
            />
            <ul className="mt-8 space-y-4">
              {FEATURES.map((feature) => (
                <li key={feature} className="flex items-start gap-3">
                  <CheckCircle2 size={19} className="text-tobler-blue shrink-0 mt-0.5" strokeWidth={2} />
                  <span className="text-tobler-body normal-case">{feature}</span>
                </li>
              ))}
            </ul>
            <div className="mt-10">
              <Button to="/about#swiss-engineering" variant="secondary">
                Discover Our Heritage
              </Button>
            </div>
          </div>
          <div className="relative">
            <div className="bg-blueprint relative overflow-hidden p-6 md:p-8">
              <CornerMarks always className="text-white/25" />
              <div className="relative bg-white p-2 shadow-elevated">
                <img
                  src={swissEngineering}
                  alt="Swiss Engineering. Swiss Technology."
                  className="w-full h-auto"
                />
              </div>
              <div className="relative mt-6 bg-tobler-heading/75 backdrop-blur-md border border-white/15 p-5">
                <p className="figure-mono text-tobler-blue text-4xl font-bold mb-1">75+</p>
                <p className="text-white/70 text-sm normal-case">Years of continuous engineering refinement</p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}

export default SwissEngineeringSection
