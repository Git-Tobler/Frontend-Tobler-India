import { MapPin, Layers } from 'lucide-react'
import Button from '../common/Button.jsx'
import Badge from '../common/Badge.jsx'
import SidePanel from '../ui/SidePanel.jsx'
import MediaGallery from '../ui/MediaGallery.jsx'
import { mediaItems } from '../../lib/media.js'
import { INDUSTRY_ICONS, DEFAULT_ICON } from '../../data/icons.js'

/* Full-screen project detail panel, opened from a card's Read More instead of
   navigating to a dedicated page. Shares its shell with ProductDrawer. */
function ProjectDrawer({ open, project, onClose }) {
  const media = project ? mediaItems(project, project.name) : []

  return (
    <SidePanel
      open={open}
      onClose={onClose}
      contentKey={project?.slug}
      title={project?.name}
      footer={
        <Button to="/contact#rfq" size="lg" className="w-full justify-center sm:w-auto">
          Discuss a Similar Project
        </Button>
      }
      fullScreenDesktop
    >
      {project && (
        <div
          className={`grid gap-8 lg:gap-12 lg:items-start ${
            media.length > 0 ? 'lg:grid-cols-[minmax(0,1fr)_minmax(0,380px)]' : ''
          }`}
        >
          <MediaGallery
            items={media}
            icon={INDUSTRY_ICONS[project.industry] || DEFAULT_ICON}
            className="lg:order-2 lg:sticky lg:top-0"
          />

          <div className="min-w-0 space-y-10 lg:order-1">
            <section className="space-y-4">
              <Badge variant="blue">{project.industry}</Badge>
              <div className="flex items-center gap-3 text-tobler-body">
                <MapPin size={18} className="text-tobler-blue shrink-0" aria-hidden="true" />
                {project.location}
              </div>
            </section>

            {project.description && (
              <section>
                <h3 className="text-h5 mb-3">About This Project</h3>
                <p className="text-tobler-body leading-relaxed normal-case">{project.description}</p>
              </section>
            )}

            {project.products?.length > 0 && (
              <section>
                <h3 className="text-h5 mb-4 flex items-center gap-2">
                  <Layers size={18} className="text-tobler-blue" aria-hidden="true" />
                  Products Used
                </h3>
                <ul className="space-y-2">
                  {project.products.map((p) => (
                    <li
                      key={p}
                      className="px-4 py-2.5 bg-tobler-bg-light rounded-card text-sm text-tobler-body border border-tobler-border"
                    >
                      {p}
                    </li>
                  ))}
                </ul>
              </section>
            )}
          </div>
        </div>
      )}
    </SidePanel>
  )
}

export default ProjectDrawer
