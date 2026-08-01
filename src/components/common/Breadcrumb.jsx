import { Link } from 'react-router-dom'
import { ChevronRight, Home } from 'lucide-react'

function Breadcrumb({ items = [], light = false }) {
  const base = light ? 'text-white/55' : 'text-tobler-body/80'
  const hover = light ? 'hover:text-tobler-gold' : 'hover:text-tobler-blue'
  const current = light ? 'text-white' : 'text-tobler-heading font-medium'

  return (
    <nav aria-label="Breadcrumb" className={`flex items-center flex-wrap gap-2 label-mono ${base}`}>
      <Link to="/" className={`flex items-center gap-1 transition-colors ${hover}`}>
        <Home size={13} />
        <span className="sr-only">Home</span>
      </Link>
      {items.map((item, idx) => (
        <span key={idx} className="flex items-center gap-2">
          <ChevronRight size={12} />
          {item.path ? (
            <Link to={item.path} className={`transition-colors ${hover}`}>
              {item.label}
            </Link>
          ) : (
            <span className={current}>{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  )
}

export default Breadcrumb
