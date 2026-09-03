import { useParams, Link } from 'react-router-dom'
import { MapPin, Calendar, Layers } from 'lucide-react'
import SEO from '../../components/common/SEO.jsx'
import PageHero from '../../components/layout/PageHero.jsx'
import Container from '../../components/common/Container.jsx'
import CTASection from '../../components/sections/CTASection.jsx'
import Badge from '../../components/common/Badge.jsx'
import ResponsiveImage from '../../components/ui/ResponsiveImage.jsx'
import NotFound from '../NotFound/NotFound.jsx'
import ReadMore from '../../components/ui/ReadMore.jsx'
import { getProjectBySlug, PROJECTS, projectStatusLabel } from '../../data/projects.js'
import { INDUSTRY_ICONS, DEFAULT_ICON } from '../../data/icons.js'

function ProjectDetail() {
  const { slug } = useParams()
  const project = getProjectBySlug(slug)

  if (!project) return <NotFound />

  const otherProjects = PROJECTS.filter((p) => p.slug !== project.slug).slice(0, 3)

  return (
    <>
      <SEO
        title={project.name}
        description={project.summary}
        path={`/projects/${project.slug}`}
      />
      <PageHero
        imageId={project.imageId}
        title={project.name}
        description={project.summary}
        breadcrumbItems={[{ label: 'Projects', path: '/projects' }, { label: project.name }]}
      />

      <section className="py-24 md:py-30">
        <Container>
          <div className="grid lg:grid-cols-[1.2fr_0.8fr] gap-14">
            <ResponsiveImage
              publicId={project.imageId}
              alt={project.name}
              icon={INDUSTRY_ICONS[project.industry] || DEFAULT_ICON}
              iconSize={72}
              label={projectStatusLabel(project)}
              className="aspect-video rounded-card"
            />

            <div className="space-y-6">
              <div className="flex flex-wrap gap-2">
                <Badge variant="blue">{project.industry}</Badge>
              </div>
              <div className="flex items-center gap-3 text-tobler-body">
                <MapPin size={18} className="text-tobler-blue shrink-0" />
                {project.location}
              </div>
              <div className="flex items-center gap-3 text-tobler-body">
                <Calendar size={18} className="text-tobler-blue shrink-0" />
                {projectStatusLabel(project)}
              </div>
              <div>
                <h3 className="font-semibold text-tobler-heading mb-3 flex items-center gap-2">
                  <Layers size={18} className="text-tobler-blue" />
                  Products Used
                </h3>
                <ul className="space-y-2">
                  {project.products.map((p) => (
                    <li key={p} className="px-4 py-2.5 bg-tobler-bg-light rounded-lg text-sm text-tobler-body border border-tobler-border">
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Optional long-form copy — clamped to four lines behind Read More
              so the page keeps its shape whether or not a project has one. */}
          {project.description && (
            <div className="mt-16 pt-16 border-t border-tobler-border max-w-3xl">
              <h2 className="text-h4 mb-5">About This Project</h2>
              <ReadMore previewLines={4}>{project.description}</ReadMore>
            </div>
          )}
        </Container>
      </section>

      <section className="py-24 md:py-30 bg-tobler-bg-light">
        <Container>
          <h2 className="text-h3 mb-10">More Projects</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-7">
            {otherProjects.map((p) => (
              <Link
                key={p.slug}
                to={`/projects/${p.slug}`}
                className="group flex flex-col h-full bg-white border border-tobler-border rounded-card overflow-hidden transition-all duration-300 hover:shadow-elevated hover:-translate-y-1"
              >
                <ResponsiveImage
                  publicId={p.imageId}
                  alt={p.name}
                  icon={INDUSTRY_ICONS[p.industry] || DEFAULT_ICON}
                  iconSize={32}
                  className="h-40"
                />
                <div className="p-6">
                  <h3 className="font-bold text-tobler-heading group-hover:text-tobler-blue transition-colors">
                    {p.name}
                  </h3>
                  <p className="text-xs text-tobler-body/70 mt-1">{p.location}</p>
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      <CTASection />
    </>
  )
}

export default ProjectDetail
