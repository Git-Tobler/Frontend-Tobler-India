import { useState, useEffect, useRef } from 'react'
import { Globe, ChevronDown, ArrowUpRight } from 'lucide-react'
import { COUNTRY_GROUPS } from '../../data/countries.js'


function CountrySwitcher() {
  const [open, setOpen] = useState(false)
  const rootRef = useRef(null)
  const triggerRef = useRef(null)
  const leaveTimeout = useRef(null)

  const handleEnter = () => {
    clearTimeout(leaveTimeout.current)
    setOpen(true)
  }
  const handleLeave = () => {
    leaveTimeout.current = setTimeout(() => setOpen(false), 120)
  }

  useEffect(() => {
    if (!open) return
    const onPointerDown = (e) => {
      if (rootRef.current && !rootRef.current.contains(e.target)) setOpen(false)
    }
    const onKeyDown = (e) => {
      if (e.key === 'Escape') {
        setOpen(false)
        triggerRef.current?.focus()
      }
    }
    document.addEventListener('mousedown', onPointerDown)
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('mousedown', onPointerDown)
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [open])

  useEffect(() => () => clearTimeout(leaveTimeout.current), [])

  return (
    <div
      ref={rootRef}
      className="relative hidden lg:block"
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      <button
        ref={triggerRef}
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-haspopup="true"
        aria-label="Choose your country"
        className="flex items-center gap-1.5 p-2 text-white/85 hover:text-white transition-colors"
      >
        <Globe size={20} />
        <span className="text-xs font-semibold tracking-[0.08em]">IN</span>
        <ChevronDown
          size={13}
          className={`transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
        />
      </button>

      <div
        className={`absolute right-0 top-full pt-2 transition-all duration-200 ease-premium ${
          open ? 'opacity-100 translate-y-0 visible' : 'opacity-0 -translate-y-2 invisible'
        }`}
      >
        <div className="w-[280px] max-h-[calc(100vh-130px)] overflow-y-auto bg-white rounded-card shadow-elevated border border-tobler-border">
          <div className="px-4 pt-3 pb-2 border-b border-tobler-border">
            <p className="text-xs font-semibold uppercase tracking-wide text-tobler-heading">
              Global Presence
            </p>
          </div>

          <div className="py-1">
            {COUNTRY_GROUPS.map((group) => (
              <div key={group.label} className="px-2 py-1.5">
                <p className="px-3 pt-1.5 pb-1 text-xs font-semibold uppercase tracking-wide text-tobler-body">
                  {group.label}
                </p>

                {group.countries.map((country) =>

                  country.current ? (
                    <div
                      key={country.code}
                      className="mx-1 flex items-center justify-between px-3 py-2 rounded-sm bg-tobler-blue/5 border border-tobler-blue/20"
                    >
                      <span className="flex items-center gap-2 text-sm font-semibold text-tobler-blue">
                        <span className="h-1.5 w-1.5 bg-tobler-blue rounded-full" aria-hidden="true" />
                        {country.name}
                      </span>
                      <span className="text-xs font-medium text-tobler-body/60">
                        You are here
                      </span>

                    </div>
                  ) : (
                    <a
                      key={country.code}
                      href={country.url}
                      rel="noopener"
                      className="mx-1 group/row flex items-center justify-between px-3 py-2 rounded-sm text-sm font-medium text-tobler-heading hover:text-tobler-blue hover:bg-tobler-bg-light transition-all duration-200"
                    >
                      {country.name}
                      <span className="flex items-center gap-1 text-xs text-tobler-body/60">
                        {country.code}
                        <ArrowUpRight
                          size={12}
                          className="text-tobler-blue opacity-0 -translate-x-0.5 transition-all duration-200 group-hover/row:opacity-100 group-hover/row:translate-x-0"
                        />
                      </span>
                    </a>
                  )
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default CountrySwitcher

