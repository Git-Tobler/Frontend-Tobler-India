import { useParams, Navigate, Link } from 'react-router-dom'
import { FileText } from 'lucide-react'
import SEO from '../../components/common/SEO.jsx'
import PageHero from '../../components/layout/PageHero.jsx'
import Container from '../../components/common/Container.jsx'
import CTASection from '../../components/sections/CTASection.jsx'
import DownloadCard from '../../components/ui/DownloadCard.jsx'
import MediaTile from '../../components/ui/MediaTile.jsx'
import Button from '../../components/common/Button.jsx'
import { getProductBySlug, PRODUCT_CATEGORIES } from '../../constants/products.js'
import { PRODUCT_ICONS, DEFAULT_ICON } from '../../constants/icons.js'

function ProductDetail() {
  const { slug } = useParams()
  const product = getProductBySlug(slug)

  if (!product) return <Navigate to="/products" replace />

  const otherProducts = PRODUCT_CATEGORIES.filter((p) => p.slug !== product.slug).slice(0, 3)

  return (
    <>
      <SEO
        title={product.name}
        description={product.summary}
        path={`/products/${product.slug}`}
      />
      <PageHero
        eyebrow="Product Line"
        title={product.name}
        description={product.summary}
        breadcrumbItems={[{ label: 'Products', path: '/products' }, { label: product.name }]}
      />

      <section className="py-24 md:py-30">
        <Container>
          <div className="grid lg:grid-cols-[1fr_1.1fr] gap-14 items-start">
            <MediaTile
              icon={PRODUCT_ICONS[product.slug] || DEFAULT_ICON}
              iconSize={72}
              label="Product Line"
              className="aspect-[4/5] rounded-card sticky top-28"
            />

            <div>
              <h2 className="text-h4 mb-6">Technical Specifications</h2>
              <div className="border border-tobler-border rounded-card overflow-hidden mb-10">
                {product.specifications.map((spec, idx) => (
                  <div
                    key={spec.label}
                    className={`flex items-center justify-between px-6 py-4 text-sm ${
                      idx % 2 === 0 ? 'bg-white' : 'bg-tobler-bg-light'
                    }`}
                  >
                    <span className="font-semibold text-tobler-heading">{spec.label}</span>
                    <span className="text-tobler-body">{spec.value}</span>
                  </div>
                ))}
              </div>

              <h2 className="text-h4 mb-6 flex items-center gap-2">
                <FileText size={20} className="text-tobler-gold" />
                Downloads
              </h2>
              <div className="space-y-4 mb-10">
                {product.downloads.map((doc) => (
                  <DownloadCard key={doc} title={doc} />
                ))}
              </div>

              <Button to="/contact#rfq" size="lg">
                Request a Quote for {product.name}
              </Button>
            </div>
          </div>
        </Container>
      </section>

      <section className="py-24 md:py-30 bg-tobler-bg-light">
        <Container>
          <h2 className="text-h3 mb-10">Related Products</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-7">
            {otherProducts.map((p) => (
              <Link
                key={p.slug}
                to={`/products/${p.slug}`}
                className="group flex flex-col h-full bg-white border border-tobler-border rounded-card overflow-hidden transition-all duration-300 hover:shadow-elevated hover:-translate-y-1"
              >
                <MediaTile icon={PRODUCT_ICONS[p.slug] || DEFAULT_ICON} iconSize={32} className="h-40" />
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

      <CTASection />
    </>
  )
}

export default ProductDetail
