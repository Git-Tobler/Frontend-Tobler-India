import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import ResponsiveImage from '../ui/ResponsiveImage.jsx'
import { MEDIA } from '../../data/media-map.js'

/* Animated Hero Gallery matching Reference 4 layout.
   Large hero image top-left, small gallery images top-right and bottom.
   Text content centered in the middle. */

/* Twelve slots, twelve different frames. The two lists used to share the same
   six ids, so the strip along the bottom was a second copy of whatever was
   cycling above it. */
const GALLERY_ITEMS = [
  { id: 1, publicId: MEDIA.plantLineWide, label: 'Production Floor' },
  { id: 2, publicId: MEDIA.cncCentre, label: 'CNC Machining' },
  { id: 3, publicId: MEDIA.weldingArc, label: 'Precision Welding' },
  { id: 4, publicId: MEDIA.componentDetail, label: 'Component Inspection' },
  { id: 5, publicId: MEDIA.panelTeam, label: 'Team Expertise' },
  { id: 6, publicId: MEDIA.towerAerial, label: 'Systems On Site' },
]

const BOTTOM_IMAGES = [
  { id: 'b1', publicId: MEDIA.pressBrake, size: 'small' },
  { id: 'b2', publicId: MEDIA.weldingSuit, size: 'small' },
  { id: 'b3', publicId: MEDIA.extrusionStack, size: 'small' },
  { id: 'b4', publicId: MEDIA.assemblyBay, size: 'medium' },
  { id: 'b5', publicId: MEDIA.panelStacks, size: 'small' },
  { id: 'b6', publicId: MEDIA.hero, size: 'small' },
]

function AnimatedHeroGallery() {
  const [activeIndex, setActiveIndex] = useState(0)
  const autoPlayRef = useRef(null)

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % GALLERY_ITEMS.length)
    }, 4000)

    autoPlayRef.current = timer
    return () => clearInterval(timer)
  }, [])

  const activeItem = GALLERY_ITEMS[activeIndex]
  const topRightImage = GALLERY_ITEMS[(activeIndex + 1) % GALLERY_ITEMS.length]

  return (
    <section className="relative bg-tobler-bg-dark py-16 md:py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        {/* TOP SECTION: Images + Text */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-6 mb-16 md:mb-20">
          {/* TOP LEFT: Large Hero Image */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="col-span-1 md:col-span-6"
          >
            <div className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-2xl">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeItem.id}
                  initial={{ opacity: 0, scale: 1.1 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
                  className="absolute inset-0"
                >
                  <ResponsiveImage
                    publicId={activeItem.publicId}
                    alt={activeItem.label}
                    className="h-full w-full object-cover"
                    displayWidth={900}
                    sizes="(min-width: 768px) 50vw, 100vw"
                  />
                </motion.div>
              </AnimatePresence>

              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-black/20" />
            </div>
          </motion.div>

          {/* TOP RIGHT: Small Image + Text */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="col-span-1 md:col-span-6"
          >
            {/* Small top right image */}
            <motion.div
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="relative w-full md:w-48 h-32 md:h-40 rounded-xl overflow-hidden shadow-lg mb-6 md:float-right md:ml-6"
            >
              <ResponsiveImage
                publicId={topRightImage.publicId}
                alt={topRightImage.label}
                className="h-full w-full object-cover"
                displayWidth={500}
                sizes="(min-width: 768px) 30vw, 100vw"
              />
              <div className="absolute inset-0 bg-black/20" />
            </motion.div>

            {/* Text Content */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-center md:text-left"
            >
              <motion.h2
                className="text-4xl md:text-5xl font-semibold text-white mb-4"
                animate={{ color: '#ffffff' }}
              >
                Precision
                <br />
                in Motion
              </motion.h2>

              <motion.p
                className="text-base md:text-lg text-tobler-muted mb-6 leading-relaxed max-w-md mx-auto md:mx-0"
                animate={{ opacity: 0.8 }}
              >
                Swiss engineering standards, Indian manufacturing excellence. Every detail matters in
                our pursuit of perfection.
              </motion.p>

              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="flex flex-col md:flex-row gap-4 justify-center md:justify-start"
              >
                <Link to="/contact" className="px-8 py-3 bg-tobler-gold text-tobler-heading font-semibold rounded-lg hover:shadow-lg transition-all inline-block text-center">
                  Get Started
                </Link>
                <Link to="/products" className="px-8 py-3 border border-tobler-gold text-tobler-gold font-semibold rounded-lg hover:bg-tobler-gold/10 transition-all inline-block text-center">
                  Learn more
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>

        {/* BOTTOM SECTION: Image Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-5 gap-4"
        >
          {/* Bottom Left - 3 small images */}
          {BOTTOM_IMAGES.slice(0, 3).map((img, index) => (
            <motion.button
              key={img.id}
              whileHover={{ scale: 1.05 }}
              onClick={() => setActiveIndex((index + 1) % GALLERY_ITEMS.length)}
              className="relative aspect-square rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow cursor-pointer col-span-1"
            >
              <ResponsiveImage
                publicId={img.publicId}
                alt="Gallery"
                className="h-full w-full object-cover"
                displayWidth={400}
                sizes="(min-width: 768px) 15vw, 25vw"
              />
              <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-all" />
            </motion.button>
          ))}

          {/* Bottom Center - 1 medium image */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            onClick={() => setActiveIndex(4)}
            className="relative aspect-video rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow cursor-pointer col-span-2 md:col-span-1"
          >
            <ResponsiveImage
              publicId={BOTTOM_IMAGES[3].publicId}
              alt="Gallery"
              className="h-full w-full object-cover"
              displayWidth={600}
              sizes="(min-width: 768px) 20vw, 50vw"
            />
            <div className="absolute inset-0 bg-black/30 hover:bg-black/40 transition-all" />
          </motion.button>

          {/* Bottom Right - 2 small images */}
          {BOTTOM_IMAGES.slice(4, 6).map((img, index) => (
            <motion.button
              key={img.id}
              whileHover={{ scale: 1.05 }}
              onClick={() => setActiveIndex((index + 5) % GALLERY_ITEMS.length)}
              className="relative aspect-square rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow cursor-pointer col-span-1"
            >
              <ResponsiveImage
                publicId={img.publicId}
                alt="Gallery"
                className="h-full w-full object-cover"
                displayWidth={400}
                sizes="(min-width: 768px) 15vw, 25vw"
              />
              <div className="absolute inset-0 bg-black/30 hover:bg-black/40 transition-all" />
            </motion.button>
          ))}
        </motion.div>

        {/* Progress Dots */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex justify-center gap-2 mt-12"
        >
          {GALLERY_ITEMS.map((_, index) => (
            <motion.button
              key={index}
              onClick={() => setActiveIndex(index)}
              whileHover={{ scale: 1.2 }}
              className={`h-2 rounded-full transition-all duration-300 ${
                activeIndex === index
                  ? 'bg-tobler-gold w-8'
                  : 'bg-tobler-border w-2 hover:bg-tobler-muted'
              }`}
            />
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default AnimatedHeroGallery
