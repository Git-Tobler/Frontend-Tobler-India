import { CheckCircle2, Factory, Users, Truck } from 'lucide-react'
import SEO from '../../components/common/SEO.jsx'
import PageHero from '../../components/layout/PageHero.jsx'
import Container from '../../components/common/Container.jsx'
import SectionTitle from '../../components/common/SectionTitle.jsx'
import CTASection from '../../components/sections/CTASection.jsx'
import CertificationsSection from '../../components/sections/CertificationsSection.jsx'
import TeamMemberCard from '../../components/ui/TeamMemberCard.jsx'
import TimelineItem from '../../components/ui/TimelineItem.jsx'
import { STATS } from '../../constants/siteConfig.js'
import { VALUES, LEADERSHIP, TIMELINE } from '../../constants/team.js'

const SUB_NAV = [
  { id: 'our-story', label: 'Our Story' },
  { id: 'swiss-engineering', label: 'Swiss Engineering' },
  { id: 'india-presence', label: 'India Presence' },
  { id: 'philosophy', label: 'Philosophy' },
  { id: 'values', label: 'Values' },
  { id: 'leadership', label: 'Leadership' },
  { id: 'timeline', label: 'Timeline' },
  { id: 'certifications', label: 'Certifications' },
]

const PRINCIPLES = [
  { title: 'Exacting Tolerances', description: 'Every component is manufactured to precise dimensional tolerances, ensuring consistent fit and performance across every batch.' },
  { title: 'Rigorous Testing', description: 'Systems undergo extensive load testing and structural validation before entering production.' },
  { title: 'Continuous Refinement', description: 'Decades of field feedback feed directly into ongoing product engineering and design improvements.' },
  { title: 'Compliance by Design', description: 'Products are engineered from the outset to meet EN 12810–12812 European structural standards.' },
]

const PRESENCE = [
  { icon: Factory, title: 'Local Manufacturing', description: 'Dedicated production facilities delivering Swiss-engineered systems built for Indian site conditions.' },
  { icon: Users, title: 'Engineering Support', description: 'Regional technical teams providing on-site guidance across every major construction hub in India.' },
  { icon: Truck, title: 'Nationwide Logistics', description: 'Reliable supply chain and delivery network supporting projects across every state.' },
]

function SubNav() {
  return (
    <div className="sticky top-[65px] md:top-[68px] z-40 bg-white/95 backdrop-blur-md border-b border-tobler-border">
      <Container>
        <nav aria-label="On this page" className="flex items-center gap-6 overflow-x-auto py-4">
          {SUB_NAV.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className="label-mono text-tobler-body/80 hover:text-tobler-gold transition-colors whitespace-nowrap shrink-0"
            >
              {item.label}
            </a>
          ))}
        </nav>
      </Container>
    </div>
  )
}

