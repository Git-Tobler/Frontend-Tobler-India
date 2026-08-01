import Container from '../common/Container.jsx'
import Button from '../common/Button.jsx'
import CornerMarks from '../ui/CornerMarks.jsx'

function CTASection({
  title = 'Ready to Discuss Your Next Project?',
  description = 'Speak with our engineering team to find the right scaffolding or formwork solution for your site requirements.',
  primaryLabel = 'Request a Quotation',
  primaryTo = '/contact',
  secondaryLabel = 'Explore Products',
  secondaryTo = '/products',
}) {
  return (
    <section className="py-20 md:py-24 bg-blueprint relative overflow-hidden">
      <CornerMarks always className="text-white/20 hidden md:block" />
      <Container className="relative flex flex-col lg:flex-row items-center justify-between gap-8">
        <div className="text-center lg:text-left max-w-xl">
          <h2 className="text-h3 text-white mb-3">{title}</h2>
          <p className="text-white/65 leading-relaxed normal-case">{description}</p>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-4 shrink-0">
          <Button to={primaryTo} variant="accent" size="lg">
            {primaryLabel}
          </Button>
          <Button to={secondaryTo} variant="white" size="lg" icon={false}>
            {secondaryLabel}
          </Button>
        </div>
      </Container>
    </section>
  )
}

export default CTASection
