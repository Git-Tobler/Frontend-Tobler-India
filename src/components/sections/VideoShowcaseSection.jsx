import { useState } from 'react'
import Container from '../common/Container.jsx'
import SectionTitle from '../common/SectionTitle.jsx'
import VideoPanel from '../ui/VideoPanel.jsx'
import ReadMore from '../ui/ReadMore.jsx'
import { MEDIA } from '../../data/media-map.js'

const VIDEOS = [
  {
    id: MEDIA.laserCuttingVideo,
    title: 'Laser Cutting',
    subtitle: 'Our laser cutting capability enables precise cutting of aluminium profiles and components to the required dimensions and specifications. High cutting accuracy allows for clean profiles and consistent component geometry, supporting the precise fit and alignment required across aluminium formwork panels and assemblies. The process also allows complex profiles and component details to be produced with a high degree of repeatability, making it suitable for the detailed requirements of modern aluminium formwork systems.',
  },
  {
    id: MEDIA.laserWeldingVideo,
    // The one 1920x1080 source in this row — see the note above.
    fit: 'contain',
    title: 'German Certified welding',
    subtitle: 'Toblers aluminium welding capabilities support the production of strong, accurate and consistent formwork assemblies. Controlled welding processes ensure reliable joints while maintaining the required geometry and dimensional accuracy of the finished components. The combination of precise cutting and high-quality welding allows individual aluminium components to be manufactured as cohesive assemblies, ready for integration into the complete formwork system.',
  },
  {
    id: MEDIA.roboticWeldingVideo,
    title: 'Robotic Welding',
    subtitle: 'Robotic welding enables precise, consistent and efficient welding of scaffolding and formwork components. By automating repetitive welding processes, it helps maintain uniform quality, improve production efficiency and reduce human error, while ensuring strong and reliable joints across every component. It also allows for better control over welding parameters and repeatability across large production volumes. Automated systems can handle complex and repetitive welds with high accuracy, supporting consistent fabrication standards. This results in reliable components that meet demanding engineering and quality requirements',
  },
  {
    id: MEDIA.componentSequenceVideo,
    title: 'Event Solution',
    subtitle: 'Our component assembly process brings precision-manufactured parts together into complete scaffolding and formwork systems. Each assembly is quality-checked to ensure structural integrity and dimensional accuracy, guaranteeing reliable performance in demanding construction applications.',
    // Photos key — placeholder for gallery images
    photos: [],
  },
]


function VideoShowcaseSection() {
  const [hoveredIndex, setHoveredIndex] = useState(null)

  return (
    <section className="bg-white py-24 md:py-30">
      <Container>
        <SectionTitle
          align="center"
          size="display"
          title="Manufacturing in Motion"
          description="See the precision and automation behind every Tobler system,  from Swiss-engineered tooling to final quality checks."
        />

        <div className="mt-20 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {VIDEOS.map((video, idx) => (
            <div
              key={video.id}
              className="group cursor-pointer"
              onMouseEnter={() => setHoveredIndex(idx)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <div
                className={`relative overflow-hidden rounded-card-lg transition-all duration-300 ease-premium ${
                  hoveredIndex === idx ? 'scale-105 shadow-lift' : 'shadow-raised'
                }`}
              >
                <VideoPanel
                  publicId={video.id}
                  shouldPlay={true}
                  className="rounded-card-lg"
                  fit={video.fit || 'cover'}
                />
              </div>
              <div className="mt-6">
                <h3 className="text-lg font-semibold text-shopify-ink">{video.title}</h3>
                {/* Each blurb runs several sentences long — clamp to two lines
                    so the three tiles stay the same height, and let the reader
                    open the one they care about. */}
                <div className="mt-2">
                  <ReadMore className="text-sm" previewLines={2}>
                    {video.subtitle}
                  </ReadMore>
                </div>
              </div>
            </div>
          ))}
          
        </div>
      </Container>
    </section>
  )
}

export default VideoShowcaseSection
