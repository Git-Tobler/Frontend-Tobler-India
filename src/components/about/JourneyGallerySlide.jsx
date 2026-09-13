import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import ResponsiveImage from '../ui/ResponsiveImage.jsx'
import { MEDIA } from '../../data/media-map.js'

/* Hero gallery with left-side sliding images.
   As you scroll down, images on the left slide and transition smoothly.
   Right side shows timeline content that stays fixed while you scroll. */

const JOURNEY_ITEMS = [
  {
    year: '1996',
    title: 'Swiss Roots',
    description: 'Tobler founded in Switzerland with a vision to revolutionize scaffolding systems through precision engineering and innovative design.',
    publicId: MEDIA.hero,
  },
  {
    year: '2011',
    title: 'India Operations',
    description: 'Established manufacturing in India, bringing Swiss engineering standards to local production while maintaining international quality benchmarks.',
    publicId: MEDIA.brandedMachine,
  },
  {
    year: '2015',
    title: 'Advanced Manufacturing',
    description: 'Invested in robotic welding and CNC capabilities to achieve unprecedented precision and consistency in every component produced.',
    publicId: MEDIA.manufacturing,
  },
  {
    year: '2020',
    title: 'Quality Excellence',
    description: 'Achieved zero-defect manufacturing standards across all product lines, setting new industry benchmarks for reliability and performance.',
    publicId: MEDIA.componentDetail,
  },
  {
    year: '2024',
    title: 'Global Partner',
    description: 'Supporting major infrastructure projects across Asia, Europe and beyond as the trusted partner for premium scaffolding solutions.',
    publicId: MEDIA.manufacturingWide,
  },
]

function JourneyGallerySlide() {
  const containerRef = useRef(null)
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const handleScroll = () => {
      const rect = container.getBoundingClientRect()
      const elementTop = rect.top
      const viewportHeight = window.innerHeight

      // Calculate progress: 0 when element is at bottom, 1 when at top
      const progress = Math.max(0, Math.min(1, 1 - elementTop / viewportHeight))

      // Calculate active index based on scroll progress
      const newIndex = Math.min(
        Math.floor(progress * JOURNEY_ITEMS.length),
        JOURNEY_ITEMS.length - 1
      )
      setActiveIndex(newIndex)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen bg-white py-16 md:py-24"
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-20 text-center"
        >
          <h2 className="text-4xl md:text-5xl font-semibold text-tobler-heading">
            Three Decades of <span className="text-tobler-gold">Engineering Excellence</span>
          </h2>
        </motion.div>

        {/* Main layout: Left gallery + Right timeline */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 min-h-[800px]">
          {/* LEFT SIDE: Sliding Gallery */}
          <div className="relative hidden md:block">
            <div className="sticky top-20 h-[500px] rounded-[16px] overflow-hidden shadow-card">
              {/* Image slides */}
              {JOURNEY_ITEMS.map((item, index) => (
                <motion.div
                  key={item.year}
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity: index === activeIndex ? 1 : index < activeIndex ? 0 : 0,
                  }}
                  transition={{ duration: 0.6 }}
                  className="absolute inset-0"
                >
                  <ResponsiveImage
                    publicId={item.publicId}
                    alt={item.title}
                    className="h-full w-full object-cover"
                    displayWidth={600}
                    sizes="(min-width: 768px) 40vw, 100vw"
                  />
                </motion.div>
              ))}

              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-tobler-blue-dark/40 via-transparent to-transparent" />

              {/* Year badge */}
              <motion.div
                animate={{
                  opacity: 1,
                }}
                className="absolute bottom-6 left-6 z-10"
              >
                <span className="inline-block text-white text-5xl font-bold font-mondwest">
                  {JOURNEY_ITEMS[activeIndex].year}
                </span>
              </motion.div>
            </div>
          </div>

          {/* RIGHT SIDE: Timeline Content */}
          <div className="space-y-12">
            {JOURNEY_ITEMS.map((item, index) => (
              <motion.div
                key={item.year}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.1,
                }}
                viewport={{ once: true, margin: '-100px' }}
                onClick={() => setActiveIndex(index)}
                className={`cursor-pointer p-6 rounded-[12px] transition-all duration-300 ${
                  index === activeIndex
                    ? 'bg-tobler-surface border-2 border-tobler-gold'
                    : 'bg-white border border-tobler-border-light hover:border-tobler-border'
                }`}
              >
                <div className="flex items-start gap-4">
                  {/* Year indicator */}
                  <motion.div
                    animate={{
                      scale: index === activeIndex ? 1.1 : 1,
                      color: index === activeIndex ? '#D4AF37' : '#999',
                    }}
                    className="figure-mono text-2xl font-bold shrink-0 w-16"
                  >
                    {item.year}
                  </motion.div>

                  {/* Content */}
                  <div className="flex-1">
                    <motion.h3
                      animate={{
                        color: index === activeIndex ? '#0D212C' : '#666',
                      }}
                      className="text-xl font-semibold mb-2"
                    >
                      {item.title}
                    </motion.h3>

                    <p
                      className={`text-sm leading-relaxed transition-colors ${
                        index === activeIndex
                          ? 'text-tobler-body'
                          : 'text-tobler-muted'
                      }`}
                    >
                      {item.description}
                    </p>

                    {/* Active indicator line */}
                    {index === activeIndex && (
                      <motion.div
                        layoutId="activeIndicator"
                        className="h-1 bg-tobler-gold mt-4 w-12 rounded-full"
                      />
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* MOBILE: Full-width gallery above timeline */}
          <div className="md:hidden col-span-1">
            <div className="h-[400px] rounded-[16px] overflow-hidden shadow-card mb-8">
              <motion.div
                animate={{
                  opacity: 1,
                }}
                className="relative w-full h-full"
              >
                <ResponsiveImage
                  publicId={JOURNEY_ITEMS[activeIndex].publicId}
                  alt={JOURNEY_ITEMS[activeIndex].title}
                  className="h-full w-full object-cover"
                  displayWidth={400}
                  sizes="100vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-tobler-blue-dark/40 to-transparent" />
                <div className="absolute bottom-6 left-6">
                  <span className="text-white text-4xl font-bold font-mondwest">
                    {JOURNEY_ITEMS[activeIndex].year}
                  </span>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default JourneyGallerySlide
