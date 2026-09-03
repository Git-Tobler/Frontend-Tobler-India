import { useParams, Link } from 'react-router-dom'
import { FileText } from 'lucide-react'
import SEO from '../../components/common/SEO.jsx'
import PageHero from '../../components/layout/PageHero.jsx'
import Container from '../../components/common/Container.jsx'
import CTASection from '../../components/sections/CTASection.jsx'
import DownloadCard from '../../components/ui/DownloadCard.jsx'
import ResponsiveImage from '../../components/ui/ResponsiveImage.jsx'
import SpecTable from '../../components/ui/SpecTable.jsx'
import ReadMore from '../../components/ui/ReadMore.jsx'
import Badge from '../../components/common/Badge.jsx'
import Button from '../../components/common/Button.jsx'
import NotFound from '../NotFound/NotFound.jsx'
import { getProductBySlug } from '../../data/products/index.js'
import { PRODUCT_ICONS, DEFAULT_ICON } from '../../data/icons.js'
import { buildBreadcrumbSchema, buildProductSchema } from '../../lib/seo.js'

function ProductPage() {
  const { category: categorySlug, subcategory: subcategorySlug, product: productSlug } = useParams()
  const found = getProductBySlug(categorySlug, subcategorySlug, productSlug)

  if (!found) return <NotFound />

  const { category, subcategory, product } = found
  const path = `/products/${category.slug}/${subcategory.slug}/${product.slug}`
  const breadcrumbItems = [
    { label: 'Products', path: '/products' },
    { label: category.name, path: `/products/${category.slug}` },
    { label: subcategory.name, path: `/products/${category.slug}/${subcategory.slug}` },
    { label: product.name },
  ]

  const otherProducts = subcategory.products.filter((p) => p.slug !== product.slug).slice(0, 3)

  return (
    <>
      <SEO
        title={product.name}
        description={product.summary}
        path={path}
        structuredData={[
          buildBreadcrumbSchema(breadcrumbItems),
          buildProductSchema({ product, subcategory, category, path }),
        ]}
      />
      <PageHero
        eyebrow={product.model ? `${subcategory.name} — ${product.model}` : subcategory.name}
        title={product.name}
        description={product.summary}
        breadcrumbItems={breadcrumbItems}
        imageId={product.imageId || subcategory.imageId}
      />

      <section className="py-24 md:py-30">
        <Container>
          <div className="grid lg:grid-cols-[1fr_1.1fr] gap-14 items-start">
            <ResponsiveImage
              publicId={product.imageId || subcategory.imageId}
              alt={product.name}
              icon={PRODUCT_ICONS[category.slug] || DEFAULT_ICON}
              label="Product Line"
              iconSize={72}
              className="aspect-[4/5] rounded-card sticky top-28"
            />

            <div>
              {product.description && (
                <div className="mb-10">
                  <h2 className="text-h4 mb-4">Overview</h2>
                  <ReadMore previewLines={3}>{product.description}</ReadMore>
                </div>
              )}

              <h2 className="text-h4 mb-6">Technical Specifications</h2>
              <SpecTable specifications={product.specifications} />

              {product.downloads?.length > 0 && (
                <>
                  <h2 className="text-h4 mb-6 mt-10 flex items-center gap-2">
                    <FileText size={20} aria-hidden="true" className="text-tobler-gold" />
                    Downloads
                  </h2>
                  <div className="space-y-4 mb-10">
                    {product.downloads.map((doc) => (
                      <DownloadCard key={doc} title={doc} />
                    ))}
                  </div>
                </>
              )}

              <Button to="/contact#rfq" size="lg">
                Request a Quote for {product.name}
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {otherProducts.length > 0 && (
        <section className="py-24 md:py-30 bg-tobler-bg-light">
          <Container>
            <div className="flex items-center justify-between mb-10">
              <h2 className="text-h3">More in {subcategory.name}</h2>
              <Badge variant="outline">{category.name}</Badge>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-7">
              {otherProducts.map((p) => (
                <Link
                  key={p.slug}
                  to={`/products/${category.slug}/${subcategory.slug}/${p.slug}`}
                  className="group flex flex-col h-full bg-white border border-tobler-border rounded-card overflow-hidden transition-all duration-300 hover:shadow-elevated hover:-translate-y-1"
                >
                  <ResponsiveImage
                    publicId={p.imageId || subcategory.imageId}
                    alt={p.name}
                    icon={PRODUCT_ICONS[category.slug] || DEFAULT_ICON}
                    iconSize={32}
                    className="h-40"
                  />
                  <div className="p-6">
                    <h3 className="font-bold text-tobler-heading group-hover:text-tobler-gold transition-colors">
                      {p.name}
                    </h3>
                  </div>
                </Link>
              ))}
            </div>
          </Container>
        </section>
      )}

      <CTASection />
    </>
  )
}

export default ProductPage
