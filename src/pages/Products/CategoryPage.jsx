import { useParams } from 'react-router-dom'
import { FileText } from 'lucide-react'
import SEO from '../../components/common/SEO.jsx'
import PageHero from '../../components/layout/PageHero.jsx'
import Container from '../../components/common/Container.jsx'
import CTASection from '../../components/sections/CTASection.jsx'
import ProductCard from '../../components/ui/ProductCard.jsx'
import ResponsiveImage from '../../components/ui/ResponsiveImage.jsx'
import SpecTable from '../../components/ui/SpecTable.jsx'
import DownloadCard from '../../components/ui/DownloadCard.jsx'
import Reveal from '../../components/ui/Reveal.jsx'
import NotFound from '../NotFound/NotFound.jsx'
import { getCategoryBySlug } from '../../data/products/index.js'
import { PRODUCT_ICONS, DEFAULT_ICON } from '../../data/icons.js'
import { buildBreadcrumbSchema } from '../../lib/seo.js'

function CategoryPage() {
  const { category: categorySlug } = useParams()
  const category = getCategoryBySlug(categorySlug)

  if (!category) return <NotFound />

  const breadcrumbItems = [{ label: 'Products', path: '/products' }, { label: category.name }]

  return (
    <>
      <SEO
        title={category.name}
        description={category.summary}
        path={`/products/${category.slug}`}
        structuredData={[
          buildBreadcrumbSchema([{ label: 'Products', path: '/products' }, ...breadcrumbItems.slice(1)]),
        ]}
      />
      <PageHero
        eyebrow="Product Line"
        title={category.name}
        description={category.summary}
        breadcrumbItems={breadcrumbItems}
        imageId={category.imageId}
      />

      <section className="py-24 md:py-30">
        <Container>
          <div className="grid lg:grid-cols-[1fr_1.1fr] gap-14 items-start mb-20">
            <ResponsiveImage
              publicId={category.imageId}
              alt={category.name}
              icon={PRODUCT_ICONS[category.slug] || DEFAULT_ICON}
              label="Product Line"
              iconSize={72}
              className="aspect-[4/5] rounded-card sticky top-28"
            />
            <div>
              <h2 className="text-h4 mb-6">At a Glance</h2>
              <SpecTable specifications={category.specifications} />

              {category.downloads?.length > 0 && (
                <>
                  <h2 className="text-h4 mb-6 mt-10 flex items-center gap-2">
                    <FileText size={20} aria-hidden="true" className="text-tobler-gold" />
                    Downloads
                  </h2>
                  <div className="space-y-4">
                    {category.downloads.map((doc) => (
                      <DownloadCard key={doc} title={doc} />
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>

          <div id="subcategories">
            <h2 className="text-h3 mb-10">{category.name} Subcategories</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-7">
              {category.subcategories.map((subcategory, idx) => (
                <Reveal key={subcategory.slug} delay={idx * 60}>
                  <ProductCard
                    to={`/products/${category.slug}/${subcategory.slug}`}
                    icon={PRODUCT_ICONS[category.slug] || DEFAULT_ICON}
                    eyebrow={`${subcategory.products.length} Product${subcategory.products.length === 1 ? '' : 's'}`}
                    title={subcategory.name}
                    summary={subcategory.summary}
                    className="h-full"
                  />
                </Reveal>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <CTASection
        title={`Need Help Specifying ${category.name}?`}
        description="Our engineering team can help you choose the right subcategory and product for your site conditions."
      />
    </>
  )
}

export default CategoryPage
