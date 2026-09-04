import { useState, useEffect, useRef, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search, X, ChevronRight, Sparkles } from 'lucide-react'
import { SEARCH_ENTRIES, SUGGESTED_SEARCHES } from '../../data/searchIndex.js'
import { ANSWER_CARDS } from '../../lib/answerCards.js'
import { searchEntries, matchAnswerCards } from '../../lib/search.js'

const RESULT_LIMIT = 20

export default function SearchModal({ isOpen, onClose }) {
  const [query, setQuery] = useState('')
  const [selectedIndex, setSelectedIndex] = useState(0)
  const inputRef = useRef(null)
  const navigate = useNavigate()

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus()
    } else {
      // Reset so re-opening the modal never shows the previous search's
      // stale results for a beat before the input re-focuses.
      setQuery('')
      setSelectedIndex(0)
    }
  }, [isOpen])

  const results = useMemo(
    () => (query.trim() ? searchEntries(SEARCH_ENTRIES, query, { limit: RESULT_LIMIT }) : []),
    [query]
  )

  const answerCard = useMemo(() => {
    if (!query.trim()) return null
    return matchAnswerCards(ANSWER_CARDS, query)[0] || null
  }, [query])

  useEffect(() => {
    setSelectedIndex(0)
  }, [query])

  const goTo = (path) => {
    // FAQ deep-links carry `?q=` so the FAQ page can pre-filter and expand
    // the matching question — everywhere else a plain path (with an
    // optional #hash) is enough.
    const [pathname, hash] = path.split('#')
    navigate(pathname.includes('?') ? pathname : hash ? `${pathname}#${hash}` : pathname)
    onClose()
    setQuery('')
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      onClose()
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      setSelectedIndex((prev) => Math.min(prev + 1, results.length - 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setSelectedIndex((prev) => Math.max(prev - 1, 0))
    } else if (e.key === 'Enter') {
      if (results[selectedIndex]) {
        goTo(results[selectedIndex].path)
      } else if (answerCard) {
        goTo(answerCard.ctaPath)
      }
    }
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
              placeholder="Search products, projects, FAQs, careers..."
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
              <div className="px-6 py-10">
                <p className="text-xs font-semibold uppercase tracking-wide text-tobler-muted mb-3">
                  Popular searches
                </p>
                <div className="flex flex-wrap gap-2">
                  {SUGGESTED_SEARCHES.map((suggestion) => (
                    <button
                      key={suggestion}
                      onClick={() => setQuery(suggestion)}
                      className="px-3 py-1.5 text-sm rounded-full border border-tobler-border text-tobler-body hover:border-tobler-blue hover:text-tobler-blue transition-colors"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              </div>
            ) : results.length === 0 && !answerCard ? (
              <div className="px-6 py-12 text-center">
                <p className="text-tobler-muted mb-4">No results found for &quot;{query}&quot;</p>
                <button
                  onClick={() => goTo('/contact')}
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-tobler-blue hover:text-tobler-blue-dark"
                >
                  Ask our team directly <ChevronRight size={16} />
                </button>
              </div>
            ) : (
              <>
                {answerCard && (
                  <div className="px-6 pt-5 pb-4 bg-tobler-blue/5 border-b border-tobler-border-light">
                    <div className="flex items-center gap-2 mb-3">
                      <Sparkles size={16} className="text-tobler-gold-deep" />
                      <h3 className="text-sm font-semibold text-tobler-heading">{answerCard.title}</h3>
                    </div>
                    <dl className="space-y-1.5 mb-3">
                      {answerCard.lines.map((line, i) => (
                        <div key={i} className="text-sm text-tobler-body">
                          {line.label && <span className="font-medium text-tobler-heading">{line.label}: </span>}
                          <span>{line.value}</span>
                        </div>
                      ))}
                    </dl>
                    <button
                      onClick={() => goTo(answerCard.ctaPath)}
                      className="inline-flex items-center gap-1 text-sm font-medium text-tobler-blue hover:text-tobler-blue-dark"
                    >
                      {answerCard.ctaLabel} <ChevronRight size={14} />
                    </button>
                  </div>
                )}

                {results.length > 0 && (
                  <div className="divide-y divide-tobler-border-light">
                    {results.map((result, idx) => (
                      <button
                        key={result.id}
                        onClick={() => goTo(result.path)}
                        onMouseEnter={() => setSelectedIndex(idx)}
                        className={`w-full px-6 py-4 flex items-start justify-between transition-colors duration-200 ${
                          idx === selectedIndex ? 'bg-tobler-bg-light' : 'hover:bg-tobler-bg-light/50'
                        }`}
                      >
                        <div className="text-left flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <h3 className="text-base font-semibold text-tobler-heading">{result.title}</h3>
                            <span className="px-2 py-1 text-xs font-medium text-tobler-blue bg-tobler-blue/10 rounded-full">
                              {result.category}
                            </span>
                          </div>
                          {result.subtitle && (
                            <p className="text-xs text-tobler-muted mt-1">{result.subtitle}</p>
                          )}
                          {result.description && (
                            <p className="text-sm text-tobler-body mt-1 line-clamp-2">{result.description}</p>
                          )}
                        </div>
                        <ChevronRight size={20} className="text-tobler-muted ml-4 flex-shrink-0 mt-0.5" />
                      </button>
                    ))}
                  </div>
                )}
              </>
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
