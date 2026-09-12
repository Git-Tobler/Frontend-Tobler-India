import { useMemo, useRef } from 'react'
import { FileText, Factory, Headset, Ruler, ShieldCheck } from 'lucide-react'
import SEO from '../../components/common/SEO.jsx'
import Badge from '../../components/common/Badge.jsx'
import Button from '../../components/common/Button.jsx'
import Container from '../../components/common/Container.jsx'
import Reveal from '../../components/ui/Reveal.jsx'
import ResponsiveImage from '../../components/ui/ResponsiveImage.jsx'
import VideoPanel from '../../components/ui/VideoPanel.jsx'
import SpecTable from '../../components/ui/SpecTable.jsx'
import DownloadCard from '../../components/ui/DownloadCard.jsx'
import CTASection from '../../components/sections/CTASection.jsx'
import FAQAccordion from '../../components/products/FAQAccordion.jsx'
import ProductTile from '../../components/products/ProductTile.jsx'
import ProductHero from '../../components/products/ProductHero.jsx'
import ProductShowcase from '../../components/products/ProductShowcase.jsx'
import ProductTabs from '../../components/products/ProductTabs.jsx'
import ProductStickyBar from '../../components/products/ProductStickyBar.jsx'
import { productPath } from '../../data/products/index.js'
import { PRODUCT_ICONS, DEFAULT_ICON } from '../../data/icons.js'
import { buildBreadcrumbSchema, buildProductSchema } from '../../lib/seo.js'
import {
  cleanList,
  getAdvantageChips,
  getApplications,
  getDetailBlocks,
  getShowcaseBlocks,
  getWhyTobler,
} from '../../lib/productContent.js'
import { bandVideo, mediaItems } from '../../lib/media.js'

/* True of everything that leaves the Bhiwadi floor, so this strip renders on
   every product rather than only the ones whose data happens to be complete.
   The first proof defers to the product's own certification when it has one. */
const TRUST_PROOFS = [
  { icon: ShieldCheck, figure: 'EN 12810/11', label: 'Designed to European standard' },
  { icon: Ruler, figure: 'Swiss', label: 'Tooling and drawings' },
  { icon: Factory, figure: 'Bhiwadi', label: 'Made in our own plant' },
  { icon: Headset, figure: 'In-house', label: 'Engineering support' },
]

function BulletList({ items }) {
  return (
    <ul className="space-y-3.5">
      {items.map((item) => (
        <li key={item} className="flex gap-3 text-base leading-relaxed normal-case text-tobler-body">
          <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-tobler-blue" aria-hidden="true" />
          {item}
        </li>
      ))}
    </ul>
  )
}

/* The long-scroll product page. Rendered by ProductFamilyPage once the trailing
   URL segment resolves to a product rather than to a subcategory. */
