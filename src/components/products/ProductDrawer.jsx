import { FileText } from 'lucide-react'
import Button from '../common/Button.jsx'
import SidePanel from '../ui/SidePanel.jsx'
import SpecTable from '../ui/SpecTable.jsx'
import DownloadCard from '../ui/DownloadCard.jsx'
import ReadMore from '../ui/ReadMore.jsx'
import ResponsiveImage from '../ui/ResponsiveImage.jsx'
import ProductGallery from './ProductGallery.jsx'
import ProductTile from './ProductTile.jsx'
import FAQAccordion from './FAQAccordion.jsx'
import { productPath } from '../../data/products/index.js'
import { PRODUCT_ICONS, DEFAULT_ICON } from '../../data/icons.js'

/* Premium half-screen product detail panel — replaces the old dedicated
   product page. The panel shell, focus trap and scroll lock live in
   SidePanel; this component is only the product-shaped content inside it. */
function ProductDrawer({ open, family, subcategory, product, relatedProducts = [], onClose }) {
  // Safety checks to prevent errors when props are undefined
  if (!product || !subcategory || !family) {
    return null
  }

  const icon = PRODUCT_ICONS[subcategory.slug] || DEFAULT_ICON

  return (
    <SidePanel
      open={open}
      onClose={onClose}
      contentKey={product?.slug}
      eyebrow={product ? `${family.name} — ${subcategory.name}` : undefined}
      title={product?.name}
      footer={
        <Button to="/contact#rfq" size="lg" className="w-full justify-center">
          Request a Quote
        </Button>
      }
    >
      {product && (
        <>
          <ProductGallery product={product} icon={icon} />

          {product.galleryImage && (
            <figure>
              <ResponsiveImage
                publicId={product.galleryImage}
                alt={product.name}
                className="w-full rounded-img"
                displayWidth={1040}
              />
            </figure>
          )}

          <section>
            <h3 className="text-h5 mb-3">Overview</h3>
            <ReadMore previewLines={4}>{product.description}</ReadMore>
          </section>

          {product.mato8Details?.length > 0 && (
            <section>
              <h3 className="text-h5 mb-6">Details</h3>
              <div className="space-y-8">
                {product.mato8Details.map((detail, idx) => (
                  <div key={idx}>
                    <h4 className="text-base text-tobler-heading font-semibold mb-3">{detail.title}</h4>
                    <p className="text-sm text-tobler-body leading-relaxed whitespace-pre-line">{detail.content}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {product.matorDetails?.length > 0 && (
            <section>
              <h3 className="text-h5 mb-6">Details</h3>
              <div className="space-y-8">
                {product.matorDetails.map((detail, idx) => (
                  <div key={idx}>
                    <h4 className="text-base text-tobler-heading font-semibold mb-3">{detail.title}</h4>
                    <p className="text-sm text-tobler-body leading-relaxed whitespace-pre-line">{detail.content}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {product.matozoDetails?.length > 0 && (
            <section>
              <h3 className="text-h5 mb-6">Details</h3>
              <div className="space-y-8">
                {product.matozoDetails.map((detail, idx) => (
                  <div key={idx}>
                    <h4 className="text-base text-tobler-heading font-semibold mb-3">{detail.title}</h4>
                    <p className="text-sm text-tobler-body leading-relaxed whitespace-pre-line">{detail.content}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Optional: a product that ships in more than one configuration
              of the same system, rather than as separate products. */}
          {product.variants?.length > 0 && (
            <section>
              <h3 className="text-h5 mb-4">Configurations</h3>
              <div className="space-y-4">
                {product.variants.map((variant) => (
                  <div key={variant.name} className="p-5 border border-tobler-border rounded-card">
                    <h4 className="text-base text-tobler-heading mb-2">{variant.name}</h4>
                    <p className="text-sm text-tobler-body leading-relaxed normal-case">{variant.description}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {product.keyUSPs?.length > 0 && (
            <section>
              <h3 className="text-h5 mb-4">Key USPs</h3>
              <ul className="space-y-3">
                {product.keyUSPs.map((item) => (
                  <li key={item} className="flex gap-3 text-sm text-tobler-body leading-relaxed normal-case">
                    <span className="mt-2 w-1.5 h-1.5 rounded-full bg-tobler-blue shrink-0" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
            </section>
          )}

          {product.typicalApplications?.length > 0 && (
            <section>
              <h3 className="text-h5 mb-4">Typical Applications</h3>
              <ul className="space-y-2">
                {product.typicalApplications.map((item) => (
                  <li key={item} className="text-sm text-tobler-body leading-relaxed normal-case">
                    {item}
                  </li>
                ))}
              </ul>
            </section>
          )}

          {product.applications?.length > 0 && (
            <section>
              <h3 className="text-h5 mb-4">Applications</h3>
              <ul className="grid sm:grid-cols-2 gap-3">
                {product.applications.map((item) => (
                  <li
                    key={item}
                    className="text-sm text-tobler-body leading-relaxed normal-case p-3.5 bg-tobler-bg-light rounded-card"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </section>
          )}

          {product.features?.length > 0 && (
            <section>
              <h3 className="text-h5 mb-4">Features</h3>
              <ul className="space-y-3">
                {product.features.map((item) => (
                  <li key={item} className="flex gap-3 text-sm text-tobler-body leading-relaxed normal-case">
                    <span className="mt-2 w-1.5 h-1.5 rounded-full bg-tobler-blue shrink-0" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
            </section>
          )}

          {product.specifications?.length > 0 && (
            <section>
              <h3 className="text-h5 mb-4">Technical Specifications</h3>
              <SpecTable specifications={product.specifications} />
            </section>
          )}

          {product.whyChooseToblerProps?.length > 0 && (
            <section>
              <h3 className="text-h5 mb-4">Why Choose Tobler Props?</h3>
              <div className="space-y-4">
                {product.whyChooseToblerProps.map((paragraph, idx) => (
                  <p key={idx} className="text-sm text-tobler-body leading-relaxed normal-case">
                    {paragraph}
                  </p>
                ))}
              </div>
            </section>
          )}

          {product.whyTobler?.length > 0 && (
            <section>
              <h3 className="text-h5 mb-4">Why Tobler?</h3>
              <div className="space-y-4">
                {product.whyTobler.map((paragraph, idx) => (
                  <p key={idx} className="text-sm text-tobler-body leading-relaxed normal-case">
                    {paragraph}
                  </p>
                ))}
              </div>
            </section>
          )}

          {product.whyToblerCuplock?.length > 0 && (
            <section>
              <h3 className="text-h5 mb-4">Why Tobler Cuplock?</h3>
              <div className="space-y-4">
                {product.whyToblerCuplock.map((paragraph, idx) => (
                  <p key={idx} className="text-sm text-tobler-body leading-relaxed normal-case">
                    {paragraph}
                  </p>
                ))}
              </div>
            </section>
          )}

          {product.toblerAdvantage?.length > 0 && (
            <section>
              <h3 className="text-h5 mb-4">Tobler Advantage</h3>
              <ul className="space-y-3">
                {product.toblerAdvantage.map((item) => (
                  <li key={item} className="text-sm text-tobler-body leading-relaxed normal-case p-3.5 bg-tobler-bg-light rounded-card">
                    {item}
                  </li>
                ))}
              </ul>
            </section>
          )}

          {product.certifications?.length > 0 && (
            <section>
              <h3 className="text-h5 mb-4">Certifications &amp; Compliance</h3>
              <div className="flex flex-wrap gap-2">
                {product.certifications.map((cert) => (
                  <span key={cert} className="label-mono px-3 py-1.5 rounded-btn border border-tobler-border text-tobler-body">
                    {cert}
                  </span>
                ))}
              </div>
            </section>
          )}

          {product.downloads?.length > 0 && (
            <section>
              <h3 className="text-h5 mb-4 flex items-center gap-2">
                <FileText size={18} className="text-tobler-blue" aria-hidden="true" />
                Brochure &amp; Downloads
              </h3>
              <div className="space-y-3">
                {product.downloads.map((doc) => (
                  <DownloadCard key={doc.href} title={doc.label} href={doc.href} />
                ))}
              </div>
            </section>
          )}

          {relatedProducts.length > 0 && (
            <section>
              <h3 className="text-h5 mb-4">Related Products</h3>
              <div className="grid sm:grid-cols-2 gap-4">
                {relatedProducts.map(({ product: related, subcategory: relatedSub }) => (
                  <ProductTile
                    key={related.slug}
                    to={productPath(family.slug, related.slug)}
                    product={related}
                    fallbackImageId={relatedSub.imageId}
                    icon={PRODUCT_ICONS[relatedSub.slug] || DEFAULT_ICON}
                  />
                ))}
              </div>
            </section>
          )}

          {subcategory.faqs?.length > 0 && (
            <section>
              <h3 className="text-h5 mb-4">Frequently Asked Questions</h3>
              <FAQAccordion items={subcategory.faqs} />
            </section>
          )}
        </>
      )}
    </SidePanel>
  )
}

export default ProductDrawer
