import { Link, useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import SEO from '../../components/common/SEO.jsx'
import PageHero from '../../components/layout/PageHero.jsx'
import Container from '../../components/common/Container.jsx'
import Reveal from '../../components/ui/Reveal.jsx'
import VideoPanel from '../../components/ui/VideoPanel.jsx'
import SystemCard from '../../components/products/SystemCard.jsx'
import ProductTile from '../../components/products/ProductTile.jsx'
import ProductDrawer from '../../components/products/ProductDrawer.jsx'
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
import { buildBreadcrumbSchema, buildProductSchema } from '../../lib/seo.js'

/* One page per family, in two states driven entirely by the URL rather than
   local state, so every view is shareable and survives a refresh:

   /products/:family                  → the numbered grid of subcategory cards
   /products/:family/:subcategory     → that subcategory's product tiles
   /products/:family/:product         → the same tiles with ProductDrawer open

   The last two share a route segment: a subcategory and a product slug can
   never collide, so the segment is resolved against products first and
   subcategories second. */
function ProductFamilyPage() {
  const { family: familySlug, product: segment } = useParams()
  const navigate = useNavigate()

  const family = getFamilyBySlug(familySlug)
  const found = segment && family ? findProduct(familySlug, segment) : null
  const openSubcategory = found
    ? found.subcategory
    : segment && family
      ? family.subcategories.find((s) => s.slug === segment)
      : null

  if (!family || (segment && !found && !openSubcategory)) return <NotFound />

  // Auto-open drawer for subcategories instead of showing product grid
  const shouldAutoOpenDrawer = openSubcategory && !found
  const autoOpenProduct = shouldAutoOpenDrawer ? openSubcategory.products[0] : found?.product

  const relatedProducts = autoOpenProduct ? getRelatedProducts({ family, product: autoOpenProduct, subcategory: openSubcategory || found?.subcategory }, 3) : (found ? getRelatedProducts({ family, ...found }, 3) : [])

  // Close drawer and return to appropriate page
  const closeDrawer = () => {
    if (shouldAutoOpenDrawer) {
      // If drawer was auto-opened from subcategory, return to family
      navigate(familyPath(family.slug), { replace: true })
    } else if (openSubcategory) {
      // If viewing a specific product, return to subcategory
      navigate(subcategoryPath(openSubcategory.slug), { replace: true })
    } else {
      // Default: return to family
      navigate(familyPath(family.slug), { replace: true })
    }
  }

  const breadcrumbItems = [{ label: 'Products', path: '/products' }, { label: family.name }]
  const path = found
    ? productPath(family.slug, found.product.slug)
    : openSubcategory
      ? subcategoryPath(openSubcategory.slug)
      : familyPath(family.slug)

  return (
    <>
      <SEO
        title={found ? found.product.name : openSubcategory ? openSubcategory.name : family.name}
        description={found ? found.product.summary : openSubcategory ? openSubcategory.summary : family.summary}
        path={path}
        structuredData={
          found
            ? [
                buildBreadcrumbSchema([...breadcrumbItems, { label: found.product.name }]),
                buildProductSchema({
                  product: found.product,
                  subcategory: found.subcategory,
                  category: family,
                  path,
                }),
              ]
            : [buildBreadcrumbSchema(openSubcategory ? [...breadcrumbItems, { label: openSubcategory.name }] : breadcrumbItems)]
        }
      />

      {/* Hero only shows on family page, not on subcategory pages */}
      {!openSubcategory && (
        <PageHero
          title={family.name}
          description={family.summary}
          breadcrumbItems={breadcrumbItems}
          imageId={family.heroImageId}
        />
      )}

      {/* Minimal header when drawer is auto-opened from subcategory */}
      {shouldAutoOpenDrawer && (
        <div className="border-b border-tobler-border py-6">
          <Container>
            <div className="flex items-center gap-4 text-sm">
              <Link
                to={familyPath(family.slug)}
                className="text-tobler-body hover:text-tobler-heading transition-colors"
              >
                {family.name}
              </Link>
              <span className="text-tobler-body/50">/</span>
              <span className="text-tobler-heading font-medium">{openSubcategory.name}</span>
            </div>
          </Container>
        </div>
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
              <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 mb-14 md:mb-20">
                <div>
                  <p className="label-mono text-tobler-gold-deep mb-4">{family.name}</p>
                  <h2 className="text-h2 text-tobler-heading max-w-xl">{family.headline || family.tagline}</h2>
                </div>
                <p className="text-tobler-body leading-relaxed normal-case max-w-xl lg:pt-4">
                  {family.intro || family.summary}
                </p>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {family.subcategories.map((subcategory, idx) => (
                  <Reveal key={subcategory.slug} delay={idx * 60}>
                    <SystemCard
                      to={subcategoryPath(subcategory.slug)}
                      index={idx + 1}
                      title={subcategory.name}
                      summary={subcategory.summary}
                      imageId={subcategory.imageId}
                      icon={PRODUCT_ICONS[subcategory.slug] || DEFAULT_ICON}
                      className="h-full"
                    />
                  </Reveal>
                ))}
              </div>
            </>
          )}

          {openSubcategory && !shouldAutoOpenDrawer && (
            <>
              <div className="mb-10">
                <Link
                  to={familyPath(family.slug)}
                  className="inline-flex items-center gap-2 label-mono text-tobler-body hover:text-tobler-heading transition-colors"
                >
                  <ArrowLeft size={15} aria-hidden="true" />
                  All {family.name}
                </Link>
                <h3 className="text-h4 text-tobler-heading mt-5">{openSubcategory.name}</h3>
                <p className="text-tobler-body leading-relaxed normal-case max-w-2xl mt-3">{openSubcategory.summary}</p>
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

      {/* Kept from the previous layout — the video belonged to the family, not
          to the product sections the grid replaced. Only show on family page. */}
      {!openSubcategory && family.videoId && (
        <section className="py-16 md:py-24">
          <Container>
            <div className="grid lg:grid-cols-[1fr_auto] gap-10 items-center">

              <h2 className="text-h3 max-w-xl">{family.tagline}</h2>
              <VideoPanel
                publicId={family.videoId}
                label={family.videoLabel}
                className="mx-auto w-full max-w-[280px] rounded-card"
              />
            </div>
          </Container>
        </section>
      )}

      

      <ProductDrawer
        open={Boolean(found) || shouldAutoOpenDrawer}
        family={family}
        subcategory={openSubcategory || found?.subcategory}
        product={autoOpenProduct || found?.product}
        relatedProducts={relatedProducts}
        onClose={closeDrawer}
      />
    </>
  )
}

export default ProductFamilyPage
