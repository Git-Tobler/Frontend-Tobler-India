import { Calendar, CheckCircle2 } from 'lucide-react'
import SEO from '../../components/common/SEO.jsx'
import PageHero from '../../components/layout/PageHero.jsx'
import MediaBand from '../../components/ui/MediaBand.jsx'
import Container from '../../components/common/Container.jsx'
import Button from '../../components/common/Button.jsx'
import ConsultationServiceCard from '../../components/ui/ConsultationServiceCard.jsx'
import TrustBadges from '../../components/sections/TrustBadges.jsx'
import { SITE } from '../../data/site.js'
import { MEDIA } from '../../data/media-map.js'

const CONSULTATION_SERVICES = [
  {
    title: 'RFQ Consultations',
    description: 'Discuss your project requirements with our engineering team. Get technical guidance and understanding of optimal solutions.',
    icon: 'briefcase',
  },
  {
    title: 'Facility Tours',
    description: 'Visit our state-of-the-art manufacturing facility in Chandigarh. See our Swiss-engineered production capabilities firsthand.',
    icon: 'factory',
  },
  {
    title: 'Technical Guidance',
    description: 'Expert consultations on formwork and scaffolding solutions, safety specifications, and project planning.',
    icon: 'lightbulb',
  },
  {
    title: 'Custom Solutions',
    description: 'Tailored engineering solutions for specialized projects. Work with our technical team to design the perfect fit.',
    icon: 'cog',
  },
  {
    title: 'Product Training',
    description: 'Learn installation, maintenance, and safety protocols. Comprehensive training for your team.',
    icon: 'graduation',
  },
  {
    title: 'Project Planning',
    description: 'Collaborate with our project managers to plan, budget, and execute your next initiative successfully.',
    icon: 'clipboard',
  },
]

const TRUST_STATS = [
  { value: '30+', label: 'Years of Engineering' },
  { value: '1,200+', label: 'Projects Delivered' },
  { value: '250,000+', label: 'Manufacturing Area (sq. ft.)' },
  { value: '500+', label: 'Active Clients' },
]

