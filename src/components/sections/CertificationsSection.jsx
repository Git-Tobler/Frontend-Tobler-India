import { BadgeCheck } from 'lucide-react'
import Container from '../common/Container.jsx'
import SectionTitle from '../common/SectionTitle.jsx'
import { CERTIFICATIONS } from '../../constants/team.js'

function CertificationsSection() {
  return (
    <section className="py-24 md:py-30">
      <Container>
        <SectionTitle
          align="center"
          eyebrow="Quality &amp; Compliance"
          title="Certified to the Highest International Standards"
          description="Our quality management, safety systems and engineering compliance are independently verified against global benchmarks."
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-px bg-tobler-border mt-14 border border-tobler-border">
          {CERTIFICATIONS.map((cert) => (
            <div
              key={cert.name}
              className="flex flex-col items-center text-center p-6 bg-white transition-colors duration-300 hover:bg-tobler-bg-light"
            >
              <div className="w-11 h-11 rounded-full border border-tobler-heading/15 flex items-center justify-center mb-4">
                <BadgeCheck size={20} className="text-tobler-gold" strokeWidth={1.75} />
              </div>
              <p className="font-semibold text-tobler-heading text-sm mb-1">{cert.name}</p>
              <p className="text-xs text-tobler-body/80 normal-case">{cert.description}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}

export default CertificationsSection
