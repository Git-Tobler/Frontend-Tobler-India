import Container from '../common/Container.jsx'
import SectionTitle from '../common/SectionTitle.jsx'
import EngineeringProcessCard from '../ui/EngineeringProcessCard.jsx'
import { ENGINEERING_PROCESS_STEPS } from '../../constants/engineeringProcessData.js'

function EngineeringManufacturingSection() {
  return (
    <section className="bg-white py-24 md:py-30">
      <Container>
        <div className="mb-12 max-w-3xl">
          <SectionTitle
            eyebrow="Engineering & Manufacturing"
            title="A Premium Process, Built for Precision and Delivery"
            description="Every Tobler solution is shaped through a disciplined sequence of engineering, manufacturing and field support, designed to move from concept to completion without compromise."
          />
        </div>

        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-5">
          {ENGINEERING_PROCESS_STEPS.map((step) => (
            <EngineeringProcessCard key={step.number} step={step} />
          ))}
        </div>
      </Container>
    </section>
  )
}

export default EngineeringManufacturingSection
