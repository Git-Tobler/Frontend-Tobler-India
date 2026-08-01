import { useState } from 'react'
import { CheckCircle2, Loader2 } from 'lucide-react'
import FormField from './FormField.jsx'
import Button from '../common/Button.jsx'
import { sendRFQRequest } from '../../services/emailService.js'
import { isValidEmail } from '../../utils/helpers.js'
import { PRODUCT_CATEGORIES } from '../../constants/products.js'

const initialState = {
  name: '',
  company: '',
  email: '',
  phone: '',
  productCategory: '',
  projectLocation: '',
  quantity: '',
  timeline: '',
  details: '',
}

function RFQForm() {
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
    if (!values.company.trim()) nextErrors.company = 'Company name is required'
    if (!isValidEmail(values.email)) nextErrors.email = 'Enter a valid email address'
    if (!values.productCategory) nextErrors.productCategory = 'Select a product category'
    setErrors(nextErrors)
    return Object.keys(nextErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validate()) return

    setStatus('loading')
    try {
      await sendRFQRequest(values)
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
        <h3 className="text-xl font-bold text-tobler-heading">Quotation Request Received</h3>
        <p className="text-tobler-body max-w-sm">
          Our sales engineering team will review your requirements and respond with a detailed
          quotation shortly.
        </p>
        <Button variant="secondary" onClick={() => setStatus('idle')} icon={false}>
          Submit Another Request
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
          label="Company Name"
          name="company"
          required
          value={values.company}
          onChange={handleChange}
          error={errors.company}
          placeholder="Your company"
        />
      </div>
      <div className="grid sm:grid-cols-2 gap-5">
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
        <FormField
          label="Phone Number"
          name="phone"
          type="tel"
          value={values.phone}
          onChange={handleChange}
          placeholder="+91 00000 00000"
        />
      </div>
      <div className="grid sm:grid-cols-2 gap-5">
        <FormField
          label="Product Category"
          name="productCategory"
          as="select"
          required
          value={values.productCategory}
          onChange={handleChange}
          error={errors.productCategory}
          options={PRODUCT_CATEGORIES.map((p) => p.name)}
        />
        <FormField
          label="Project Location"
          name="projectLocation"
          value={values.projectLocation}
          onChange={handleChange}
          placeholder="City, State"
        />
      </div>
      <div className="grid sm:grid-cols-2 gap-5">
        <FormField
          label="Estimated Quantity"
          name="quantity"
          value={values.quantity}
          onChange={handleChange}
          placeholder="e.g. 500 sqm"
        />
        <FormField
          label="Required Timeline"
          name="timeline"
          value={values.timeline}
          onChange={handleChange}
          placeholder="e.g. Within 4 weeks"
        />
      </div>
      <FormField
        label="Project Details"
        name="details"
        as="textarea"
        value={values.details}
        onChange={handleChange}
        placeholder="Share any additional project requirements..."
      />

      {status === 'error' && (
        <p className="text-sm text-tobler-error">
          Something went wrong while submitting your request. Please try again.
        </p>
      )}

      <Button type="submit" disabled={status === 'loading'} icon={status !== 'loading'}>
        {status === 'loading' ? (
          <span className="flex items-center gap-2">
            <Loader2 size={18} className="animate-spin" /> Submitting...
          </span>
        ) : (
          'Submit RFQ'
        )}
      </Button>
    </form>
  )
}

export default RFQForm
