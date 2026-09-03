import { useState } from 'react'
import SEO from '../../components/common/SEO.jsx'
import Container from '../../components/common/Container.jsx'
import { HelpCircle, ChevronDown, Search } from 'lucide-react'

function FAQ() {
  const [expandedId, setExpandedId] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')

  const faqs = [
    {
      id: 'q1',
      category: 'Products & Services',
      question: 'What types of scaffolding and formwork systems do you offer?',
      answer:
        'We provide a comprehensive range of Swiss-engineered scaffolding and formwork systems, including modular metal scaffolding, ring-lock systems, frame scaffolding, and specialized formwork solutions. All products are manufactured to ISO standards and suited for India\'s demanding construction requirements.',
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

  const categories = [...new Set(faqs.map((faq) => faq.category))]

  const filteredFAQs = faqs.filter((faq) => {
    const searchLower = searchTerm.toLowerCase()
    return (
      faq.question.toLowerCase().includes(searchLower) ||
      faq.answer.toLowerCase().includes(searchLower) ||
      faq.category.toLowerCase().includes(searchLower)
    )
  })

  const FAQItem = ({ item }) => (
    <button
      onClick={() => setExpandedId(expandedId === item.id ? null : item.id)}
      className="w-full text-left p-6 rounded-card border border-tobler-border bg-white hover:border-tobler-border/60 transition-all"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <div className="mb-2">
            <span className="text-xs font-semibold text-tobler-blue/60 uppercase tracking-wide">
              {item.category}
            </span>
          </div>
          <h4 className="font-semibold text-tobler-heading text-left">{item.question}</h4>
        </div>
        <div
          className={`shrink-0 mt-1 transition-transform ${expandedId === item.id ? 'rotate-180' : ''}`}
        >
          <ChevronDown size={20} className="text-tobler-blue" />
        </div>
      </div>

      {expandedId === item.id && (
        <div className="mt-4 pt-4 border-t border-tobler-border">
          <p className="text-sm text-tobler-body leading-relaxed">{item.answer}</p>
          {item.answer.includes('[CONTENT TO BE ADDED]') && (
            <div className="mt-3 p-3 rounded-md bg-tobler-gold/10 border border-tobler-gold/30">
              <p className="text-xs text-tobler-gold font-medium">
                💡 Tip: Contact our team for complete details on this topic
              </p>
            </div>
          )}
        </div>
      )}
    </button>
  )

  return (
    <>
      <SEO
        title="FAQ | Tobler"
        description="Find answers to frequently asked questions about our scaffolding and formwork products."
        path="/faq"
      />

      <section className="py-24 md:py-32">
        <Container>
          <div className="max-w-3xl mx-auto">
            {/* Page Heading */}
            <div className="mb-12">
              <h1 className="text-4xl md:text-5xl font-bold text-tobler-heading mb-3">Frequently Asked Questions</h1>
              <p className="text-lg text-tobler-body">Get quick answers to common questions about our products and services.</p>
            </div>

            {/* Search Bar */}
            <div className="mb-12">
              <div className="relative">
                <Search size={18} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-tobler-blue/40" />
                <input
                  type="text"
                  placeholder="Search FAQs..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 rounded-card border border-tobler-border bg-white text-tobler-heading placeholder:text-tobler-body/40 focus:outline-none focus:ring-2 focus:ring-tobler-blue/20 focus:border-tobler-blue"
                />
              </div>
              {searchTerm && (
                <p className="text-sm text-tobler-body mt-2">
                  {filteredFAQs.length} result{filteredFAQs.length !== 1 ? 's' : ''} found
                </p>
              )}
            </div>

            {/* Categories */}
            {!searchTerm && (
              <div className="mb-12 flex flex-wrap gap-2">
                {categories.map((cat) => (
                  <span key={cat} className="text-xs px-3 py-2 rounded-full bg-tobler-blue/10 text-tobler-blue font-medium">
                    {cat}
                  </span>
                ))}
              </div>
            )}

            {/* FAQ Items */}
            <div className="space-y-3">
              {filteredFAQs.length > 0 ? (
                filteredFAQs.map((faq) => <FAQItem key={faq.id} item={faq} />)
              ) : (
                <div className="text-center py-12">
                  <HelpCircle size={40} className="text-tobler-body/30 mx-auto mb-3" />
                  <p className="text-tobler-body mb-2">No FAQs found for "{searchTerm}"</p>
                  <p className="text-sm text-tobler-body/60">
                    Try different keywords or contact our team for help.
                  </p>
                </div>
              )}
            </div>

            {/* Still Need Help */}
            <div className="mt-16 p-8 rounded-card bg-gradient-to-br from-tobler-blue/5 to-tobler-blue/10 border border-tobler-blue/20">
              <h3 className="font-semibold text-tobler-heading mb-2">Didn't find your answer?</h3>
              <p className="text-sm text-tobler-body mb-4">
                Our technical team is ready to help with any questions or specific concerns about your project.
              </p>
              <a
                href="/contact"
                className="inline-flex items-center gap-2 text-sm font-medium text-tobler-blue hover:text-tobler-blue/80 transition-colors"
              >
                Contact Our Team →
              </a>
            </div>
          </div>
        </Container>
      </section>
    </>
  )
}

export default FAQ
