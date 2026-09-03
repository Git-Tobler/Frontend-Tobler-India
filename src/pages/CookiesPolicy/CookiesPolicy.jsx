import { useEffect } from 'react'
import SEO from '../../components/common/SEO.jsx'
import Container from '../../components/common/Container.jsx'
import { NavLink } from 'react-router-dom'
import { SITE } from '../../data/site.js'
import { useFooter } from '../../contexts/FooterContext.jsx'

function CookiesPolicy() {
  const { setShowFooter } = useFooter()

  useEffect(() => {
    setShowFooter(false)
    return () => setShowFooter(true)
  }, [setShowFooter])
  return (
    <>
      <SEO
        title="Cookies Policy | Tobler"
        description="Understand what cookies we use and how to manage your cookie preferences."
        path="/cookies-policy"
      />

      <section className="bg-white py-20 md:py-28">
        <Container>
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm mb-8 md:mb-12">
            <NavLink to="/" className="text-tobler-blue hover:text-tobler-heading transition-colors">
              Home
            </NavLink>
            <span className="text-tobler-body/50">/</span>
            <span className="text-tobler-body">Cookie Policy</span>
          </div>

          {/* Header */}
          <div className="text-center mb-16 md:mb-20">
            <p className="text-xs font-semibold uppercase tracking-widest text-tobler-blue mb-4">LEGAL</p>
            <h1 className="text-4xl md:text-5xl font-semibold text-tobler-heading leading-tight">
              Cookie Policy for<br />tobler-india.com
            </h1>
          </div>

          {/* Two Column Layout */}
          <div className="grid md:grid-cols-[1fr_1fr] gap-12 lg:gap-16">
            {/* Left Column */}
            <div className="space-y-12">
              {/* What This Policy Covers */}
              <div>
                <h2 className="text-xl font-semibold text-tobler-heading mb-4">What This Policy Covers</h2>
                <p className="text-sm leading-relaxed text-tobler-body">
                  This policy explains the cookies and browser storage this website uses. In short: we set no advertising or tracking cookies, we run no analytics tool, and nothing you do here is used to profile you. The few items we store are either strictly necessary for the site to work or are set only because you asked for them.
                </p>
              </div>

              {/* What We Store, and Why */}
              <div>
                <h2 className="text-xl font-semibold text-tobler-heading mb-4">What We Store, and Why</h2>
                <p className="text-sm leading-relaxed text-tobler-body mb-4">
                  We keep five small items in your browser: your cookie choice, the language you select, the sales region you select, and, once they have been shown, a note that a promotional message has already appeared and a note that our feedback prompt has already appeared. All five are strictly necessary or set at your request, none contain personal profiles, and none are shared with anyone. The feedback note lives only until you close the browser tab.
                </p>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-12">
              {/* Optional: Google Maps */}
              <div>
                <h2 className="text-xl font-semibold text-tobler-heading mb-4">Optional: Google Maps</h2>
                <p className="text-sm leading-relaxed text-tobler-body">
                  Our Contact page can embed a Google Map. That is optional external content; it stays switched off unless you allow it, and allowing it shares your IP address with Google so the map can load. Everything else on the site talks only to our own servers and our image CDN.
                </p>
              </div>

              {/* Managing Your Preferences */}
              <div>
                <h2 className="text-xl font-semibold text-tobler-heading mb-4">Managing Your Preferences</h2>
                <p className="text-sm leading-relaxed text-tobler-body mb-4">
                  You can change or withdraw your choice at any time using the Cookie Preferences link at the bottom of every page. Your choice is remembered for 180 days, after which we ask again. Clearing your browser storage also resets it.
                </p>
              </div>

              {/* Contact */}
              <div>
                <h2 className="text-xl font-semibold text-tobler-heading mb-4">Contact</h2>
                <p className="text-sm leading-relaxed text-tobler-body">
                  For any question about cookies or storage on this site, contact us at{' '}
                  <a
                    href={`mailto:${SITE.email}`}
                    className="text-tobler-blue hover:text-tobler-heading transition-colors font-medium"
                  >
                    {SITE.email}
                  </a>
                  .
                </p>
              </div>
            </div>
          </div>

          {/* Last Updated */}
          <div className="mt-16 pt-8 border-t border-tobler-border text-xs text-tobler-body/60">
            <p>Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long' })}</p>
          </div>
        </Container>
      </section>
    </>
  )
}

export default CookiesPolicy
