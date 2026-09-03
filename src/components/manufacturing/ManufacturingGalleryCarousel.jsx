import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import ResponsiveImage from '../ui/ResponsiveImage.jsx'

/* An animated gallery carousel with smooth card movements and hover interactions.
   Cards scale and lift on hover, with staggered entrance animations and a subtle
   parallax effect as they respond to scroll position. */

const CARD_WIDTH = 'clamp(280px, 32vw, 520px)'
const GAP = 'clamp(12px, 1.5vw, 20px)'

function ManufacturingGalleryCarousel({ items = [] }) {
  const containerRef = useRef(null)
  const [hoveredIndex, setHoveredIndex] = useState(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    let animationId
    const animate = () => {
      // Gentle auto-scroll when not interacting
      const scroll = container.scrollLeft + 0.5
      container.scrollLeft = scroll
      animationId = requestAnimationFrame(animate)
    }

    const handleMouseEnter = () => cancelAnimationFrame(animationId)
    const handleMouseLeave = () => {
      animationId = requestAnimationFrame(animate)
    }

    container.addEventListener('mouseenter', handleMouseEnter)
    container.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      cancelAnimationFrame(animationId)
      container.removeEventListener('mouseenter', handleMouseEnter)
      container.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className="group flex gap-[var(--gap)] overflow-x-auto pb-4 scroll-smooth [-webkit-overflow-scrolling:touch]"
      style={{ '--gap': GAP }}
    >
      {items.map((item, index) => (
        <motion.div
          key={`${item.label}-${index}`}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.6,
            delay: index * 0.08,
            ease: [0.4, 0, 0.2, 1],
          }}
          viewport={{ once: true, margin: '50px' }}
          onHoverStart={() => setHoveredIndex(index)}
          onHoverEnd={() => setHoveredIndex(null)}
          className="shrink-0"
          style={{ width: CARD_WIDTH }}
        >
          <motion.div
            animate={{
              y: hoveredIndex === index ? -8 : 0,
              scale: hoveredIndex === index ? 1.02 : 1,
            }}
            transition={{
              duration: 0.4,
              ease: [0.4, 0, 0.2, 1],
            }}
            className="relative aspect-[3/4] w-full overflow-hidden rounded-[16px] bg-tobler-bg-light shadow-soft"
          >
            <ResponsiveImage
              publicId={item.publicId}
              alt={item.label}
              label={item.publicId ? undefined : item.label}
              className="h-full w-full transition-transform duration-500 ease-premium group-hover:scale-105"
              displayWidth={640}
              sizes="(min-width: 1756px) 400px, (min-width: 768px) 22vw, 200px"
            />

            {/* Overlay gradient on hover */}
            <motion.div
              animate={{
                opacity: hoveredIndex === index ? 1 : 0,
              }}
              transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
              className="pointer-events-none absolute inset-0 bg-gradient-to-t from-tobler-blue-dark/60 via-transparent to-transparent"
            />

            {/* Label on hover */}
            <motion.span
              animate={{
                opacity: hoveredIndex === index ? 1 : 0,
                y: hoveredIndex === index ? 0 : 8,
              }}
              transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
              className="label-mono absolute bottom-4 left-4 text-white"
            >
              {item.label}
            </motion.span>
          </motion.div>
        </motion.div>
      ))}
    </div>
  )
}

export default ManufacturingGalleryCarousel
