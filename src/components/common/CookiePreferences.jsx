import { useState } from 'react'
import { X } from 'lucide-react'

function CookiePreferences({ isOpen, onClose, onSave }) {
  const [preferences, setPreferences] = useState({
    strictly_necessary: true,
    external_content: false,
  })

  const handleToggle = (key) => {
    if (key === 'strictly_necessary') return
    setPreferences((prev) => ({
      ...prev,
      [key]: !prev[key],
    }))
  }

  const handleRejectAll = () => {
    setPreferences({
      strictly_necessary: true,
      external_content: false,
    })
    onSave({ strictly_necessary: true, external_content: false })
    onClose()
  }

  const handleAcceptAll = () => {
    const allPrefs = {
      strictly_necessary: true,
      external_content: true,
    }
    setPreferences(allPrefs)
    onSave(allPrefs)
    onClose()
  }

  const handleSavePreferences = () => {
    onSave(preferences)
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-8 border-b border-gray-200">
          <h2 className="text-2xl font-semibold text-tobler-heading">Cookie Preferences</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
            aria-label="Close"
          >
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="p-8">
          <p className="text-sm text-tobler-body mb-8">
            Choose which cookies you allow. Strictly necessary cookies are always active.
          </p>

          {/* Cookie Options */}
          <div className="space-y-6">
            {/* Strictly Necessary */}
            <div className="flex items-start justify-between gap-4 pb-6 border-b border-gray-200">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="font-semibold text-tobler-heading">Strictly Necessary</h3>
                  <span className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-600 font-medium">
                    Always on
                  </span>
                </div>
                <p className="text-sm text-tobler-body">
                  Required for the site to work: navigation, security, form submission, and remembering the language and region you choose. These cannot be switched off and involve no third party.
                </p>
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

            {/* External Content */}
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <h3 className="font-semibold text-tobler-heading mb-2">External Content</h3>
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

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 p-8 border-t border-gray-200 bg-gray-50">
          <button
            onClick={handleRejectAll}
            className="px-6 py-2.5 text-sm font-semibold text-tobler-blue border border-tobler-blue rounded-lg hover:bg-tobler-blue/5 transition-colors"
          >
            Reject All
          </button>
          <button
            onClick={handleSavePreferences}
            className="px-6 py-2.5 text-sm font-semibold text-tobler-blue border border-tobler-blue rounded-lg hover:bg-tobler-blue/5 transition-colors"
          >
            Save Preferences
          </button>
          <button
            onClick={handleAcceptAll}
            className="px-6 py-2.5 text-sm font-semibold text-white bg-tobler-blue rounded-lg hover:bg-tobler-blue/90 transition-colors"
          >
            Accept All
          </button>
        </div>
      </div>
    </div>
  )
}

export default CookiePreferences
