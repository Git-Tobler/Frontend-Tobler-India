/* Checks the EmailJS server-side setup end to end and names the failing step.
 *
 *     node scripts/verify-emailjs.mjs          config + template parity, sends nothing
 *     node scripts/verify-emailjs.mjs --send   also sends ONE real test email
 *
 * Never prints a secret — only whether each value is present and its length —
 * so the output is safe to paste into a chat or a ticket.
 *
 * Three checks:
 *   1. All five EMAILJS_* values exist, and none has grown a VITE_ prefix.
 *   2. Every {{placeholder}} in docs/emailjs/*.html is a key api/enquiry.js
 *      actually sends. The allowed-field lists are parsed out of that file, not
 *      copied here, so this cannot drift from the function it is checking.
 *   3. (--send) A real call through the REST API with the private key, with the
 *      HTTP status translated into which dashboard step is wrong.
 */

import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { resolve, dirname } from 'node:path'

const HERE = dirname(fileURLToPath(import.meta.url))
const ROOT = resolve(HERE, '..')
const ENV_PATH = process.env.ENV_PATH || resolve(ROOT, '.env')

let failed = false
const fail = (msg) => { console.log(`  FAIL     ${msg}`); failed = true }
const ok = (msg) => console.log(`  OK       ${msg}`)
const warn = (msg) => console.log(`  note     ${msg}`)

// ---------------------------------------------------------------- 1. config
function loadEnv(path) {
  const out = {}
  let raw
  try {
    raw = readFileSync(path, 'utf8')
  } catch {
    console.error(`Could not read ${path}`)
    console.error('Pass it explicitly:  ENV_PATH=/full/path/to/.env node scripts/verify-emailjs.mjs')
    process.exit(1)
  }
  for (const line of raw.split(/\r?\n/)) {
    const m = line.match(/^\s*([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*)$/)
    if (m) out[m[1]] = m[2].trim().replace(/^["']|["']$/g, '')
  }
  return out
}

const env = { ...loadEnv(ENV_PATH), ...process.env }

const REQUIRED = [
  ['EMAILJS_SERVICE_ID', 'Email Services'],
  ['EMAILJS_CONTACT_TEMPLATE_ID', 'Email Templates (the Contact one)'],
  ['EMAILJS_RFQ_TEMPLATE_ID', 'Email Templates (the RFQ one)'],
  ['EMAILJS_PUBLIC_KEY', 'Account > API Keys (or Account > General on older dashboards)'],
  ['EMAILJS_PRIVATE_KEY', 'Account > API Keys (and switch ON the toggle on Account > Security)'],
]

console.log('\n=== 1. Configuration ===\n')
let missing = 0
for (const [key, where] of REQUIRED) {
  const v = env[key]
  if (v) ok(`${key.padEnd(30)} (${v.length} chars)`)
  else { console.log(`  MISSING  ${key.padEnd(30)} -> ${where}`); missing++ }
}

// A VITE_ prefix would compile the value into the public bundle — the exact
// thing the server-side relay exists to prevent.
const leaked = Object.keys(env).filter((k) => /^VITE_.*EMAILJS/i.test(k))
if (leaked.length) {
  fail(`these carry a VITE_ prefix and WILL ship to the browser — rename them: ${leaked.join(', ')}`)
}

// -------------------------------------------------------- 2. template parity
console.log('\n=== 2. Template parity against api/enquiry.js ===\n')

const fnSrc = readFileSync(resolve(ROOT, 'api/enquiry.js'), 'utf8')

/* The envelope keys the function adds on top of every form's own fields. Read
 * off the templateParams literal so a new key there shows up here. */
const envelopeBlock = fnSrc.match(/const templateParams = \{([\s\S]*?)\n\s*\}/)?.[1] || ''
const envelope = new Set(
  [...envelopeBlock.matchAll(/^\s*([a-zA-Z_]+)\s*:/gm)].map((m) => m[1])
)

function allowedFor(formKey) {
  // Locate `formKey: {` inside FORMS and pull its `allowed: [...]` array.
  const block = fnSrc.match(new RegExp(`\\n\\s*${formKey}:\\s*\\{([\\s\\S]*?)\\n\\s*\\},`))?.[1]
  const arr = block?.match(/allowed:\s*\[([\s\S]*?)\]/)?.[1] || ''
  return [...arr.matchAll(/'([^']+)'/g)].map((m) => m[1])
}

const TEMPLATES = [
  ['contact', 'docs/emailjs/contact-template.html'],
  ['rfq', 'docs/emailjs/rfq-template.html'],
]

for (const [formKey, file] of TEMPLATES) {
  const allowed = allowedFor(formKey)
  if (!allowed.length) { fail(`could not parse FORMS.${formKey}.allowed from api/enquiry.js`); continue }
  const sends = new Set([...allowed, ...envelope])

  let html
  try { html = readFileSync(resolve(ROOT, file), 'utf8') }
  catch { fail(`${file} not found`); continue }

  // Strip the leading HTML comment so its prose examples are not counted.
  const body = html.replace(/^\s*<!--[\s\S]*?-->/, '')
  const used = new Set([...body.matchAll(/\{\{\{?\s*([a-zA-Z_]+)\s*\}?\}\}/g)].map((m) => m[1]))
  const triple = [...body.matchAll(/\{\{\{\s*([a-zA-Z_]+)\s*\}\}\}/g)].map((m) => m[1])

  const unknown = [...used].filter((v) => !sends.has(v))
  const unused = [...sends].filter((v) => !used.has(v))

  if (unknown.length) fail(`${file}: placeholder(s) the function never sends — these render BLANK: ${unknown.join(', ')}`)
  else ok(`${file}: all ${used.size} placeholders are keys the function sends`)

  if (triple.length) fail(`${file}: triple-brace (unescaped HTML) on visitor-typed field(s): ${triple.join(', ')}`)
  if (unused.length) warn(`${file}: sent but not shown (fine, just so you know): ${unused.join(', ')}`)
}

if (missing) {
  console.log(`\n${missing} value(s) still missing in ${ENV_PATH}. Fill them in and re-run.\n`)
  process.exit(1)
}
if (failed) { console.log('\nFix the FAIL lines above before sending.\n'); process.exit(1) }

if (!process.argv.includes('--send')) {
  console.log('\nConfig complete and templates match. Re-run with --send to post a real test email.\n')
  process.exit(0)
}

// ------------------------------------------------------------- 3. live send
console.log('\n=== 3. Live send test (contact template) ===\n')
const recipient = env.CONTACT_RECIPIENT || 'info@tobler-india.com'

const res = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    service_id: env.EMAILJS_SERVICE_ID,
    template_id: env.EMAILJS_CONTACT_TEMPLATE_ID,
    user_id: env.EMAILJS_PUBLIC_KEY,
    accessToken: env.EMAILJS_PRIVATE_KEY,
    template_params: {
      name: 'Setup Verification',
      email: recipient,
      phone: '—',
      subject: 'EmailJS server-side setup test',
      message: 'If this arrived, the Vercel function can send enquiries.\n\nSecond line to confirm line breaks survive.',
      to_email: recipient,
      reply_to: recipient,
      from_name: 'Setup Verification',
      form_type: 'Setup test',
      page_url: 'scripts/verify-emailjs.mjs',
      submitted_at: new Date().toISOString(),
    },
  }),
})

