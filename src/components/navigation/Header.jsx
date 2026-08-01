import { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { Menu } from 'lucide-react'
import { NAV_LINKS } from '../../constants/navigation.js'
import DropdownMenu from './DropdownMenu.jsx'
import MobileMenu from './MobileMenu.jsx'
import Button from '../common/Button.jsx'
import Container from '../common/Container.jsx'
import toblerLogo from '../../assets/brand/tobler-logo.svg'

function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 24)
    handleScroll()
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const linkColor = scrolled ? 'text-tobler-heading' : 'text-white'

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-premium ${
          scrolled ? 'bg-white/97 backdrop-blur-md shadow-soft py-3 border-b border-tobler-border' : 'bg-transparent py-6'
        }`}
      >
        <Container className="flex items-center justify-between">
          <NavLink to="/" className="flex items-center gap-2.5 shrink-0">
            <span className="bg-white px-2 py-1 shadow-sm">
              <img src={toblerLogo} alt="Tobler" className="h-8 w-auto" />
            </span>
            
          </NavLink>

          <nav className="hidden lg:flex items-center gap-7">
            {NAV_LINKS.map((item) =>
              item.children ? (
                <DropdownMenu key={item.label} item={item} scrolled={scrolled} />
              ) : (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) =>
                    `label-mono transition-colors duration-200 ${linkColor} hover:text-tobler-gold ${
                      isActive ? 'text-tobler-gold' : ''
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              )
            )}
          </nav>

          <div className="hidden lg:flex items-center gap-3">
            <Button to="/contact" variant={scrolled ? 'primary' : 'accent'} size="sm">
              Request a Quote
            </Button>
          </div>

          <button
            className={`lg:hidden p-2 border transition-colors ${
              scrolled ? 'text-tobler-heading border-tobler-border' : 'text-white border-white/30'
            }`}
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
          >
            <Menu size={22} />
          </button>
        </Container>
      </header>
      <MobileMenu open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  )
}

export default Header
