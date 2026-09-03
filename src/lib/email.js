import emailjs from '@emailjs/browser'

const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID
const CONTACT_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_CONTACT_TEMPLATE_ID
const RFQ_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_RFQ_TEMPLATE_ID
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY

export function isEmailConfigured() {
  return Boolean(SERVICE_ID && CONTACT_TEMPLATE_ID && RFQ_TEMPLATE_ID && PUBLIC_KEY)
}

export async function sendContactMessage(formData) {
  if (!isEmailConfigured()) {
    console.warn('EmailJS is not configured. Add credentials to your .env file.')
    return { status: 'skipped' }
  }
  return emailjs.send(SERVICE_ID, CONTACT_TEMPLATE_ID, formData, PUBLIC_KEY)
}

export async function sendRFQRequest(formData) {
  if (!isEmailConfigured()) {
    console.warn('EmailJS is not configured. Add credentials to your .env file.')
    return { status: 'skipped' }
  }
  return emailjs.send(SERVICE_ID, RFQ_TEMPLATE_ID, formData, PUBLIC_KEY)
}
