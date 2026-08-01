import Container from '../common/Container.jsx'
import Breadcrumb from '../common/Breadcrumb.jsx'
import CornerMarks from '../ui/CornerMarks.jsx'

function PageHero({ title, description, breadcrumbItems = [] }) {
  return (
    <section className="relative bg-blueprint pt-28 pb-16 md:pt-36 md:pb-20 overflow-hidden text-tobler-gold">
      <CornerMarks always className="text-white/25 hidden md:block" />
      <Container className="relative">
        <div className="mb-8">
          <Breadcrumb items={breadcrumbItems} light />
        </div>

        <h1 className="text-h1 text-white max-w-3xl">{title}</h1>
        {description && (
          <p className="text-lg text-white/70 max-w-2xl mt-6 leading-relaxed normal-case font-sans">
            {description}
          </p>
        )}
      </Container>
    </section>
  )
}

export default PageHero
