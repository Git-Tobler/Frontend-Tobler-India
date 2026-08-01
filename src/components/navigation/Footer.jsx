import { NavLink } from 'react-router-dom'
import { Linkedin, Facebook, Instagram, Youtube, Phone, Mail, MapPin } from 'lucide-react'
import Container from '../common/Container.jsx'
import { FOOTER_LINKS } from '../../constants/navigation.js'
import { SITE } from '../../constants/siteConfig.js'
import toblerLogo from '../../assets/brand/tobler-logo.svg'

function FooterColumn({ title, links }) {
  return (
    <div>
      <h6 className="text-white/90 mb-5 text-sm">{title}</h6>
      <ul className="space-y-3">
        {links.map((link) => (
          <li key={link.path}>
            <NavLink
              to={link.path}
              className="text-white/55 text-sm hover:text-tobler-gold transition-colors duration-200"
            >
              {link.label}
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  )
}

function Footer() {
  return (
    <footer className="bg-tobler-heading relative">
      <div className="h-1 bg-tobler-gold" />
      <Container className="pt-20 pb-10">
        <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr_1fr_1fr] gap-12 pb-14 border-b border-tobler-border-dark">
          <div>
            <div className="flex items-center gap-2 mb-5">
              <span className="bg-white p-1.5">
                <img src={toblerLogo} alt="Tobler" className="h-7 w-auto" />
              </span>
            </div>
            <p className="text-white/55 text-sm leading-relaxed max-w-xs mb-6 normal-case">
              Swiss-engineered scaffolding and formwork solutions, manufactured and supported
              locally for India&rsquo;s most demanding construction projects.
            </p>
            <div className="flex items-center gap-3">
              {[
                { icon: Linkedin, href: SITE.social.linkedin },
                { icon: Facebook, href: SITE.social.facebook },
                { icon: Instagram, href: SITE.social.instagram },
                { icon: Youtube, href: SITE.social.youtube },
              ].map(({ icon: Icon, href }, idx) => (
                <a
                  key={idx}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  className="w-9 h-9 flex items-center justify-center border border-white/15 text-white hover:bg-tobler-gold hover:border-tobler-gold transition-colors duration-200"
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          <FooterColumn title="Company" links={FOOTER_LINKS.company} />
          <FooterColumn title="Solutions" links={FOOTER_LINKS.solutions} />

          <div>
            <h6 className="text-white/90 mb-5 text-sm">Get in Touch</h6>
            <ul className="space-y-4 text-sm text-white/55">
              <li className="flex items-start gap-3">
                <MapPin size={15} className="text-tobler-gold mt-0.5 shrink-0" />
                <span className="normal-case">{SITE.address}</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={15} className="text-tobler-gold shrink-0" />
                <a href={`tel:${SITE.phone}`} className="hover:text-tobler-gold transition-colors">
                  {SITE.phone}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={15} className="text-tobler-gold shrink-0" />
                <a href={`mailto:${SITE.email}`} className="hover:text-tobler-gold transition-colors">
                  {SITE.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="label-mono text-white/35">
            © {new Date().getFullYear()} All rights reserved
          </p>
          <div className="flex items-center gap-6 label-mono text-white/35">
            <span>Swiss Engineering / Manufactured in India</span>
          </div>
        </div>
      </Container>
    </footer>
  )
}

export default Footer
