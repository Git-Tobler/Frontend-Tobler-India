import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

/* Clamps long copy to `previewLines` and expands on click. Uses inline
   -webkit-line-clamp rather than a Tailwind line-clamp-N utility class
   since the class name would need to be dynamic (Tailwind can't see
   template-literal class names at build time). */
function ReadMore({ children, previewLines = 3, label = 'Read More', className = '' }) {
  const [open, setOpen] = useState(false)

  return (
    <div>
      <p
        className={`text-tobler-body leading-relaxed normal-case ${className}`}
        style={
          open
            ? undefined
            : {
                display: '-webkit-box',
                WebkitLineClamp: previewLines,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
              }
        }
      >
        {children}
      </p>
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        aria-expanded={open}
        className="mt-3 inline-flex items-center gap-1.5 label-mono text-tobler-blue hover:text-tobler-blue-dark transition-colors duration-200"
      >
        {open ? 'Show Less' : label}
        <ChevronDown size={14} aria-hidden="true" className={`transition-transform duration-300 ${open ? 'rotate-180' : ''}`} />
      </button>
    </div>
  )
}

export default ReadMore
