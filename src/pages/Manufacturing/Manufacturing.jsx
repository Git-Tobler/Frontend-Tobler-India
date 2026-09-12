import { useState } from 'react'
import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import SEO from '../../components/common/SEO.jsx'
import Container from '../../components/common/Container.jsx'
import SectionTitle from '../../components/common/SectionTitle.jsx'
import Button from '../../components/common/Button.jsx'
import Reveal from '../../components/ui/Reveal.jsx'
import ResponsiveImage from '../../components/ui/ResponsiveImage.jsx'
import ReadMore from '../../components/ui/ReadMore.jsx'
import FactoryPanels from '../../components/manufacturing/FactoryPanels.jsx'
import ManufacturingGalleryCarousel from '../../components/manufacturing/ManufacturingGalleryCarousel.jsx'
import ManufacturingVideoCarousel from '../../components/manufacturing/ManufacturingVideoCarousel.jsx'
import MediaSequenceCarousel from '../../components/manufacturing/MediaSequenceCarousel.jsx'
import { MEDIA } from '../../data/media-map.js'
import {
  CAPABILITIES,
  FACILITY_STATS,
  GALLERY,
  GALLERY_CAROUSEL,
  VIDEOS_CAROUSEL,
  PROCESS_STEPS,
  QUALITY_CHECKS,
} from '../../data/manufacturing.js'

function Hero() {
  return (
    <section className="overflow-hidden bg-white pb-16 pt-16 md:pb-24 md:pt-24">
      <Container className="text-center">
        <Reveal>
          Manufacturing
        </Reveal>

        <Reveal delay={80}>
          <h1 className="mx-auto mt-6 max-w-4xl text-h1 text-tobler-heading">
            Built to Swiss
            <br className="hidden sm:block" /> tolerances, <span className="text-tobler-blue">in India</span>
          </h1>
        </Reveal>

        <Reveal delay={160}>
          <p className="mx-auto mt-6 max-w-reading text-base leading-relaxed normal-case text-tobler-body md:text-lg">
            Every ledger, standard and panel that leaves our floor is cut, welded, galvanised and
            tested against the same drawings used in Switzerland,so a component made this year
            fits a system built a decade ago.
          </p>
        </Reveal>
      </Container>

      {/* Full-bleed — the conveyor runs off both edges of the screen, so the
          fan silhouette reads as a passing strip rather than a framed row. */}
      <div className="mt-10 md:mt-14">
        <FactoryPanels />
      </div>

      <Container className="mt-14 flex flex-col items-center gap-6 text-center md:mt-20">
        <p className="max-w-reading text-sm leading-relaxed normal-case text-tobler-muted">
          One facility, one standard. Engineering, fabrication, coating and testing sit under a
          single roof, which is why capability questions get answered by the people who build the
          part rather than by a distributor.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <Button to="/contact#rfq" variant="primary" size="lg">
            Request a Quotation
          </Button>
          <Button to="/products" variant="white" size="lg" icon={false}>
            Explore Solutions
          </Button>
        </div>
      </Container>
    </section>
  )
}

function Story() {
  return (
    <section id="story" className="scroll-mt-28 border-t border-tobler-border-light bg-white py-20 md:py-28">
      <Container className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:gap-20">
        <Reveal>
          Our Story
          <h2 className="mt-5 text-h2 text-tobler-heading">
            Driven by Swiss Engineering Legacy
          </h2>
        </Reveal>

        <Reveal delay={120} className="space-y-6 text-base leading-relaxed normal-case text-tobler-body md:text-lg">
          <p>
            Tobler began manufacturing precision scaffolding in Switzerland in 1996. The systems
            worked because the tolerances were unforgiving — components that interlock reliably on
            the fiftieth reuse, not just the first.
          </p>
          <p>
            Bringing that to India in 2011 was not a matter of licensing a drawing set. It meant
            transferring tooling, weld procedures, inspection routines and the habit of rejecting
            anything out of tolerance, then building a facility capable of holding to them at scale.
          </p>
          <p>
            The result is a plant that serves Indian infrastructure and high-rise projects on local
            lead times, without a second, softer standard for the local market.
          </p>
        </Reveal>
      </Container>
    </section>
  )
}

