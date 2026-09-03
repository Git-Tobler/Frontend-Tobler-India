import { useState } from 'react'
import { CheckCircle2, Loader2 } from 'lucide-react'
import FormField from './FormField.jsx'
import Button from '../common/Button.jsx'
import { sendContactMessage } from '../../lib/email.js'
import { isValidEmail, isValidPhone } from '../../lib/helpers.js'

const initialState = { name: '', email: '', phone: '', subject: '', message: '' }

function ContactForm() {
  const [values, setValues] = useState(initialState)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle')

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
      await sendContactMessage(values)
      setStatus('success')
      setValues(initialState)
    } catch (err) {
      console.error(err)
      setStatus('error')
    }
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

      {status === 'error' && (
        <p className="text-sm text-tobler-error">
          Something went wrong while sending your message. Please try again.
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
