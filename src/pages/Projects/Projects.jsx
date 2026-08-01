import SEO from '../../components/common/SEO.jsx'
import PageHero from '../../components/layout/PageHero.jsx'
import Container from '../../components/common/Container.jsx'
import CTASection from '../../components/sections/CTASection.jsx'
import ProjectCard from '../../components/ui/ProjectCard.jsx'
import { PROJECTS } from '../../constants/projects.js'

function Projects() {
  return (
    <>
      <SEO
        title="Projects"
        description="Explore infrastructure, high-rise, commercial, residential and industrial projects delivered with our scaffolding and formwork systems."
        path="/projects"
      />
      <PageHero
        eyebrow="Our Projects"
        title="Real Engineering Impact, Across India"
        description="A selection of projects where Tobler systems have supported safe, efficient and precise construction outcomes."
        breadcrumbItems={[{ label: 'Projects' }]}
      />
      <section className="py-24 md:py-30">
        <Container>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-7">
            {PROJECTS.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>
        </Container>
      </section>
      <CTASection
        title="Have a Project in Mind?"
        description="Talk to our engineering team about how Tobler systems can support your next build."
      />
    </>
  )
}

export default Projects
