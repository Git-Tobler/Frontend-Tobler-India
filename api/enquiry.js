/* Server-side enquiry relay — the only thing that ever sees EmailJS credentials.
 *
 * WHY THIS FILE EXISTS. EmailJS is a browser SDK: you hand it a service id, a
 * template id and a public key, and it calls their API from the page. Their own
 * docs are explicit that "the public key is visible in browser requests and is
 * safe to expose". Safe or not, it is visible — open DevTools, submit the form,
 * read all three values off the request. No amount of env-var indirection hides
 * them, because Vite compiles every VITE_* value straight into the bundle.
 *
 * So the browser no longer talks to EmailJS at all. It POSTs here, to our own
 * origin, and this function calls EmailJS with the PRIVATE key. The credentials
 * below are read from process.env WITHOUT a VITE_ prefix, which is what keeps
 * them server-only: Vite refuses to expose anything not prefixed, so there is no
 * way for them to leak into the client bundle by accident.
 *
 * The private key requires "Allow EmailJS API for non-browser applications" to
 * be switched on under Account -> API Keys. Without it EmailJS rejects
 * server-origin calls with 403 regardless of how correct the rest of this is.
 *
 * Runs on Vercel's Node runtime (not Edge) — `export default (req, res)`.
 */

const EMAILJS_ENDPOINT = 'https://api.emailjs.com/api/v1.0/email/send'

const SERVICE_ID = process.env.EMAILJS_SERVICE_ID
const CONTACT_TEMPLATE_ID = process.env.EMAILJS_CONTACT_TEMPLATE_ID
const RFQ_TEMPLATE_ID = process.env.EMAILJS_RFQ_TEMPLATE_ID
const PUBLIC_KEY = process.env.EMAILJS_PUBLIC_KEY
const PRIVATE_KEY = process.env.EMAILJS_PRIVATE_KEY
const RECIPIENT = (process.env.CONTACT_RECIPIENT || 'info@tobler-india.com').trim()

/* Per-form contract. `required` is enforced server-side because client-side
 * validation is a convenience for honest users and nothing more — anything
 * posting directly to this endpoint skips it entirely. */
const FORMS = {
  contact: {
    templateId: () => CONTACT_TEMPLATE_ID,
    required: ['name', 'email', 'message'],
    allowed: ['name', 'email', 'phone', 'subject', 'message'],
    subject: 'General Enquiry from tobler-india.com',
    label: 'General Enquiry',
  },
  rfq: {
    templateId: () => RFQ_TEMPLATE_ID,
    /* Mirrors RFQForm's own validate() exactly - name, company, email and
     * productCategory. An earlier version of this list required `details`,
     * which the form renders as an optional textarea ("Share any additional
     * project requirements..."). Every quote request that left it blank was
     * hard-rejected with a 400 naming an internal field key, and because a 4xx
     * is deliberately not retried through the mailto tier, the lead was simply
     * lost. If either list changes, change both. */
    required: ['name', 'company', 'email', 'productCategory'],
    allowed: [
      'name', 'company', 'email', 'phone', 'productCategory',
      'projectLocation', 'quantity', 'timeline', 'details',
    ],
    subject: 'Request a Quote from tobler-india.com',
    label: 'Request a Quote',
  },
}

/* Caps. A contact form is a public write endpoint, so every field is bounded
 * rather than trusted: an unbounded `details` is free storage in someone's
 * inbox and a cheap way to burn the EmailJS monthly quota. */
const MAX_BODY_BYTES = 16 * 1024
const MAX_FIELD_LENGTH = 5000
const MAX_EMAIL_LENGTH = 254

/* Deliberately loose. Strict RFC 5322 matching rejects real addresses, and the
 * only thing this needs to catch is "obviously not an address" — EmailJS does
 * the real delivery-time validation. */
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

/* Same-origin enforcement.
 *
 * Without this the endpoint is callable from any page on the internet. Vercel
 * parses `application/x-www-form-urlencoded` and `text/plain` bodies, and both
 * are CORS-*simple* content types - a cross-origin POST using either is sent
 * with no preflight at all, so an attacker's page can make each of its visitors
 * submit an enquiry from their own residential IP. That defeats IP rate
 * limiting by construction: every request genuinely does come from a different
 * person.
 *
 * Comparing Origin against the request's own Host self-configures across the
 * production domain and every Vercel preview URL, with no env var to keep in
 * sync. ALLOWED_ORIGINS exists only for the case where a proxy or custom domain
 * fronts this and the two legitimately differ.
 *
 * Browsers attach Origin to every POST, same-origin included, so a missing
 * Origin means a non-browser caller and is refused rather than waved through.
 */
const EXTRA_ORIGINS = (process.env.ALLOWED_ORIGINS || '')
  .split(',').map((o) => o.trim().toLowerCase()).filter(Boolean)

