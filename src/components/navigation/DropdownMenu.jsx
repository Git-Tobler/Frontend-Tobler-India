import { useState, useRef } from 'react'
import { NavLink } from 'react-router-dom'
import { ChevronDown } from 'lucide-react'

function DropdownMenu({ item, scrolled }) {
  const [open, setOpen] = useState(false)
  const timeoutRef = useRef(null)

  const handleEnter = () => {
    clearTimeout(timeoutRef.current)
    setOpen(true)
  }
  const handleLeave = () => {
    timeoutRef.current = setTimeout(() => setOpen(false), 120)
  }

  return (
    <div className="relative group" onMouseEnter={handleEnter} onMouseLeave={handleLeave}>
      <NavLink
        to={item.path}
        className={({ isActive }) =>
          `flex items-center gap-1.5 px-3 py-2 text-sm font-medium transition-all duration-200 ${
            isActive ? 'text-white' : 'text-white/70 hover:text-white'
          }`
        }
      >
        {item.label}
        <ChevronDown size={14} className={`transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
      </NavLink>
      <span className={`absolute bottom-1 left-3 right-3 h-0.5 bg-tobler-gold transition-all duration-200 origin-left ${
        open ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
      }`} />

      <div
        className={`absolute left-1/2 -translate-x-1/2 top-full pt-3 transition-all duration-200 ease-premium ${
          open ? 'opacity-100 translate-y-0 visible' : 'opacity-0 -translate-y-2 invisible'
        }`}
      >
        <div className="min-w-[260px] bg-white rounded-card shadow-elevated border border-tobler-border py-2 px-1.5">
          {item.children.map((child) => (
            <NavLink
              key={child.path}
              to={child.path}
              className={({ isActive }) =>
                `block px-4 py-2.5 rounded-sm text-sm font-medium transition-colors duration-150 ${
                  isActive
                    ? 'bg-tobler-blue/5 text-tobler-blue'
                    : 'text-tobler-heading hover:bg-tobler-bg-light hover:text-tobler-blue'
                }`
              }
            >
              {child.label}
            </NavLink>
          ))}
        </div>
      </div>
    </div>
  )
}

export default DropdownMenu
