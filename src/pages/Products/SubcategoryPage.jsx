import { useParams } from 'react-router-dom'
import SEO from '../../components/common/SEO.jsx'
import PageHero from '../../components/layout/PageHero.jsx'
import Container from '../../components/common/Container.jsx'
import CTASection from '../../components/sections/CTASection.jsx'
import ProductCard from '../../components/ui/ProductCard.jsx'
import Reveal from '../../components/ui/Reveal.jsx'
import NotFound from '../NotFound/NotFound.jsx'
import { getSubcategoryBySlug } from '../../data/products/index.js'
import { PRODUCT_ICONS, DEFAULT_ICON } from '../../data/icons.js'
import { buildBreadcrumbSchema } from '../../lib/seo.js'

function SubcategoryPage() {
  const { category: categorySlug, subcategory: subcategorySlug } = useParams()
  const found = getSubcategoryBySlug(categorySlug, subcategorySlug)

  if (!found) return <NotFound />

  const { category, subcategory } = found
  const breadcrumbItems = [
    { label: 'Products', path: '/products' },
    { label: category.name, path: `/products/${category.slug}` },
    { label: subcategory.name },
  ]

  return (
    <>
      <SEO
        title={`${subcategory.name} — ${category.name}`}
        description={subcategory.summary}
        path={`/products/${category.slug}/${subcategory.slug}`}
        structuredData={[buildBreadcrumbSchema(breadcrumbItems)]}
      />
      <PageHero
        
        title={subcategory.name}
        description={subcategory.summary}
        breadcrumbItems={breadcrumbItems}
        imageId={subcategory.imageId}
      />

      <section className="py-24 md:py-30">
        <Container>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-7">
            {subcategory.products.map((product, idx) => (
              <Reveal key={product.slug} delay={idx * 60}>
                <ProductCard
                  to={`/products/${category.slug}/${subcategory.slug}/${product.slug}`}
                  imageId={product.imageId || subcategory.imageId}
                  icon={PRODUCT_ICONS[category.slug] || DEFAULT_ICON}
                
                  title={product.name}
                  summary={product.summary}
                  className="h-full"
                />
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <CTASection
        title={`Need Help Choosing a ${subcategory.name} System?`}
        description="Our engineering team can help you specify the right product for your site conditions and project timeline."
      />
    </>
  )
}

export default SubcategoryPage
