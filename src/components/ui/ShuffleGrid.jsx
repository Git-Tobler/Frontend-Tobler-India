import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { MOSAIC_GRID, MOSAIC_TILE, MosaicTile } from './Mosaic.jsx'

/* A mosaic of photographs that periodically re-orders itself in place.

   Framer Motion's `layout` prop does the work: when the array order changes,
   each tile keeps its key, so React moves the same DOM node to a new grid cell
   and Motion animates the gap between old and new position (FLIP — transform
   only, no layout thrash). Every tile is the same size, so the movement is pure
   translation and the photos never distort mid-flight.

   Two guards keep this from costing anything it shouldn't:
   - it only shuffles while the grid is actually on screen, so an idle timer
     isn't repainting a section the visitor has scrolled past;
   - under `prefers-reduced-motion` it never starts, and stays a static mosaic.

   Import this lazily — see Mosaic.jsx for why. */

const SHUFFLE_INTERVAL = 4000

// Fisher-Yates on a copy — the caller's array is module-level constant data and
// must not be mutated, or a remount would start from a scrambled "original".
function shuffled(items) {
  const next = [...items]
  for (let i = next.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[next[i], next[j]] = [next[j], next[i]]
  }
  return next
}

function ShuffleGrid({ tiles, className = '', sizes = '(min-width: 768px) 14vw, 24vw' }) {
  const [order, setOrder] = useState(tiles)
  const ref = useRef(null)
  const [running, setRunning] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return undefined
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined
    if (typeof IntersectionObserver === 'undefined') return undefined

    // Unlike useScrollReveal this is not disconnected on the first hit: the
    // leaving edge matters too, so the timer stops once the section is gone.
    const observer = new IntersectionObserver(
      ([entry]) => setRunning(entry.isIntersecting),
      { threshold: 0.2 }
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!running) return undefined
    const id = setInterval(() => setOrder(shuffled), SHUFFLE_INTERVAL)
    return () => clearInterval(id)
  }, [running])

  return (
    <div ref={ref} className={`${MOSAIC_GRID} ${className}`}>
      {order.map((tile) => (
        <motion.div
          key={tile.id}
          layout
          /* 400ms on the house easing curve — the same motion budget as every
             other transition on the site, so the mosaic reads as part of the
             system rather than a widget with its own timing. */
          transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
          className={MOSAIC_TILE}
        >
          <MosaicTile tile={tile} sizes={sizes} />
        </motion.div>
      ))}
    </div>
  )
}

export default ShuffleGrid
