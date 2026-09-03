import { MapPin, Calendar, Layers } from 'lucide-react'
import Button from '../common/Button.jsx'
import Badge from '../common/Badge.jsx'
import SidePanel from '../ui/SidePanel.jsx'
import ResponsiveImage from '../ui/ResponsiveImage.jsx'
import VideoPanel from '../ui/VideoPanel.jsx'
import { projectStatusLabel } from '../../data/projects.js'
import { INDUSTRY_ICONS, DEFAULT_ICON } from '../../data/icons.js'

/* Half-screen project detail panel, opened from a card's Read More instead of
   navigating to a dedicated page. Shares its shell with ProductDrawer. */
function ProjectDrawer({ open, project, onClose }) {
  return (
    <SidePanel
      open={open}
      onClose={onClose}
      contentKey={project?.slug}
      eyebrow={project?.location}
      title={project?.name}
      fullScreenDesktop
      footer={
        <Button to="/contact#rfq" size="lg" className="w-full justify-center">
          Discuss a Similar Project
        </Button>
      }
    >
      {project && (
        <>
          <ResponsiveImage
            publicId={project.imageId}
            alt=""
            icon={INDUSTRY_ICONS[project.industry] || DEFAULT_ICON}
            iconSize={64}
            label={projectStatusLabel(project)}
            className="aspect-video rounded-card"
            displayWidth={1040}
          />

          {/* Supporting frames and videos under the lead image. Uncaptioned on
              purpose: they are site photography of the same system, not
              documented views of this particular building. */}
          {(project.gallery?.length > 0 || project.videos?.length > 0) && (
            <div className="grid grid-cols-3 gap-2">
              {project.gallery?.map((id) => (
                <ResponsiveImage
                  key={id}
                  publicId={id}
                  alt=""
                  className="aspect-[4/3] rounded-img"
                  displayWidth={260}
                  sizes="30vw"
                />
              ))}
              {project.videos?.map((id) => (
                <VideoPanel
                  key={id}
                  publicId={id}
                  className="aspect-[4/3] rounded-img"
                  width={260}
                />
              ))}
            </div>
          )}

          <section className="space-y-4">
            <Badge variant="blue">{project.industry}</Badge>
            <div className="flex items-center gap-3 text-tobler-body">
              <MapPin size={18} className="text-tobler-blue shrink-0" aria-hidden="true" />
              {project.location}
            </div>
            <div className="flex items-center gap-3 text-tobler-body">
              <Calendar size={18} className="text-tobler-blue shrink-0" aria-hidden="true" />
              {projectStatusLabel(project)}
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
        </>
      )}
    </SidePanel>
  )
}

export default ProjectDrawer
