# EmailJS setup — the part only an account holder can do

The site never talks to EmailJS from the browser. Forms POST to `/api/enquiry`
(a Vercel function) which relays to EmailJS with a **private** key. This guide
gets that key and the two templates into place. Budget: about ten minutes.

The two template files next to this README are ready to paste. Their
`{{placeholders}}` are generated from the exact keys `api/enquiry.js` sends —
`node scripts/verify-emailjs.mjs` checks that parity, so do not hand-edit
placeholder names.

---

## 1. Sign in

https://dashboard.emailjs.com — the account that owns the Tobler sending
identity. If none exists yet, create it with a Tobler mailbox, not a personal
one; the account is what receives the enquiries.

## 2. Connect the mailbox → `EMAILJS_SERVICE_ID`

**Email Services → Add New Service.**

- Pick **Outlook** (or whichever provider hosts `info@tobler-india.com`).
- Sign in when prompted. This OAuth connection is what actually puts mail in
  the inbox — EmailJS sends *as* this mailbox.
- Name it anything. Copy the **Service ID** (looks like `service_abc123`).

## 3. Create the two templates → `EMAILJS_CONTACT_TEMPLATE_ID`, `EMAILJS_RFQ_TEMPLATE_ID`

**Email Templates → Create New Template**, twice. For each:

| | General Enquiry | Request a Quote |
|---|---|---|
| Template name | `Tobler — General Enquiry` | `Tobler — Request a Quote` |
| Paste into **Content → Edit Content → Code Editor** | `contact-template.html` | `rfq-template.html` |

Then on the **Content** tab of *both* templates, set these four fields
**exactly** — they are placeholders, not literal text. Subject is the box above
the editor; To Email, From Name and Reply To sit beside it. (The **Settings**
tab holds only Name and Template ID — that is where step 3's ID comes from, and
EmailJS does not substitute variables there at all.)

| Field | Value | Why |
|---|---|---|
| Subject | `{{subject}}` | The function sets a per-form subject; a visitor's own subject line overrides it on the contact form |
| To Email | `{{to_email}}` | Lets `CONTACT_RECIPIENT` in Vercel change the inbox without touching the dashboard. Leave this as a literal address and that env var silently does nothing |
| From Name | `{{from_name}}` | The visitor's name shows in the inbox list |
| Reply To | `{{reply_to}}` | **The one that matters daily.** Without it, hitting Reply in Outlook answers the EmailJS relay, not the person who wrote in |

Save each and copy its **Template ID** (`template_xyz789`).

## 4. Keys → `EMAILJS_PUBLIC_KEY`, `EMAILJS_PRIVATE_KEY`

**Account → API Keys** → copy the **Public Key** and the **Private Key**.
(Some dashboard versions show the Public Key on **Account → General** instead.)

**Account → Security** → switch **ON** *"Allow EmailJS API for non-browser
applications"*. EmailJS's own 403 message points here:
`dashboard.emailjs.com/admin/account/security`.

> Without that toggle, EmailJS rejects every call from Vercel with **403**,
> regardless of how correct everything else is. It is the single most common
> reason the setup "doesn't work" — and having the Private Key does **not**
> mean the toggle is on. They are separate settings on separate pages.

## 5. Lock it down

**Account → Security:**

- **Allowed Origins** — add `https://www.toblerindia.com` and your
  `*.vercel.app` preview domain. Requests from anywhere else are refused
  upstream even if someone reproduces the API call.
- **Sending limit** — set a monthly cap. The site rate-limits and honeypots
  bot traffic, but a cap on the EmailJS side is the backstop that makes the
  worst case a known number rather than "the whole month's quota".

## 6. Verify locally before touching Vercel

Put the five values into `.env` (the file is gitignored — it never leaves your
machine), then:

```bash
node scripts/verify-emailjs.mjs          # confirms all five are present, checks template parity
node scripts/verify-emailjs.mjs --send   # sends ONE real test email through the contact template
```

It names the failure rather than leaving you guessing:

| Result | Meaning |
|---|---|
| `200` | Working. Check the inbox, then go to step 7 |
| `403` | Step 4's toggle is still off, or Allowed Origins is blocking this |
| `400` | Wrong service/template ID, or a template placeholder the function doesn't send |
| `401` | Public Key is wrong |
| `429` | Sending limit reached |

It prints no secret values — only whether each is present and how long it is —
so its output is safe to share.

## 7. Put them in Vercel — the deployment reads *these*, not `.env`

**Vercel → Project → Settings → Environment Variables**, environment
**Production** (and Preview if you want forms working on preview URLs):

```
EMAILJS_SERVICE_ID
EMAILJS_CONTACT_TEMPLATE_ID
EMAILJS_RFQ_TEMPLATE_ID
EMAILJS_PUBLIC_KEY
EMAILJS_PRIVATE_KEY
CONTACT_RECIPIENT          ← optional; defaults to info@tobler-india.com
```

**No `VITE_` prefix on any of these.** Vite compiles every `VITE_*` value into
the public JavaScript bundle. The prefix is the entire difference between a key
nobody can see and a key anyone can read from DevTools. `verify-emailjs.mjs`
refuses to pass if it finds one.

Redeploy after saving — env changes don't apply to an existing deployment.

---

## When something goes wrong later

- **Emails arrive with blank fields** → someone renamed a placeholder in the
  dashboard. Re-paste the template file, or run the verifier to see which
  placeholder no longer matches.
- **Reply goes to the wrong address** → the template's Reply To field is not
  `{{reply_to}}`.
- **Changing the inbox** → set `CONTACT_RECIPIENT` in Vercel and redeploy. No
  dashboard change needed *if* To Email is `{{to_email}}`.
