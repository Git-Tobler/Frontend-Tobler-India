import { useState } from 'react'
import { Mail, MapPin, Briefcase, ArrowRight } from 'lucide-react'
import PageHero from '../../components/layout/PageHero.jsx'
import MediaBand from '../../components/ui/MediaBand.jsx'
import ResponsiveImage from '../../components/ui/ResponsiveImage.jsx'
import SEO from '../../components/common/SEO.jsx'
import { MEDIA } from '../../data/media-map.js'
import { POSITIONS } from '../../data/careers.js'

export default function Careers() {
  const [selectedPosition, setSelectedPosition] = useState(null)

  return (
    <>
      <SEO
        title="Careers at Tobler India"
        description="Join our team of engineers, innovators, and leaders shaping the future of construction systems."
      />

      {/* Hero Section */}
      <PageHero
        title="Join Our Team"
        subtitle="Build the future of construction engineering with us"
        imageId="Carrier page hero img"
      />

      {/* About Careers Section */}
      <section className="bg-white py-20 sm:py-28">
        <div className="mx-auto max-w-[1400px] px-6">
          <div className="mx-auto max-w-reading space-y-6 text-center">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-tobler-heading">
              Why Join Tobler India?
            </h2>
            <p className="text-lg text-tobler-body leading-relaxed">
              At Tobler, we believe in the power of innovation and precision engineering. We're building the world's mosttrusted construction systems, and we need talented people like you to make it happen. Join a team that values
              Swiss engineering excellence, continuous improvement, and making a real impact on India's infrastructure.
            </p>
          </div>
        </div>
      </section>

    

      {/* Open Positions Section */}
      <section className="bg-white py-20 sm:py-28">
        <div className="mx-auto max-w-[1400px] px-6">
          <div className="mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-center text-tobler-heading mb-4">
              Open Positions
            </h2>
            <p className="text-center text-tobler-body max-w-2xl mx-auto">
              Explore career opportunities across engineering, sales, operations, and more.
            </p>
          </div>

          <div className="space-y-4">
            {POSITIONS.map((position) => (
              <div
                key={position.id}
                className="border border-tobler-border-light rounded-lg overflow-hidden hover:border-tobler-blue/30 transition-all duration-300"
              >
                <button
                  onClick={() => setSelectedPosition(selectedPosition === position.id ? null : position.id)}
                  className="w-full px-6 py-6 hover:bg-tobler-bg-light transition-colors duration-300 text-left flex items-center justify-between"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-display font-bold text-tobler-heading">{position.title}</h3>
                      <span className="px-3 py-1 bg-tobler-blue/10 text-tobler-blue text-xs font-semibold rounded-full">
                        {position.type}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-4 text-sm text-tobler-muted">
                      <div className="flex items-center gap-1">
                        <MapPin size={16} />
                        {position.location}
                      </div>
                      <div className="flex items-center gap-1">
                        <Briefcase size={16} />
                        {position.department}
                      </div>
                    </div>
                  </div>
                  <ArrowRight
                    size={24}
                    className={`text-tobler-blue transition-transform duration-300 ${
                      selectedPosition === position.id ? 'rotate-90' : ''
                    }`}
                  />
                </button>

                {/* Expandable Details */}
                {selectedPosition === position.id && (
                  <div className="border-t border-tobler-border-light px-6 py-6 bg-tobler-bg-light">
                    <p className="text-tobler-body mb-6">{position.description}</p>

                    <div className="mb-6">
                      <h4 className="font-bold text-tobler-heading mb-3">Key Requirements:</h4>
                      <ul className="space-y-2">
                        {position.requirements.map((req, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-tobler-body">
                            <span className="text-tobler-blue mt-1">•</span>
                            <span>{req}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <button className="inline-flex items-center gap-2 px-6 py-3 bg-tobler-blue text-white font-semibold rounded-lg hover:bg-tobler-blue-dark transition-colors duration-300">
                      <Mail size={18} />
                      Apply Now
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Culture Section */}
      <section className="bg-tobler-bg-light py-20 sm:py-28">
        <div className="mx-auto max-w-[1400px] px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-tobler-heading mb-6">
                Our Culture
              </h2>
              <div className="space-y-4 text-tobler-body">
                <p>
                  At Tobler India, we foster a culture of innovation, accountability, and continuous improvement. Our team
                  is driven by a shared mission to deliver engineering excellence and make a positive impact on India's
                  infrastructure.
                </p>
                <p>
                  We believe in empowering our employees with the tools, training, and opportunities they need to succeed.
                  Whether you're an engineer, salesperson, or operations specialist, your contribution matters.
                </p>
                <p>
                  We work hard, celebrate wins together, and support each other's growth. Join a team where Swiss precision
                  meets Indian passion.
                </p>
              </div>
            </div>
            {/* Two frames rather than one: the crew at the bench and a
                welder mid-arc, which is closer to what the copy beside them
                actually describes than a single posed shot would be. */}
            <div className="grid grid-cols-2 gap-4">
              <ResponsiveImage
                publicId={MEDIA.panelTeam}
                alt="Tobler production team assembling a formwork panel"
                className="h-96 rounded-xl"
                displayWidth={520}
                sizes="(min-width: 768px) 25vw, 50vw"
              />
              <div className="grid grid-rows-2 gap-4">
                <ResponsiveImage
                  publicId={MEDIA.weldingArc}
                  alt="Welding a component in the Tobler plant"
                  className="rounded-xl"
                  displayWidth={420}
                  sizes="(min-width: 768px) 25vw, 50vw"
                />
                <ResponsiveImage
                  publicId={MEDIA.siteTeam}
                  alt="Tobler engineers on a customer site"
                  className="rounded-xl"
                  displayWidth={420}
                  sizes="(min-width: 768px) 25vw, 50vw"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      
    </>
  )
}
