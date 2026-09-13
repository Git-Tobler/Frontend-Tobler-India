import { useEffect, useState, useSyncExternalStore } from 'react'
import { useLocation } from 'react-router-dom'
import { MapPin, Phone, Mail, Briefcase, Linkedin, Share2, Instagram, Youtube } from 'lucide-react'
import SEO from '../../components/common/SEO.jsx'
import PageHero from '../../components/layout/PageHero.jsx'
import Container from '../../components/common/Container.jsx'
import Button from '../../components/common/Button.jsx'
import ContactForm from '../../components/forms/ContactForm.jsx'
import RFQForm from '../../components/forms/RFQForm.jsx'
import DownloadCard from '../../components/ui/DownloadCard.jsx'
import { SITE } from '../../data/site.js'
import { MEDIA } from '../../data/media-map.js'
import {
  getExternalContentConsent,
  subscribeToConsent,
  writeStoredConsent,
} from '../../lib/consent.js'

const TABS = [
  { id: 'contact', label: 'General Enquiry' },
  { id: 'rfq', label: 'Request a Quote' },
]

const MAPS_SEARCH_URL = `https://maps.google.com/?q=${encodeURIComponent(SITE.address)}`

function Contact() {
  const { hash } = useLocation()
  const [activeTab, setActiveTab] = useState(hash === '#rfq' ? 'rfq' : 'contact')

  /* Read through the store rather than into state: the cookie modal is mounted
     app-wide from the footer, so the visitor can change this answer without
     ever leaving the page, and the map below has to follow. */
  const mapAllowed = useSyncExternalStore(subscribeToConsent, getExternalContentConsent)

  /* Product pages and the footer link straight to /contact#rfq. On a cold load
     the initial state above is enough, but arriving from a page that is already
     /contact only changes the hash — this switches the tab in that case too. */
  useEffect(() => {
    if (hash === '#rfq') setActiveTab('rfq')
  }, [hash])

  return (
    <>
      <SEO
        title="Contact Us"
        description="Get in touch for general enquiries, quotation requests, dealer information or career opportunities."
        path="/contact"
      />
      <PageHero
        imageId={MEDIA.contactPageHero}
        title="Let's Discuss Your Next Project"
        breadcrumbItems={[{ label: 'Contact' }]}
      />

      <section id="rfq" className="scroll-mt-28 py-24 md:py-30">
        <Container>
          <div className="grid lg:grid-cols-[1fr_1.3fr] gap-14">
            <div className="space-y-8">
              <div className="p-7 rounded-card border border-tobler-border bg-tobler-bg-light">
                <h3 className="text-base mb-5">Office Information</h3>
                <ul className="space-y-4 text-sm">
                  <li className="flex items-start gap-3">
                    <MapPin size={18} className="text-tobler-blue shrink-0 mt-0.5" />
                    <span className="text-tobler-body">{SITE.address}</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Phone size={18} className="text-tobler-blue shrink-0" />
                    <a href={`tel:${SITE.phone}`} className="text-tobler-body hover:text-tobler-blue">
                      {SITE.phone}
                    </a>
                  </li>
                  <li className="flex items-center gap-3">
                    <Mail size={18} className="text-tobler-blue shrink-0" />
                    <a href={`mailto:${SITE.email}`} className="text-tobler-body hover:text-tobler-blue">
                      {SITE.email}
                    </a>
                  </li>
                </ul>
              </div>

              <div className="p-7 rounded-card border border-tobler-border bg-white">
                <h3 className="text-base mb-4 flex items-center gap-2">
                  <Briefcase size={18} className="text-tobler-blue" />
                  Careers
                </h3>
                <p className="text-sm text-tobler-body leading-relaxed mb-4">
                  Interested in joining us? Send your resume and area of interest through
                  the general enquiry form and our HR team will be in touch.
                </p>
              </div>

              <div>
                <h3 className="text-base mb-4">Brochures & Downloads</h3>
                <div className="space-y-3">
                  <DownloadCard title="Company Profile" />
                  <DownloadCard title="Full Product Catalogue" />
                </div>
              </div>

              <div className="flex items-center gap-3">
                {[
                  { icon: Linkedin, href: SITE.social.linkedin, label: 'LinkedIn' },
                  { icon: Share2, href: SITE.social.pinterest, label: 'Pinterest' },
                  { icon: Instagram, href: SITE.social.instagram, label: 'Instagram' },
                  { icon: Youtube, href: SITE.social.youtube, label: 'YouTube' },
                ].map(({ icon: Icon, href, label }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="w-10 h-10 flex items-center justify-center border border-tobler-border text-tobler-heading hover:bg-tobler-blue hover:border-tobler-blue hover:text-white transition-colors duration-200"
                  >
                    <Icon size={17} aria-hidden="true" />
                  </a>
                ))}
              </div>
            </div>

            <div>
              <div role="tablist" aria-label="Contact options" className="flex border-b border-tobler-border mb-8">
                {TABS.map((tab) => (
                  <button
                    key={tab.id}
                    id={`tab-${tab.id}`}
                    role="tab"
                    type="button"
                    aria-selected={activeTab === tab.id}
                    aria-controls={`panel-${tab.id}`}
                    onClick={() => setActiveTab(tab.id)}
                    className={`px-6 py-3 text-sm font-semibold border-b-2 transition-colors duration-200 -mb-px ${
                      activeTab === tab.id
                        ? 'border-tobler-blue text-tobler-blue'
                        : 'border-transparent text-tobler-body hover:text-tobler-heading'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
              <div id={`panel-${activeTab}`} role="tabpanel" aria-labelledby={`tab-${activeTab}`}>
                {activeTab === 'contact' ? <ContactForm /> : <RFQForm />}
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* The embed hands the visitor's IP to Google the moment it loads, which
          is exactly what the External Content switch in the cookie preferences
          promises not to do when it is off. Gated here rather than hidden
          outright so refusing still leaves a working way to find the office,
          and so granting it takes one click from where the map would be. */}
      <section className="pb-24">
        <Container>
          {mapAllowed ? (
            <div className="rounded-card overflow-hidden border border-tobler-border h-[420px]">
              <iframe
                title="Office Location"
                src={SITE.mapEmbedUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          ) : (
            <div className="rounded-card border border-tobler-border bg-tobler-bg-light p-7 md:p-10">
              <h3 className="text-base mb-4 flex items-center gap-2">
                <MapPin size={18} className="text-tobler-blue" />
                Find Us
              </h3>
              <p className="text-sm text-tobler-body leading-relaxed mb-6 max-w-reading">
                {SITE.address}
              </p>
              <div className="flex flex-wrap items-center gap-3">
                <Button
                  href={MAPS_SEARCH_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="secondary"
                  size="sm"
                >
                  Open in Google Maps
                </Button>
                <Button
                  onClick={() => writeStoredConsent({ strictly_necessary: true, external_content: true })}
                  variant="ghost"
                  size="sm"
                  icon={false}
                >
                  Show the map here
                </Button>
              </div>
              <p className="text-xs text-tobler-muted mt-5 max-w-reading">
                The embedded map is hosted by Google and loading it shares your IP address
                with them. Showing it here turns on External Content in your cookie
                preferences, which you can change again at any time.
              </p>
            </div>
          )}
        </Container>
      </section>
    </>
  )
}

export default Contact
