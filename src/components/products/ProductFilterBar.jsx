import { Search } from 'lucide-react'

/* Sticky search + jump-nav for a family page. Search is a plain controlled
   input filtering client-side (the whole catalog is a few dozen products —
   no need for async search); the chip row is just anchor links, so jumping
   to a subcategory works even with JS disabled. */
function ProductFilterBar({ subcategories, query, onQueryChange }) {
  return (
    <div className="sticky top-16 z-30 bg-white/95 backdrop-blur-md border-b border-tobler-border">
      <div className="container-content flex flex-col md:flex-row md:items-center gap-4 py-4">
        <label className="relative w-full md:w-64 shrink-0">
          <span className="sr-only">Search products</span>
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-tobler-body/60" aria-hidden="true" />
          <input
            type="search"
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
            placeholder="Search products..."
            className="w-full pl-10 pr-4 py-2.5 text-sm rounded-btn border border-tobler-border focus:outline-none focus:ring-2 focus:ring-tobler-blue/25 focus:border-tobler-blue transition-colors"
          />
        </label>
        <nav aria-label="Jump to subcategory" className="flex items-center gap-2 min-w-0 flex-1 overflow-x-auto">
          {subcategories.map((s) => (
            <a
              key={s.slug}
              href={`#${s.slug}`}
              className="shrink-0 label-mono px-3.5 py-2 rounded-btn border border-tobler-border text-tobler-body hover:border-tobler-blue hover:text-tobler-blue transition-colors whitespace-nowrap"
            >
              {s.name}
            </a>
          ))}
        </nav>
      </div>
    </div>
  )
}

export default ProductFilterBar
