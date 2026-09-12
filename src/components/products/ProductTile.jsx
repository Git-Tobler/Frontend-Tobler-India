import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import ResponsiveImage from '../ui/ResponsiveImage.jsx'
import { mainImage } from '../../lib/media.js'

/* One product in a subcategory grid.

   The frame is the product's `media.main`; `fallbackImageId` is the parent
   subcategory's, so a product added without its own photo still lands on the
   system's shot rather than dropping the whole tile back to the blueprint
   placeholder. The model still prints as an id-plate over the image, which is
   what it did when the tile was blueprint-only. */
function ProductTile({ to, product, icon, fallbackImageId, className = '' }) {
  return (
    <Link
      to={to}
      className={`group flex flex-col h-full bg-white border border-tobler-border rounded-card overflow-hidden transition-all duration-300 ease-premium hover:shadow-elevated hover:-translate-y-1 hover:border-tobler-heading/30 ${className}`}
    >
      <ResponsiveImage
        publicId={mainImage(product) || fallbackImageId}
        icon={icon}
        label={product.model}
        alt=""
        className="h-44"
        iconSize={36}
        displayWidth={440}
        sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
      />
      <div className="p-6 flex flex-col flex-1">
        {product.model && <span className="label-mono text-tobler-blue mb-2">{product.model}</span>}
        <h3 className="text-lg mb-2 group-hover:text-tobler-blue transition-colors">{product.name}</h3>
        <p className="text-sm text-tobler-body leading-relaxed flex-1 normal-case">{product.summary}</p>
        <div className="mt-5 flex items-center gap-2 label-mono text-tobler-heading">
          View Details
          <ArrowRight size={15} aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1" />
        </div>
      </div>
    </Link>
  )
}

export default ProductTile
