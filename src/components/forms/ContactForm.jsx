import { useState } from 'react'
import { CheckCircle2, Loader2, Mail } from 'lucide-react'
import FormField from './FormField.jsx'
import Button from '../common/Button.jsx'
import { sendContactMessage } from '../../lib/email.js'
import { isValidEmail, isValidPhone } from '../../lib/helpers.js'
import { SITE } from '../../data/site.js'

/* company_website is the honeypot — see the hidden field in the markup below.
   It ships in the same `values` object as everything else so it reaches the
   server without a special case in the submit handler. */
const initialState = { name: '', email: '', phone: '', subject: '', message: '', company_website: '' }

function ContactForm() {
  const [values, setValues] = useState(initialState)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle')
  /* The server's wording when it rejected the submission for a reason the
     visitor can act on. Empty for anything else, which falls back to the
     generic line below. */
  const [errorMessage, setErrorMessage] = useState('')

  const handleChange = (e) => {
    const { name, value } = e.target
    setValues((prev) => ({ ...prev, [name]: value }))
  }

  const validate = () => {
    const nextErrors = {}
    if (!values.name.trim()) nextErrors.name = 'Name is required'
    if (!isValidEmail(values.email)) nextErrors.email = 'Enter a valid email address'
    if (values.phone.trim() && !isValidPhone(values.phone)) nextErrors.phone = 'Enter a valid phone number'
    if (!values.message.trim()) nextErrors.message = 'Please add a short message'
    setErrors(nextErrors)
    return Object.keys(nextErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validate()) return

    setStatus('loading')
    try {
      const result = await sendContactMessage(values)

      /* Two different outcomes, worded differently on purpose. A real send is
         done and the form can reset; a mailto handoff has only opened the
         visitor's mail app and is not sent until they press send there — so the
         answers are deliberately KEPT in that case. If the handoff silently
         failed (no mail client registered), clearing the form would have thrown
         away everything they typed. */
      if (result?.status === 'mailto') {
        setStatus('handoff')
      } else {
        setStatus('success')
        setValues(initialState)
      }
    } catch (err) {
      console.error(err)
      setErrorMessage(err?.message || '')
      setStatus('error')
    }
  }

  if (status === 'handoff') {
    return (
      <div className="flex flex-col items-center text-center gap-4 py-16 px-6 bg-tobler-bg-light rounded-card border border-tobler-border">
        <Mail size={44} className="text-tobler-heading" />
        <h3 className="text-xl font-bold text-tobler-heading">Your email app is opening</h3>
        <p className="text-tobler-body max-w-sm">
          We have prepared your message to{' '}
          <a href={`mailto:${SITE.email}`} className="font-semibold underline">
            {SITE.email}
          </a>{' '}
          with everything you filled in — press send there to finish. Nothing has reached us until
          you do.
        </p>
        <Button variant="secondary" onClick={() => setStatus('idle')} icon={false}>
          Back to the Form
        </Button>
      </div>
    )
  }

  if (status === 'success') {
    return (
      <div className="flex flex-col items-center text-center gap-4 py-16 px-6 bg-tobler-bg-light rounded-card border border-tobler-border">
        <CheckCircle2 size={44} className="text-tobler-success" />
        <h3 className="text-xl font-bold text-tobler-heading">Message Sent Successfully</h3>
        <p className="text-tobler-body max-w-sm">
          Thank you for reaching out. Our team will get back to you within 1–2 business days.
        </p>
        <Button variant="secondary" onClick={() => setStatus('idle')} icon={false}>
          Send Another Message
        </Button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      <div className="grid sm:grid-cols-2 gap-5">
        <FormField
          label="Full Name"
          name="name"
          required
          value={values.name}
          onChange={handleChange}
          error={errors.name}
          placeholder="Your full name"
        />
        <FormField
          label="Email Address"
          name="email"
          type="email"
          required
          value={values.email}
          onChange={handleChange}
          error={errors.email}
          placeholder="you@company.com"
        />
      </div>
      <div className="grid sm:grid-cols-2 gap-5">
        <FormField
          label="Phone Number"
          name="phone"
          type="tel"
          value={values.phone}
          onChange={handleChange}
          error={errors.phone}
          placeholder="+91 00000 00000"
        />
        <FormField
          label="Subject"
          name="subject"
          value={values.subject}
          onChange={handleChange}
          placeholder="How can we help?"
        />
      </div>
      <FormField
        label="Message"
        name="message"
        as="textarea"
        required
        value={values.message}
        onChange={handleChange}
        error={errors.message}
        placeholder="Tell us about your project or query..."
      />


      {/* Honeypot. Hidden from people, irresistible to the bots that fill every
          input they find; api/enquiry.js drops any submission that arrives with
          it set. aria-hidden + tabIndex -1 keep it away from screen readers and
          the tab order, and autoComplete="off" stops a password manager filling
          it on a real visitor's behalf. Positioned off-canvas rather than
          display:none — some bots skip fields they can tell are not rendered. */}
      <div aria-hidden="true" className="absolute left-[-9999px] top-0 h-0 w-0 overflow-hidden">
        <label htmlFor="contact-company-website">Leave this field blank</label>
        <input
          id="contact-company-website"
          type="text"
          name="company_website"
          value={values.company_website}
          onChange={handleChange}
          tabIndex={-1}
          autoComplete="off"
        />
      </div>
      {status === 'error' && (
        <p className="text-sm text-tobler-error">
          {/* A rejection the server explained (bad address, rate limited) is
              shown verbatim — it tells the visitor what to change. Anything
              else gets the generic line plus a way to reach us regardless. */}
          {errorMessage || (
            <>
              Something went wrong while sending your message. Please try again, or email us
              directly at{' '}
              <a href={`mailto:${SITE.email}`} className="font-semibold underline">
                {SITE.email}
              </a>
              .
            </>
          )}
        </p>
      )}

      <Button type="submit" disabled={status === 'loading'} icon={status !== 'loading'}>
        {status === 'loading' ? (
          <span className="flex items-center gap-2">
            <Loader2 size={18} className="animate-spin" /> Sending...
          </span>
        ) : (
          'Send Message'
        )}
      </Button>
    </form>
  )
}

export default ContactForm
