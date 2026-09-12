import Badge from '../common/Badge.jsx'
import Breadcrumb from '../common/Breadcrumb.jsx'
import Button from '../common/Button.jsx'
import Container from '../common/Container.jsx'
import MediaGallery from '../ui/MediaGallery.jsx'

/* Gallery on the left, everything needed to ask for a price on the right.

   The card is sticky from `lg` up so the quote action stays reachable while the
   gallery is being worked through, and it doubles as the sentinel the sticky
   bottom bar watches — once this scrolls away, that appears. */
function ProductHero({ product, mediaItems, icon, breadcrumbItems, cardRef }) {
  const brochure = product.downloads?.[0]
  const keySpecs = product.specifications?.slice(0, 3) ?? []

  /* MediaGallery renders no node at all for a product whose media slots are
     still empty, which leaves the two-column template holding one child: the
     card lands in the wide column with 400px of white beside it. Centring a
     single column instead keeps that state presentable while the Cloudinary
     ids are still being filled in. */
  const hasMedia = mediaItems?.length > 0

  return (
    <section className="bg-white pb-16 pt-8 md:pb-24 md:pt-10">
      <Container>
        <Breadcrumb items={breadcrumbItems} />

        <div
          className={`mt-8 grid gap-10 lg:mt-10 lg:items-start lg:gap-16 ${
            hasMedia ? 'lg:grid-cols-[minmax(0,1fr)_minmax(0,400px)]' : 'mx-auto max-w-[560px]'
          }`}
        >
          <MediaGallery
            items={mediaItems}
            icon={icon}
            label={product.model}
            sizes="(min-width: 1024px) 58vw, 100vw"
          />

          <div
            ref={cardRef}
            className="rounded-[14px] border border-tobler-border bg-white p-7 shadow-soft md:p-8 lg:sticky lg:top-24"
          >
            <h1 className="text-h3 text-tobler-heading">{product.name}</h1>

            {product.model && <p className="label-mono mt-2.5 text-tobler-muted">{product.model}</p>}

            <p className="mt-5 text-base leading-relaxed normal-case text-tobler-body">{product.summary}</p>

            {keySpecs.length > 0 && (
              <dl className="mt-7 space-y-3 border-t border-tobler-border-light pt-6">
                {keySpecs.map((spec) => (
                  <div key={spec.label} className="flex items-baseline justify-between gap-4 text-sm">
                    <dt className="text-tobler-muted">{spec.label}</dt>
                    <dd className="text-right font-semibold text-tobler-heading">{spec.value}</dd>
                  </div>
                ))}
              </dl>
            )}

            {product.certifications?.length > 0 && (
              <div className="mt-6 flex flex-wrap gap-2">
                {product.certifications.map((cert) => (
                  <Badge key={cert} variant="outline">
                    {cert}
                  </Badge>
                ))}
              </div>
            )}

            <div className="mt-7 space-y-3">
              <Button to="/contact#rfq" size="lg" className="w-full">
                Request a Quote
              </Button>
              {brochure && (
                <Button href={brochure.href} variant="secondary" size="lg" icon={false} className="w-full">
                  Download Brochure
                </Button>
              )}
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}

export default ProductHero