function ProductPage({ family, subcategory, product, relatedProducts = [] }) {
  const heroCardRef = useRef(null)

  const icon = PRODUCT_ICONS[subcategory.slug] || DEFAULT_ICON
  const path = productPath(family.slug, product.slug)

  const galleryItems = mediaItems(product, product.name)
  const showcaseBlocks = getShowcaseBlocks(product)
  const applications = getApplications(product)
  const features = cleanList(product.features ?? [])
  const whyTobler = getWhyTobler(product)
  const advantageChips = getAdvantageChips(product)
  const variants = product.variants ?? []

  /* Only surface keyUSPs here when the showcase is drawing on detail blocks
     instead — otherwise the same list would print twice on one page. */
  const overviewList = getDetailBlocks(product).length > 0 ? cleanList(product.keyUSPs ?? []) : []

  const inUse = product.media?.inUse
  const inUseVideo = bandVideo(product)
  const inUseCaption = product.media?.inUseCaption

  const breadcrumbItems = [
    { label: 'Products', path: '/products' },
    { label: family.name, path: `/products/${family.slug}` },
    { label: subcategory.name, path: `/products/${family.slug}/${subcategory.slug}` },
    { label: product.name },
  ]

  /* Memoised because SEO re-appends its JSON-LD nodes whenever this array
     changes identity, and the tabs re-render the page on every click. */
  const structuredData = useMemo(
    () => [
      buildBreadcrumbSchema([
        { label: 'Products', path: '/products' },
        { label: family.name, path: `/products/${family.slug}` },
        { label: subcategory.name, path: `/products/${family.slug}/${subcategory.slug}` },
        { label: product.name },
      ]),
      buildProductSchema({ product, subcategory, category: family, path }),
    ],
    [product, subcategory, family, path]
  )

  const tabs = [
    applications.length > 0 && {
      id: 'applications',
      label: 'Applications',
      render: () => (
        <ul className="grid gap-3 sm:grid-cols-2">
          {applications.map((item) => (
            <li
              key={item}
              className="rounded-card bg-white p-4 text-sm leading-relaxed normal-case text-tobler-body ring-1 ring-tobler-border-light"
            >
              {item}
            </li>
          ))}
        </ul>
      ),
    },
    features.length > 0 && {
      id: 'features',
      label: 'Features',
      render: () => <BulletList items={features} />,
    },
    (whyTobler.length > 0 || advantageChips.length > 0) && {
      id: 'why-tobler',
      label: 'Why Tobler',
      render: () => (
        <div className="space-y-6">
          {whyTobler.map((paragraph, index) => (
            <p key={index} className="max-w-reading text-base leading-relaxed normal-case text-tobler-body">
              {paragraph}
            </p>
          ))}
          {advantageChips.length > 0 && (
            <ul className="flex flex-wrap gap-2 pt-1">
              {advantageChips.map((chip) => (
                <li key={chip}>
                  <Badge variant="blue">{chip}</Badge>
                </li>
              ))}
            </ul>
          )}
        </div>
      ),
    },
    variants.length > 0 && {
      id: 'configurations',
      label: 'Configurations',
      render: () => (
        <div className="grid gap-4 sm:grid-cols-2">
          {variants.map((variant) => (
            <div key={variant.name} className="rounded-card border border-tobler-border bg-white p-6">
              <h3 className="text-base font-semibold text-tobler-heading">{variant.name}</h3>
              <p className="mt-2 text-sm leading-relaxed normal-case text-tobler-body">{variant.description}</p>
            </div>
          ))}
        </div>
      ),
    },
  ].filter(Boolean)

  return (
    <>
      <SEO title={product.name} description={product.summary} path={path} structuredData={structuredData} />

      <ProductHero
        product={product}
        mediaItems={galleryItems}
        icon={icon}
        breadcrumbItems={breadcrumbItems}
        cardRef={heroCardRef}
      />

      <section className="border-y border-tobler-border bg-tobler-surface py-10">
        <Container>
          <dl className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {TRUST_PROOFS.map((proof, index) => {
              const Icon = proof.icon
              const figure =
                index === 0 && product.certifications?.length > 0 ? product.certifications[0] : proof.figure
              return (
                <div key={proof.label} className="flex flex-col items-center text-center">
                  <Icon size={22} className="text-tobler-blue" aria-hidden="true" strokeWidth={1.6} />
                  <dt className="figure-mono mt-3 text-sm font-semibold text-tobler-heading">{figure}</dt>
                  <dd className="label-mono mt-1 text-tobler-muted">{proof.label}</dd>
                </div>
              )
            })}
          </dl>
        </Container>
      </section>

      {product.description && (
        <section className="bg-white py-20 md:py-28">
          <Container>
            <div className={`grid gap-12 ${overviewList.length > 0 ? 'lg:grid-cols-2 lg:gap-20' : ''}`}>
              <Reveal>
                <h2 className="text-h2 text-tobler-heading">{subcategory.name}</h2>
                <p className="mt-6 max-w-reading text-base leading-relaxed normal-case text-tobler-body md:text-lg">
                  {product.description}
                </p>
              </Reveal>

              {overviewList.length > 0 && (
                <Reveal delay={120} className="lg:pt-4">
                  <BulletList items={overviewList} />
                </Reveal>
              )}
            </div>
          </Container>
        </section>
      )}

      <ProductShowcase blocks={showcaseBlocks} icon={icon} />

      {(inUse || inUseVideo) && (
        <section className="relative bg-tobler-bg-dark">
          {inUseVideo ? (
            <VideoPanel publicId={inUseVideo} aspect="aspect-[21/9]" width={1600} className="w-full" />
          ) : (
            <ResponsiveImage publicId={inUse} alt="" className="aspect-[21/9] w-full" displayWidth={1920} sizes="100vw" />
          )}

          {inUseCaption && (
            <>
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-tobler-heading/70 to-transparent"
              />
              <span className="label-mono absolute bottom-6 left-1/2 -translate-x-1/2 text-white/80">
                {inUseCaption}
              </span>
            </>
          )}
        </section>
      )}

      {tabs.length > 0 && (
        <section className="bg-tobler-surface py-20 md:py-28">
          <Container>
            <Reveal>
              <h2 className="mb-10 text-h2 text-tobler-heading">What it does, and where</h2>
            </Reveal>
            <ProductTabs items={tabs} />
          </Container>
        </section>
      )}

      {product.specifications?.length > 0 && (
        <section className="bg-white py-20 md:py-28">
          <Container>
            <Reveal className="max-w-4xl">
              <h2 className="mb-10 text-h2 text-tobler-heading">Technical data</h2>
              <SpecTable specifications={product.specifications} />
            </Reveal>
          </Container>
        </section>
      )}

      <section className="bg-tobler-surface py-20 md:py-28">
        <Container>
          <Reveal>
            <h2 className="mb-10 text-h2 text-tobler-heading">Brochures &amp; compliance</h2>
          </Reveal>

          {product.downloads?.length > 0 ? (
            <div className="grid gap-4 md:grid-cols-2">
              {product.downloads.map((doc) => (
                <DownloadCard key={doc.href} title={doc.label} href={doc.href} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-start gap-5 rounded-card border border-tobler-border bg-white p-8 md:flex-row md:items-center md:justify-between">
              <div className="flex items-start gap-4">
                <FileText size={22} className="mt-0.5 shrink-0 text-tobler-blue" aria-hidden="true" strokeWidth={1.6} />
                <p className="max-w-reading text-sm leading-relaxed normal-case text-tobler-body">
                  Drawings, load tables and the full specification for the {product.name} are issued on request by the
                  engineering team that builds it.
                </p>
              </div>
              <Button to="/contact#rfq" variant="secondary" size="md" className="shrink-0">
                Request a Spec Sheet
              </Button>
            </div>
          )}

          {product.certifications?.length > 0 && (
            <ul className="mt-8 flex flex-wrap gap-2">
              {product.certifications.map((cert) => (
                <li key={cert}>
                  <Badge variant="outline">{cert}</Badge>
                </li>
              ))}
            </ul>
          )}
        </Container>
      </section>

      {relatedProducts.length > 0 && (
        <section className="bg-white py-20 md:py-28">
          <Container>
            <Reveal>
              <h2 className="mb-10 text-h2 text-tobler-heading">Systems that work alongside it</h2>
            </Reveal>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {relatedProducts.map(({ product: related, subcategory: relatedSub }, index) => (
                <Reveal key={related.slug} delay={index * 60}>
                  <ProductTile
                    to={productPath(family.slug, related.slug)}
                    product={related}
                    fallbackImageId={relatedSub.imageId}
                    icon={PRODUCT_ICONS[relatedSub.slug] || DEFAULT_ICON}
                    className="h-full"
                  />
                </Reveal>
              ))}
            </div>
          </Container>
        </section>
      )}

      {subcategory.faqs?.length > 0 && (
        <section className="bg-tobler-surface py-20 md:py-28">
          <Container>
            <Reveal className="mx-auto max-w-3xl">
              <h2 className="mb-10 text-h2 text-tobler-heading">Frequently asked</h2>
              <FAQAccordion items={subcategory.faqs} />
            </Reveal>
          </Container>
        </section>
      )}

      {/* <CTASection
        title={`Need the ${product.name} on your site?`}
        description="Send us the drawings or the bay geometry and our engineers will come back with a system layout and a quotation."
        primaryLabel="Request a Quotation"
        primaryTo="/contact#rfq"
        secondaryLabel="Explore Products"
        secondaryTo="/products"
      /> */}

      <ProductStickyBar watchRef={heroCardRef} product={product} />
    </>
  )
}

export default ProductPage
