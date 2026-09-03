import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search, X, ChevronRight } from 'lucide-react'

const SEARCH_INDEX = [
  // Pages
  { id: 'home', title: 'Home', path: '/', category: 'Pages', description: 'Welcome to Tobler India' },
  { id: 'about', title: 'About Us', path: '/about', category: 'Pages', description: 'Learn about Tobler\'s story' },
  { id: 'products', title: 'Products', path: '/products', category: 'Pages', description: 'Browse our product portfolio' },
  { id: 'manufacturing', title: 'Manufacturing', path: '/manufacturing', category: 'Pages', description: 'Our manufacturing excellence' },
  { id: 'projects', title: 'Projects', path: '/projects', category: 'Pages', description: 'View our completed projects' },
  { id: 'contact', title: 'Contact', path: '/contact', category: 'Pages', description: 'Get in touch with us' },
  { id: 'careers', title: 'Careers', path: '/careers', category: 'Pages', description: 'Join our team' },

  // About Sections
  { id: 'our-story', title: 'Our Story', path: '/about#our-story', category: 'About', description: 'The history of Tobler' },
  { id: 'swiss-engineering', title: 'Swiss Engineering', path: '/about#swiss-engineering', category: 'About', description: 'Engineering excellence' },
  { id: 'india-presence', title: 'India Presence', path: '/about#india-presence', category: 'About', description: 'Tobler in India' },
  { id: 'philosophy', title: 'Philosophy', path: '/about#philosophy', category: 'About', description: 'Our core beliefs' },
  { id: 'values', title: 'Values', path: '/about#values', category: 'About', description: 'What we stand for' },
  { id: 'leadership', title: 'Team Members', path: '/about#leadership', category: 'About', description: 'Meet our leaders' },
  { id: 'timeline', title: 'Timeline', path: '/about#timeline', category: 'About', description: 'Tobler\'s journey' },
  { id: 'certifications', title: 'Certifications', path: '/about#certifications', category: 'About', description: 'Quality & certifications' },

  // Products
  { id: 'scaffolding', title: 'Scaffolding Systems', path: '/products/scaffolding-systems', category: 'Products', description: 'Advanced scaffolding solutions' },
  { id: 'formwork', title: 'Formwork Systems', path: '/products/formwork-systems', category: 'Products', description: 'Premium formwork systems' },

  // Manufacturing Sections
  { id: 'manufacturing-overview', title: 'Manufacturing Overview', path: '/manufacturing', category: 'Manufacturing', description: 'Production facilities' },
  { id: 'production-facility', title: 'Production Facility', path: '/manufacturing#facility', category: 'Manufacturing', description: 'Our state-of-the-art facility' },
  { id: 'quality-control', title: 'Quality Control', path: '/manufacturing#quality', category: 'Manufacturing', description: 'Quality assurance process' },
  { id: 'process', title: 'Manufacturing Process', path: '/manufacturing#process', category: 'Manufacturing', description: 'How we manufacture' },

  // Other Pages
  { id: 'faq', title: 'FAQs', path: '/faq', category: 'Resources', description: 'Frequently asked questions' },
  { id: 'testimonials', title: 'Testimonials', path: '/testimonials', category: 'Resources', description: 'Customer testimonials' },
  { id: 'news-media', title: 'News & Media', path: '/news-media', category: 'Resources', description: 'Latest news and media' },
  { id: 'downloads', title: 'Downloads', path: '/download-brochures', category: 'Resources', description: 'Download brochures & resources' },
]

export default function SearchModal({ isOpen, onClose }) {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])
  const [selectedIndex, setSelectedIndex] = useState(0)
  const inputRef = useRef(null)
  const navigate = useNavigate()

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus()
    }
  }, [isOpen])

  useEffect(() => {
    if (!query.trim()) {
      setResults([])
      setSelectedIndex(0)
      return
    }

    const query_lower = query.toLowerCase()
    const filtered = SEARCH_INDEX.filter(
      (item) =>
        item.title.toLowerCase().includes(query_lower) ||
        item.description.toLowerCase().includes(query_lower) ||
        item.category.toLowerCase().includes(query_lower)
    )

    setResults(filtered)
    setSelectedIndex(0)
  }, [query])

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      onClose()
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      setSelectedIndex((prev) => Math.min(prev + 1, results.length - 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setSelectedIndex((prev) => Math.max(prev - 1, 0))
    } else if (e.key === 'Enter' && results[selectedIndex]) {
      navigate(results[selectedIndex].path)
      onClose()
      setQuery('')
    }
  }

  const handleResultClick = (path) => {
    navigate(path)
    onClose()
    setQuery('')
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center bg-black/40 backdrop-blur-sm pt-20 animate-fade-in">
      <div className="w-full max-w-2xl mx-4 relative animate-scale-in">
        {/* Search Input */}
        <div className="relative bg-white rounded-2xl shadow-2xl overflow-hidden">
          <div className="flex items-center px-6 py-4 border-b border-tobler-border-light">
            <Search size={24} className="text-tobler-blue mr-4 flex-shrink-0" />
            <input
              ref={inputRef}
              type="text"
              placeholder="Search pages, products, resources..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              className="w-full bg-transparent text-lg text-tobler-heading placeholder-tobler-muted outline-none"
            />
            <button
              onClick={onClose}
              className="ml-4 p-1 hover:bg-tobler-bg-light rounded-lg transition-colors"
              aria-label="Close search"
            >
              <X size={24} className="text-tobler-muted" />
            </button>
          </div>

          {/* Results or Empty State */}
          <div className="max-h-[calc(100vh-300px)] overflow-y-auto">
            {query.trim() === '' ? (
              <div className="px-6 py-12 text-center">
                <Search size={48} className="mx-auto text-tobler-border mb-4" />
                <p className="text-tobler-muted">Start typing to search...</p>
              </div>
            ) : results.length === 0 ? (
              <div className="px-6 py-12 text-center">
                <p className="text-tobler-muted">No results found for "{query}"</p>
              </div>
            ) : (
              <div className="divide-y divide-tobler-border-light">
                {results.map((result, idx) => (
                  <button
                    key={result.id}
                    onClick={() => handleResultClick(result.path)}
                    className={`w-full px-6 py-4 flex items-start justify-between transition-colors duration-200 ${
                      idx === selectedIndex
                        ? 'bg-tobler-bg-light'
                        : 'hover:bg-tobler-bg-light/50'
                    }`}
                  >
                    <div className="text-left flex-1">
                      <div className="flex items-center gap-2">
                        <h3 className="text-base font-semibold text-tobler-heading">{result.title}</h3>
                        <span className="px-2 py-1 text-xs font-medium text-tobler-blue bg-tobler-blue/10 rounded-full">
                          {result.category}
                        </span>
                      </div>
                      <p className="text-sm text-tobler-muted mt-1">{result.description}</p>
                    </div>
                    <ChevronRight size={20} className="text-tobler-muted ml-4 flex-shrink-0 mt-0.5" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Footer Info */}
          {results.length > 0 && query.trim() !== '' && (
            <div className="px-6 py-3 border-t border-tobler-border-light bg-tobler-bg-light flex items-center justify-between text-xs text-tobler-muted">
              <span>{results.length} result{results.length !== 1 ? 's' : ''} found</span>
              <span className="flex gap-2">
                <kbd className="px-2 py-1 bg-white border border-tobler-border rounded text-xs">↑↓</kbd>
                <kbd className="px-2 py-1 bg-white border border-tobler-border rounded text-xs">Enter</kbd>
                <kbd className="px-2 py-1 bg-white border border-tobler-border rounded text-xs">Esc</kbd>
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
