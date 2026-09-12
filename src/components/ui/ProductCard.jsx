import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import ResponsiveImage from './ResponsiveImage.jsx'

/* Generic tile used for every tier of the product hierarchy — category,
   subcategory and product cards all render through this one component,
   driven entirely by props rather than a fixed "product" shape.

   `soft` switches to the homepage's rounded/green language. Off by default so
   the Products pages keep their sharp-cornered navy treatment. */
function ProductCard({ to, image, imageId, icon, title, summary, soft = false, className = '' }) {
  const shell = soft
    ? 'border-shopify-border rounded-card-lg hover:shadow-raised hover:border-shopify-green-line'
    : 'border-tobler-border rounded-card hover:shadow-elevated hover:border-tobler-heading/30'

  return (
    <Link
      to={to}
      className={`group relative flex flex-col h-full bg-white border overflow-hidden transition-all duration-300 ease-premium hover:-translate-y-1 ${shell} ${className}`}
    >
      <ResponsiveImage
        publicId={imageId}
        src={image}
        icon={icon}
        className="h-48"
        alt=""
        displayWidth={520}
        sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
      />
      <div className="p-6 flex flex-col flex-1">
        <h3
          className={`text-lg mb-2 transition-colors ${
            soft ? 'text-shopify-ink group-hover:text-shopify-green' : 'group-hover:text-tobler-blue'
          }`}
        >
          {title}
        </h3>
        {summary && (
          <p
            className={`text-sm leading-relaxed flex-1 normal-case ${
              soft ? 'text-shopify-body' : 'text-tobler-body'
            }`}
          >
            {summary}
          </p>
        )}
        <div
          className={`mt-5 flex items-center gap-2 ${
            soft
              ? 'text-sm font-semibold text-shopify-green'
              : 'label-mono text-tobler-heading'
          }`}
        >
          {soft ? 'View details' : 'View Details'}
          <ArrowRight size={15} aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1" />
        </div>
      </div>
    </Link>
  )
}

export default ProductCard
