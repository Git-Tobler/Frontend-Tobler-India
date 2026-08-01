import { useParams, Navigate, Link } from 'react-router-dom'
import { MapPin, Calendar, Layers } from 'lucide-react'
import SEO from '../../components/common/SEO.jsx'
import PageHero from '../../components/layout/PageHero.jsx'
import Container from '../../components/common/Container.jsx'
import CTASection from '../../components/sections/CTASection.jsx'
import Badge from '../../components/common/Badge.jsx'
import MediaTile from '../../components/ui/MediaTile.jsx'
import { getProjectBySlug, PROJECTS } from '../../constants/projects.js'
import { INDUSTRY_ICONS, DEFAULT_ICON } from '../../constants/icons.js'

function ProjectDetail() {
  const { slug } = useParams()
  const project = getProjectBySlug(slug)

  if (!project) return <Navigate to="/projects" replace />

  const otherProjects = PROJECTS.filter((p) => p.slug !== project.slug).slice(0, 3)

  return (
    <>
      <SEO
        title={project.name}
        description={project.summary}
        path={`/projects/${project.slug}`}
      />
      <PageHero
        eyebrow="Project Showcase"
        title={project.name}
        description={project.summary}
        breadcrumbItems={[{ label: 'Projects', path: '/projects' }, { label: project.name }]}
      />

      <section className="py-24 md:py-30">
        <Container>
          <div className="grid lg:grid-cols-[1.2fr_0.8fr] gap-14">
            <MediaTile
              icon={INDUSTRY_ICONS[project.industry] || DEFAULT_ICON}
              iconSize={72}
              label={`Completed ${project.year}`}
              className="aspect-video rounded-card"
            />

            <div className="space-y-6">
              <div className="flex flex-wrap gap-2">
                <Badge variant="blue">{project.industry}</Badge>
              </div>
              <div className="flex items-center gap-3 text-tobler-body">
                <MapPin size={18} className="text-tobler-gold shrink-0" />
                {project.location}
              </div>
              <div className="flex items-center gap-3 text-tobler-body">
                <Calendar size={18} className="text-tobler-gold shrink-0" />
                Completed {project.year}
              </div>
              <div>
                <h3 className="font-semibold text-tobler-heading mb-3 flex items-center gap-2">
                  <Layers size={18} className="text-tobler-gold" />
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
                <MediaTile icon={INDUSTRY_ICONS[p.industry] || DEFAULT_ICON} iconSize={32} className="h-40" />
                <div className="p-6">
                  <h3 className="font-bold text-tobler-heading group-hover:text-tobler-gold transition-colors">
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
