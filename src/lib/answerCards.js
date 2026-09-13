// "Answer cards" — direct facts the search bar can hand back immediately
// instead of making someone open a results list and read a page. Each card
// is built from the same data modules the rest of the site renders from, so
// a fact here (the phone number, a certification list, dispatch time) can
// never drift from what's actually published elsewhere.
//
// matchAnswerCards() in lib/search.js decides which card(s) a query
// triggers; this module only defines what the cards say.

import { SITE, STATS } from '../data/site.js'
import { FACILITY_STATS } from '../data/manufacturing.js'
import { CERTIFICATIONS, TIMELINE } from '../data/team.js'
import { SITE_FAQS, isDraftAnswer } from '../data/faqs.js'
import { POSITIONS } from '../data/careers.js'

const statValue = (label) => STATS.find((s) => s.label.includes(label))?.value
const facilityValue = (label) => FACILITY_STATS.find((f) => f.label.includes(label))

const faqAnswer = (id) => SITE_FAQS.find((f) => f.id === id)?.answer

const foundedEntry = TIMELINE[0]
const dispatchStat = facilityValue('dispatch')
const floorStat = facilityValue('Production floor')

export const ANSWER_CARDS = [
  {
    id: 'contact',
    triggers: ['contact', 'phone', 'phone number', 'call', 'email', 'address', 'office', 'reach you', 'reach us', 'where are you', 'located'],
    title: 'Contact Tobler',
    lines: [
      { label: 'Phone', value: SITE.phone },
      { label: 'Email', value: SITE.email },
      { label: 'Address', value: SITE.address },
    ],
    ctaLabel: 'Open Contact page',
    ctaPath: '/contact',
  },
  {
    id: 'quote',
    triggers: ['quote', 'quotation', 'rfq', 'price', 'pricing', 'cost', 'enquiry', 'inquiry', 'estimate'],
    title: 'Request a Quote',
    lines: [{ label: null, value: 'Tell us your project requirement and our team will get back with pricing and lead time.' }],
    ctaLabel: 'Request a Quote',
    ctaPath: '/contact#rfq',
  },
  {
    id: 'certifications',
    triggers: ['certificate', 'certification', 'certifications', 'iso', 'compliance', 'standard', 'standards', 'accreditation'],
    title: 'Certifications & Compliance',
    lines: CERTIFICATIONS.map((c) => ({ label: c.name, value: c.description })),
    ctaLabel: 'View Certifications',
    ctaPath: '/certifications',
  },
  {
    id: 'experience',
    triggers: ['how long', 'years of experience', 'how many years', 'founded', 'history', 'since when', 'how old is tobler', 'heritage'],
    title: 'Engineering Heritage',
    lines: [
      { label: null, value: `${statValue('Years of Engineering Heritage') || '30+'} years of engineering heritage — ${foundedEntry?.description || 'founded in Switzerland in 1995.'}` },
      { label: 'Projects delivered', value: statValue('Projects Delivered') },
    ],
    ctaLabel: 'Our Story',
    ctaPath: '/about#our-story',
  },
  {
    id: 'delivery',
    triggers: ['delivery', 'deliver', 'shipping', 'ship', 'dispatch', 'pan india', 'across india', 'lead time', 'how long to deliver'],
    title: 'Delivery & Dispatch',
    lines: [
      { label: null, value: faqAnswer('q5') || 'We deliver across India with an established logistics network.' },
      dispatchStat ? { label: 'Typical dispatch readiness', value: `${dispatchStat.figure} ${dispatchStat.unit}`.trim() } : null,
    ].filter(Boolean),
    ctaLabel: 'See all FAQs',
    ctaPath: '/faq',
  },
  {
    id: 'careers',
    triggers: ['job', 'jobs', 'career', 'careers', 'vacancy', 'vacancies', 'hiring', 'openings', 'positions', 'work at tobler', 'work with us'],
    title: `${POSITIONS.length} Open Positions`,
    lines: POSITIONS.slice(0, 4).map((p) => ({ label: p.title, value: `${p.department} · ${p.location}` })),
    ctaLabel: 'View all Careers',
    ctaPath: '/careers',
  },
  {
    id: 'manufacturing-scale',
    triggers: ['factory size', 'manufacturing area', 'plant size', 'floor space', 'production capacity', 'how big is your factory', 'facility size'],
    title: 'Manufacturing Facility',
    lines: FACILITY_STATS.map((f) => ({ label: f.label, value: `${f.figure} ${f.unit}`.trim() })),
    ctaLabel: 'Explore Manufacturing',
    ctaPath: '/manufacturing#facility',
  },
  {
    id: 'warranty',
    triggers: ['warranty', 'guarantee'],
    title: 'Warranty',
    lines: [{ label: null, value: faqAnswer('q10') }],
    ctaLabel: 'Ask our team',
    ctaPath: '/contact',
  },
  {
    id: 'moq',
    triggers: ['moq', 'minimum order', 'minimum quantity'],
    title: 'Minimum Order Quantity',
    lines: [{ label: null, value: faqAnswer('q6') }],
    ctaLabel: 'Ask our team',
    ctaPath: '/contact',
  },
  {
    id: 'rental',
    triggers: ['rent', 'rental', 'hire scaffolding', 'leasing', 'lease'],
    title: 'Rental Options',
    lines: [{ label: null, value: faqAnswer('q3') }],
    ctaLabel: 'Ask our team',
    ctaPath: '/contact',
  },
  {
    id: 'dealer',
    triggers: ['dealer', 'reseller', 'distributor', 'partnership', 'become a partner'],
    title: 'Dealer & Partnership Enquiries',
    lines: [{ label: null, value: faqAnswer('q11') }],
    ctaLabel: 'Contact Business Development',
    ctaPath: '/contact',
  },
].map((card) => ({
  ...card,
  // A line whose value is still a draft placeholder ("[CONTENT TO BE ADDED]")
  // is worse than no line — swap it for an honest "not published yet" note
  // rather than presenting a bracket-stub as a confident answer.
  lines: card.lines.map((line) =>
    line && isDraftAnswer(line.value || '')
      ? { ...line, value: "Not published yet — our team can confirm this directly." }
      : line
  ),
}))

if (floorStat) {
  // Keep the floor-area fact discoverable under its own phrasing too,
  // without duplicating the whole manufacturing-scale card definition.
  ANSWER_CARDS.find((c) => c.id === 'manufacturing-scale')?.triggers.push('square feet', 'sq ft')
}
