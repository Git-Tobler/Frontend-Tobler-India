import { useCallback, useEffect, useRef, useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useInViewAnimation } from '../../hooks/useInViewAnimation.js'
import { VALUES } from '../../data/team.js'

/* Auto-advancing card rail.

   In the source layout this carries client testimonials; Tobler has none on
   record, so it carries the six values instead — the same rhythm without
   inventing quotes or attributing words to people who never said them.

   The list is tripled and the index snaps back to the middle copy once it runs
   past the end, so the rail scrolls forever in one direction without a visible
   rewind. Advancing pauses while the pointer is over the rail. */

const CARD_WIDTH = 427.5
const GAP = 24
const INTERVAL = 3000

function ValuesCarousel() {
  const [sectionRef, inView] = useInViewAnimation()
  const [index, setIndex] = useState(VALUES.length)
  const [animate, setAnimate] = useState(true)
  const [paused, setPaused] = useState(false)
  const resetRef = useRef(null)
  const trackRef = useRef(null)
  // Cards are a fixed 427.5px on desktop but viewport-width on mobile, so the
  // step distance is measured from the DOM rather than assumed.
  const [stride, setStride] = useState(CARD_WIDTH + GAP)

  useEffect(() => {
    const measure = () => {
      const card = trackRef.current?.firstElementChild
      if (card) setStride(card.getBoundingClientRect().width + GAP)
    }
    measure()
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [])

  const items = [...VALUES, ...VALUES, ...VALUES]

  const step = useCallback((direction) => {
    setAnimate(true)
    setIndex((current) => current + direction)
  }, [])

  useEffect(() => {
    if (paused) return undefined
    const id = setInterval(() => step(1), INTERVAL)
    return () => clearInterval(id)
  }, [paused, step])

  // Once the rail runs off either end of the middle copy, snap back by one
  // copy with the transition switched off — identical pixels, index recentred.
  useEffect(() => {
    const past = index >= VALUES.length * 2
    const before = index < VALUES.length
    if (!past && !before) return undefined
    resetRef.current = setTimeout(() => {
      setAnimate(false)
      setIndex((current) => current + (past ? -VALUES.length : VALUES.length))
    }, 800)
    return () => clearTimeout(resetRef.current)
  }, [index])

  useEffect(() => {
    if (animate) return undefined
    const id = requestAnimationFrame(() => setAnimate(true))
    return () => cancelAnimationFrame(id)
  }, [animate])

  const show = (delay, classes = '') => ({
    className: `${classes} ${inView ? 'animate-fade-in-up' : 'opacity-0'}`,
    style: { animationDelay: `${delay}s` },
  })

  return (
    <section ref={sectionRef} className="w-full overflow-hidden py-20">
      <div className="px-6 mx-auto max-w-4xl">
        <div {...show(0.1, 'flex flex-col gap-6')}>
          <h2 className="text-[32px] leading-[1.1] tracking-tight text-[#0D212C] text-center md:text-[40px] lg:text-[44px]">
            What <span className="font-mondwest">builders</span> get
          </h2>


        </div>
      </div>

      <div
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        {...show(0.2, 'mt-10 px-6')}
      >
        <div className="overflow-hidden">
          <div
            ref={trackRef}
            className="flex gap-6"
            style={{
              transform: `translate3d(-${index * stride}px, 0, 0)`,
              transition: animate ? 'transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)' : 'none',
            }}
          >
            {items.map((value, position) => (
              <article
                key={`${value.title}-${position}`}
                className="w-[calc(100vw-48px)] shrink-0 rounded-[32px] bg-white px-6 py-8 shadow-[0_4px_16px_rgba(0,0,0,0.08)] md:w-[427.5px] md:rounded-[40px] md:pl-10 md:pr-24"
              >
                <svg
                  width="28"
                  height="22"
                  viewBox="0 0 28 22"
                  aria-hidden="true"
                  className="fill-[#0D212C]/15"
                >
                  <path d="M12 0v10c0 6.6-4.5 11.3-11 12v-4c3.9-.8 6.2-3.2 6.4-6.4H0V0h12Zm16 0v10c0 6.6-4.5 11.3-11 12v-4c3.9-.8 6.2-3.2 6.4-6.4H16V0h12Z" />
                </svg>

                <p className="mt-5 text-base leading-relaxed text-[#0D212C]">{value.description}</p>

                <div className="mt-8 flex items-center gap-4">
                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[#051A24] text-sm font-medium text-[#F6FCFF]">
                    {String((position % VALUES.length) + 1).padStart(2, '0')}
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-[#0D212C]">{value.title}</p>
                    <p className="text-sm text-[#273C46]">→ Tobler India</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>

        <div className="mt-8 flex gap-3">
          <button
            type="button"
            onClick={() => step(-1)}
            aria-label="Previous value"
            className="flex h-12 w-12 items-center justify-center rounded-full border border-[#0D212C]/20 transition-colors hover:bg-[#0D212C]/5"
          >
            <ChevronLeft className="h-5 w-5 text-[#0D212C]" />
          </button>
          <button
            type="button"
            onClick={() => step(1)}
            aria-label="Next value"
            className="flex h-12 w-12 items-center justify-center rounded-full border border-[#0D212C]/20 transition-colors hover:bg-[#0D212C]/5"
          >
            <ChevronRight className="h-5 w-5 text-[#0D212C]" />
          </button>
        </div>
      </div>
    </section>
  )
}

export default ValuesCarousel
