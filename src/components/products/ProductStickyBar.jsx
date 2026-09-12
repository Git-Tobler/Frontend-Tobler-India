import { useEffect, useState } from 'react'
import Button from '../common/Button.jsx'

/* The quote CTA follows you down the page once the hero's own card has scrolled
   out of view, so a decision reached eight sections deep doesn't need a scroll
   back to the top.

   Hidden below `md`: on a phone the fixed bar costs more viewport than it earns,
   and the page closes on a full CTA section anyway. */
function ProductStickyBar({ watchRef, product }) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const node = watchRef.current
    if (!node) return undefined

    const observer = new IntersectionObserver(([entry]) => setVisible(!entry.isIntersecting), {
      rootMargin: '-100px 0px 0px 0px',
    })
    observer.observe(node)
    return () => observer.disconnect()
  }, [watchRef])

  return (
    <div
      aria-hidden={!visible}
      className={`fixed bottom-6 left-1/2 z-40 hidden -translate-x-1/2 items-center gap-6 rounded-pill border border-tobler-border bg-white/95 py-3 pl-7 pr-3 shadow-elevated backdrop-blur-md transition-all duration-500 ease-premium md:flex ${
        visible ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-5 opacity-0'
      }`}
    >
      <div className="min-w-0">
        {product.model && <p className="label-mono text-tobler-blue">{product.model}</p>}
        <p className="truncate text-sm font-semibold text-tobler-heading">{product.name}</p>
      </div>
      <Button to="/contact#rfq" size="sm" shape="pill" tabIndex={visible ? 0 : -1}>
        Request a Quote
      </Button>
    </div>
  )
}

export default ProductStickyBar
