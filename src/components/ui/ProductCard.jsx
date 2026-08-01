import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import MediaTile from './MediaTile.jsx'
import { PRODUCT_ICONS, DEFAULT_ICON } from '../../constants/icons.js'

function ProductCard({ product, index }) {
  return (
    <Link
      to={`/products/${product.slug}`}
      className="group relative flex flex-col h-full bg-white border border-tobler-border rounded-card overflow-hidden transition-all duration-300 ease-premium hover:shadow-elevated hover:-translate-y-1 hover:border-tobler-heading/30"
    >
      <MediaTile
        icon={PRODUCT_ICONS[product.slug] || DEFAULT_ICON}
        label={index ? `SPEC ${index}` : 'Product Line'}
        className="h-48"
      />
      <div className="p-6 flex flex-col flex-1">
        <h3 className="text-lg mb-2 group-hover:text-tobler-gold transition-colors">
          {product.name}
        </h3>
        <p className="text-sm text-tobler-body leading-relaxed flex-1 normal-case">{product.summary}</p>
        <div className="mt-5 flex items-center gap-2 label-mono text-tobler-heading">
          View Details
          <ArrowRight size={15} className="transition-transform duration-300 group-hover:translate-x-1" />
        </div>
      </div>
    </Link>
  )
}

export default ProductCard
