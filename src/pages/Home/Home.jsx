import SEO from '../../components/common/SEO.jsx'
import HeroSection from '../../components/sections/HeroSection.jsx'
import StatsSection from '../../components/sections/StatsSection.jsx'
import IntroSection from '../../components/sections/IntroSection.jsx'
import CertificationsSection from '../../components/sections/CertificationsSection.jsx'
import CTASection from '../../components/sections/CTASection.jsx'
import Container from '../../components/common/Container.jsx'
import SectionTitle from '../../components/common/SectionTitle.jsx'
import Button from '../../components/common/Button.jsx'
import ProductCard from '../../components/ui/ProductCard.jsx'
import IndustryCard from '../../components/ui/IndustryCard.jsx'
import ProjectCard from '../../components/ui/ProjectCard.jsx'
import { PRODUCT_CATEGORIES } from '../../constants/products.js'
import { INDUSTRIES } from '../../constants/industries.js'
import { PROJECTS } from '../../constants/projects.js'

function Home() {
  return (
    <>
      <SEO
        title="Swiss Engineered Scaffolding & Formwork Solutions"
        description="We deliver Swiss-engineered scaffolding and formwork solutions for infrastructure, commercial, residential and industrial construction."
        path="/"
      />
      <HeroSection />
      <StatsSection />
      <IntroSection />

      <section className="py-24 md:py-30 bg-tobler-bg-light">
        <Container>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
            <SectionTitle
              eyebrow="Product Range"
              title="Systems Engineered for Every Stage of Construction"
              description="From facade access to high-rise climbing formwork, every Tobler system is built for reliability under real site conditions."
            />
            <Button to="/products" variant="secondary" className="shrink-0">
              View All Products
            </Button>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-7">
            {PRODUCT_CATEGORIES.slice(0, 3).map((product) => (
              <ProductCard key={product.slug} product={product} />
            ))}
          </div>
        </Container>
      </section>

      <section className="py-24 md:py-30">
        <Container>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
            <SectionTitle
              eyebrow="Industries We Serve"
              title="Purpose-Built Solutions Across Every Sector"
              description="Tailored formwork and scaffolding solutions engineered for the specific demands of each construction sector."
            />
            <Button to="/industries" variant="secondary" className="shrink-0">
              View All Industries
            </Button>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-7">
            {INDUSTRIES.slice(0, 3).map((industry) => (
              <IndustryCard key={industry.slug} industry={industry} />
            ))}
          </div>
        </Container>
      </section>

      <section className="py-24 md:py-30 bg-tobler-bg-light">
        <Container>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
            <SectionTitle
              eyebrow="Featured Projects"
              title="Real Projects. Real Engineering Impact."
              description="A selection of infrastructure, high-rise and industrial projects delivered with Tobler formwork and scaffolding systems."
            />
            <Button to="/projects" variant="secondary" className="shrink-0">
              View All Projects
            </Button>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-7">
            {PROJECTS.slice(0, 3).map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>
        </Container>
      </section>

      <CertificationsSection />
      <CTASection />
    </>
  )
}

export default Home