function Consultations() {
  const calendlyUrl = SITE.calendlyUrl

  return (
    <>
      <SEO
        title="Schedule a Consultation"
        description="Book a consultation with our engineering team for RFQ discussions, facility tours, technical guidance, and custom solutions."
        path="/consultations"
      />

      <PageHero
        title="Schedule Your Engineering Consultation"
        description="Connect with our Swiss engineering team. Discuss your project needs, explore solutions, and plan your next success story."
        breadcrumbItems={[{ label: 'Consultations' }]}
      />

      {/* Hero CTA Section */}
      <section className="py-16 md:py-20 bg-gradient-to-b from-tobler-bg-light to-white">
        <Container>
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-h3 mb-6 text-tobler-heading">
              Direct Access to Our Technical Team
            </h2>
            <p className="text-base text-tobler-body leading-relaxed mb-8">
              Whether you're planning a complex scaffolding project, need technical guidance, or want to explore custom solutions, our team is ready to help. Schedule a consultation at a time that works for you.
            </p>
            <Button
              href={calendlyUrl}
              target="_blank"
              rel="noopener noreferrer"
              variant="primary"
              size="lg"
              className="gap-3"
            >
              <Calendar size={18} />
              Schedule Now
            </Button>
          </div>
        </Container>
      </section>

      {/* Trust Badges */}
      <TrustBadges stats={TRUST_STATS} />

      {/* Consultation Services Grid */}
      <section className="py-24 md:py-30">
        <Container>
          <div className="mb-16 text-center">
            <h2 className="text-h3 mb-4 text-tobler-heading">What We Offer</h2>
            <p className="text-base text-tobler-body max-w-2xl mx-auto">
              Choose from a variety of consultation options tailored to your needs
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-7">
            {CONSULTATION_SERVICES.map((service, index) => (
              <ConsultationServiceCard key={index} {...service} />
            ))}
          </div>
        </Container>
      </section>

      {/* How It Works */}
      <section className="py-24 md:py-30 bg-tobler-bg-light">
        <Container>
          <h2 className="text-h3 mb-16 text-center text-tobler-heading">How It Works</h2>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                step: '1',
                title: 'Choose Your Consultation',
                description: 'Select the type of consultation that best fits your needs',
              },
              {
                step: '2',
                title: 'Schedule on Calendly',
                description: 'Pick a convenient date and time from our available slots',
              },
              {
                step: '3',
                title: 'Connect with Experts',
                description: 'Meet with our engineering team via video call or in-person',
              },
              {
                step: '4',
                title: 'Get Solutions',
                description: 'Receive tailored recommendations and next steps for your project',
              },
            ].map((item, idx) => (
              <div key={idx} className="text-center">
                <div className="w-12 h-12 rounded-full bg-tobler-gold text-tobler-heading font-bold text-lg flex items-center justify-center mx-auto mb-4">
                  {item.step}
                </div>
                <h3 className="text-base font-semibold text-tobler-heading mb-2">{item.title}</h3>
                <p className="text-sm text-tobler-body">{item.description}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Why Choose Tobler */}
      <section className="py-24 md:py-30">
        <Container>
          <div className="grid lg:grid-cols-2 gap-14 items-center">
            <div>
              <h2 className="text-h3 mb-8 text-tobler-heading">Why Consult With Tobler?</h2>
              <ul className="space-y-4">
                {[
                  'Swiss-engineered solutions with proven reliability',
                  'Direct access to experienced engineering professionals',
                  'Comprehensive understanding of your project requirements',
                  'Custom solutions tailored to your specific needs',
                  'Decades of expertise across multiple industries',
                  'Commitment to safety, quality, and on-time delivery',
                ].map((point, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-tobler-blue shrink-0 mt-0.5" />
                    <span className="text-base text-tobler-body">{point}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-tobler-bg-light rounded-card border border-tobler-border p-10">
              <h3 className="text-h5 mb-6 text-tobler-heading">Quick Contact</h3>
              <ul className="space-y-5">
                <li>
                  <p className="text-xs uppercase tracking-wide text-tobler-muted mb-2">Phone</p>
                  <a href={`tel:${SITE.phone}`} className="text-base font-semibold text-tobler-heading hover:text-tobler-blue transition-colors">
                    {SITE.phone}
                  </a>
                </li>
                <li>
                  <p className="text-xs uppercase tracking-wide text-tobler-muted mb-2">Email</p>
                  <a href={`mailto:${SITE.email}`} className="text-base font-semibold text-tobler-heading hover:text-tobler-blue transition-colors break-all">
                    {SITE.email}
                  </a>
                </li>
                <li>
                  <p className="text-xs uppercase tracking-wide text-tobler-muted mb-2">Location</p>
                  <p className="text-base text-tobler-body">{SITE.address}</p>
                </li>
              </ul>
              <Button
                href={calendlyUrl}
                target="_blank"
                rel="noopener noreferrer"
                variant="primary"
                size="md"
                className="w-full mt-8"
              >
                <Calendar size={16} />
                Schedule Consultation
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* Newsletter */}
      <section className="py-20 md:py-24">
        <Container>
          <MediaBand imageId={MEDIA.siteTeam} className="px-8 py-16 text-white md:px-16">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-h4 mb-4 text-white">Stay Updated</h2>
            <p className="text-base opacity-90 mb-8">
              Subscribe to get updates on new solutions, industry insights, and consultation availability
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-1 px-5 py-3.5 rounded-form bg-white/10 border border-white/20 text-white placeholder:text-white/50 focus:outline-none focus:border-white/50 focus:ring-2 focus:ring-tobler-gold/50"
              />
              <Button variant="accent" size="md">
                Subscribe
              </Button>
            </div>
          </div>
          </MediaBand>
        </Container>
      </section>
    </>
  )
}

export default Consultations
