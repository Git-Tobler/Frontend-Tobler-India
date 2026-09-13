import { SITE } from '../data/site.js'

/* Form delivery, in two tiers.
 *
 * Tier 1 — our own /api/enquiry endpoint. The browser POSTs the form to this
 * site's own origin and a Vercel serverless function relays it to EmailJS.
 *
 * This used to call EmailJS directly from the page, which meant the service id,
 * template id and public key were compiled into the bundle and readable by
 * anyone who opened DevTools and submitted the form. That is not a flaw in how
 * it was wired — it is unavoidable for any browser-side mail service, and
 * EmailJS's own docs say the public key "is visible in browser requests". The
 * only real fix is to stop calling them from the browser, so nothing in this
 * file knows a credential any more. See api/enquiry.js.
 *
 * Tier 2 — mailto handoff. If the endpoint is unreachable or unconfigured, the
 * forms do NOT sit there broken and they do not lie about having sent: they
 * hand the visitor a pre-filled message addressed to us, which their own mail
 * app sends. Less seamless, but an enquiry that arrives beats one that doesn't.
 *
 * Both tiers return `{ status }` — 'sent' or 'mailto' — so the forms can tell
 * them apart and word their confirmation honestly. That contract is unchanged
 * from the EmailJS version, which is why no form component needed editing.
 */

const ENDPOINT = '/api/enquiry'

/* Aborts a hung request rather than leaving the submit button spinning forever.
 * On timeout we fall through to the mailto tier, so a slow function degrades to
 * a working path instead of a dead form. */
const REQUEST_TIMEOUT_MS = 15000

/* The address the mailto tier hands the visitor. The server has its own
 * recipient (CONTACT_RECIPIENT, set in Vercel) for tier 1; this one only has to
 * be right for the fallback, so it reads from the address the site publishes
 * rather than from an env var that would have to be duplicated client-side. */
const RECIPIENT = (SITE.email || '').trim()

/* Field order and human labels for the mailto body. Kept here rather than read
 * off Object.keys so the mail reads as a written enquiry rather than a dump of
 * camelCase form state, and so the long free-text field lands last. */
const CONTACT_FIELDS = [
  ['name', 'Name'],
  ['email', 'Email'],
  ['phone', 'Phone'],
  ['subject', 'Subject'],
  ['message', 'Message'],
]

const RFQ_FIELDS = [
  ['name', 'Name'],
  ['company', 'Company'],
  ['email', 'Email'],
  ['phone', 'Phone'],
  ['productCategory', 'Product category'],
  ['projectLocation', 'Project location'],
  ['quantity', 'Quantity'],
  ['timeline', 'Timeline'],
  ['details', 'Details'],
]

/* Mail clients and browsers quietly drop a mailto: past roughly 2000 characters
 * — Outlook on Windows is one of the stricter ones, and it fails by doing
 * nothing rather than by erroring. So the body is measured *encoded* (a newline
 * costs 3 characters once escaped, which is easy to under-count) and trimmed to
 * fit, with a visible marker so neither side mistakes a truncated enquiry for a
 * complete one. */
const MAILTO_LIMIT = 1900
const TRUNCATION_NOTE = '\n\n[Message trimmed to fit — please send the rest in a reply.]'

function fitToMailto(body, headroom) {
  if (encodeURIComponent(body).length <= headroom) return body

  const budget = headroom - encodeURIComponent(TRUNCATION_NOTE).length
  let kept = body
  while (kept.length > 0 && encodeURIComponent(kept).length > budget) {
    // Proportional step rather than one character at a time: the encoded length
    // is a non-linear function of the raw length, so a linear walk on a long
    // body is needlessly slow.
    kept = kept.slice(0, Math.max(0, Math.floor(kept.length * 0.9) - 1))
  }
  return kept.trimEnd() + TRUNCATION_NOTE
}

function buildBody(formData, fields) {
  return fields
    .map(([key, label]) => {
      const value = String(formData[key] ?? '').trim()
      return value ? `${label}: ${value}` : null
    })
    .filter(Boolean)
    .join('\n')
}

/* Hands the enquiry to the visitor's own mail app, pre-addressed and pre-filled.
 *
 * `location.href` rather than window.open: a mailto is handed to the OS handler
 * and the page is left where it is, whereas window.open is a popup and gets
 * blocked. This runs inside the form's submit handler, which is the user
 * gesture that makes the browser willing to follow it at all. */
function handoffToMailClient(formData, fields, subject) {
  if (typeof window === 'undefined') {
    throw new Error('Cannot open a mail client outside the browser.')
  }

  const head = `mailto:${RECIPIENT}?subject=${encodeURIComponent(subject)}&body=`
  const body = fitToMailto(buildBody(formData, fields), MAILTO_LIMIT - head.length)

  window.location.href = head + encodeURIComponent(body)
  return { status: 'mailto', recipient: RECIPIENT }
}

async function post(formType, formData) {
  // AbortSignal.timeout is not in older Safari, so the controller is driven by
  // a timer rather than assuming it exists.
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS)

  try {
    const response = await fetch(ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      signal: controller.signal,
      body: JSON.stringify({
        formType,
        ...formData,
        pageUrl: typeof window === 'undefined' ? '' : window.location.href,
      }),
    })

    /* Classify on what actually answered, not on the status code alone.
     *
     * Both directions matter. A 200 is not proof of a send: if the function is
     * missing, the SPA rewrite happily serves index.html with a 200 and the
     * form would report success for an enquiry nobody received. And a 4xx is
     * not proof of a rejection: a 404 from a deploy without the function, or a
     * 403 from a proxy, is also 4xx, and treating those as "deliberately
     * rejected" would suppress the mailto tier exactly when it is the only
     * route left.
     *
     * So the body has to confirm it: our function always replies with its own
     * JSON envelope, `{ ok: true }` or `{ error: '...' }`. Anything else did
     * not come from us. */
    let payload = null
    try {
      payload = await response.json()
    } catch {
      // An HTML error page or the SPA shell — not ours, and not worth parsing.
    }

    if (response.ok && payload?.ok === true) return { ok: true }

    const spokeForUs = typeof payload?.error === 'string' && payload.error.length > 0
    if (spokeForUs && response.status >= 400 && response.status < 500) {
      // A rejection the visitor can act on: bad address, missing field, rate
      // limited. Resending the same data through their mail client would not
      // fix it, so it is surfaced rather than retried.
      return { ok: false, fatal: true, message: payload.error }
    }

    // Our side is broken, or whatever answered was not us. Fall back.
    return { ok: false, fatal: false, message: '' }
  } finally {
    clearTimeout(timer)
  }
}

async function deliver(formData, { formType, fields, subject }) {
  const line = formData.subject?.trim() || subject

  let result
  try {
    result = await post(formType, formData)
  } catch {
    // Network down, DNS failure, aborted timeout, or the endpoint missing
    // entirely on a static preview — all of which the mailto tier can cover.
    return handoffToMailClient(formData, fields, line)
  }

  if (result.ok) return { status: 'sent', recipient: RECIPIENT }

  // A rejection the visitor can act on is worth showing them verbatim.
  if (result.fatal) throw new Error(result.message)

  return handoffToMailClient(formData, fields, line)
}

export async function sendContactMessage(formData) {
  return deliver(formData, {
    formType: 'contact',
    fields: CONTACT_FIELDS,
    subject: 'General Enquiry from tobler-india.com',
  })
}

export async function sendRFQRequest(formData) {
  return deliver(formData, {
    formType: 'rfq',
    fields: RFQ_FIELDS,
    subject: 'Request a Quote from tobler-india.com',
  })
}