function sameOrigin(req) {
  const origin = req.headers.origin
  if (!origin) return false
  let host
  try {
    host = new URL(origin).host.toLowerCase()
  } catch {
    return false
  }
  if (host === String(req.headers.host || '').toLowerCase()) return true
  return EXTRA_ORIGINS.some((allowed) => {
    try {
      return new URL(allowed).host.toLowerCase() === host
    } catch {
      return allowed === host
    }
  })
}

/* Best-effort rate limit, scoped to one warm serverless instance.
 *
 * This is NOT a real distributed limiter: Vercel runs many instances and
 * recycles them, so a determined attacker spreading requests across cold starts
 * walks straight past it. It exists to stop the cheap case — one script hammering
 * one endpoint — and to keep an accidental retry loop from draining the quota.
 * The real controls are the allowed-origins list and the sending quota in the
 * EmailJS dashboard; set both. If this ever needs to be authoritative, move the
 * counter to Vercel KV or Upstash.
 */
const RATE_LIMIT_WINDOW_MS = 60_000
const RATE_LIMIT_MAX = 5
const hits = new Map()

function rateLimited(ip, now) {
  const recent = (hits.get(ip) || []).filter((t) => now - t < RATE_LIMIT_WINDOW_MS)

  // Evict other clients' expired buckets while we are here. Without this the
  // Map grows for the life of the instance — a slow leak on a long-warm lambda.
  for (const [key, times] of hits) {
    if (times.every((t) => now - t >= RATE_LIMIT_WINDOW_MS)) hits.delete(key)
  }

  if (recent.length >= RATE_LIMIT_MAX) {
    hits.set(ip, recent)
    return true
  }
  recent.push(now)
  hits.set(ip, recent)
  return false
}

function clientIp(req) {
  const forwarded = req.headers['x-forwarded-for']
  if (typeof forwarded === 'string' && forwarded.length) return forwarded.split(',')[0].trim()
  return req.headers['x-real-ip'] || req.socket?.remoteAddress || 'unknown'
}

/* Strips anything that could turn a form value into a mail header. `\r` and
 * `\n` in a field that reaches a header slot is the classic header-injection
 * vector — an attacker adding their own Bcc: to your enquiry mail. EmailJS
 * templates put most values in the body, but `reply_to` and `subject` are
 * header-bound, so everything is normalised rather than reasoning per-field
 * about which ends up where. */
function clean(value, { singleLine = false } = {}) {
  let out = String(value ?? '').trim()
  // Control characters go first, CR and LF among them — those two in a
  // header-bound field are the actual injection vector. Written as codepoint
  // escapes on purpose: the first version of this line used literal bytes and
  // turned the file into an unreadable blob.
  // no-control-regex is exactly backwards here: matching control characters is
  // the entire point, and the rule exists to catch people who typed one by
  // accident. Disabled for this line only.
  // eslint-disable-next-line no-control-regex
  out = out.replace(/[\u0000-\u001F\u007F]/g, '')
  if (singleLine) out = out.replace(/\s+/g, ' ')
  return out.slice(0, MAX_FIELD_LENGTH)
}