const text = await res.text().catch(() => '')
console.log(`  HTTP ${res.status}${text ? ` — ${text}` : ''}\n`)

const DIAGNOSIS = {
  200: ['WORKING. Check the inbox for a "Setup test" email.',
        'Now put the same five values into Vercel > Settings > Environment Variables,',
        'WITHOUT a VITE_ prefix, and redeploy.'],
  400: ['Bad request — usually a wrong service or template ID, or the template',
        'references a placeholder the function does not send. Section 2 above',
        'passed, so check the IDs against the dashboard first.'],
  401: ['Unauthorised — EMAILJS_PUBLIC_KEY is wrong.'],
  403: ['THE COMMON ONE. EmailJS is refusing a server-origin call.',
        'Account > Security > turn ON "Allow EmailJS API for non-browser',
        'applications"  (dashboard.emailjs.com/admin/account/security).',
        'Having the Private Key does NOT switch this on - separate settings.',
        'Allowed Origins is on that same page; make sure it is not blocking.'],
  404: ['"Account not found" = EMAILJS_PUBLIC_KEY no longer maps to your account.',
        'It is well-formed (a garbage key gets 400 instead), so it was almost',
        'certainly REGENERATED in the dashboard - the public and private keys',
        'rotate as a pair. Re-copy the Public Key from Account > General.'],
  429: ['Sending limit reached for this account.'],
}
for (const line of DIAGNOSIS[res.status] || ['Unexpected status — the response text above is EmailJS\'s own explanation.']) {
  console.log(`  ${line}`)
}
console.log('')
process.exit(res.status === 200 ? 0 : 1)
