import { Calendar, Check } from 'lucide-react'
import Container from '../common/Container.jsx'
import Button from '../common/Button.jsx'

const BENEFITS = [
  '30-minute focused consultation',
  'No obligation, no sales pressure',
  'Technical team with real project experience',
]

const CONSULTATION_TYPES = [
  'RFQ discussions & technical guidance',
  'Facility tours & production capabilities',
  'Custom solutions design',
  'Project planning & execution',
  'Team training programs',
]

function ConsultationCTASection() {
  return (
    <section className="bg-white py-24 md:py-30">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <span className="mb-5 inline-flex items-center rounded-pill bg-shopify-green-tint px-3.5 py-1.5 text-sm font-semibold text-shopify-green-dark">
              Direct access
            </span>

            <h2 className="mb-5 text-display-lg text-shopify-ink">
              Talk directly with our engineers
            </h2>

            <p className="mb-8 text-lg normal-case leading-relaxed text-shopify-body">
              Schedule a consultation to discuss your specific project requirements — technical
              guidance, custom solutions, or simply how Tobler can support your build. Our Swiss
              engineering team is ready to help.
            </p>

            <ul className="mb-10 space-y-3">
              {BENEFITS.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-pill bg-shopify-green">
                    <Check size={13} className="text-white" strokeWidth={2.5} />
                  </span>
                  <span className="normal-case text-shopify-body">{item}</span>
                </li>
              ))}
            </ul>

            <Button
              to="/consultations"
              variant="shopify"
              shape="pill"
              size="lg"
              icon={false}
              className="gap-3"
            >
              <Calendar size={18} />
              Schedule a consultation
            </Button>
          </div>

          <div className="rounded-card-xl bg-shopify-green-deep p-10 text-white md:p-12">
            <h3 className="mb-7 text-h5 font-semibold text-white">Consultation types</h3>
            <ul className="space-y-4">
              {CONSULTATION_TYPES.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 border-b border-white/10 pb-4 last:border-0 last:pb-0"
                >
                  <Check size={17} className="mt-0.5 shrink-0 text-tobler-gold" strokeWidth={2} />
                  <span className="normal-case text-white/85">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </section>
  )
}

export default ConsultationCTASection
