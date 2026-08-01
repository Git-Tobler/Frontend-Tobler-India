import { Link } from 'react-router-dom'
import { MapPin, ArrowRight } from 'lucide-react'
import Badge from '../common/Badge.jsx'
import MediaTile from './MediaTile.jsx'
import { INDUSTRY_ICONS, DEFAULT_ICON } from '../../constants/icons.js'

function ProjectCard({ project }) {
  return (
    <Link
      to={`/projects/${project.slug}`}
      className="group relative flex flex-col h-full bg-white border border-tobler-border rounded-card overflow-hidden transition-all duration-300 ease-premium hover:shadow-elevated hover:-translate-y-1 hover:border-tobler-heading/30"
    >
      <div className="h-52 relative">
        <MediaTile icon={INDUSTRY_ICONS[project.industry] || DEFAULT_ICON} className="h-full" />
        <span className="absolute bottom-3 right-4 figure-mono text-sm text-white/70">{project.year}</span>
        <div className="absolute top-4 left-4">
          <Badge variant="light">{project.industry}</Badge>
        </div>
      </div>
      <div className="p-6 flex flex-col flex-1">
        <div className="flex items-center gap-1.5 label-mono text-tobler-body/70 mb-2">
          <MapPin size={12} />
          {project.location}
        </div>
        <h3 className="text-lg mb-2 group-hover:text-tobler-gold transition-colors">
          {project.name}
        </h3>
        <p className="text-sm text-tobler-body leading-relaxed flex-1 normal-case">{project.summary}</p>
        <div className="mt-5 flex items-center gap-2 label-mono text-tobler-heading">
          View Project
          <ArrowRight size={15} className="transition-transform duration-300 group-hover:translate-x-1" />
        </div>
      </div>
    </Link>
  )
}

export default ProjectCard
