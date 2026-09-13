/* One reader and one writer for the stored cookie choice. Four surfaces touch
   it — the banner, the modal the banner opens, the same modal opened from the
   footer, and the standalone preferences page — and each used to carry its own
   copy of the key, the shape and the localStorage guards. That is how the modal
   came to seed itself from a hardcoded "off" while the page seeded from
   storage: two surfaces disagreeing on screen about the same stored value, with
   the modal's Save then writing its stale view back over a live consent. */

const CONSENT_KEY = 'cookieConsent'

/* strictly_necessary is pinned true wherever consent is read or written: it
   covers the site working at all, so there is no choice to record and nothing
   to switch off. external_content is the only real decision. */
export const DEFAULT_CONSENT = {
  strictly_necessary: true,
  external_content: false,
}

/* Private-mode browsers and blocked site data throw on any localStorage access,
   reads included, and a half-written or hand-edited value throws on parse.
   Either would happen inside a render and white-screen the page, so both fall
   back to the safest reading of intent: nothing consented to. */
export function readStoredConsent() {
  try {
    const stored = localStorage.getItem(CONSENT_KEY)
    if (!stored) return DEFAULT_CONSENT
    return {
      strictly_necessary: true,
      external_content: JSON.parse(stored).external_content === true,
    }
  } catch {
    return DEFAULT_CONSENT
  }
}

/* Whether the visitor has answered at all, which is a different question from
   what they answered — the banner has to keep showing until they have, and
   rejecting everything is an answer. */
export function hasStoredConsent() {
  try {
    return Boolean(localStorage.getItem(CONSENT_KEY))
  } catch {
    return false
  }
}

const listeners = new Set()

/* Same storage hazard on the way out, and a failed write is not worth crashing
   a click over: the choice still holds for this visit through React state and
   the notify below, only the record of it is lost and the banner asks again
   next time. */
export function writeStoredConsent(prefs) {
  try {
    localStorage.setItem(
      CONSENT_KEY,
      JSON.stringify({ ...prefs, timestamp: new Date().toISOString() })
    )
  } catch {
    /* Nothing recoverable here, and nothing we could tell the visitor that
       would help them — their browser is refusing storage on purpose. */
  }
  listeners.forEach((listener) => listener())
}

/* The browser's own `storage` event only fires in *other* tabs, so the in-page
   listener set is the one that matters: the modal is mounted app-wide from the
   footer, and a visitor can flip External Content there while standing on the
   Contact page whose map is gated on it. */
export function subscribeToConsent(listener) {
  listeners.add(listener)
  window.addEventListener('storage', listener)
  return () => {
    listeners.delete(listener)
    window.removeEventListener('storage', listener)
  }
}

/* Exposed as a bare boolean because useSyncExternalStore compares snapshots by
   identity — handing it the freshly parsed object from readStoredConsent would
   re-render forever. */
export function getExternalContentConsent() {
  return readStoredConsent().external_content
}
