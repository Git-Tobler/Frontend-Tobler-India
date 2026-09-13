import { useEffect, useState } from 'react'
import { CheckCircle2 } from 'lucide-react'
import SEO from '../../components/common/SEO.jsx'
import Container from '../../components/common/Container.jsx'
import { NavLink } from 'react-router-dom'
import { SITE } from '../../data/site.js'
import { useFooter } from '../../contexts/FooterContext.jsx'
import { readStoredConsent, writeStoredConsent } from '../../lib/consent.js'

function CookiePreferencesPage() {
  const { setShowFooter } = useFooter()
  const [preferences, setPreferences] = useState(readStoredConsent)
  const [savedAt, setSavedAt] = useState(0)

  useEffect(() => {
    setShowFooter(false)
    return () => setShowFooter(true)
  }, [setShowFooter])

  /* Keyed on the save time rather than a boolean so a second change re-arms the
     confirmation with a full window, instead of inheriting the previous
     change's nearly expired timer and flashing past. */
  useEffect(() => {
    if (!savedAt) return undefined
    const timer = setTimeout(() => setSavedAt(0), 3000)
    return () => clearTimeout(timer)
  }, [savedAt])

  /* Every path that changes a preference goes through here, so the switches,
     the stored record and the confirmation can never drift apart. */
  const save = (next) => {
    setPreferences(next)
    writeStoredConsent(next)
    setSavedAt(Date.now())
  }

  const handleToggle = (id) => {
    // The control is rendered disabled, but guard the handler too so no stray
    // call can record consent for a site that would not work without it.
    if (id === 'strictly_necessary') return
    save({ ...preferences, [id]: !preferences[id] })
  }

  const handleAcceptAll = () => {
    save({ strictly_necessary: true, external_content: true })
  }

  const handleRejectAll = () => {
    save({ strictly_necessary: true, external_content: false })
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
                Choose which cookies you allow. Strictly necessary cookies are always active. Every
                change is saved as you make it.
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
                        checked={preferences.strictly_necessary}
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
                        className={`relative h-6 w-11 rounded-full transition-colors ${
                          preferences.external_content ? 'bg-tobler-blue' : 'bg-gray-300'
                        }`}
                        role="switch"
                        aria-checked={preferences.external_content}
                        aria-label="External Content cookies"
                      >
                        <span
                          className={`absolute top-0.5 left-0.5 h-5 w-5 bg-white rounded-full transition-transform ${
                            preferences.external_content ? 'translate-x-5' : 'translate-x-0'
                          }`}
                        />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center justify-end gap-3 mt-12 pt-8 border-t border-tobler-border">
                {/* The live region stays mounted and empty so the confirmation is
                    announced as a change inside it, rather than as a whole new
                    region appearing — which screen readers routinely miss. */}
                <p role="status" aria-live="polite" className="mr-auto text-sm font-medium text-tobler-success">
                  {savedAt > 0 && (
                    <span className="flex items-center gap-2 animate-fade-in">
                      <CheckCircle2 size={16} />
                      Preferences saved
                    </span>
                  )}
                </p>
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
