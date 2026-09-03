import { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { Menu, Search } from 'lucide-react'
import { NAV_LINKS } from '../../data/navigation.js'
import MobileMenu from './MobileMenu.jsx'
import SearchModal from '../common/SearchModal.jsx'
import CountrySwitcher from './CountrySwitcher.jsx'
import toblerLogo from '../../assets/brand/tobler-logo.svg'

function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setSearchOpen(true)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  return (
    <>
      <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
        <div className="px-6 sm:px-7 md:px-10 lg:px-10 xl:px-12 py-4 flex items-center justify-between">
          {/* Logo */}
          <NavLink to="/" className="flex-shrink-0">
            <img src={toblerLogo} alt="Tobler" className="h-12 w-auto" />
          </NavLink>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {NAV_LINKS.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `text-sm font-medium transition-colors ${
                    isActive ? 'text-tobler-blue' : 'text-gray-700 hover:text-tobler-blue'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          {/* Right side: Search, Country Switcher, Login, Mobile Menu */}
          <div className="flex items-center gap-4 lg:gap-6">
            {/* Search icon */}
            <button
              onClick={() => setSearchOpen(true)}
              className="hidden lg:flex p-2 text-gray-700 hover:text-tobler-blue transition-colors group relative"
              aria-label="Search"
              title="Press Cmd+K to search"
            >
              <Search size={20} />
            </button>

            {/* Country switcher */}
            <div className="hidden lg:block [&_button]:text-gray-700 [&_button]:hover:text-tobler-blue">
              <CountrySwitcher />
            </div>

            {/* Login button */}
            <button className="hidden lg:block px-4 py-2 text-sm font-medium text-gray-700 hover:text-tobler-blue transition-colors">
              Login
            </button>

            {/* Mobile menu trigger */}
            <button
              className="lg:hidden p-2 text-gray-700 hover:text-tobler-blue transition-colors"
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
            >
              <Menu size={24} />
            </button>
          </div>
        </div>
      </header>

      <MobileMenu open={mobileOpen} onClose={() => setMobileOpen(false)} />
      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  )
}

export default Header
