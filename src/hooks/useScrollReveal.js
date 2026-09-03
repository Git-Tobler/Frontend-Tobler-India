import { useEffect, useRef, useState } from 'react'

const DEFAULT_OPTIONS = { threshold: 0.15 }

export function useScrollReveal(options = DEFAULT_OPTIONS) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return undefined

    if (typeof IntersectionObserver === 'undefined') {
      setVisible(true)
      return undefined
    }

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setVisible(true)
        observer.disconnect()
      }
    }, options)

    observer.observe(node)
    return () => observer.disconnect()
  }, [options])

  return [ref, visible]
}

export default useScrollReveal
