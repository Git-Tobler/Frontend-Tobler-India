import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

/* Height-animated with a CSS grid-rows trick (0fr → 1fr) instead of measuring
   scrollHeight in JS — one fewer layout read, and it degrades gracefully. */
function FAQAccordion({ items = [] }) {
  const [openIndex, setOpenIndex] = useState(0)

  if (items.length === 0) return null

  return (
    <div className="border border-tobler-border rounded-card divide-y divide-tobler-border overflow-hidden">
      {items.map((item, idx) => {
        const open = openIndex === idx
        return (
          <div key={item.q}>
            <button
              type="button"
              onClick={() => setOpenIndex(open ? null : idx)}
              aria-expanded={open}
              className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left hover:bg-tobler-bg-light transition-colors"
            >
              <span className="font-semibold text-sm text-tobler-heading">{item.q}</span>
              <ChevronDown
                size={16}
                aria-hidden="true"
                className={`shrink-0 transition-transform duration-300 text-tobler-body ${open ? 'rotate-180' : ''}`}
              />
            </button>
            <div className={`grid transition-all duration-300 ease-premium ${open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
              <div className="overflow-hidden">
                <p className="px-5 pb-4 text-sm text-tobler-body leading-relaxed normal-case">{item.a}</p>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default FAQAccordion
