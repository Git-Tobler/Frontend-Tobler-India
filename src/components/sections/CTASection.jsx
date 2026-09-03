import Container from '../common/Container.jsx'
import Button from '../common/Button.jsx'
import CornerMarks from '../ui/CornerMarks.jsx'

/* `soft` is the homepage's closing band: a rounded green card inside the
   container rather than the full-bleed blueprint strip the inner pages use. */
function CTASection({
  title = 'Ready to Discuss Your Next Project?',
  description = 'Speak with our engineering team to find the right scaffolding or formwork solution for your site requirements.',
  primaryLabel = 'Request a Quotation',
  primaryTo = '/contact',
  secondaryLabel = 'Explore Products',
  secondaryTo = '/products',
  soft = false,
}) {
  if (soft) {
    return (
      <section className="bg-white pb-24 pt-4 md:pb-30">
        <Container>
          <div className="rounded-card-xl bg-shopify-green-deep px-8 py-16 text-center md:px-16 md:py-20">
            <h2 className="mx-auto max-w-3xl text-display-lg text-white">{title}</h2>
            <p className="mx-auto mt-5 max-w-2xl text-lg normal-case leading-relaxed text-white/70">
              {description}
            </p>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
              {/* Yellow-on-navy primary — the logo colorway, saved for the
                  page's single closing CTA. */}
              <Button
                to={primaryTo}
                variant="accent"
                shape="pill"
                size="xl"
                icon={false}
              >
                {primaryLabel}
              </Button>
              <Button
                to={secondaryTo}
                shape="pill"
                size="xl"
                icon={false}
                variant="ghost"
                className="border border-white/30 text-white hover:bg-white/10 hover:text-white focus:ring-white/40"
              >
                {secondaryLabel}
              </Button>
            </div>
          </div>
        </Container>
      </section>
    )
  }

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
