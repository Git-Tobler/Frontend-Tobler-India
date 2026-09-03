import { NavLink } from 'react-router-dom'
import { Linkedin, Facebook, Instagram, Youtube, Phone, Mail, MapPin, ArrowRight } from 'lucide-react'
import Container from '../common/Container.jsx'
import { FOOTER_LINKS } from '../../data/navigation.js'
import { COUNTRY_GROUPS } from '../../data/countries.js'
import { SITE } from '../../data/site.js'
import { MEDIA } from '../../data/media-map.js'
import { cldImage } from '../../lib/cloudinary.js'
import toblerLogo from '../../assets/brand/tobler-logo.svg'

function FooterColumn({ title, links }) {
  return (
    <div className="flex flex-col">
      <h6 className="text-white font-semibold mb-6 text-sm uppercase tracking-wider">{title}</h6>
      <ul className="space-y-3 flex flex-col">
        {links.map((link) => (
          <li key={link.path}>
            <NavLink
              to={link.path}
              className="text-white/60 text-sm hover:text-tobler-gold transition-colors duration-200 flex items-center gap-2 group"
            >
              {link.label}
              <ArrowRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  )
}

function Footer() {
  return (
    <footer className="bg-black relative mt-auto">
      {/* Gold accent line */}
      <div className="h-1 bg-tobler-gold" />

      <Container className="py-20">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 pb-16 border-b border-white/10">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <span className="bg-white p-1.5 rounded">
                <img src={toblerLogo} alt="Tobler" className="h-6 w-auto" />
              </span>
            </div>
            <p className="text-white/60 text-xs leading-relaxed mb-8 normal-case">
              Swiss-engineered scaffolding and formwork solutions, manufactured and supported locally for India&rsquo;s most demanding construction projects.
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-4">
              {[
                { icon: Linkedin, href: SITE.social.linkedin, label: 'LinkedIn' },
                { icon: Facebook, href: SITE.social.Pinteresty, label: 'Pinterest' },
                { icon: Instagram, href: SITE.social.instagram, label: 'Instagram' },
                { icon: Youtube, href: SITE.social.youtube, label: 'YouTube' },
              ].map(({ icon: Icon, href, label }, idx) => (
                <a
                  key={idx}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  className="w-10 h-10 flex items-center justify-center border border-white/20 text-white/70 hover:bg-tobler-gold hover:border-tobler-gold hover:text-black transition-all duration-200"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation Columns */}
          <FooterColumn title="Company" links={FOOTER_LINKS.company} />
          <FooterColumn title="Solutions" links={FOOTER_LINKS.solutions} />
          <FooterColumn title="Resources" links={FOOTER_LINKS.resources} />

          {/* Contact Section */}
          <div className="flex flex-col">
            <h6 className="text-white font-semibold mb-6 text-sm uppercase tracking-wider">Contact</h6>
            <ul className="space-y-5 flex flex-col">
              <li className="flex items-start gap-3">
                <MapPin size={16} className="text-tobler-gold mt-0.5 shrink-0" />
                <span className="text-white/60 text-xs leading-relaxed normal-case">{SITE.address}</span>
              </li>
              <li className="flex items-start gap-3">
                <Phone size={16} className="text-tobler-gold shrink-0" />
                <a href={`tel:${SITE.phone}`} className="text-white/60 text-xs hover:text-tobler-gold transition-colors">
                  {SITE.phone}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Mail size={16} className="text-tobler-gold shrink-0" />
                <a href={`mailto:${SITE.email}`} className="text-white/60 text-xs hover:text-tobler-gold transition-colors">
                  {SITE.email}
                </a>
              </li>
            </ul>

            {/* Swiss Engineer Logo */}
            <img
              src={cldImage(MEDIA.swissEngineer, { w: 360 })}
              alt="Swiss Engineer"
              className="h-24 w-auto object-contain mt-8"
              loading="lazy"
            />
          </div>
        </div>

        

      </Container>

      {/* Bottom Footer on White Ribbon */}
      <div className="bg-white py-6">
        <Container>
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <p className="text-xs text-tobler-body">
              © {new Date().getFullYear()} Tobler India Pvt. Ltd. All Rights Reserved.
            </p>

            <div className="flex items-center gap-6 flex-wrap justify-center md:justify-end">
              <NavLink to="/privacy-policy" className="text-xs text-tobler-body hover:text-tobler-blue transition-colors">
                Privacy Policy
              </NavLink>
              <span className="w-1 h-1 bg-tobler-border" />
              <NavLink to="/terms-conditions" className="text-xs text-tobler-body hover:text-tobler-blue transition-colors">
                Terms & Conditions
              </NavLink>
              <span className="w-1 h-1 bg-tobler-border" />
              <NavLink to="/cookies-policy" className="text-xs text-tobler-body hover:text-tobler-blue transition-colors">
                Cookie Policy
              </NavLink>
              <span className="w-1 h-1 bg-tobler-border" />
              <button className="text-xs text-tobler-body hover:text-tobler-blue transition-colors">
                Cookie Preferences
              </button>
              <span className="w-1 h-1 bg-tobler-border" />
              <button
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="text-xs font-semibold text-tobler-blue hover:text-tobler-gold transition-colors border border-tobler-blue px-3 py-1.5 rounded"
              >
                Back to Top
              </button>
            </div>
          </div>
        </Container>
      </div>
    </footer>
  )
}

export default Footer
