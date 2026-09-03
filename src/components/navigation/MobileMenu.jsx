import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { X, ChevronDown, Phone, Mail, Globe } from 'lucide-react'
import { NAV_LINKS } from '../../data/navigation.js'
import { COUNTRY_GROUPS } from '../../data/countries.js'
import { SITE } from '../../data/site.js'
import Button from '../common/Button.jsx'
import toblerLogo from '../../assets/brand/tobler-logo.svg'

function MobileMenu({ open, onClose }) {
  const [expanded, setExpanded] = useState(null)

  const toggleExpand = (label) => {
    setExpanded((prev) => (prev === label ? null : label))
  }

  return (
    <div
      className={`fixed inset-0 z-[60] lg:hidden transition-all duration-300 ${
        open ? 'visible opacity-100' : 'invisible opacity-0'
      }`}
    >
      <div
        className="absolute inset-0 bg-tobler-heading/60 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />
      <div
        className={`absolute top-0 right-0 h-full w-[86%] max-w-sm bg-white shadow-elevated flex flex-col transition-transform duration-300 ease-premium ${
          open ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between px-6 py-5 border-b border-tobler-border">
          <div className="flex items-center gap-2">
            <img src={toblerLogo} alt="Tobler" className="h-8 w-auto" />
            <span className="text-base font-display font-semibold uppercase text-tobler-heading">Tobler</span>
          </div>
          <button
            onClick={onClose}
            aria-label="Close menu"
            className="p-2 border border-tobler-border hover:bg-tobler-bg-light transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto px-4 py-4">
          {NAV_LINKS.map((item) => (
            <div key={item.label} className="border-b border-tobler-border/60 last:border-none">
              {item.children ? (
                <>
                  <button
                    onClick={() => toggleExpand(item.label)}
                    className="w-full flex items-center justify-between py-4 text-left font-semibold text-tobler-heading"
                  >
                    {item.label}
                    <ChevronDown
                      size={18}
                      className={`transition-transform duration-200 ${
                        expanded === item.label ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  <div
                    className={`overflow-hidden transition-all duration-300 ${
                      expanded === item.label ? 'max-h-96 pb-3' : 'max-h-0'
                    }`}
                  >
                    {item.children.map((child) => (
                      <NavLink
                        key={child.path}
                        to={child.path}
                        onClick={onClose}
                        className="block py-2 pl-3 text-sm text-tobler-body hover:text-tobler-blue"
                      >
                        {child.label}
                      </NavLink>
                    ))}
                  </div>
                </>
              ) : (
                <NavLink
                  to={item.path}
                  onClick={onClose}
                  className="block py-4 font-semibold text-tobler-heading hover:text-tobler-blue"
                >
                  {item.label}
                </NavLink>
              )}
            </div>
          ))}

          {/* Country switcher — same data as the desktop globe dropdown */}
          <div className="border-t border-tobler-border/60">
            <button
              onClick={() => toggleExpand('__worldwide')}
              className="w-full flex items-center justify-between py-4 text-left font-semibold text-tobler-heading"
            >
              <span className="flex items-center gap-2.5">
                <Globe size={17} className="text-tobler-blue" />
                Tobler Worldwide
              </span>
              <ChevronDown
                size={18}
                className={`transition-transform duration-200 ${
                  expanded === '__worldwide' ? 'rotate-180' : ''
                }`}
              />
            </button>
            <div
              className={`overflow-hidden transition-all duration-300 ${
                expanded === '__worldwide' ? 'max-h-[600px] pb-3' : 'max-h-0'
              }`}
            >
              {COUNTRY_GROUPS.map((group) => (
                <div key={group.label} className="pb-1">
                  <p className="pl-3 pt-2 pb-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-tobler-muted">
                    {group.label}
                  </p>
                  {group.countries.map((country) =>
                    country.current ? (
                      <div
                        key={country.code}
                        className="flex items-center justify-between py-2 pl-3 pr-2 text-sm"
                      >
                        <span className="flex items-center gap-2 font-semibold text-tobler-blue">
                          <span className="h-1.5 w-1.5 bg-tobler-gold" aria-hidden="true" />
                          {country.name}
                        </span>
                        <span className="text-[11px] text-tobler-muted">You are here</span>
                      </div>
                    ) : (
                      <a
                        key={country.code}
                        href={country.url}
                        rel="noopener"
                        className="flex items-center justify-between py-2 pl-3 pr-2 text-sm text-tobler-body hover:text-tobler-blue"
                      >
                        {country.name}
                        <span className="font-mono text-[11px] text-tobler-muted">
                          {country.code}
                        </span>
                      </a>
                    )
                  )}
                </div>
              ))}
            </div>
          </div>
        </nav>

        <div className="px-6 py-5 border-t border-tobler-border space-y-3">
          <a href={`tel:${SITE.phone}`} className="flex items-center gap-2 text-sm text-tobler-body">
            <Phone size={16} className="text-tobler-blue" /> {SITE.phone}
          </a>
          <a href={`mailto:${SITE.email}`} className="flex items-center gap-2 text-sm text-tobler-body">
            <Mail size={16} className="text-tobler-blue" /> {SITE.email}
          </a>
          <Button to="/contact" onClick={onClose} className="w-full mt-2">
            Request a Quote
          </Button>
        </div>
      </div>
    </div>
  )
}

export default MobileMenu
