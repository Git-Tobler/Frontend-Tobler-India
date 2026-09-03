import { BadgeCheck } from 'lucide-react'
import Container from '../common/Container.jsx'
import SectionTitle from '../common/SectionTitle.jsx'
import { CERTIFICATIONS } from '../../data/team.js'

/* `soft` is the homepage's rounded/green treatment. Left off on the About
   page, which keeps the hairline grid. */
function CertificationsSection({ soft = false }) {
  return (
    <section className={`py-24 md:py-30 ${soft ? 'bg-shopify-surface-warm' : ''}`}>
      <Container>
        <SectionTitle
          align="center"
          size={soft ? 'display' : 'default'}
          title="Certified to the Highest International Standards"
          description="Our quality management, safety systems and engineering compliance are independently verified against global benchmarks."
        />

        {soft ? (
          <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
            {CERTIFICATIONS.map((cert) => (
              <div
                key={cert.name}
                className="flex flex-col items-center rounded-card-lg border border-shopify-border bg-white p-7 text-center transition-all duration-300 ease-premium hover:-translate-y-1 hover:border-shopify-green-line hover:shadow-raised"
              >
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-pill bg-shopify-green-tint">
                  <BadgeCheck size={21} aria-hidden="true" className="text-shopify-green" strokeWidth={1.75} />
                </div>
                <p className="mb-1.5 text-sm font-semibold text-shopify-ink">{cert.name}</p>
                <p className="text-xs normal-case leading-relaxed text-shopify-muted">
                  {cert.description}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-px bg-tobler-border mt-14 border border-tobler-border">
            {CERTIFICATIONS.map((cert) => (
              <div
                key={cert.name}
                className="flex flex-col items-center text-center p-6 bg-white transition-colors duration-300 hover:bg-tobler-bg-light"
              >
                <div className="w-11 h-11 rounded-full border border-tobler-heading/15 flex items-center justify-center mb-4">
                  <BadgeCheck size={20} aria-hidden="true" className="text-tobler-blue" strokeWidth={1.75} />
                </div>
                <p className="font-semibold text-tobler-heading text-sm mb-1">{cert.name}</p>
                <p className="text-xs text-tobler-body/80 normal-case">{cert.description}</p>
              </div>
            ))}
          </div>
        )}
      </Container>
    </section>
  )
}

export default CertificationsSection
