import { Link, useParams } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import SEO from '../../components/common/SEO.jsx'
import PageHero from '../../components/layout/PageHero.jsx'
import Container from '../../components/common/Container.jsx'
import Reveal from '../../components/ui/Reveal.jsx'
import VideoPanel from '../../components/ui/VideoPanel.jsx'
import SystemCard from '../../components/products/SystemCard.jsx'
import ProductTile from '../../components/products/ProductTile.jsx'
import ProductPage from './ProductPage.jsx'
import NotFound from '../NotFound/NotFound.jsx'
import {
  getFamilyBySlug,
  findProduct,
  getRelatedProducts,
  familyPath,
  productPath,
  subcategoryPath,
} from '../../data/products/index.js'
import { PRODUCT_ICONS, DEFAULT_ICON } from '../../data/icons.js'
import { buildBreadcrumbSchema } from '../../lib/seo.js'
import { mainImage } from '../../lib/media.js'

/* One page per family, in three states driven entirely by the URL rather than
   local state, so every view is shareable and survives a refresh:

   /products/:family                  → the grid of subcategory cards
   /products/:family/:subcategory     → that subcategory's product tiles
   /products/:family/:product         → the full product page

   The last two share a route segment: a subcategory and a product slug can
   never collide, so the segment is resolved against products first and
   subcategories second. */
function ProductFamilyPage() {
  const { family: familySlug, product: segment } = useParams()

  const family = getFamilyBySlug(familySlug)
  const found = segment && family ? findProduct(familySlug, segment) : null
  const openSubcategory =
    !found && segment && family ? family.subcategories.find((s) => s.slug === segment) : null

  if (!family || (segment && !found && !openSubcategory)) return <NotFound />

  /* A subcategory holding one product has nothing to show but a grid of one
     tile, so its URL renders that product instead of the extra click. Both
     URLs then resolve to the same page; the product's own path stays canonical. */
  const soleProduct = openSubcategory?.products.length === 1 ? openSubcategory.products[0] : null

  if (found || soleProduct) {
    const subcategory = found ? found.subcategory : openSubcategory
    const product = found ? found.product : soleProduct
    return (
      <ProductPage
        family={family}
        subcategory={subcategory}
        product={product}
        relatedProducts={getRelatedProducts({ family, subcategory, product }, 3)}
      />
    )
  }

  const breadcrumbItems = [{ label: 'Products', path: '/products' }, { label: family.name }]
  const path = openSubcategory ? subcategoryPath(openSubcategory.slug) : familyPath(family.slug)

  return (
    <>
      <SEO
        title={openSubcategory ? openSubcategory.name : family.name}
        description={openSubcategory ? openSubcategory.summary : family.tagline}
        path={path}
        structuredData={[
          buildBreadcrumbSchema(
            openSubcategory ? [...breadcrumbItems, { label: openSubcategory.name }] : breadcrumbItems
          ),
        ]}
      />

      {/* Hero only on the family page — a subcategory carries its own header. */}
      {!openSubcategory && (
        <PageHero
          title={family.name}
          description={family.tagline}
          breadcrumbItems={breadcrumbItems}
          imageId={family.heroImageId}
        />
      )}

      {!openSubcategory && family.highlights?.length > 0 && (
        <section className="border-b border-tobler-border">
          <Container>
            <div className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-tobler-border">
              {family.highlights.map((stat) => (
                <div key={stat.label} className="py-6 text-center">
                  <p className="text-h5 text-tobler-heading">{stat.value}</p>
                  <p className="label-mono text-tobler-body/70 mt-1">{stat.label}</p>
                </div>
              ))}
            </div>
          </Container>
        </section>
      )}

      <section className={`py-16 md:py-24 ${!openSubcategory ? 'bg-tobler-bg-light' : ''}`}>
        <Container>
          {!openSubcategory && (
            <>
              {/* Heading left, standfirst right — the paragraph is nudged down so
                  its first line sits against the heading's last, not its first. */}
              <div
                className={`mb-14 gap-8 md:mb-20 lg:gap-16 ${family.intro ? 'grid lg:grid-cols-2' : ''}`}
              >
                <div>
                  <h2 className="text-h2 text-tobler-heading max-w-xl">
                    {family.headline || family.tagline}
                  </h2>
                </div>
                {family.intro && (
                  <p className="text-tobler-body leading-relaxed normal-case max-w-xl lg:pt-4">
                    {family.intro}
                  </p>
                )}
              </div>

              {/* A subcategory holding one product is shown as that product, so
                  the reader meets the real thing rather than a category standing
                  in for it. Only a subcategory with several products still shows
                  its own card, which opens the grid of them. */}
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {family.subcategories.map((subcategory, idx) => {
                  const sole = subcategory.products.length === 1 ? subcategory.products[0] : null
                  return (
                    <Reveal key={subcategory.slug} delay={idx * 60}>
                      <SystemCard
                        to={
                          sole
                            ? productPath(family.slug, sole.slug)
                            : subcategoryPath(subcategory.slug)
                        }
                        index={idx + 1}
                        title={sole ? sole.name : subcategory.name}
                        summary={sole ? sole.summary : subcategory.summary}
                        imageId={(sole && mainImage(sole)) || subcategory.imageId}
                        icon={PRODUCT_ICONS[subcategory.slug] || DEFAULT_ICON}
                        className="h-full"
                      />
                    </Reveal>
                  )
                })}
              </div>
            </>
          )}

          {openSubcategory && (
            <>
              <div className="mb-10">
                <Link
                  to={familyPath(family.slug)}
                  className="inline-flex items-center gap-2 label-mono text-tobler-body hover:text-tobler-heading transition-colors"
                >
                  <ArrowLeft size={15} aria-hidden="true" />
                  All {family.name}
                </Link>
                <h1 className="text-h3 text-tobler-heading mt-5">{openSubcategory.name}</h1>
                <p className="text-tobler-body leading-relaxed normal-case max-w-2xl mt-3">
                  {openSubcategory.summary}
                </p>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {openSubcategory.products.map((product, idx) => (
                  <Reveal key={product.slug} delay={idx * 60}>
                    <ProductTile
                      to={productPath(family.slug, product.slug)}
                      product={product}
                      fallbackImageId={openSubcategory.imageId}
                      icon={PRODUCT_ICONS[openSubcategory.slug] || DEFAULT_ICON}
                      className="h-full"
                    />
                  </Reveal>
                ))}
              </div>
            </>
          )}
        </Container>
      </section>

      {/* The video belongs to the family, not to any one product. */}
      {!openSubcategory && family.videoId && (
        <section className="py-16 md:py-24">
          <Container>
            <div className="flex justify-center">
              <VideoPanel
                publicId={family.videoId}
                label={family.videoLabel}
                className="mx-auto w-full max-w-[280px] rounded-card"
              />
            </div>
          </Container>
        </section>
      )}
    </>
  )
}

export default ProductFamilyPage
