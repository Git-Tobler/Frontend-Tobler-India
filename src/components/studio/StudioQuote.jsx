import { useEffect, useRef, useState } from 'react'
import { Quote } from 'lucide-react'
import { useInViewAnimation } from '../../hooks/useInViewAnimation.js'
import { cldImage } from '../../lib/cloudinary.js'
import { CERTIFICATIONS } from '../../data/team.js'

/* The statement block: an oversized pull quote, the standards we build to,
   and one photograph that drifts against the scroll.

   The parallax offset is written straight to the node inside a rAF callback
   rather than through state — a scroll handler that re-renders React on every
   frame is the classic way to make a page feel heavy. The listener is only
   attached while the block is on screen. */

// Kept well under the source design's 200px: the image sits in a centred
// column here, and a larger drift rides up over the certification row.
const MAX_OFFSET = 60

function useParallax() {
  const wrapRef = useRef(null)
  const imgRef = useRef(null)
  const [active, setActive] = useState(false)

  useEffect(() => {
    const node = wrapRef.current
    if (!node || typeof IntersectionObserver === 'undefined') return undefined
    const observer = new IntersectionObserver(([entry]) => setActive(entry.isIntersecting), {
      rootMargin: '100px',
    })
    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!active) return undefined
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined

    let frame = 0
    const update = () => {
      frame = 0
      const node = wrapRef.current
      const image = imgRef.current
      if (!node || !image) return
      const rect = node.getBoundingClientRect()
      // 0 when the block enters from the bottom, 1 when it leaves at the top.
      const progress = 1 - (rect.top + rect.height) / (window.innerHeight + rect.height)
      const offset = Math.max(-1, Math.min(1, progress)) * MAX_OFFSET
      image.style.transform = `translate3d(0, ${-offset.toFixed(1)}px, 0)`
    }

    const onScroll = () => {
      if (frame) return
      frame = window.requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      if (frame) window.cancelAnimationFrame(frame)
    }
  }, [active])

  return [wrapRef, imgRef]
}

function StudioQuote() {
  const [sectionRef, inView] = useInViewAnimation()
  const [wrapRef, imgRef] = useParallax()
  const show = (delay, classes = '') => ({
    className: `${classes} ${inView ? 'animate-fade-in-up' : 'opacity-0'}`,
    style: { animationDelay: `${delay}s` },
  })

  return (
    <section id="our-story" ref={sectionRef} className="mx-auto max-w-2xl px-6 py-12 text-center">
      <div {...show(0.1, 'flex justify-center')}>
        <Quote className="h-6 w-6 text-slate-900" />
      </div>

      <h2
        {...show(
          0.2,
          'mt-6 text-[32px] leading-[1.1] tracking-tight text-[#0D212C] md:text-[40px] lg:text-[44px]'
        )}
      >
        Thirty years of Swiss engineering,{' '}
        <span className="font-mondwest">built for Indian sites</span>
      </h2>

      <p {...show(0.3, 'mt-4 text-sm italic text-[#273C46]')}>
        Tobler — engineering-led since 1996
      </p>

      <div {...show(0.4, 'mt-10 flex flex-wrap items-center justify-center gap-x-10 gap-y-4')}>
        {CERTIFICATIONS.map((cert) => (
          <span key={cert.name} className="text-[24px] font-medium text-slate-900">
            {cert.name}
          </span>
        ))}
      </div>

      <div ref={wrapRef} {...show(0.5, 'mt-16 flex justify-center py-10')}>
        <img
          ref={imgRef}
          src={cldImage('tobler/site/site-visit-picture', { w: 640 })}
          alt="The Tobler team on a site visit"
          loading="lazy"
          decoding="async"
          className="w-full max-w-xs rounded-2xl shadow-lg will-change-transform"
        />
      </div>
    </section>
  )
}

export default StudioQuote
