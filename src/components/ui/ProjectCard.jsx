import { Link } from 'react-router-dom'
import { MapPin, ArrowRight } from 'lucide-react'
import Badge from '../common/Badge.jsx'
import ResponsiveImage from './ResponsiveImage.jsx'
import { INDUSTRY_ICONS, DEFAULT_ICON } from '../../data/icons.js'
import { projectStatusLabel } from '../../data/projects.js'

/* `soft` switches to the homepage's rounded/green language; the Projects index
   keeps the default sharp-cornered treatment. */
function ProjectCard({ project, soft = false }) {
  const shell = soft
    ? 'border-shopify-border rounded-card-lg hover:shadow-raised hover:border-shopify-green-line'
    : 'border-tobler-border rounded-card hover:shadow-elevated hover:border-tobler-heading/30'

  return (
    <Link
      to={`/projects/${project.slug}`}
      className={`group relative flex flex-col h-full bg-white border overflow-hidden transition-all duration-300 ease-premium hover:-translate-y-1 ${shell}`}
    >
      <div className="h-52 relative">
        <ResponsiveImage
          publicId={project.imageId}
          alt=""
          icon={INDUSTRY_ICONS[project.industry] || DEFAULT_ICON}
          className="h-full"
          /* Desktop 33vw ~ 480–650px depending on window width. On retina (2x DPR)
             that's 960–1300px needed for sharpness. 900 covers most of that range
             before the srcset ladder caps above 2400px total. */
          displayWidth={900}
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
        />
        {/* Both labels are white and both sit over open sky on half the
            project photos, so the frame carries its own top-and-bottom scrim
            rather than relying on whatever happens to be in the shot. */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-tobler-heading/60 to-transparent"
        />
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-tobler-heading/70 to-transparent"
        />
        <span className="absolute bottom-3 right-4 figure-mono text-sm text-white">
          {project.status === 'ongoing' ? projectStatusLabel(project) : project.year}
        </span>
        <div className="absolute top-4 left-4">
          <Badge variant="light" className="backdrop-blur-sm">
            {project.industry}
          </Badge>
        </div>
      </div>
      <div className="p-6 flex flex-col flex-1">
        <div
          className={`flex items-center gap-1.5 mb-2 ${
            soft ? 'text-sm text-shopify-muted' : 'label-mono text-tobler-body/70'
          }`}
        >
          <MapPin size={12} aria-hidden="true" />
          {project.location}
        </div>
        <h3
          className={`text-lg mb-2 transition-colors ${
            soft ? 'text-shopify-ink group-hover:text-shopify-green' : 'group-hover:text-tobler-blue'
          }`}
        >
          {project.name}
        </h3>
        <p
          className={`text-sm leading-relaxed flex-1 normal-case ${
            soft ? 'text-shopify-body' : 'text-tobler-body'
          }`}
        >
          {project.summary}
        </p>
        <div
          className={`mt-5 flex items-center gap-2 ${
            soft ? 'text-sm font-semibold text-shopify-green' : 'label-mono text-tobler-heading'
          }`}
        >
          {soft ? 'Read more' : 'Read More'}
          <ArrowRight size={15} aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1" />
        </div>
      </div>
    </Link>
  )
}

export default ProjectCard
