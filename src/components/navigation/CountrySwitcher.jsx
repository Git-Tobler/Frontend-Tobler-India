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
        className={`absolute right-0 top-full pt-3 transition-all duration-200 ease-premium ${
          open ? 'opacity-100 translate-y-0 visible' : 'opacity-0 -translate-y-2 invisible'
        }`}
      >
        <div className="w-[320px] max-h-[calc(100vh-130px)] overflow-y-auto bg-black/95 backdrop-blur-md rounded-xl shadow-2xl border border-white/10">
          <div className="px-5 pt-5 pb-4 border-b border-white/10">
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/60">
              Global Presence
            </p>
          </div>

          <div className="py-2 divide-y divide-white/5">
            {COUNTRY_GROUPS.map((group) => (
              <div key={group.label} className="px-2 py-2">
                <p className="px-3 pt-2.5 pb-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-white/50">
                  {group.label}
                </p>

                {group.countries.map((country) =>
                
                  country.current ? (
                    <div
                      key={country.code}
                      className="flex items-center justify-between px-3 py-2.5 rounded-lg bg-tobler-blue/20 border border-tobler-blue/30"
                    >
                      <span className="flex items-center gap-2.5 text-sm font-semibold text-tobler-gold">
                        <span className="h-2 w-2 bg-tobler-gold rounded-full" aria-hidden="true" />
                        {country.name}
                      </span>
                      <span className="text-[11px] font-medium text-white/60">
                        You are here
                      </span>
                       
                    </div>
                  ) : (
                    <a
                      key={country.code}
                      href={country.url}
                      rel="noopener"
                      className="group/row flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium text-white/85 hover:text-white hover:bg-white/5 transition-all duration-200"
                    >
                      {country.name}
                      <span className="flex items-center gap-1.5 font-mono text-[11px] text-white/60">
                        {country.code}
                        <ArrowUpRight
                          size={13}
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

