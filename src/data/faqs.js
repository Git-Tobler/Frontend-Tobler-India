/* Site-wide FAQs — the /faq page's content.
 *
 * Lived inline in pages/FAQ/FAQ.jsx until the search index needed them: the
 * search modal answers questions like "do you deliver across India" straight
 * from this list, and a page component can't be imported into the index
 * without dragging the whole lazy-loaded route into the main bundle.
 *
 * Product-specific FAQs are NOT here — those live next to the subcategory
 * they belong to in data/products/index.js, and the index picks up both.
 */

export const SITE_FAQS = [
  {
    id: 'q1',
    category: 'Products & Services',
    question: 'What types of scaffolding and formwork systems do you offer?',
    answer:
      "We provide a comprehensive range of Swiss-engineered scaffolding and formwork systems, including modular metal scaffolding, ring-lock systems, frame scaffolding, and specialized formwork solutions. All products are manufactured to ISO standards and suited for India's demanding construction requirements.",
  },
  {
    id: 'q2',
    category: 'Products & Services',
    question: 'Do you provide installation and safety training?',
    answer:
      'Yes, we offer comprehensive installation support and safety training programs. Our technical team can assist with site assessments, installation supervision, and worker training to ensure optimal safety and efficiency on your construction projects.',
  },
  {
    id: 'q3',
    category: 'Products & Services',
    question: 'Can I rent instead of purchasing scaffolding?',
    answer:
      '[CONTENT TO BE ADDED] Please contact our team at info@gezu-impex.nl to discuss rental options and pricing that may be available for your project duration.',
  },
  {
    id: 'q4',
    category: 'Ordering & Delivery',
    question: 'What is your typical lead time for orders?',
    answer:
      '[CONTENT TO BE ADDED] Our standard lead time depends on product availability and order size. Contact our sales team for specific timelines and expedited delivery options.',
  },
  {
    id: 'q5',
    category: 'Ordering & Delivery',
    question: 'Do you deliver across India?',
    answer:
      'Yes, we deliver across India with a well-established logistics network. Delivery times vary based on location and order size. Contact us for a quote and delivery schedule for your specific location.',
  },
  {
    id: 'q6',
    category: 'Ordering & Delivery',
    question: 'What is your minimum order quantity?',
    answer:
      '[CONTENT TO BE ADDED] MOQ varies based on product type and customization requirements. Please reach out to our team to discuss quantities for your specific project needs.',
  },
  {
    id: 'q7',
    category: 'Quality & Certifications',
    question: 'What quality standards do your products meet?',
    answer:
      'All our products meet ISO 9001:2015 quality management standards and comply with Indian building codes. We also maintain certifications from international bodies ensuring Swiss engineering excellence combined with local suitability.',
  },
  {
    id: 'q8',
    category: 'Quality & Certifications',
    question: 'Are your products tested for safety?',
    answer:
      'Absolutely. Every product undergoes rigorous testing including load testing, material inspection, and safety compliance verification before dispatch. Documentation and test certificates are provided with each shipment.',
  },
  {
    id: 'q9',
    category: 'Technical Support',
    question: 'Do you provide technical consultation for project planning?',
    answer:
      'Yes, our engineering team provides free technical consultation. We can help with load calculations, system selection, and project-specific recommendations. Schedule a consultation on our platform or contact us directly.',
  },
  {
    id: 'q10',
    category: 'Technical Support',
    question: 'What warranty do you provide?',
    answer:
      '[CONTENT TO BE ADDED] Our standard warranty covers manufacturing defects. Contact our support team for detailed warranty information applicable to your purchase.',
  },
  {
    id: 'q11',
    category: 'Account & Partnerships',
    question: 'Can construction companies become dealers or resellers?',
    answer:
      '[CONTENT TO BE ADDED] We welcome partnership inquiries from established construction companies and suppliers. Contact our business development team at info@gezu-impex.nl to explore dealer opportunities.',
  },
  {
    id: 'q12',
    category: 'Account & Partnerships',
    question: 'Do you offer bulk pricing for large projects?',
    answer:
      'Yes, we provide competitive bulk pricing for large-scale projects. Contact our sales team with your project requirements for a customized quotation.',
  },
]

export const FAQ_CATEGORIES = [...new Set(SITE_FAQS.map((faq) => faq.category))]

/* An answer still carrying a `[PLACEHOLDER]` marker is copy that hasn't been
   written yet. The FAQ page shows a "contact us" nudge for these; the search
   index uses it to keep them out of Answer Cards, so search never presents a
   bracket-stub as a confident answer. */
export const isDraftAnswer = (text = '') => text.includes('[')
