import SEO from '../../components/common/SEO.jsx'
import PageHero from '../../components/layout/PageHero.jsx'
import Container from '../../components/common/Container.jsx'
import CTASection from '../../components/sections/CTASection.jsx'
import IndustryCard from '../../components/ui/IndustryCard.jsx'
import { INDUSTRIES } from '../../constants/industries.js'

function Industries() {
  return (
    <>
      <SEO
        title="Industries"
        description="Scaffolding and formwork solutions engineered for infrastructure, commercial, residential, industrial and high-rise construction."
        path="/industries"
      />
      <PageHero
        eyebrow="Industries We Serve"
        title="Purpose-Built Solutions for Every Construction Sector"
        description="Every sector has unique structural, safety and timeline demands. Our systems are engineered specifically for the challenges each industry presents."
        breadcrumbItems={[{ label: 'Industries' }]}
      />
      <section className="py-24 md:py-30">
        <Container>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-7">
            {INDUSTRIES.map((industry) => (
              <IndustryCard key={industry.slug} industry={industry} />
            ))}
          </div>
        </Container>
      </section>
      <CTASection />
    </>
  )
}

export default Industries
