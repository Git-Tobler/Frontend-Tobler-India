import SEO from '../../components/common/SEO.jsx'
import LeadershipSection from '../../components/sections/LeadershipSection.jsx'
import TimelineItem from '../../components/ui/TimelineItem.jsx'
import StudioMarquee from '../../components/studio/StudioMarquee.jsx'
import ValuesCarousel from '../../components/studio/ValuesCarousel.jsx'
import PartnerSection from '../../components/studio/PartnerSection.jsx'
import AnimatedHeroGallery from '../../components/about/AnimatedHeroGallery.jsx'
import WhoWeAre from '../../components/about/WhoWeAre.jsx'
import OurPhilosophy from '../../components/about/OurPhilosophy.jsx'
import EngineeringPresence from '../../components/about/EngineeringPresence.jsx'
import { useInViewAnimation } from '../../hooks/useInViewAnimation.js'
import { TIMELINE } from '../../data/team.js'

/* About, rebuilt as a single studio-style landing page.

   It runs on its own visual language — white throughout, a narrow centred
   hero, oversized serif accents, pill buttons with layered shadows — rather
   than the section-band layout the rest of the site uses. Everything on it is
   still real Tobler content and real Cloudinary photography.

   The section ids (our-story, swiss-engineering, india-presence, philosophy,
   values, leadership, timeline, certifications) are the redirect targets for
   the retired /about/* routes in AppRoutes.jsx. Do not rename them.

   The page opens on the dark brand-palette "Who We Are" band rather than the
   old centred white hero — that hero's eyebrow, headline, story copy and both
   buttons now live inside WhoWeAre, so the copy moved rather than doubled. */

function Leadership() {
  return (
    <LeadershipSection
      title="The team behind the growth"
      description="Board, directors and general managers steering Tobler India's engineering, manufacturing and delivery."
    />
  )
}

function Timeline() {
  const [ref, inView] = useInViewAnimation()

  return (
    <section id="timeline" ref={ref} className="mx-auto max-w-2xl scroll-mt-28 px-6 py-12">
      <h2
        className={`text-center text-[32px] leading-[1.1] tracking-tight text-[#0D212C] md:text-[40px] lg:text-[44px] ${
          inView ? 'animate-fade-in-up' : 'opacity-0'
        }`}
        style={{ animationDelay: '0.1s' }}
      >
        Three decades of <span className="font-mondwest">milestones</span>
      </h2>

      <div
        className={`mt-12 ${inView ? 'animate-fade-in-up' : 'opacity-0'}`}
        style={{ animationDelay: '0.2s' }}
      >
        {TIMELINE.map((item, index) => (
          <TimelineItem
            key={item.year}
            item={item}
            index={index}
            isLast={index === TIMELINE.length - 1}
          />
        ))}
      </div>
    </section>
  )
}

function About() {
  return (
    <div className="font-montreal bg-white">
      <SEO
        title="About Us"
        description="Thirty years of Swiss engineering, manufactured in India — our story, standards, leadership and milestones."
        path="/about"
      />

      <WhoWeAre />
      <EngineeringPresence />
      <Leadership />
      <AnimatedHeroGallery />
      <OurPhilosophy />
      <StudioMarquee />
      <ValuesCarousel />
      <Timeline />

      <PartnerSection />
    </div>
  )
}

export default About
