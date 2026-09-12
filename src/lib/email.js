import emailjs from '@emailjs/browser'
import { SITE } from '../data/site.js'

/* Form delivery, in two tiers.
 *
 * Tier 1 — EmailJS. Relays the browser submission straight to a mailbox with no
 * backend of our own. Where it lands is set in the EmailJS dashboard, on the
 * template's "To email" field; point that at the Outlook address that should
 * receive enquiries (or leave it as {{to_email}} and set VITE_CONTACT_RECIPIENT)
 * and mail starts arriving there. `.env.example` lists the four values needed.
 *
 * Tier 2 — mailto handoff. Until those four values exist, the forms do NOT sit
 * there broken and they do not lie about having sent: they hand the visitor a
 * pre-filled message addressed to us, which their own mail app sends. Less
 * seamless, but an enquiry that arrives beats an enquiry that doesn't, and the
 * upgrade to tier 1 is purely a matter of filling in .env — no code change.
 *
 * Both tiers return `{ status }` so the forms can tell the two apart and word
 * their confirmation honestly.
 */

const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID
const CONTACT_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_CONTACT_TEMPLATE_ID
const RFQ_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_RFQ_TEMPLATE_ID
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY

/* The inbox enquiries land in. Overridable by env so the destination can be
 * changed at deploy time — a new sales address, a shared mailbox — without a
 * code change; falls back to the address the site already publishes. */
const RECIPIENT = (import.meta.env.VITE_CONTACT_RECIPIENT || SITE.email || '').trim()

export function isEmailConfigured() {
  return Boolean(SERVICE_ID && CONTACT_TEMPLATE_ID && RFQ_TEMPLATE_ID && PUBLIC_KEY)
}

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

/* Routing fields every EmailJS submission carries, on top of the form's values.
 *
 * `reply_to` is the one that matters day to day: without it, hitting Reply in
 * Outlook answers the EmailJS relay instead of the person who filled the form.
 * `to_email` lets the dashboard template address itself from here rather than
 * hard-coding a recipient in two places, and `subject` is what makes the two
 * form types separable by an Outlook rule once they are both arriving. */
function envelope(formData, { subject, from }) {
  return {
    ...formData,
    to_email: RECIPIENT,
    reply_to: formData.email || '',
    from_name: formData.name || 'Website visitor',
    subject: formData.subject?.trim() || subject,
    form_type: from,
    page_url: typeof window === 'undefined' ? '' : window.location.href,
    submitted_at: new Date().toISOString(),
  }
}

async function deliver(formData, { templateId, fields, subject, from }) {
  if (!isEmailConfigured()) {
    console.warn(
      'EmailJS is not configured — falling back to a mailto handoff. ' +
        'Set VITE_EMAILJS_* in .env (see .env.example) to send in the background instead.'
    )
    return handoffToMailClient(formData, fields, formData.subject?.trim() || subject)
  }

  await emailjs.send(SERVICE_ID, templateId, envelope(formData, { subject, from }), PUBLIC_KEY)
  return { status: 'sent', recipient: RECIPIENT }
}

export async function sendContactMessage(formData) {
  return deliver(formData, {
    templateId: CONTACT_TEMPLATE_ID,
    fields: CONTACT_FIELDS,
    subject: 'General Enquiry from tobler-india.com',
    from: 'General Enquiry',
  })
}

export async function sendRFQRequest(formData) {
  return deliver(formData, {
    templateId: RFQ_TEMPLATE_ID,
    fields: RFQ_FIELDS,
    subject: 'Request a Quote from tobler-india.com',
    from: 'Request a Quote',
  })
}
