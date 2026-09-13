import { useState, useRef, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { ChevronDown } from 'lucide-react'

function MegaMenu({ item }) {
  const [open, setOpen] = useState(false)
  const [activeItem, setActiveItem] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const menuRef = useRef(null)
  const buttonRef = useRef(null)

  const primaryItems = item.children || []

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target) && !buttonRef.current?.contains(e.target)) {
        setOpen(false)
      }
    }

    const handleEscape = (e) => {
      if (e.key === 'Escape') setOpen(false)
    }

    if (open) {
      document.addEventListener('mousedown', handleClickOutside)
      document.addEventListener('keydown', handleEscape)
      return () => {
        document.removeEventListener('mousedown', handleClickOutside)
        document.removeEventListener('keydown', handleEscape)
      }
    }
  }, [open])

  const handleItemHover = (index) => {
    setIsTransitioning(true)
    setTimeout(() => {
      setActiveItem(index)
      setIsTransitioning(false)
    }, 150)
  }

  const activeItemData = primaryItems[activeItem]

  return (
    <div className="relative group">
      <button
        ref={buttonRef}
        onClick={() => setOpen(!open)}
        className={`flex items-center gap-1.5 px-3 py-2 text-sm font-medium transition-all duration-200 ${
          open ? 'text-white' : 'text-white/85 hover:text-white'
        }`}
      >
        {item.label}
        <ChevronDown size={14} className={`transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
      </button>

      <span
        className={`absolute bottom-1 left-3 right-3 h-0.5 bg-tobler-gold transition-all duration-200 origin-left ${
          open ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
        }`}
      />

      {open && (
        <div
          ref={menuRef}
          className="absolute left-1/2 -translate-x-1/2 top-full pt-4 z-50"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="w-screen max-w-[1400px] rounded-[20px] bg-white border border-tobler-border/60 shadow-elevated overflow-hidden">
            <div className="grid grid-cols-12 gap-12 p-8">
              {/* Column 1: Primary Navigation (45%) */}
              <div className="col-span-5">
                <h3 className="text-xs font-semibold text-tobler-muted uppercase tracking-widest mb-6 opacity-60">
                  {item.label}
                </h3>
                <div className="space-y-1">
                  {primaryItems.map((child, idx) => (
                    <button
                      key={child.path}
                      onMouseEnter={() => handleItemHover(idx)}
                      className={`w-full text-left px-0 py-3 transition-all duration-200 border-l-2 pl-4 group/item ${
                        idx === activeItem
                          ? 'border-tobler-blue bg-transparent text-tobler-blue'
                          : 'border-transparent text-tobler-heading hover:text-tobler-blue hover:border-tobler-blue/40'
                      }`}
                    >
                      <NavLink
                        to={child.path}
                        onClick={() => setOpen(false)}
                        className="block font-semibold text-base leading-tight"
                      >
                        {child.label}
                      </NavLink>
                    </button>
                  ))}
                </div>
              </div>

              {/* Column 2: Quick Links (20%) */}
              <div className="col-span-2">
                <h3 className="text-xs font-semibold text-tobler-muted uppercase tracking-widest mb-6 opacity-60">
                  Resources
                </h3>
                <div className="space-y-4">
                  <a
                    href="#"
                    className="block text-sm font-medium text-tobler-body hover:text-tobler-blue transition-colors duration-200"
                  >
                    Downloads
                  </a>
                  <a
                    href="#"
                    className="block text-sm font-medium text-tobler-body hover:text-tobler-blue transition-colors duration-200"
                  >
                    Brochures
                  </a>
                  <a
                    href="#"
                    className="block text-sm font-medium text-tobler-body hover:text-tobler-blue transition-colors duration-200"
                  >
                    Certifications
                  </a>
                  <a
                    href="#"
                    className="block text-sm font-medium text-tobler-body hover:text-tobler-blue transition-colors duration-200"
                  >
                    FAQ
                  </a>
                  <a
                    href="/contact#careers"
                    className="block text-sm font-medium text-tobler-body hover:text-tobler-blue transition-colors duration-200"
                  >
                    Careers
                  </a>
                </div>
              </div>

              {/* Column 3: Preview (35%) */}
              <div className="col-span-5 border-l border-tobler-border/30 pl-8">
                <div className="h-full flex flex-col">
                  {/* Preview Image Placeholder */}
                  <div className={`relative h-48 mb-6 rounded-lg bg-gradient-to-br from-tobler-blue/10 to-tobler-blue/5 overflow-hidden transition-opacity duration-200 ${
                    isTransitioning ? 'opacity-50' : 'opacity-100'
                  }`}>
                    <div className="w-full h-full flex items-center justify-center text-tobler-muted">
                      <span className="text-sm font-medium">[Preview Image]</span>
                    </div>
                  </div>

                  {/* Preview Content */}
                  <div className={`transition-opacity duration-200 ${isTransitioning ? 'opacity-50' : 'opacity-100'}`}>
                    <h4 className="text-lg font-semibold text-tobler-heading mb-2">
                      {activeItemData?.label}
                    </h4>
                    <p className="text-sm text-tobler-body leading-relaxed mb-4">
                      Discover comprehensive solutions tailored to your project requirements with our premium engineering expertise and proven track record.
                    </p>
                    <NavLink
                      to={activeItemData?.path}
                      onClick={() => setOpen(false)}
                      className="inline-flex items-center gap-2 text-sm font-medium text-tobler-blue hover:text-tobler-blue-dark transition-colors duration-200"
                    >
                      Explore
                      <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
                    </NavLink>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default MegaMenu
