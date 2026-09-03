import SEO from '../../components/common/SEO.jsx'
import PageHero from '../../components/layout/PageHero.jsx'
import MediaBand from '../../components/ui/MediaBand.jsx'
import Container from '../../components/common/Container.jsx'
import ResponsiveImage from '../../components/ui/ResponsiveImage.jsx'
import { Calendar, MapPin, Zap, ExternalLink, X, ChevronLeft, ChevronRight } from 'lucide-react'
import { useState, useEffect } from 'react'
import { cldImage } from '../../lib/cloudinary.js'
import { MEDIA } from '../../data/media-map.js'

function Exhibitions() {
  /* Index into the flattened gallery list, so the arrows and the counter walk
     the same sequence the thumbnails were clicked from. null = closed. */
  const [lightboxIndex, setLightboxIndex] = useState(null)

  const exhibitions = [
    {
      id: 1,
      name: 'bauma CONEXPO India 2024',
      location: ' India Expo Centre, Greater Noida',
      dates: 'September 15-18, 2026',
      description: 'Tobler participated in bauma CONEXPO India 2024, held from 11th to 14th December 2024 at the India Expo Centre, Greater Noida. The event brought together leading companies and professionals from the construction, mining, and infrastructure sectors, with more than 20,000 products and solutions showcased by 984 exhibitors. The event marked an important milestone for Tobler as it hosted the launch of Tobler India, with key customers invited from Mumbai. Tobler showcased the Monolithic Formwork, Mato-8 Ringlock Scaffolding System, Manu Wall Formwork, and Deck Slab Formwork, marking the beginning of its journey in the Indian market.',
      highlights: [
        'Tobler Monolithic Aluminium Formwork',
        'Tobler Mato-8 Ringlock Scaffolding System',
        'Tobler Manu Wall Formwork',
        'Tobler Deck Slab Formwork',
      ],
      status: 'Concluded',
      images: [
        { id: 'bauma CONEXPO India1', alt: 'bauma CONEXPO India - Exhibition entrance' },
        { id: 'bauma CONEXPO India2', alt: 'bauma CONEXPO India - Tobler booth showcase' },
        { id: 'bauma CONEXPO India3', alt: 'bauma CONEXPO India - Product demonstration' },
        { id: 'bauma CONEXPO India4', alt: 'bauma CONEXPO India - Team engagement' },
        { id: 'bauma CONEXPO India5', alt: 'bauma CONEXPO India - Exhibition overview' },
      ],
    },
    {
      id: 2,
      name: 'ACETECH Mumbai',
      location: ' NESCO, Mumbai',
      dates: '6th to 9th November 2025',
      boothNumber: 'Hall B - Booth 42',
      description: 'Tobler participated in ACETECH Mumbai from 6th to 9th November 2025, presenting its range of Swiss engineered scaffolding and formwork systems to professionals from the architecture, construction, and building materials sectors. The event provided an opportunity for the Tobler team to engage with industry professionals and showcase solutions developed for the requirements of modern construction. The display included the Tobler Monolithic Formwork, Mato-8 Ringlock Scaffolding System, Manu Wall Formwork, and Deck Slab Formwork, reflecting Toblers growing engagement with the Indian construction market and its focus on engineered, reliable construction systems.',
      highlights: [
        'Tobler Monolithic Formwork',
        'Tobler Mato-8 Ringlock Scaffolding System',
        'Tobler Manu Wall Formwork',
        'Tobler Deck Slab Formwork',
      ],
      status: 'Concluded',
      images: [
        { id: 'ACETECH Mumbai1', alt: 'ACETECH Mumbai - Exhibition booth' },
        { id: 'ACETECH Mumbai2', alt: 'ACETECH Mumbai - Product display' },
        { id: 'ACETECH Mumbai3', alt: 'ACETECH Mumbai - Attendee engagement' },
      ],
    },
    {
      id: 3,
      name: 'ET Realty & Beyond Chandigarh',
      location: ' Holiday Inn, Chandigarh',
      dates: '25th March 2026',
      
      description: 'Tobler participated in ET Realty & Beyond Chandigarh on 25th March 2026, bringing its engineering expertise to a platform focused on real estate, infrastructure, and urban development. The event brought together professionals and decision-makers from across the built environment for industry discussions and networking. Tobler showcased its Monolithic Formwork, providing an opportunity to present its aluminium formwork solution to professionals involved in construction and development. The participation supported Tobler\'s continued engagement with the real estate and infrastructure ecosystem while building connections with industry stakeholders and understanding the evolving requirements of modern construction.',
      highlights: [
        'Tobler Monolithic Aluminium Formwork',
      ],
      status: 'Concluded',
      images: [
        { id: 'ET Realty - Chandigarh1', alt: 'ET Realty & Beyond Chandigarh - Event overview' },
        { id: 'ET Realty - Chandigarh2', alt: 'ET Realty & Beyond Chandigarh - Product presentation' },
      ],
    },
    {
      id: 4,
      name: 'ACETECH Hyderabad',
      location: 'HITEX Exhibition Center, Hyderabad',
      dates: '23rd to 25th January 2026',
      boothNumber: '[Booth information pending]',
      description: 'Tobler participated in ACETECH Hyderabad from 23rd to 25th January 2026, engaging with professionals from the architecture, construction, engineering, and building materials sectors. The event provided a platform for the Tobler team to present its engineered scaffolding and formwork solutions and interact with industry professionals around changing construction requirements and practices. Tobler showcased the Monolithic Formwork, Mato-8 Ringlock Scaffolding System, Manu Wall Formwork, and Deck Slab Formwork. The participation further strengthened Toblers engagement with the Indian construction industry and provided an opportunity to present its solutions to professionals in the Hyderabad market.',
      highlights: [
        'Tobler Monolithic Formwork',
        'Tobler Mato-8 Ringlock Scaffolding System',
        'Tobler Manu Wall Formwork',
        'Tobler Deck Slab Formwork',
        'Tobler Deck Slab Formwork',
      ],
      status: 'Concluded',
      images: [
        { id: 'ACETECH Hyderabad', alt: 'ACETECH Hyderabad - Exhibition overview' },
      ],
    },
    {
      id: 5,
      name: 'ACETECH Delhi 2025',
      location: 'Pragati Maidan, New Delhi',
      dates: '4th to 7th December 2025',
      description: 'Tobler participated in ACETECH Delhi from 4th to 7th December 2025, bringing its range of Swiss engineered scaffolding and formwork systems to the event. The participation provided an opportunity to connect with professionals and businesses from the construction, architecture, interior, and building materials sectors. Tobler showcased solutions designed to support different stages of modern construction, with a focus on reliable performance, efficiency, and practical site requirements. The product range displayed included the Tobler Monolithic Formwork, Mato-8 Ringlock Scaffolding System, Manu Wall Formwork, and Deck Slab Formwork, highlighting Toblers expanding presence in the Indian market',
      highlights: [
        'Tobler Monolithic Formwork',
        'Tobler Mato-8 Ringlock Scaffolding System',
        'Tobler Manu Wall Formwork',
        'Deck Slab Formwork',
      ],
      status: 'Concluded',
    },
      {
      id: 6,
      name: 'ET Realty Conclave Delhi',
      location: ' Delhi',
      dates: '11th March 2025',
      description: 'Tobler participated in ET Realty Conclave Delhi on 11th March 2025, engaging with professionals and key stakeholders from the real estate sector. The event focused on important areas shaping the future of Indian real estate, including sustainability, affordable housing, smart cities, regulatory developments, and emerging industry trends. It provided an opportunity for meaningful discussions around the changing requirements of the sector and the opportunities ahead. Tobler showcased its Monolithic Formwork, presenting its aluminium formwork solution to professionals across the real estate and construction ecosystem and strengthening its engagement with the industry.',
      highlights: [
        'Tobler Monolithic Aluminium Formwork',
      ],
      status: 'Concluded',
    },
    {
      id: 7,
      name: 'ACETECH Bengaluru',
      location: 'Bangalore International Exhibition Centre (BIEC), Bengaluru',
      dates: '10th - 12th October, 2025',
      boothNumber: 'N/A',
      description: 'Tobler participated in ACETECH Bengaluru, connecting with professionals from the architecture, construction, real estate, and building materials sectors. Showcased Swiss-engineered scaffolding and formwork systems to industry professionals.',
      highlights: [
        'Tobler Monolithic Formwork',
        'Tobler Mato-8 Ringlock Scaffolding System',
        'Tobler Manu Wall Formwork',
        'Deck Slab Formwork',
      ],
      status: 'Concluded',
      images: [
        { id: 'ACETECH Bengaluru1', alt: 'ACETECH Bengaluru - Exhibition booth' },
        { id: 'ACETECH Bengaluru2', alt: 'ACETECH Bengaluru - Attendees viewing Tobler systems' },
        { id: 'ACETECH Bengaluru3', alt: 'ACETECH Bengaluru - Product showcase' },
      ],
    },
  ]

  /* One flat sequence in the same order the galleries render, so the lightbox
     can walk from the last photo of one event into the first of the next. */
  const galleryImages = exhibitions.filter((e) => e.images).flatMap((e) => e.images)
  const lightboxImage = lightboxIndex === null ? null : galleryImages[lightboxIndex]
  const imageCount = galleryImages.length

  const openLightbox = (imageId) => setLightboxIndex(galleryImages.findIndex((img) => img.id === imageId))
  const closeLightbox = () => setLightboxIndex(null)
  const showPrev = () => setLightboxIndex((i) => (i - 1 + imageCount) % imageCount)
  const showNext = () => setLightboxIndex((i) => (i + 1) % imageCount)

  useEffect(() => {
    if (lightboxIndex === null) return

    const onKeyDown = (e) => {
      if (e.key === 'Escape') setLightboxIndex(null)
      else if (e.key === 'ArrowLeft') setLightboxIndex((i) => (i - 1 + imageCount) % imageCount)
      else if (e.key === 'ArrowRight') setLightboxIndex((i) => (i + 1) % imageCount)
    }

    // The page behind the overlay would otherwise scroll under the photo.
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKeyDown)
    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [lightboxIndex, imageCount])

  const ExhibitionCard = ({ exhibition }) => {
    const isComplete = exhibition.boothNumber && !exhibition.boothNumber.includes('[') && exhibition.status === 'upcoming'
    const isPending = exhibition.status === 'pending' || (exhibition.boothNumber && exhibition.boothNumber.includes('['))
    const isPast = exhibition.status === 'past'
    return (
      <div className={`p-8 rounded-card border transition-all ${
        isPast
          ? 'bg-white border-tobler-border'
          : isPending
          ? 'bg-tobler-bg-light border-tobler-border/50'
          : 'bg-white border-tobler-border hover:border-tobler-border/60 hover:shadow-sm'
      }`}>
        {/* Icon & Status */}
        <div className="flex items-start justify-between mb-4">
          <span className="text-4xl">{exhibition.image}</span>
          <span className={`text-xs font-semibold px-3 py-1 rounded-full ${
            isComplete
              ? 'bg-green-100 text-green-700'
              : isPending
              ? 'bg-amber-100 text-amber-700'
              : isPast
              ? 'bg-gray-100 text-gray-700'
              : 'bg-blue-100 text-blue-700'
          }`}>
            {isComplete ? 'Upcoming' : isPast ? 'Past Event' : 'Concluded'}
          </span>
        </div>

        {/* Title */}
        <h3 className={`text-lg font-semibold mb-2 ${
          isPending ? 'text-tobler-body/60' : 'text-tobler-heading'
        }`}>
          {exhibition.name}
        </h3>

        {/* Description */}
        <p className={`text-sm mb-6 pb-6 border-b border-tobler-border ${
          isPending ? 'text-tobler-body/60 italic' : 'text-tobler-body'
        }`}>
          {exhibition.description}
        </p>

        {/* Details */}
        <div className="space-y-3 mb-6">
          <div className="flex items-start gap-3">
            <Calendar size={16} className="text-tobler-blue shrink-0 mt-0.5" />
            <div>
              <p className="text-xs text-tobler-body/60 uppercase tracking-wide">Dates</p>
              <p className={`text-sm font-medium ${isPending ? 'text-tobler-body/50' : 'text-tobler-heading'}`}>
                {exhibition.dates}
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <MapPin size={16} className="text-tobler-blue shrink-0 mt-0.5" />
            <div>
              <p className="text-xs text-tobler-body/60 uppercase tracking-wide">Location</p>
              <p className={`text-sm font-medium ${isPending ? 'text-tobler-body/50' : 'text-tobler-heading'}`}>
                {exhibition.location}
              </p>
            </div>
          </div>
          {exhibition.boothNumber && !exhibition.boothNumber.includes('[') && (
            <div className="flex items-start gap-3">
              <Zap size={16} className="text-tobler-gold shrink-0 mt-0.5" />
              <div>
                <p className="text-xs text-tobler-body/60 uppercase tracking-wide">Booth</p>
                <p className={`text-sm font-medium ${isPending ? 'text-tobler-body/50' : 'text-tobler-heading'}`}>
                  {exhibition.boothNumber}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Highlights */}
        {exhibition.highlights.length > 0 && (
          <div className="mb-6 pb-6 border-b border-tobler-border">
            <p className="text-xs font-medium text-tobler-body/60 uppercase tracking-wide mb-3">
              Event Highlights
            </p>
            <ul className="space-y-2">
              {exhibition.highlights
                .filter(h => !h.includes('['))
                .map((highlight, idx) => (
                  <li key={idx} className="text-sm text-tobler-body flex items-start gap-2">
                    <span className="text-tobler-gold shrink-0 mt-0.5">✓</span>
                    <span>{highlight}</span>
                  </li>
                ))}
            </ul>
          </div>
        )}

        {/* CTA */}
        {isComplete && (
          <a
            href="mailto:info@gezu-impex.nl?subject=Exhibition%20Visit%20Request"
            className="inline-flex items-center gap-2 text-sm font-medium text-tobler-blue hover:text-tobler-blue/80 transition-colors"
          >
            Schedule Visit <ExternalLink size={14} />
          </a>
        )}
        {exhibition.images && (
          <a
            href="#past-events"
            className="inline-flex items-center gap-2 text-sm font-medium text-tobler-blue hover:text-tobler-blue/80 transition-colors"
          >
            View Photos <ExternalLink size={14} />
          </a>
        )}
      </div>
    )
  }

  return (
    <>
      <SEO
        title="Exhibitions & Events | Tobler"
        description="Discover where to meet Tobler at major industry exhibitions and trade shows."
        path="/exhibitions"
      />
      <PageHero
        title="Exhibitions & Events"
        description="Meet our team at leading industry events"
        breadcrumbItems={[{ label: 'Exhibitions' }]}
        imageId="tobler/event/dsc-6812"
      />

      <section className="py-24 md:py-32">
        <Container>
      
        

          {/* Info Banner */}
          <div className="p-8 rounded-card bg-gradient-to-r from-tobler-blue/10 to-tobler-blue/5 border border-tobler-blue/20 mb-16">
            <h3 className="font-semibold text-tobler-heading mb-2">Why Visit Tobler at Exhibitions?</h3>
            <ul className="space-y-2 text-sm text-tobler-body">
              <li className="flex items-start gap-3">
                <span className="text-tobler-blue font-bold min-w-fit">•</span>
                <span>See live product demonstrations and test installations</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-tobler-blue font-bold min-w-fit">•</span>
                <span>Direct consultation with our technical engineering team</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-tobler-blue font-bold min-w-fit">•</span>
                <span>Exclusive exhibition pricing and special offers</span>
              </li>
            </ul>
          </div>

          {/* Exhibitions Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {exhibitions.map((exhibition) => (
              <ExhibitionCard key={exhibition.id} exhibition={exhibition} />
            ))}
          </div>

          {/* Past Events Section */}
          {galleryImages.length > 0 && (
            <div id="past-events" className="mt-20 pt-16 border-t border-tobler-border scroll-mt-28">
              <h2 className="text-2xl font-semibold text-tobler-heading mb-8">Event Galleries</h2>
              {exhibitions.map((event) => event.images ? (
                <div key={event.id} className="mb-16">
                  <h3 className="text-xl font-semibold text-tobler-heading mb-6">{event.name} - {event.dates}</h3>
                  <p className="text-sm text-tobler-body mb-8">{event.description}</p>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {event.images.map((img, idx) => (
                      <div
                        key={idx}
                        className="relative overflow-hidden rounded-card border border-tobler-border shadow-soft hover:shadow-card transition-all cursor-pointer"
                        onClick={() => openLightbox(img.id)}
                      >
                        <ResponsiveImage
                          publicId={img.id}
                          alt={img.alt}
                          className="w-full h-64 object-cover"
                          displayWidth={600}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              ) : null)}
            </div>
          )}

          {/* Newsletter CTA */}
          <MediaBand imageId={MEDIA.eventPhoto3} className="mt-16 p-12">
            <h3 className="text-2xl font-semibold text-white mb-3">Stay Updated on Upcoming Events</h3>
            <p className="text-white/75 mb-6">
              Subscribe to our newsletter to receive updates about exhibitions, events, and special industry announcements.
            </p>
            <div className="flex gap-2 max-w-md">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-card border border-tobler-border bg-white text-tobler-heading placeholder:text-tobler-body/40 focus:outline-none focus:ring-2 focus:ring-tobler-blue/20"
              />
              <button className="px-6 py-3 rounded-card bg-tobler-gold text-tobler-heading font-medium hover:bg-tobler-gold-dark transition-colors shrink-0">
                Subscribe
              </button>
            </div>
          </MediaBand>
        </Container>
      </section>

      {/* Full-screen photo viewer. `c_limit` instead of the site-wide `c_fill`
          so the whole frame shows rather than an auto-cropped box. */}
      {lightboxImage && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4 md:p-12"
          role="dialog"
          aria-modal="true"
          aria-label={lightboxImage.alt}
          onClick={closeLightbox}
        >
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 p-2 text-white/80 hover:text-white transition-colors"
            aria-label="Close"
          >
            <X size={28} />
          </button>

          <button
            onClick={(e) => { e.stopPropagation(); showPrev() }}
            className="absolute left-2 md:left-6 top-1/2 -translate-y-1/2 p-2 text-white/80 hover:text-white transition-colors"
            aria-label="Previous image"
          >
            <ChevronLeft size={36} />
          </button>

          <img
            src={cldImage(lightboxImage.id, { w: 2400, crop: 'limit' })}
            alt={lightboxImage.alt}
            className="max-w-full max-h-full object-contain"
            onClick={(e) => e.stopPropagation()}
          />

          <button
            onClick={(e) => { e.stopPropagation(); showNext() }}
            className="absolute right-2 md:right-6 top-1/2 -translate-y-1/2 p-2 text-white/80 hover:text-white transition-colors"
            aria-label="Next image"
          >
            <ChevronRight size={36} />
          </button>

          <p className="absolute bottom-4 left-1/2 -translate-x-1/2 text-sm text-white/70">
            {lightboxIndex + 1} / {imageCount}
          </p>
        </div>
      )}
    </>
  )
}

export default Exhibitions