function About() {
  return (
    <>
      <SEO
        title="About Us"
        description="Learn about our Swiss engineering heritage, values, leadership and manufacturing presence."
        path="/about"
      />
      <PageHero
        eyebrow="About Us"
        title="A Global Engineering Legacy, Built for India"
        description="We bring together decades of Swiss engineering discipline and a deep understanding of local construction needs to deliver formwork and scaffolding systems the industry can rely on."
        breadcrumbItems={[{ label: 'About' }]}
      />

      <SubNav />

      {/* Who We Are */}
      <section className="py-24 md:py-30">
        <Container>
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <SectionTitle
              eyebrow="Who We Are"
              title="Engineering progress. Built on trust."
              description="Tobler is an engineering-led company dedicated to providing scaffolding and formwork systems for modern construction. By combining technical expertise, quality manufacturing, and practical site experience, we help contractors and developers execute projects with confidence.
              Every solution reflects our commitment to safety, precision, and dependable performance across every stage of construction."
            />
            <div className="grid grid-cols-2 gap-6">
              {STATS.map((stat) => (
                <div key={stat.label} className="p-6 rounded-card bg-tobler-bg-light border border-tobler-border">
                  <p className="figure-mono text-h4 text-tobler-gold font-extrabold mb-1">{stat.value}</p>
                  <p className="text-sm text-tobler-body">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Our Story */}
      <section id="our-story" className="py-24 md:py-30 bg-tobler-bg-light">
        <Container>
          <SectionTitle eyebrow="Our Story" title="Three Decades of Engineering Excellence" />
          <div className="prose-block mt-10">
            <p>
              For more than 30 years, Tobler has continued to evolve with one clear focus, delivering dependable construction systems backed by engineering expertise and trusted partnerships. From our Swiss engineering roots to our expanding presence in India, every milestone reflects our commitment to helping customers build with greater confidence.
            </p>
            <p>
              Today, we carry that legacy forward — supporting infrastructure,
              commercial, residential and industrial projects across the country with systems
              engineered to a single, uncompromising standard.
            </p>
          </div>
        </Container>
      </section>

      {/* Swiss Engineering */}
      <section id="swiss-engineering" className="py-24 md:py-30">
        <Container>
          <SectionTitle
            eyebrow="Swiss Engineering"
            title="Precision that builds confidence"
            description="Swiss engineering is more than our heritage. It defines how we think, design, and deliver. Every Tobler system is developed with a focus on precision, reliability, and practical performance, helping construction professionals work more safely and efficiently on every project."
          />
          <div className="grid md:grid-cols-2 gap-6 mt-14">
            {PRINCIPLES.map((item) => (
              <div key={item.title} className="flex gap-4 p-7 rounded-card border border-tobler-border bg-white transition-all duration-300 hover:shadow-card hover:-translate-y-1">
                <CheckCircle2 size={24} className="text-tobler-gold shrink-0 mt-1" />
                <div>
                  <h3 className="text-lg font-bold text-tobler-heading mb-2">{item.title}</h3>
                  <p className="text-tobler-body leading-relaxed normal-case">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* India Presence */}
      <section id="india-presence" className="py-24 md:py-30 bg-tobler-bg-light">
        <Container>
          <SectionTitle
            eyebrow="India Presence"
            title="Built for India's Growth."
            description="India's construction industry is transforming at an unprecedented pace. Tobler combines global engineering expertise with a strong local presence to support this growth through dependable scaffolding and formwork systems, responsive service, and technical guidance tailored to modern construction."
          />
          <div className="grid md:grid-cols-3 gap-6 mt-14">
            {PRESENCE.map(({ icon: Icon, title, description }) => (
              <div key={title} className="p-8 rounded-card border border-tobler-border bg-white text-center transition-all duration-300 hover:shadow-card hover:-translate-y-1">
                <div className="w-14 h-14 bg-tobler-heading flex items-center justify-center mx-auto mb-6">
                  <Icon size={22} className="text-white" strokeWidth={1.5} />
                </div>
                <h3 className="text-lg mb-3">{title}</h3>
                <p className="text-tobler-body leading-relaxed normal-case">{description}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Philosophy */}
      <section id="philosophy" className="py-24 md:py-30">
        <Container>
          <SectionTitle eyebrow="Our Philosophy" title="Design for Reliability, Engineer for Certainty - What drives every decision." />
          <div className="mt-10 overflow-hidden rounded-card border border-tobler-border bg-white shadow-soft">
  <table className="w-full border-collapse">
    <thead>
      <tr className="bg-tobler-bg-light">
        <th className="w-1/2 border-r border-tobler-border px-8 py-5 text-center text-lg font-display font-semibold text-tobler-heading">
          Vision
        </th>
        <th className="w-1/2 px-8 py-5 text-center text-lg font-display font-semibold text-tobler-heading">
          Mission
        </th>
      </tr>
    </thead>

    <tbody>
      <tr>
        <td className="border-r border-tobler-border px-8 py-8 align-top text-base leading-8 text-tobler-body">
          To become the trusted engineering partner for construction
          professionals by delivering innovative scaffolding and formwork
          solutions that set new benchmarks for safety, quality, and
          performance.
        </td>

        <td className="px-8 py-8 align-top text-base leading-8 text-tobler-body">
          To support every project with reliable systems, engineering
          expertise, and long-term partnerships that help customers build
          efficiently and confidently.
        </td>
      </tr>
    </tbody>
  </table>
</div>
        </Container>
      </section>

      {/* Values */}
      <section id="values" className="py-24 md:py-30 bg-tobler-bg-light">
        <Container>
          <SectionTitle align="center" eyebrow="Our Values" title="The Principles That Shape Tobler" />
          <div className="mt-10 overflow-x-auto">
  <table className="w-full border-collapse border border-tobler-border bg-white">
    <thead>
      <tr className="bg-tobler-bg-light">
        <th className="w-1/6 border border-tobler-border px-5 py-4 text-center font-display text-lg font-semibold text-tobler-heading">
          Engineering Excellence
        </th>
        <th className="w-1/6 border border-tobler-border px-5 py-4 text-center font-display text-lg font-semibold text-tobler-heading">
          Integrity
        </th>
        <th className="w-1/6 border border-tobler-border px-5 py-4 text-center font-display text-lg font-semibold text-tobler-heading">
          Safety
        </th>
        <th className="w-1/6 border border-tobler-border px-5 py-4 text-center font-display text-lg font-semibold text-tobler-heading">
          Innovation
        </th>
        <th className="w-1/6 border border-tobler-border px-5 py-4 text-center font-display text-lg font-semibold text-tobler-heading">
          Customer Partnership
        </th>
        <th className="w-1/6 border border-tobler-border px-5 py-4 text-center font-display text-lg font-semibold text-tobler-heading">
          Quality Without Compromise
        </th>
      </tr>
    </thead>

    <tbody>
      <tr>
        <td className="border border-tobler-border px-5 py-5 align-top text-base leading-7 text-tobler-body">
          We believe precision creates confidence.
        </td>

        <td className="border border-tobler-border px-5 py-5 align-top text-base leading-7 text-tobler-body">
          We build relationships through honesty and accountability.
        </td>

        <td className="border border-tobler-border px-5 py-5 align-top text-base leading-7 text-tobler-body">
          Every decision begins with protecting people on site.
        </td>

        <td className="border border-tobler-border px-5 py-5 align-top text-base leading-7 text-tobler-body">
          We continuously improve our systems to meet evolving construction needs.
        </td>

        <td className="border border-tobler-border px-5 py-5 align-top text-base leading-7 text-tobler-body">
          Success is built through collaboration and long-term trust.
        </td>

        <td className="border border-tobler-border px-5 py-5 align-top text-base leading-7 text-tobler-body">
          Consistency is the standard behind every solution we deliver.
        </td>
      </tr>
    </tbody>
  </table>
</div>
        </Container>
      </section>

      {/* Leadership */}
      <section id="leadership" className="py-24 md:py-30">
        <Container>
          <SectionTitle align="center" eyebrow="Leadership" title="The Team Behind Our Growth" />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-7 mt-14">
            {LEADERSHIP.map((member) => (
              <TeamMemberCard key={member.name} member={member} />
            ))}
          </div>
        </Container>
      </section>

      {/* Timeline */}
      <section id="timeline" className="py-24 md:py-30 bg-tobler-bg-light">
        <Container>
          <SectionTitle align="center" eyebrow="Our Timeline" title="Three Decades of Engineering Milestones" />
          <div className="max-w-2xl mx-auto mt-14">
            {TIMELINE.map((item, idx) => (
              <TimelineItem
                key={item.year}
                item={item}
                index={idx}
                isLast={idx === TIMELINE.length - 1}
              />
            ))}
          </div>
        </Container>
      </section>

      {/* Certifications */}
      <div id="certifications">
        <CertificationsSection />
      </div>

      <CTASection />
    </>
  )
}

export default About
