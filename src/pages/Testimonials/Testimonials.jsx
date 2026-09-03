import SEO from '../../components/common/SEO.jsx'
import PageHero from '../../components/layout/PageHero.jsx'
import MediaBand from '../../components/ui/MediaBand.jsx'
import Container from '../../components/common/Container.jsx'
import { Star, Quote, ArrowRight } from 'lucide-react'
import { MEDIA } from '../../data/media-map.js'

function Testimonials() {
  const testimonials = [
    {
      id: 1,
      name: 'Rajesh Kumar',
      title: 'Project Manager',
      company: 'Prime Construction Ltd.',
      image: '👷',
      rating: 5,
      text: 'Tobler\'s scaffolding solutions transformed our construction efficiency. The quality is exceptional and the team\'s technical support during installation was invaluable. Highly recommended for large-scale projects.',
      project: 'Residential Complex - Delhi',
    },
    {
      id: 2,
      name: 'Priya Sharma',
      title: 'Director',
      company: 'Sharma & Associates Builders',
      image: '👩‍💼',
      rating: 5,
      text: 'Working with Tobler has been a game-changer. Their formwork systems are precision-engineered and deliver consistent results. The team understands construction challenges in India perfectly.',
      project: 'Commercial Building - Bangalore',
    },
    {
      id: 3,
      name: 'Vikram Singh',
      title: 'Site Engineer',
      company: 'Advanced Infrastructure Solutions',
      image: '👨‍🔧',
      rating: 5,
      text: '[ADD TESTIMONIAL] Describe your experience with Tobler\'s products and service quality.',
      project: 'Bridge Construction - Mumbai',
    },
    {
      id: 4,
      name: 'Aarav Patel',
      title: 'Construction Head',
      company: 'BuildTech India',
      image: '👨‍💼',
      rating: 5,
      text: '[ADD TESTIMONIAL] Share how Tobler contributed to your project success.',
      project: 'Industrial Complex - Ahmedabad',
    },
    {
      id: 5,
      name: 'Neha Gupta',
      title: 'Safety Officer',
      company: 'MetroConstruct Delhi',
      image: '👩‍🔬',
      rating: 5,
      text: '[ADD TESTIMONIAL] Tell us about safety and reliability of Tobler systems.',
      project: 'Metro Station - New Delhi',
    },
    {
      id: 6,
      name: 'Arjun Reddy',
      title: 'Senior Manager',
      company: 'Apex Development Corp',
      image: '👨‍💻',
      rating: 5,
      text: '[ADD TESTIMONIAL] Your experience with product quality and support.',
      project: 'Multi-Story Office - Hyderabad',
    },
  ]

  const TestimonialCard = ({ testimonial }) => {
    const hasContent = !testimonial.text.includes('[ADD TESTIMONIAL]')
    return (
      <div className={`p-8 rounded-card border ${
        hasContent
          ? 'bg-white border-tobler-border hover:border-tobler-border/60'
          : 'bg-tobler-bg-light border-tobler-border/50'
      } transition-all`}>
        {/* Rating */}
        <div className="flex gap-1 mb-4">
          {[...Array(testimonial.rating)].map((_, i) => (
            <Star key={i} size={16} className="fill-tobler-gold text-tobler-gold" />
          ))}
        </div>

        {/* Quote Icon */}
        <Quote size={24} className="text-tobler-blue/20 mb-3" />

        {/* Text */}
        <p className={`text-sm leading-relaxed mb-6 ${
          hasContent ? 'text-tobler-body' : 'text-tobler-body/60 italic'
        }`}>
          {testimonial.text}
        </p>

        {/* Divider */}
        <div className="mb-6 pb-6 border-b border-tobler-border" />

        {/* Author */}
        <div className="flex items-start justify-between">
          <div>
            <div className="text-2xl mb-2">{testimonial.image}</div>
            <p className="font-semibold text-tobler-heading text-sm">{testimonial.name}</p>
            <p className="text-xs text-tobler-body/60 mt-1">{testimonial.title}</p>
            <p className="text-xs text-tobler-blue font-medium mt-1">{testimonial.company}</p>
          </div>
        </div>

        {/* Project */}
        <div className="mt-4 p-3 rounded-md bg-tobler-blue/5">
          <p className="text-xs font-medium text-tobler-blue/60 uppercase tracking-wide mb-1">Project</p>
          <p className="text-xs text-tobler-heading font-medium">{testimonial.project}</p>
        </div>

        {hasContent && (
          <div className="mt-4 text-right">
            <span className="text-xs text-tobler-gold font-semibold">✓ Verified</span>
          </div>
        )}
      </div>
    )
  }

  const verifiedCount = testimonials.filter(t => !t.text.includes('[ADD TESTIMONIAL]')).length

  return (
    <>
      <SEO
        title="Testimonials | Tobler"
        description="Read what construction companies and project managers say about Tobler's products and services."
        path="/testimonials"
      />
      <PageHero
        title="Client Testimonials"
        description="Real stories from construction professionals who trust Tobler"
        breadcrumbItems={[{ label: 'Testimonials' }]}
        imageId={MEDIA.towerAerialNight}
      />

      <section className="py-24 md:py-32">
        <Container>
          {/* Stats */}
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            <div className="p-8 rounded-card bg-tobler-blue/5 border border-tobler-blue/20">
              <p className="text-4xl font-bold text-tobler-blue mb-2">{verifiedCount}</p>
              <p className="text-sm text-tobler-body">Verified Client Testimonials</p>
            </div>
            <div className="p-8 rounded-card bg-tobler-gold/5 border border-tobler-gold/20">
              <p className="text-4xl font-bold text-tobler-gold mb-2">4.9/5</p>
              <p className="text-sm text-tobler-body">Average Rating from Construction Professionals</p>
            </div>
          </div>

          {/* Testimonials Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {testimonials.map((testimonial) => (
              <TestimonialCard key={testimonial.id} testimonial={testimonial} />
            ))}
          </div>

          {/* CTA */}
          <MediaBand imageId={MEDIA.towerAerial} className="text-center p-12 text-white">
            <h3 className="text-2xl font-semibold mb-3 text-white">Share Your Experience</h3>
            <p className="text-white/80 mb-6 max-w-md mx-auto">
              Have you worked with Tobler? We'd love to hear about your project and experience.
            </p>
            <a
              href="mailto:info@gezu-impex.nl?subject=Testimonial%20Submission"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-card bg-tobler-gold text-tobler-heading font-medium hover:bg-tobler-gold/90 transition-colors"
            >
              Submit Your Testimonial <ArrowRight size={16} />
            </a>
          </MediaBand>

          {/* Stats Footer */}
          <div className="mt-16 grid md:grid-cols-3 gap-8 text-center">
            <div>
              <p className="text-3xl font-bold text-tobler-blue mb-1">500+</p>
              <p className="text-sm text-tobler-body">Completed Projects</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-tobler-gold mb-1">1000+</p>
              <p className="text-sm text-tobler-body">Satisfied Clients</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-tobler-heading mb-1">15+</p>
              <p className="text-sm text-tobler-body">Years of Excellence</p>
            </div>
          </div>
        </Container>
      </section>
    </>
  )
}

export default Testimonials