function SwissIndian() {
  const columns = [
    {
      title: 'Swiss Engineering',
      points: [
        'System geometry, load tables and drawings originate with the Swiss engineering team.',
        'Compliance designed against EN 12810, EN 12811 and EN 12812 from the outset.',
        'Tooling and weld procedures specified centrally, not reinterpreted locally.',
      ],
    },
    {
      title: 'Indian Manufacturing',
      points: [
        'Production, galvanising and testing carried out in-house at our own facility.',
        'Local steel sourcing under mill-certificate control, cutting lead times and cost.',
        'Site support and spares delivered from the same plant that made the component.',
      ],
    },
  ]

  return (
    <section id="swiss-india" className="scroll-mt-28 bg-tobler-surface py-20 md:py-28">
      <Container>
        <Reveal>
          <SectionTitle
            align="center"
            title={
              <>
                Swiss engineering,
                <span className="block">Indian manufacturing</span>
              </>
            }
            description="Two halves of the same process. Neither is a compromise for the other."
          />
        </Reveal>

        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {columns.map((column, index) => (
            <Reveal key={column.title} delay={index * 120}>
              <div className="h-full rounded-[14px] border border-tobler-border bg-white p-8 shadow-soft md:p-10">
                <h3 className="text-h5 text-tobler-heading">{column.title}</h3>
                <ul className="mt-6 space-y-4">
                  {column.points.map((point) => (
                    <li
                      key={point}
                      className="flex gap-3 text-sm leading-relaxed normal-case text-tobler-body"
                    >
                      <span
                        className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-tobler-blue"
                        aria-hidden="true"
                      />
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  )
}

function Facility() {
  const [activeCapability, setActiveCapability] = useState(0)

  return (
    <section id="facility" className="scroll-mt-28 bg-white py-20 md:py-28">
      <Container>
        <Reveal>
        The Facility
          <h2 className="mt-5 max-w-2xl text-h2 text-tobler-heading">A modern production floor</h2>
        </Reveal>

        <Reveal delay={100}>
          <dl className="mt-12 grid grid-cols-2 gap-px overflow-hidden rounded-[14px] border border-tobler-border bg-tobler-border lg:grid-cols-4">
            {FACILITY_STATS.map((stat) => (
              <div key={stat.label} className="bg-white p-6 md:p-8">
                <dt className="label-mono text-tobler-muted">{stat.label}</dt>
                <dd className="figure-mono mt-3 text-3xl text-tobler-heading md:text-4xl">
                  {stat.figure}
                  {stat.unit && (
                    <span className="ml-1 text-base text-tobler-muted">{stat.unit}</span>
                  )}
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>

        <div className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)]">
          <Reveal delay={80} className="grid gap-4 sm:grid-cols-2 auto-rows-fr">
            {CAPABILITIES.map((capability, index) => (
              <div
                key={capability.id}
                role="button"
                tabIndex={0}
                onClick={() => setActiveCapability(index)}
                onKeyDown={(event) => {
                  if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault()
                    setActiveCapability(index)
                  }
                }}
                className={`flex cursor-pointer flex-col rounded-[14px] border p-6 text-left transition-all duration-500 ease-premium focus:outline-none focus-visible:ring-2 focus-visible:ring-tobler-blue ${
                  index === activeCapability
                    ? 'border-tobler-blue bg-white shadow-card'
                    : 'border-tobler-border-light bg-tobler-surface hover:shadow-soft'
                }`}
              >
                <h3 className="text-base text-tobler-heading">{capability.title}</h3>
                <ReadMore className="mt-2 text-sm" previewLines={2}>
                  {capability.description}
                </ReadMore>
              </div>
            ))}
          </Reveal>

          <Reveal delay={160} className="h-full p-0">
            <MediaSequenceCarousel
              items={CAPABILITIES}
              activeIndex={activeCapability}
              onIndexChange={setActiveCapability}
            />
          </Reveal>
        </div>
      </Container>
    </section>
  )
}

function Quality() {
  return (
    <section id="quality" className="scroll-mt-28 bg-tobler-surface py-20 md:py-28">
      <Container className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] lg:items-start lg:gap-20">
        <Reveal className="lg:sticky lg:top-28">
          Quality Control
          <h2 className="mt-5 text-h2 text-tobler-heading">Tested before it is trusted</h2>
          <p className="mt-6 text-base leading-relaxed normal-case text-tobler-body">
            Inspection is not a final gate here, it runs at four points, each with its own record.
            A batch that fails at any of them does not move forward.
          </p>

          {/* The proof-load rig rather than a component close-up — this
              section is about testing, and the rig is the only frame in the
              library that actually shows a part being tested. */}
          <ResponsiveImage
            publicId={'5_nvvzmz'}
            alt="A Tobler component under proof load on the test rig"
            className="mt-8 aspect-[4/3] w-full rounded-[14px]"
            displayWidth={720}
            sizes="(min-width: 1024px) 40vw, 100vw"

          />
        </Reveal>

        <div className="space-y-4">
          {QUALITY_CHECKS.map((check, index) => (
            <Reveal key={check.stage} delay={index * 90}>
              <div className="flex gap-5 rounded-[14px] border border-tobler-border bg-white p-7 transition-all duration-500 ease-premium hover:-translate-y-0.5 hover:shadow-card">
                <span className="figure-mono shrink-0 text-sm text-tobler-blue">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <div>
                  <h3 className="text-base text-tobler-heading">{check.stage}</h3>
                  <p className="mt-2 text-sm leading-relaxed normal-case text-tobler-body">
                    {check.detail}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  )
}

function Process() {
  return (
    <section id="process" className="scroll-mt-28 bg-tobler-surface py-20 md:py-28">
      <Container>
        <Reveal>
          Process
          <h2 className="mt-5 max-w-2xl text-h2 text-tobler-heading">
            From drawing release to dispatch
          </h2>
        </Reveal>

        <ol className="mt-14 grid gap-y-10 md:grid-cols-2 md:gap-x-12 lg:grid-cols-4 lg:gap-x-8">
          {PROCESS_STEPS.map((item, index) => (
            <Reveal key={item.step} delay={index * 70} as="li" className="relative pt-6">
              <span
                className="absolute inset-x-0 top-0 h-px bg-tobler-border"
                aria-hidden="true"
              />
              <span
                className="absolute left-0 top-0 h-px w-10 bg-tobler-blue"
                aria-hidden="true"
              />
              <span className="figure-mono text-sm text-tobler-muted">
                {String(index + 1).padStart(2, '0')}
              </span>
              <h3 className="mt-3 text-base text-tobler-heading">{item.step}</h3>
              <p className="mt-2 text-sm leading-relaxed normal-case text-tobler-body">
                {item.description}
              </p>
            </Reveal>
          ))}
        </ol>
      </Container>
    </section>
  )
}

function Gallery() {
  return (
    <section id="gallery" className="scroll-mt-28 bg-white py-20 md:py-28">
      <Container>
        <Reveal className="flex flex-wrap items-end justify-between gap-6">
          <div>
            Gallery
            <h2 className="mt-5 text-h2 text-tobler-heading">Inside the factory</h2>
          </div>

          <Link
            to="/projects"
            className="label-mono inline-flex items-center gap-2 text-tobler-blue transition-colors duration-300 hover:text-tobler-blue-dark"
          >
            See systems on site
            <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </Reveal>

        <div className="mt-12 grid auto-rows-[200px] grid-cols-2 gap-4 md:auto-rows-[240px] lg:grid-cols-4">
          {GALLERY.map((item, index) => (
            <Reveal
              key={item.label}
              delay={index * 60}
              className={`group ${index === 0 ? 'col-span-2 row-span-2' : ''} ${
                index === 3 ? 'lg:col-span-2' : ''
              }`}
            >
              <div className="relative h-full overflow-hidden rounded-[14px] shadow-soft transition-all duration-500 ease-premium hover:-translate-y-1 hover:shadow-card">
                <ResponsiveImage
                  publicId={item.publicId}
                  alt={item.label}
                  label={item.publicId ? undefined : item.label}
                  className="h-full w-full transition-transform duration-500 ease-premium group-hover:scale-[1.04]"
                  displayWidth={index === 0 ? 1000 : 640}
                  sizes="(min-width: 1024px) 25vw, 50vw"
                />
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 bg-gradient-to-t from-tobler-blue-dark/50 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                />
                <span className="label-mono absolute bottom-4 left-4 text-white opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                  {item.label}
                </span>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  )
}

function GalleryCarousel() {
  return (
    <section id="gallery-carousel" className="scroll-mt-28 border-t border-tobler-border-light bg-tobler-surface py-20 md:py-28">
      <Container>
        <Reveal>
          Production Moments
          <h2 className="mt-5 text-h2 text-tobler-heading">Manufacturing in motion</h2>
          <p className="mt-4 max-w-reading text-base leading-relaxed normal-case text-tobler-body md:text-lg">
            A closer look at the processes, precision and people behind every Tobler system.
          </p>
        </Reveal>

        <Reveal delay={100} className="mt-12">
          <ManufacturingGalleryCarousel items={GALLERY_CAROUSEL} />
        </Reveal>
      </Container>
    </section>
  )
}

function VideosCarousel() {
  return (
    <section id="videos-carousel" className="scroll-mt-28 bg-white py-20 md:py-28">
      <Container>
        <Reveal>
          Video Library
          <h2 className="mt-5 text-h2 text-tobler-heading">See the process in action</h2>
          <p className="mt-4 max-w-reading text-base leading-relaxed normal-case text-tobler-body md:text-lg">
            Watch how our Swiss-engineered systems are manufactured and tested to meet the highest standards.
          </p>
        </Reveal>

        <Reveal delay={100} className="mt-12">
          <ManufacturingVideoCarousel items={VIDEOS_CAROUSEL} />
        </Reveal>
      </Container>
    </section>
  )
}

function Manufacturing() {
  return (
    <>
      <SEO
        title="Manufacturing"
        description="Inside Tobler India's manufacturing: Swiss-specified tooling, robotic welding, hot-dip galvanising and four-stage quality control behind every scaffolding and formwork system."
        path="/manufacturing"
      />

      <Hero />
      <Story />
      <SwissIndian />
      <Facility />
      <Quality />
      <Process />
      <Gallery />
      <GalleryCarousel />
      <VideosCarousel />
    </>
  )
}

export default Manufacturing
