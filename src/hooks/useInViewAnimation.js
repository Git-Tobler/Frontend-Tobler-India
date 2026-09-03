import { useEffect, useRef, useState } from 'react'

/* Scroll-trigger for the studio-style sections: returns [ref, inView] and
   fires once. Elements start at opacity-0 and get .animate-fade-in-up when
   the block enters the viewport, with per-element animationDelay for the
   stagger. Distinct from useScrollReveal, which drives the transition-based
   reveal used by the rest of the site. */
export function useInViewAnimation(threshold = 0.1) {
  const ref = useRef(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return undefined
    if (typeof IntersectionObserver === 'undefined') {
      setInView(true)
      return undefined
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        setInView(true)
        observer.disconnect()
      },
      { threshold }
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [threshold])

  return [ref, inView]
}

export default useInViewAnimation
