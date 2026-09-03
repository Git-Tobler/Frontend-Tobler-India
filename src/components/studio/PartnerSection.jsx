import { useCallback, useEffect, useRef, useState } from 'react'
import StudioButton from './StudioButton.jsx'
import { cldImage } from '../../lib/cloudinary.js'
import { MARQUEE_TILES } from './studioMedia.js'

/* Closing CTA panel that paints a trail of photographs under the cursor.

   Each thumbnail is spawned at the pointer with a random tilt, then fades and
   shrinks out over a second. Spawning is throttled to one every 80ms so a fast
   sweep across the panel leaves a readable trail instead of a solid smear, and
   the trail is skipped entirely on touch input and under reduced motion, where
   it would either never fire or be unwelcome. */

const SPAWN_INTERVAL = 80
const LIFETIME = 1000

function PartnerSection() {
  const [trail, setTrail] = useState([])
  const lastSpawn = useRef(0)
  const nextId = useRef(0)
  const timers = useRef(new Set())

  useEffect(() => {
    const pending = timers.current
    return () => {
      pending.forEach(clearTimeout)
      pending.clear()
    }
  }, [])

  const handleMove = useCallback((event) => {
    if (event.pointerType === 'touch') return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const now = performance.now()
    if (now - lastSpawn.current < SPAWN_INTERVAL) return
    lastSpawn.current = now

    const bounds = event.currentTarget.getBoundingClientRect()
    const id = nextId.current
    nextId.current += 1

    const item = {
      id,
      x: event.clientX - bounds.left,
      y: event.clientY - bounds.top,
      rotation: Math.random() * 20 - 10,
      tile: MARQUEE_TILES[id % MARQUEE_TILES.length],
    }

    setTrail((current) => [...current, item])

    const timer = setTimeout(() => {
      setTrail((current) => current.filter((entry) => entry.id !== id))
      timers.current.delete(timer)
    }, LIFETIME)
    timers.current.add(timer)
  }, [])

  return (
    <section className="w-full px-6 py-12">
      <div
        onPointerMove={handleMove}
        className="relative mx-auto max-w-7xl overflow-hidden rounded-[40px] bg-white py-48 shadow-[0_0_0_0.5px_rgba(0,0,0,0.05),0_4px_30px_rgba(0,0,0,0.08)]"
      >
        {trail.map((item) => (
          <img
            key={item.id}
            src={cldImage(item.tile.id, { w: 400 })}
            alt=""
            aria-hidden="true"
            className="pointer-events-none absolute h-40 w-32 rounded-xl object-cover shadow-lg"
            style={{
              left: item.x,
              top: item.y,
              '--trail-transform': `translate(-50%, -50%) rotate(${item.rotation}deg)`,
              animation: `trailFade ${LIFETIME}ms ease-out forwards`,
            }}
          />
        ))}

        <div className="relative flex flex-col items-center">
          <h2 className="font-mondwest mb-12 text-center text-[48px] text-[#0D212C] md:text-[64px] lg:text-[80px]">
            Partner with us
          </h2>

          <StudioButton to="/contact" className="gap-4 pl-3">
            <img
              src={cldImage('tobler/misc/t-logo', { w: 80, crop: 'scale' })}
              alt=""
              className="h-10 w-10 rounded-full bg-white object-contain p-1"
            />
            Start a chat with our engineers
          </StudioButton>
        </div>
      </div>
    </section>
  )
}

export default PartnerSection
