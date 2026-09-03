import { useEffect } from 'react'
import SEO from '../../components/common/SEO.jsx'
import Container from '../../components/common/Container.jsx'
import { NavLink } from 'react-router-dom'
import { SITE } from '../../data/site.js'
import { useFooter } from '../../contexts/FooterContext.jsx'

function CookiePreferencesPage() {
  const { setShowFooter } = useFooter()

  useEffect(() => {
    setShowFooter(false)
    return () => setShowFooter(true)
  }, [setShowFooter])
  const handleToggle = (id) => {
    console.log('Toggle cookie preference:', id)
  }

  const handleAcceptAll = () => {
    const prefs = {
      strictly_necessary: true,
      external_content: true,
      timestamp: new Date().toISOString(),
    }
    localStorage.setItem('cookieConsent', JSON.stringify(prefs))
  }

  const handleRejectAll = () => {
    const prefs = {
      strictly_necessary: true,
      external_content: false,
      timestamp: new Date().toISOString(),
    }
    localStorage.setItem('cookieConsent', JSON.stringify(prefs))
  }

  return (
    <>
      <SEO
        title="Cookie Preferences | Tobler"
        description="Manage your cookie preferences and privacy settings."
        path="/cookie-preferences"
      />

      <section className="bg-white py-20 md:py-28">
        <Container>
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm mb-8 md:mb-12">
            <NavLink to="/" className="text-tobler-blue hover:text-tobler-heading transition-colors">
              Home
            </NavLink>
            <span className="text-tobler-body/50">/</span>
            <span className="text-tobler-body">Cookie Preferences</span>
          </div>

          {/* Header */}
          <div className="text-center mb-16 md:mb-20">
            <p className="text-xs font-semibold uppercase tracking-widest text-tobler-blue mb-4">PRIVACY</p>
            <h1 className="text-4xl md:text-5xl font-semibold text-tobler-heading leading-tight">
              Cookie Preferences
            </h1>
          </div>

          {/* Main Content */}
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-lg border border-tobler-border p-8 md:p-12">
              <p className="text-sm text-tobler-body mb-8">
                Choose which cookies you allow. Strictly necessary cookies are always active.
              </p>

              {/* Cookie Options */}
              <div className="space-y-8">
                {/* Strictly Necessary */}
                <div className="pb-8 border-b border-tobler-border">
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h2 className="font-semibold text-lg text-tobler-heading">Strictly Necessary</h2>
                        <span className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-600 font-medium">
                          Always on
                        </span>
                      </div>
                    </div>
                    <div className="flex-shrink-0">
                      <input
                        type="checkbox"
                        checked={true}
                        disabled
                        className="h-6 w-6 rounded accent-tobler-blue cursor-not-allowed"
                        aria-label="Strictly Necessary cookies"
                      />
                    </div>
                  </div>
                  <p className="text-sm text-tobler-body">
                    Required for the site to work: navigation, security, form submission, and remembering the language and region you choose. These cannot be switched off and involve no third party.
                  </p>
                </div>

                {/* External Content */}
                <div>
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <h2 className="font-semibold text-lg text-tobler-heading mb-2">External Content</h2>
                      <p className="text-sm text-tobler-body">
                        Lets us show content hosted by others, currently the Google Map on our Contact page. Turning this on shares your IP address with Google. With it off, we show the address and a plain link instead.
                      </p>
                    </div>
                    <div className="flex-shrink-0">
                      <button
                        onClick={() => handleToggle('external_content')}
                        className="relative h-6 w-11 rounded-full transition-colors bg-gray-300"
                        role="switch"
                        aria-checked="false"
                        aria-label="External Content cookies"
                      >
                        <span className="absolute top-0.5 left-0.5 h-5 w-5 bg-white rounded-full transition-transform" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-end gap-3 mt-12 pt-8 border-t border-tobler-border">
                <button
                  onClick={handleRejectAll}
                  className="px-6 py-2.5 text-sm font-semibold text-tobler-blue border border-tobler-blue rounded-lg hover:bg-tobler-blue/5 transition-colors"
                >
                  Reject All
                </button>
                <button
                  onClick={handleAcceptAll}
                  className="px-6 py-2.5 text-sm font-semibold text-white bg-tobler-blue rounded-lg hover:bg-tobler-blue/90 transition-colors"
                >
                  Accept All
                </button>
              </div>
            </div>

            {/* Info Section */}
            <div className="mt-12 p-6 rounded-lg bg-tobler-bg-light">
              <h3 className="font-semibold text-tobler-heading mb-3">Need Help?</h3>
              <p className="text-sm text-tobler-body mb-4">
                For more information about our cookie practices, please visit our{' '}
                <NavLink to="/cookies-policy" className="text-tobler-blue hover:text-tobler-heading transition-colors font-medium">
                  Cookies Policy page
                </NavLink>
                .
              </p>
              <p className="text-sm text-tobler-body">
                Have questions? Contact us at{' '}
                <a href={`mailto:${SITE.email}`} className="text-tobler-blue hover:text-tobler-heading transition-colors font-medium">
                  {SITE.email}
                </a>
              </p>
            </div>
          </div>
        </Container>
      </section>
    </>
  )
}

export default CookiePreferencesPage
