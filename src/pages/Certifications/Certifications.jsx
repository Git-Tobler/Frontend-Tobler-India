import SEO from '../../components/common/SEO.jsx'
import PageHero from '../../components/layout/PageHero.jsx'
import Container from '../../components/common/Container.jsx'
import ResponsiveImage from '../../components/ui/ResponsiveImage.jsx'
import { EyeIcon } from 'lucide-react'
import { cldImage } from '../../lib/cloudinary.js'
import { CLOUDINARY_IMAGES } from '../../data/media.js'
import { MEDIA } from '../../data/media-map.js'

function Certifications() {
  // Get all certification images from Cloudinary
  const certificationImages = CLOUDINARY_IMAGES.filter(img => img.folder === 'tobler-resources/Certifications')

  const CertificationCard = ({ image }) => {
    if (!image || !image.id) return null

    return (
      <div className="bg-white border border-tobler-border rounded-card overflow-hidden hover:shadow-soft transition-all">
        {/* Certificate Image */}
        <ResponsiveImage
          publicId={image.id}
          alt="Certificate"
          className="h-80 w-full"
          displayWidth={400}
        />

        {/* Certificate Details */}
        <div className="p-6">
          <p className="text-xs font-medium text-tobler-body/60 uppercase tracking-wide mb-4">Certificate</p>
          <div className="mb-4 pb-4 border-b border-tobler-border">
            {/* <p className="text-xs font-medium text-tobler-body/60 uppercase tracking-wide mb-2">File Name</p>
            <p className="text-sm font-medium text-tobler-heading break-words">{image.id}</p> */}
          </div>

          {/* Image Details */}
          <div className="grid grid-cols-2 gap-4 mb-6 text-xs">
            <div>
              <p className="text-tobler-body/60 uppercase tracking-wide mb-1">Dimensions</p>
              <p className="font-medium text-tobler-heading">{image.w || 'N/A'} × {image.h || 'N/A'}</p>
            </div>
            <div>
              <p className="text-tobler-body/60 uppercase tracking-wide mb-1">Format</p>
              <p className="font-medium text-tobler-heading">{image.format ? image.format.toUpperCase() : 'N/A'}</p>
            </div>
          </div>

          {/* View Certificate Button */}
          <a
            href={cldImage(image.id, { w: 1200 })}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-tobler-blue text-white rounded-card hover:bg-tobler-blue-dark transition-colors text-sm font-medium"
          >
            <EyeIcon size={16} /> View Certificate
          </a>
        </div>
      </div>
    )
  }

  return (
    <>
      <SEO
        title="Certifications | Tobler"
        description="Explore Tobler's quality certifications and compliance standards."
        path="/certifications"
      />
      <PageHero
        title="Certifications & Standards"
        description="Our commitment to quality, safety, and international standards"
        breadcrumbItems={[{ label: 'Certifications' }]}
        imageId={MEDIA.loadTestRig}
      />

      <section className="py-24 md:py-32">
        <Container>
          {/* Certifications Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {certificationImages.map((image) => (
              <CertificationCard key={image.id} image={image} />
            ))}
          </div>
        </Container>
      </section>
    </>
  )
}

export default Certifications
