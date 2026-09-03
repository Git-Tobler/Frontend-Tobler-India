import Reveal from '../ui/Reveal.jsx'
import ProductTile from './ProductTile.jsx'
import { productPath } from '../../data/products/index.js'
import { PRODUCT_ICONS, DEFAULT_ICON } from '../../data/icons.js'

/* One subcategory's slice of the family page: an anchored heading (targeted
   by ProductFilterBar's jump links) plus its product grid. Renders nothing
   when a search query has filtered every product out, so the page never
   shows an empty section header. */
function ProductSection({ familySlug, subcategory, products }) {
  if (products.length === 0) return null

  const icon = PRODUCT_ICONS[subcategory.slug] || DEFAULT_ICON

  return (
    <div id={subcategory.slug} className="scroll-mt-32">
      <div className="flex flex-col gap-3 mb-8 max-w-2xl">
        <h2 className="text-h4">{subcategory.name}</h2>
        <p className="text-tobler-body leading-relaxed normal-case">{subcategory.summary}</p>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product, idx) => (
          <Reveal key={product.slug} delay={idx * 60}>
            <ProductTile to={productPath(familySlug, product.slug)} product={product} icon={icon} className="h-full" />
          </Reveal>
        ))}
      </div>
    </div>
  )
}

export default ProductSection