function readJsonBody(req) {
  /* Vercel usually parses the body for us, which is why MAX_BODY_BYTES cannot
   * be enforced here alone - by the time this runs on a normal request the
   * whole payload is already in memory and the streaming branch below never
   * executes. The handler checks Content-Length up front for that reason; this
   * cap only backstops the raw-stream path. */
  if (req.body && typeof req.body === 'object') return Promise.resolve(req.body)
  if (typeof req.body === 'string') {
    try { return Promise.resolve(JSON.parse(req.body)) } catch { return Promise.reject(new Error('bad-json')) }
  }

  return new Promise((resolve, reject) => {
    let size = 0
    const chunks = []
    req.on('data', (chunk) => {
      size += chunk.length
      if (size > MAX_BODY_BYTES) {
        // Stop buffering but do NOT destroy the socket: killing it here races
        // the 413 the handler is about to write, and the client sees a network
        // error instead - which the mailto tier then reads as "our side is
        // down" and retries by another route. Node cleans the socket up once
        // the response is sent.
        req.pause()
        reject(new Error('too-large'))
        return
      }
      chunks.push(chunk)
    })
    req.on('end', () => {
      try { resolve(JSON.parse(Buffer.concat(chunks).toString('utf8') || '{}')) }
      catch { reject(new Error('bad-json')) }
    })
    req.on('error', () => reject(new Error('stream')))
  })
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ ok: false, error: 'Method not allowed' })
  }

  /* Origin first: the cheapest possible rejection, and it runs before anything
   * reads the body or touches the rate limiter. */
  if (!sameOrigin(req)) {
    return res.status(403).json({ ok: false, error: 'Forbidden' })
  }

  /* Require JSON explicitly. Beyond being correct, this is what forces a CORS
   * preflight on any cross-origin caller - and that preflight fails, because
   * this function deliberately sends no Access-Control-Allow-Origin. */
  const contentType = String(req.headers['content-type'] || '').toLowerCase()
  if (!contentType.includes('application/json')) {
    return res.status(415).json({ ok: false, error: 'Unsupported content type.' })
  }

  /* The only place the size cap can actually bite, since Vercel has usually
   * parsed the body before this handler runs. A missing or non-numeric
   * Content-Length on something claiming to be JSON is itself suspect. */
  const declared = Number(req.headers['content-length'])
  if (!Number.isFinite(declared) || declared > MAX_BODY_BYTES) {
    return res.status(413).json({ ok: false, error: 'Message too large.' })
  }

  /* Misconfiguration is reported with the same status and wording as an
   * upstream failure. A distinct 503 here let an unauthenticated caller probe
   * which env vars were set by watching the status code flip. */
  if (!SERVICE_ID || !PUBLIC_KEY || !PRIVATE_KEY) {
    console.error('[enquiry] EmailJS env vars missing on the server')
    return res.status(502).json({ ok: false, error: 'Could not send your message right now.' })
  }

  let body
  try {
    body = await readJsonBody(req)
  } catch (err) {
    const tooLarge = err.message === 'too-large'
    return res
      .status(tooLarge ? 413 : 400)
      .json({ ok: false, error: tooLarge ? 'Message too large.' : 'Malformed request.' })
  }

  /* hasOwnProperty, not plain indexing. FORMS["constructor"] resolves up the
   * prototype chain to a truthy function, sails past a `!form` check and then
   * throws on `form.templateId()` - an unauthenticated crash reachable with a
   * three-word body. */
  const formType = typeof body?.formType === 'string' ? body.formType : ''
  const form = Object.prototype.hasOwnProperty.call(FORMS, formType) ? FORMS[formType] : null
  if (!form) return res.status(400).json({ ok: false, error: 'Unknown form type.' })

  const templateId = form.templateId()
  if (!templateId) {
    console.error(`[enquiry] no template id configured for "${formType}"`)
    return res.status(502).json({ ok: false, error: 'Could not send your message right now.' })
  }

  /* Honeypot. A field hidden from humans via CSS; bots fill every input they
   * find. Answer 200 rather than 4xx — telling a bot it was detected just
   * teaches whoever wrote it to skip the field next time. */
  if (clean(body.company_website)) {
    console.warn('[enquiry] honeypot tripped, dropping silently')
    return res.status(200).json({ ok: true })
  }

  if (rateLimited(clientIp(req), Date.now())) {
    res.setHeader('Retry-After', String(Math.ceil(RATE_LIMIT_WINDOW_MS / 1000)))
    return res.status(429).json({ ok: false, error: 'Too many requests. Please wait a moment.' })
  }

  // Allow-list rather than pass-through: only known fields reach the template,
  // so a caller cannot inject extra template params of its own.
  const values = {}
  for (const key of form.allowed) {
    const v = clean(body[key], { singleLine: key !== 'message' && key !== 'details' })
    if (v) values[key] = v
  }

  const missing = form.required.filter((key) => !values[key])
  if (missing.length) {
    return res.status(400).json({ ok: false, error: `Missing required field(s): ${missing.join(', ')}.` })
  }
  if (values.email.length > MAX_EMAIL_LENGTH || !EMAIL_RE.test(values.email)) {
    return res.status(400).json({ ok: false, error: 'Please enter a valid email address.' })
  }

  const templateParams = {
    ...values,
    to_email: RECIPIENT,
    // Without reply_to, hitting Reply in Outlook answers the EmailJS relay
    // rather than the person who filled the form.
    reply_to: values.email,
    from_name: values.name,
    subject: values.subject || form.subject,
    form_type: form.label,
    page_url: clean(body.pageUrl, { singleLine: true }),
    submitted_at: new Date().toISOString(),
  }

  try {
    const upstream = await fetch(EMAILJS_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        service_id: SERVICE_ID,
        template_id: templateId,
        user_id: PUBLIC_KEY,
        // The private key. This is the field that makes a server-origin call
        // legal, and the reason none of this can run in the browser.
        accessToken: PRIVATE_KEY,
        template_params: templateParams,
      }),
    })

    if (!upstream.ok) {
      const detail = await upstream.text().catch(() => '')
      // Logged server-side only. The response to the browser stays generic so a
      // misconfiguration never echoes credential state back to a caller.
      console.error(`[enquiry] EmailJS ${upstream.status}: ${detail}`)
      return res.status(502).json({ ok: false, error: 'Could not send your message right now.' })
    }

    return res.status(200).json({ ok: true })
  } catch (err) {
    console.error('[enquiry] upstream request failed', err)
    return res.status(502).json({ ok: false, error: 'Could not send your message right now.' })
  }
}
