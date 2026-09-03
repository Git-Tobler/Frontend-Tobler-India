import SEO from '../../components/common/SEO.jsx'
import HeroSection from '../../components/sections/HeroSection.jsx'
import LogoScroller from '../../components/sections/LogoScroller.jsx'
import IntroSection from '../../components/sections/IntroSection.jsx'
import EngineeringManufacturingSection from '../../components/sections/EngineeringManufacturingSection.jsx'
import VideoShowcaseSection from '../../components/sections/VideoShowcaseSection.jsx'
import SiteMosaicSection from '../../components/sections/SiteMosaicSection.jsx'
import CTASection from '../../components/sections/CTASection.jsx'
import Container from '../../components/common/Container.jsx'
import SectionTitle from '../../components/common/SectionTitle.jsx'
import Button from '../../components/common/Button.jsx'
import ProductCard from '../../components/ui/ProductCard.jsx'
import IndustryCard from '../../components/ui/IndustryCard.jsx'
import ProjectCard from '../../components/ui/ProjectCard.jsx'
import { PRODUCT_SUBCATEGORIES, subcategoryPath } from '../../data/products/index.js'
import { INDUSTRIES } from '../../data/industries.js'
import { PROJECTS } from '../../data/projects.js'
import { PRODUCT_ICONS, DEFAULT_ICON } from '../../data/icons.js'
import { buildOrganizationSchema } from '../../lib/seo.js'

/* The homepage runs the light "Shopify" language: white and warm-grey bands
   alternating, rounded cards, green CTAs. The `shopify.*` colour scale and the
   `soft` prop on the shared cards/sections exist so this route can carry it
   without dragging the inner pages off the Swiss navy/gold system. */
function Home() {
  return (
    <>
      <SEO
        title="Swiss Engineered Scaffolding & Formwork Solutions"
        description="We deliver Swiss-engineered scaffolding and formwork solutions for infrastructure, commercial, residential and industrial construction."
        path="/"
        structuredData={[buildOrganizationSchema()]}
      />
      <HeroSection />
      <LogoScroller />
      <IntroSection />

      <section className="bg-white py-24 md:py-30">
        <Container>
          <div className="mb-14 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <SectionTitle
              size="display"
              title="Systems Engineered for All Stages of Construction"
              description="From facade access to high-rise climbing formwork, all Tobler systems are built for reliability under real site conditions."
            />
            <Button
              to="/products"
              variant="shopify-outline"
              shape="pill"
              size="lg"
              icon={false}
              className="shrink-0"
            >
              View all products
            </Button>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {PRODUCT_SUBCATEGORIES.slice(0, 3).map((subcategory) => (
              <ProductCard
                key={subcategory.slug}
                soft
                to={subcategoryPath(subcategory.slug)}
                imageId={subcategory.imageId}
                icon={PRODUCT_ICONS[subcategory.slug] || DEFAULT_ICON}
                eyebrow={subcategory.familyName}
                title={subcategory.name}
                summary={subcategory.summary}
              />
            ))}
          </div>
        </Container>
      </section>

      {/* Factory media band between the two card grids — without it the page
          runs three structurally identical tile sections back to back. */}
      <EngineeringManufacturingSection />

      {/* Shopify-style video showcase — three manufacturing process videos
          showing welding, drilling, and packaging capabilities. */}
      <VideoShowcaseSection />

      <section className="bg-white py-24 md:py-30">
        <Container>
          <div className="mb-14 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <SectionTitle
              size="display"
              title="Purpose to Built Solutions Across All Sectors"
              description="Tailored formwork and scaffolding solutions engineered for the specific demands of each construction sector."
            />
            
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {INDUSTRIES.slice(0, 3).map((industry) => (
              <IndustryCard key={industry.slug} industry={industry} soft />
            ))}
          </div>
        </Container>
      </section>

      {/* Dark photo mosaic between the industries and projects grids — the only
          break in the light card rhythm on the lower half of the page. */}
      <SiteMosaicSection />

      <section className="bg-white py-24 md:py-30">
        <Container>
          <div className="mb-14 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <SectionTitle
              size="display"
              title="Real Projects. Real Engineering Impact."
            />
            <Button
              to="/projects"
              variant="shopify-outline"
              shape="pill"
              size="lg"
              icon={false}
              className="shrink-0"
            >
              View all projects
            </Button>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {PROJECTS.slice(0, 3).map((project) => (
              <ProjectCard key={project.slug} project={project} soft />
            ))}
          </div>
        </Container>
      </section>

      <CTASection soft />
    </>
  )
}

export default Home
