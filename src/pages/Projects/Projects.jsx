import { useNavigate, useParams } from 'react-router-dom'
import SEO from '../../components/common/SEO.jsx'
import PageHero from '../../components/layout/PageHero.jsx'
import Container from '../../components/common/Container.jsx'
import ProjectCard from '../../components/ui/ProjectCard.jsx'
import ProjectDrawer from '../../components/projects/ProjectDrawer.jsx'
import NotFound from '../NotFound/NotFound.jsx'
import { PROJECTS, getProjectBySlug } from '../../data/projects.js'
import { MEDIA } from '../../data/media-map.js'

/* One page for every project. `/projects/:slug` opens ProjectDrawer over the
   same grid rather than routing to a dedicated page — the pattern the product
   family pages already use. Drawer state is derived from the route param, not
   local state, so a shared or refreshed project link opens straight into the
   panel and the cards stay real links. */
function Projects() {
  const { slug } = useParams()
  const navigate = useNavigate()

  const project = slug ? getProjectBySlug(slug) : null
  if (slug && !project) return <NotFound />

  const closeDrawer = () => navigate('/projects', { replace: true })

  return (
    <>
      <SEO
        title={project ? project.name : 'Projects'}
        description={
          project
            ? project.summary
            : 'Explore infrastructure, high-rise, commercial, residential and industrial projects delivered with our scaffolding and formwork systems.'
        }
        path={project ? `/projects/${project.slug}` : '/projects'}
      />
      <PageHero
        title="Real Engineering Impact, Across India"
        description="A selection of projects where Tobler systems have supported safe, efficient and precise construction outcomes."
        breadcrumbItems={[{ label: 'Projects' }]}
        videoId={MEDIA.siteDroneVideo}
      />
      <section className="py-24 md:py-30">
        <Container>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-7">
            {PROJECTS.map((p) => (
              <ProjectCard key={p.slug} project={p} />
            ))}
          </div>
        </Container>
      </section>

      <ProjectDrawer open={Boolean(project)} project={project} onClose={closeDrawer} />
    </>
  )
}

export default Projects
