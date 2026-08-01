import SEO from '../../components/common/SEO.jsx'
import PageHero from '../../components/layout/PageHero.jsx'
import Container from '../../components/common/Container.jsx'
import CTASection from '../../components/sections/CTASection.jsx'
import ProductCard from '../../components/ui/ProductCard.jsx'
import { PRODUCT_CATEGORIES } from '../../constants/products.js'

function Products() {
  return (
    <>
      <SEO
        title="Products"
        description="Explore our full range of scaffolding and formwork systems, including facade scaffolding, shoring, slab and wall formwork, climbing systems, and staircase access."
        path="/products"
      />
      <PageHero
        eyebrow="Product Range"
        title="Engineered Systems for Modern Construction"
        description="From access solutions to advanced formwork systems, every Tobler product is developed with a focus on safety, efficiency, and reliable performance. Built on Swiss engineering principles, our systems are designed to meet the evolving demands of modern construction across India."
        breadcrumbItems={[{ label: 'Products' }]}
      />
      <section className="py-16 md:py-24">
        <Container>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {PRODUCT_CATEGORIES.map((product) => (
              <ProductCard key={product.slug} product={product} />
            ))}
          </div>
        </Container>
      </section>
      <CTASection
        title="Need Help Choosing the Right System?"
        description="Our engineering team can help you specify the right product for your site conditions and project timeline."
      />
    </>
  )
}

export default Products
