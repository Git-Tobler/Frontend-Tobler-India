import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import VideoPanel from '../ui/VideoPanel.jsx'

/* An animated video carousel with smooth card movements and hover interactions.
   Videos scale and lift on hover, with staggered entrance animations. */

const CARD_WIDTH = 'clamp(280px, 32vw, 520px)'
const GAP = 'clamp(12px, 1.5vw, 20px)'

function ManufacturingVideoCarousel({ items = [] }) {
  const containerRef = useRef(null)
  const [hoveredIndex, setHoveredIndex] = useState(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    let animationId
    const animate = () => {
      // Gentle auto-scroll when not interacting
      const scroll = container.scrollLeft + 0.3
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
      className="flex gap-[var(--gap)] overflow-x-auto pb-4 scroll-smooth [-webkit-overflow-scrolling:touch]"
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
          >
            <VideoPanel
              publicId={item.publicId}
              label={item.label}
              shouldPlay={hoveredIndex === index}
              className={`aspect-[3/4] rounded-[16px] transition-all duration-500 ease-premium ${
                hoveredIndex === index ? 'shadow-card' : 'shadow-soft'
              }`}
            />
          </motion.div>
        </motion.div>
      ))}
    </div>
  )
}

export default ManufacturingVideoCarousel
