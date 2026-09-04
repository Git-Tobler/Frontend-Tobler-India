import Container from '../common/Container.jsx'
import SectionTitle from '../common/SectionTitle.jsx'
import EngineeringProcessCard from '../ui/EngineeringProcessCard.jsx'
import ResponsiveImage from '../ui/ResponsiveImage.jsx'
import VideoPanel from '../ui/VideoPanel.jsx'
import { ENGINEERING_PROCESS_STEPS } from '../../data/engineeringProcess.js'
import { MEDIA } from '../../data/media-map.js'

/* Engineering & manufacturing.

   The one section on the homepage that carries motion, and the only place the
   production footage appears. The media row is deliberately asymmetric — a tall
   portrait clip against a wide shop-floor still — so this reads as a different
   kind of block from the card grids above and below it, rather than a third
   row of equal tiles. */
function EngineeringManufacturingSection() {
  return (
    <section className="bg-shopify-surface-warm py-24 md:py-30">
      <Container>
        <div className="mb-12 max-w-3xl">
          <SectionTitle
            size="display"
            title="A Premium Process, Built for Precision and Delivery"
            description="Every Tobler solution is shaped through a disciplined sequence of engineering, manufacturing and field support, designed to move from concept to completion without compromise."
          />
        </div>

        <div className="mb-16 grid gap-5 lg:grid-cols-12">
          <VideoPanel
            publicId={MEDIA.productionVideo}
            className="mx-auto w-full max-w-[300px] rounded-img-lg lg:col-span-3 lg:mx-0"
          />
          <ResponsiveImage
            publicId={MEDIA.manufacturingWide}
            alt="Tobler manufacturing floor"
            className="h-64 rounded-img-lg lg:col-span-9 lg:h-full"
            displayWidth={1100}
            sizes="(min-width: 1024px) 66vw, 100vw"
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
