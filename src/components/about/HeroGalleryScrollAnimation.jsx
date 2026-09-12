import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import ResponsiveImage from '../ui/ResponsiveImage.jsx'
import { MEDIA } from '../../data/media-map.js'

/* A scroll-triggered gallery animation showing Tobler's journey and milestones.
   As you scroll, images reveal with staggered animations, creating an immersive
   storytelling experience. Each milestone fades in with scale and position transforms. */

const MILESTONES = [
  {
    year: '1996',
    title: 'Swiss Roots',
    description: 'Tobler founded in Switzerland, pioneering precision scaffolding systems.',
    publicId: MEDIA.hero,
  },
  {
    year: '2011',
    title: 'India Operations',
    description: 'Brought Swiss engineering standards to manufacturing in India.',
    publicId: MEDIA.brandedMachine,
  },
  {
    year: '2015',
    title: 'Advanced Manufacturing',
    description: 'Established robotic welding and CNC capabilities.',
    publicId: MEDIA.manufacturing,
  },
  {
    year: '2020',
    title: 'Quality Excellence',
    description: 'Achieved zero-defect manufacturing standards across all product lines.',
    publicId: MEDIA.componentDetail,
  },
  {
    year: '2024',
    title: 'Global Partner',
    description: 'Supporting major infrastructure projects across Asia and beyond.',
    publicId: MEDIA.manufacturingWide,
  },
]

function MilestoneCard({ milestone, index, }) {
  const cardRef = useRef(null)
  const [cardInView, setCardInView] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setCardInView(entry.isIntersecting),
      { threshold: 0.3 }
    )
    if (cardRef.current) observer.observe(cardRef.current)
    return () => observer.disconnect()
  }, [])

  const isEven = index % 2 === 0

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 40 }}
      animate={cardInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{
        duration: 0.8,
        delay: index * 0.1,
        ease: [0.4, 0, 0.2, 1],
      }}
      className={`grid gap-8 items-center py-16 md:py-24 ${
        isEven ? 'md:grid-cols-[1fr_1.2fr]' : 'md:grid-cols-[1.2fr_1fr]'
      }`}
    >
      {/* Content */}
      <motion.div
        animate={cardInView ? { x: 0, opacity: 1 } : { x: isEven ? -40 : 40, opacity: 0 }}
        transition={{ duration: 0.8, delay: index * 0.1 }}
        className={`space-y-4 ${isEven ? 'order-1' : 'order-2 md:order-3'}`}
      >
        <motion.div
          animate={cardInView ? { scale: 1 } : { scale: 0.8 }}
          transition={{ duration: 0.6, delay: index * 0.1 }}
          className="inline-block"
        >
          <span className="label-mono text-tobler-gold text-sm font-semibold">{milestone.year}</span>
        </motion.div>

        <h3 className="text-2xl md:text-3xl font-semibold text-tobler-heading">
          {milestone.title}
        </h3>

        <p className="text-base leading-relaxed text-tobler-body max-w-lg">
          {milestone.description}
        </p>

        <motion.div
          animate={cardInView ? { scaleX: 1 } : { scaleX: 0 }}
          transition={{
            duration: 0.8,
            delay: index * 0.1 + 0.2,
            ease: [0.4, 0, 0.2, 1],
          }}
          origin="left"
          className="h-1 w-16 bg-tobler-gold"
        />
      </motion.div>

      {/* Image */}
      <motion.div
        animate={cardInView ? { scale: 1, opacity: 1 } : { scale: 0.9, opacity: 0 }}
        transition={{ duration: 0.8, delay: index * 0.1 + 0.1 }}
        className={`relative h-80 md:h-96 rounded-[16px] overflow-hidden shadow-card ${
          isEven ? 'order-2' : 'order-1 md:order-2'
        }`}
      >
        <ResponsiveImage
          publicId={milestone.publicId}
          alt={milestone.title}
          className="h-full w-full object-cover"
          displayWidth={600}
          sizes="(min-width: 768px) 45vw, 100vw"
        />

        {/* Gradient overlay */}
        <motion.div
          animate={cardInView ? { opacity: 0.2 } : { opacity: 0 }}
          transition={{ duration: 0.8, delay: index * 0.1 + 0.2 }}
          className="absolute inset-0 bg-gradient-to-t from-tobler-blue-dark/40 to-transparent"
        />
      </motion.div>
    </motion.div>
  )
}

function HeroGalleryScrollAnimation() {
  const containerRef = useRef(null)
  const [containerInView, setContainerInView] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setContainerInView(entry.isIntersecting),
      { threshold: 0.1 }
    )
    if (containerRef.current) observer.observe(containerRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={containerRef}
      className="relative bg-white py-12 md:py-20 overflow-hidden"
    >
      {/* Background accent */}
      <motion.div
        animate={containerInView ? { opacity: 0.05 } : { opacity: 0 }}
        transition={{ duration: 1 }}
        className="absolute inset-0 bg-gradient-to-b from-tobler-gold via-transparent to-transparent pointer-events-none"
      />

      <div className="relative max-w-6xl mx-auto px-6">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={containerInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8 }}
          className="mb-16 md:mb-24 text-center"
        >
          <h2 className="text-4xl md:text-5xl font-semibold text-tobler-heading mb-6">
            Decades of <span className="text-tobler-gold">precision</span> and <span className="text-tobler-gold">innovation</span>
          </h2>
          <p className="text-lg text-tobler-body max-w-2xl mx-auto leading-relaxed">
            From Swiss engineering roots to global manufacturing, witness the evolution of Tobler.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Center line (visible on desktop) */}
          <motion.div
            animate={containerInView ? { scaleY: 1 } : { scaleY: 0 }}
            transition={{ duration: 1.2, ease: [0.4, 0, 0.2, 1] }}
            origin="top"
            className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-tobler-gold via-tobler-gold/30 to-transparent"
          />

          {/* Milestones */}
          <div className="space-y-0">
            {MILESTONES.map((milestone, index) => (
              <MilestoneCard
                key={milestone.year}
                milestone={milestone}
                index={index}
                isInView={containerInView}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default HeroGalleryScrollAnimation
