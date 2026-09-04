import SEO from '../../components/common/SEO.jsx'
import Container from '../../components/common/Container.jsx'
import SectionTitle from '../../components/common/SectionTitle.jsx'
import ProductCard from '../../components/ui/ProductCard.jsx'
import IndustryCard from '../../components/ui/IndustryCard.jsx'
import Reveal from '../../components/ui/Reveal.jsx'
import ProductFamilyCard from '../../components/products/ProductFamilyCard.jsx'
import { PRODUCT_FAMILIES, PRODUCT_SUBCATEGORIES, subcategoryPath } from '../../data/products/index.js'
import { PRODUCT_ICONS, DEFAULT_ICON } from '../../data/icons.js'
import { INDUSTRIES } from '../../data/industries.js'
import { buildBreadcrumbSchema } from '../../lib/seo.js'


function ProductsPage() {
  return (
    <>
      <SEO
        title="Products"
        description="Explore Tobler's full range of scaffolding and formwork systems — facade and modular scaffolding, mobile access, monolithic and handset formwork, and heavy-duty shoring — engineered in Switzerland, built for India."
        path="/products"
        structuredData={[buildBreadcrumbSchema([{ label: 'Products' }])]}
      />
      <section className="py-16 md:py-24">
        <Container>
          <div className="grid md:grid-cols-2 gap-6">
            {PRODUCT_FAMILIES.map((family, idx) => (
              <Reveal key={family.slug} delay={idx * 80}>
                <ProductFamilyCard family={family} />
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-16 md:py-24 bg-tobler-bg-light">
        <Container>
          <SectionTitle
            align="center"
            title="All Systems, Fully Specified"
            description="Jump straight to a product line — each links to its full grid of models, specifications and downloads."
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-14">
            {PRODUCT_SUBCATEGORIES.map((subcategory, idx) => (
              <Reveal key={subcategory.slug} delay={idx * 40}>
                <ProductCard
                  to={subcategoryPath(subcategory.slug)}
                  imageId={subcategory.imageId}
                  icon={PRODUCT_ICONS[subcategory.slug] || DEFAULT_ICON}
                  eyebrow={subcategory.familyName}
                  title={subcategory.name}
                  summary={subcategory.summary}
                  className="h-full"
                />
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section id="industries" className="py-24 md:py-30 scroll-mt-28">
        <Container>
          <SectionTitle
            align="center"
            title="Industries We Serve"
            description="Every sector has unique structural, safety and timeline demands. Our systems are engineered specifically for the challenges each industry presents."
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-7 mt-14">
            {INDUSTRIES.map((industry, idx) => (
              <Reveal key={industry.slug} delay={idx * 40}>
                <IndustryCard industry={industry} />
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      
    </>
  )
}

export default ProductsPage
