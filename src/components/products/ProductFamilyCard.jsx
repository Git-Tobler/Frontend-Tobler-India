import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import ResponsiveImage from '../ui/ResponsiveImage.jsx'
import { familyPath } from '../../data/products/index.js'

/* The two top-level family tiles on /products — same large photo-plus-scrim
   idiom as IndustryCard, reused deliberately so the two top-level landing
   grids on this site (Industries, Products) read as one visual system. */
function ProductFamilyCard({ family }) {
  return (
    <Link
      to={familyPath(family.slug)}
      className="group relative flex flex-col justify-end min-h-[22rem] rounded-card overflow-hidden border border-tobler-heading/20 p-8 md:p-10 transition-all duration-300 ease-premium hover:shadow-elevated bg-blueprint"
    >
      {family.heroImageId && (
        <div className="absolute inset-0">
          <ResponsiveImage
            publicId={family.heroImageId}
            alt=""
            className="h-full w-full"
            displayWidth={900}
            sizes="(min-width: 768px) 50vw, 100vw"
          />
        </div>
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-tobler-heading via-tobler-heading/50 to-transparent group-hover:from-tobler-blue-dark transition-colors duration-300" />

      <div className="relative z-10">
        <p className="label-mono text-white/70 mb-3">{family.subcategories.length} Product Lines</p>
        <div className="flex items-center justify-between gap-4 mb-3">
          <h2 className="text-h3 text-white">{family.name}</h2>
          <ArrowUpRight
            size={26}
            strokeWidth={2}
            className="text-tobler-gold shrink-0 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
          />
        </div>
        <p className="text-white/75 leading-relaxed normal-case max-w-md">{family.summary}</p>
      </div>
    </Link>
  )
}

export default ProductFamilyCard
