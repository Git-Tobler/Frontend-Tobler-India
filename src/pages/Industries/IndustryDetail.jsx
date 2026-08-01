import { useParams, Navigate } from 'react-router-dom'
import { CheckCircle2, AlertTriangle } from 'lucide-react'
import SEO from '../../components/common/SEO.jsx'
import PageHero from '../../components/layout/PageHero.jsx'
import Container from '../../components/common/Container.jsx'
import CTASection from '../../components/sections/CTASection.jsx'
import ProductCard from '../../components/ui/ProductCard.jsx'
import { getIndustryBySlug } from '../../constants/industries.js'
import { PRODUCT_CATEGORIES } from '../../constants/products.js'

function IndustryDetail() {
  const { slug } = useParams()
  const industry = getIndustryBySlug(slug)

  if (!industry) return <Navigate to="/industries" replace />

  const relatedProducts = PRODUCT_CATEGORIES.filter((p) =>
    industry.relatedProducts.includes(p.slug)
  )

  return (
    <>
      <SEO
        title={industry.name}
        description={industry.summary}
        path={`/industries/${industry.slug}`}
      />
      <PageHero
        eyebrow="Industry Solution"
        title={industry.name}
        description={industry.summary}
        breadcrumbItems={[{ label: 'Industries', path: '/industries' }, { label: industry.name }]}
      />

      <section className="py-24 md:py-30">
        <Container>
          <div className="grid lg:grid-cols-2 gap-14">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <AlertTriangle size={22} className="text-tobler-warning" />
                <h2 className="text-h4">Key Challenges</h2>
              </div>
              <ul className="space-y-4">
                {industry.challenges.map((challenge) => (
                  <li key={challenge} className="p-5 bg-tobler-bg-light rounded-card border border-tobler-border text-tobler-body">
                    {challenge}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <div className="flex items-center gap-3 mb-6">
                <CheckCircle2 size={22} className="text-tobler-gold" />
                <h2 className="text-h4">Tobler Solutions</h2>
              </div>
              <ul className="space-y-4">
                {industry.solutions.map((solution) => (
                  <li key={solution} className="p-5 bg-white rounded-card border border-tobler-border text-tobler-body">
                    {solution}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </section>
      {relatedProducts.length > 0 && (
        <section className="py-24 md:py-30 bg-tobler-bg-light">
          <Container>
            <h2 className="text-h3 mb-10">Related Products</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-7">
              {relatedProducts.map((product) => (
                <ProductCard key={product.slug} product={product} />
              ))}
            </div>
          </Container>
        </section>
      )}

      <CTASection
        title={`Discuss Your ${industry.name} Project`}
        description="Our engineering team can help you specify the right system for your project's exact requirements."
      />
    </>
  )
}

export default IndustryDetail
