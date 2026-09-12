import { useRef, useState } from 'react'

/* Tabbed panels for the parts of a product spec that read as alternatives to
   one another rather than as a sequence — applications, features, why Tobler.

   Manual activation: the arrow keys move focus between tabs but do not switch
   panels, and Enter or Space commits. Auto-switching on arrow would make a
   screen reader announce the full contents of every panel a user arrows past.

   With one panel there is nothing to choose between, so the tablist is dropped
   and the panel renders on its own. */
function ProductTabs({ items = [] }) {
  const [active, setActive] = useState(0)
  const tabRefs = useRef([])

  if (items.length === 0) return null
  if (items.length === 1) return <div>{items[0].render()}</div>

  const handleKeyDown = (event) => {
    const last = items.length - 1
    const focused = tabRefs.current.findIndex((node) => node === document.activeElement)
    const from = focused === -1 ? active : focused

    const target = {
      ArrowRight: from === last ? 0 : from + 1,
      ArrowLeft: from === 0 ? last : from - 1,
      Home: 0,
      End: last,
    }[event.key]

    if (target === undefined) return
    event.preventDefault()
    tabRefs.current[target]?.focus()
  }

  const current = items[active]

  return (
    <div>
      <div
        role="tablist"
        aria-label="Product details"
        onKeyDown={handleKeyDown}
        className="flex gap-7 overflow-x-auto border-b border-tobler-border [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {items.map((item, index) => (
          <button
            key={item.id}
            ref={(node) => {
              tabRefs.current[index] = node
            }}
            type="button"
            role="tab"
            id={`tab-${item.id}`}
            aria-selected={index === active}
            aria-controls={`panel-${item.id}`}
            tabIndex={index === active ? 0 : -1}
            onClick={() => setActive(index)}
            className={`label-mono shrink-0 whitespace-nowrap border-b-2 pb-3.5 pt-1 transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-tobler-blue ${
              index === active
                ? 'border-tobler-blue text-tobler-blue'
                : 'border-transparent text-tobler-body hover:text-tobler-heading'
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>

      <div
        role="tabpanel"
        id={`panel-${current.id}`}
        aria-labelledby={`tab-${current.id}`}
        tabIndex={0}
        className="pt-9 focus:outline-none"
      >
        {current.render()}
      </div>
    </div>
  )
}

export default ProductTabs
