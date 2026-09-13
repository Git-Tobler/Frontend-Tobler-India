import { useState, useEffect } from 'react'
import { X } from 'lucide-react'
import CookiePreferences from './CookiePreferences.jsx'
import { hasStoredConsent, subscribeToConsent, writeStoredConsent } from '../../lib/consent.js'

function CookieConsent() {
  const [show, setShow] = useState(false)
  const [showPreferences, setShowPreferences] = useState(false)

  useEffect(() => {
    if (!hasStoredConsent()) {
      setShow(true)
    }
    /* Consent can be recorded without touching this banner — the preferences
       page, the footer modal, or the Contact map's own "show it here" button —
       and a banner still asking a question the visitor has just answered reads
       as broken. */
    return subscribeToConsent(() => setShow(!hasStoredConsent()))
  }, [])

  const handleAcceptAll = () => {
    writeStoredConsent({ strictly_necessary: true, external_content: true })
    setShow(false)
  }

  const handleRejectAll = () => {
    writeStoredConsent({ strictly_necessary: true, external_content: false })
    setShow(false)
  }

  const handleSavePreferences = (prefs) => {
    writeStoredConsent(prefs)
    setShow(false)
  }

  if (!show) return <CookiePreferences isOpen={showPreferences} onClose={() => setShowPreferences(false)} onSave={handleSavePreferences} />

  return (
    <>
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-gray-200 shadow-lg">
        <div className="container-content py-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex-1">
              <p className="text-gray-900 font-medium mb-1">We use cookies</p>
              <p className="text-sm text-gray-600">
                We use cookies to enhance your browsing experience and analyze site traffic. By continuing to use our site, you consent to our use of cookies.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 shrink-0">
              <button
                onClick={handleRejectAll}
                className="px-4 py-2 text-sm font-medium text-gray-700 border border-gray-300 rounded hover:bg-gray-50 transition-colors whitespace-nowrap"
              >
                Reject All
              </button>
              <button
                onClick={() => setShowPreferences(true)}
                className="px-4 py-2 text-sm font-medium text-gray-700 border border-gray-300 rounded hover:bg-gray-50 transition-colors whitespace-nowrap"
              >
                Cookie Preferences
              </button>
              <button
                onClick={handleAcceptAll}
                className="px-4 py-2 text-sm font-medium text-white bg-tobler-blue rounded hover:bg-tobler-blue-dark transition-colors whitespace-nowrap"
              >
                Accept All
              </button>
            </div>

            <button
              onClick={handleRejectAll}
              className="absolute top-4 right-4 p-1 text-gray-400 hover:text-gray-600 transition-colors lg:hidden"
              aria-label="Close"
            >
              <X size={20} />
            </button>
          </div>
        </div>
      </div>

      <CookiePreferences
        isOpen={showPreferences}
        onClose={() => setShowPreferences(false)}
        onSave={handleSavePreferences}
      />
    </>
  )
}

export default CookieConsent
