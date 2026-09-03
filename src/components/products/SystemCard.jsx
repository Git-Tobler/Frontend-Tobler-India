import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import ResponsiveImage from '../ui/ResponsiveImage.jsx'

/* The family page's index card — one per subcategory. Numbered in source
   order so the six systems read as a deliberate sequence rather than a bag
   of tiles; the number is the only thing separating this from the generic
   ProductCard, but it is what makes the grid scan as a range.

   `imageId` is optional: ResponsiveImage falls back to the MediaTile
   blueprint placeholder, which is what a subcategory awaiting photography
   (Cuplock) renders today. */
function SystemCard({ to, index, title, summary, imageId, icon, className = '' }) {
  return (
    <Link
      to={to}
      className={`group flex flex-col h-full bg-white border border-tobler-border rounded-card overflow-hidden transition-all duration-300 ease-premium hover:-translate-y-1 hover:shadow-elevated hover:border-tobler-heading/30 ${className}`}
    >
      <ResponsiveImage
        publicId={imageId}
        icon={icon}
        label={title}
        alt=""
        className="h-52"
        displayWidth={520}
        sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
      />
      <div className="p-7 flex flex-col flex-1">
        <span className="label-mono text-tobler-gold-deep mb-3">{String(index).padStart(2, '0')}</span>
        <h3 className="text-lg mb-3 group-hover:text-tobler-blue transition-colors">{title}</h3>
        <p className="text-sm text-tobler-body leading-relaxed flex-1 normal-case">{summary}</p>
        <div className="mt-6 flex items-center gap-2 label-mono text-tobler-heading">
          Explore Product
          <ArrowRight size={15} aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1" />
        </div>
      </div>
    </Link>
  )
}

export default SystemCard
