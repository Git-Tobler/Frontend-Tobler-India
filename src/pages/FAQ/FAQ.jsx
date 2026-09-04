import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import SEO from '../../components/common/SEO.jsx'
import Container from '../../components/common/Container.jsx'
import { HelpCircle, ChevronDown, Search } from 'lucide-react'
import { SITE_FAQS } from '../../data/faqs.js'

function FAQ() {
  const [searchParams] = useSearchParams()
  // Arriving from the search modal with `?q=<question>` — pre-fill the box
  // and expand the matching question so the answer is right there, instead
  // of landing on the page and making someone search again.
  const initialQuery = searchParams.get('q') || ''
  const [expandedId, setExpandedId] = useState(
    () => SITE_FAQS.find((f) => f.question === initialQuery)?.id ?? null
  )
  const [searchTerm, setSearchTerm] = useState(initialQuery)

  useEffect(() => {
    const q = searchParams.get('q')
    if (q) {
      setSearchTerm(q)
      setExpandedId(SITE_FAQS.find((f) => f.question === q)?.id ?? null)
    }
  }, [searchParams])

  const faqs = SITE_FAQS

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
                  <p className="text-tobler-body mb-2">No FAQs found for &quot;{searchTerm}&quot;</p>
                  <p className="text-sm text-tobler-body/60">
                    Try different keywords or contact our team for help.
                  </p>
                </div>
              )}
            </div>

            {/* Still Need Help */}
            <div className="mt-16 p-8 rounded-card bg-gradient-to-br from-tobler-blue/5 to-tobler-blue/10 border border-tobler-blue/20">
              <h3 className="font-semibold text-tobler-heading mb-2">Didn&apos;t find your answer?</h3>
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
