import { useEffect, useState } from 'react'

/* Cycles the closing fragment of the hero headline.
 *
 * The fragment gets its own line rather than sitting inline in the h1, so a
 * longer phrase re-centres itself instead of reflowing the whole headline.
 * The rise-in animation covers the width change.
 */
function RotatingWord({ items, interval = 2400, className = '' }) {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    if (items.length < 2) return undefined
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined

    const id = window.setInterval(
      () => setIndex((i) => (i + 1) % items.length),
      interval,
    )

    return () => window.clearInterval(id)
    // `items` is a module-level constant at every call site; keying the effect
    // on its length keeps an inline array from resetting the timer each render.
  }, [items.length, interval])

  return (
    <span className={`block overflow-hidden ${className}`}>
      <span key={index} className="inline-block animate-wordIn">
        {items[index]}
      </span>
    </span>
  )
}

export default RotatingWord
