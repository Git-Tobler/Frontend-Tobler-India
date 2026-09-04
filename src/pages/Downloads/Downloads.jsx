import SEO from '../../components/common/SEO.jsx'
import PageHero from '../../components/layout/PageHero.jsx'
import MediaBand from '../../components/ui/MediaBand.jsx'
import Container from '../../components/common/Container.jsx'
import { Download, FileText, Image as ImageIcon, Archive, Clock } from 'lucide-react'
import { MEDIA } from '../../data/media-map.js'
import { DOWNLOAD_CATEGORIES } from '../../data/downloads.js'

// Maps the icon keys in data/downloads.js back to lucide components — that
// module stays free of React imports so the search index can pull it into
// the main bundle without dragging lucide-react along.
const DOWNLOAD_ICONS = {
  fileText: FileText,
  archive: Archive,
  image: ImageIcon,
  verification_outlined: 'verification_outlined',
}

function Downloads() {
  const downloadCategories = DOWNLOAD_CATEGORIES.map((category) => ({
    ...category,
    icon: DOWNLOAD_ICONS[category.icon] ?? category.icon,
  }))

  const DownloadItem = ({ item, category }) => {
    const isComplete = !item.updated.includes('[')
    return (
      <div className={`p-6 rounded-card border transition-all ${
        isComplete
          ? 'bg-white border-tobler-border hover:border-tobler-border/60 group'
          : 'bg-tobler-bg-light border-tobler-border/50'
      }`}>
        <div className="flex items-start justify-between gap-4 mb-3">
          <h4 className={`font-semibold flex-1 ${isComplete ? 'text-tobler-heading' : 'text-tobler-body/60'}`}>
            {item.name}
          </h4>
          {isComplete && (
            <Download size={18} className="text-tobler-gold group-hover:text-tobler-gold/80 shrink-0" />
          )}
        </div>

        <p className={`text-sm mb-4 ${isComplete ? 'text-tobler-body' : 'text-tobler-body/60 italic'}`}>
          {item.description}
        </p>

        <div className="flex flex-wrap gap-4 text-xs text-tobler-body/60 mb-4 pb-4 border-b border-tobler-border">
          <div className="flex items-center gap-1">
            <span className="font-medium">Format:</span>
            <span>{item.format}</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="font-medium">Size:</span>
            <span>{item.size}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock size={12} />
            <span>{item.updated}</span>
          </div>
        </div>

        {isComplete ? (
          <a
            href={item.downloadUrl}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-card bg-tobler-gold/10 text-tobler-gold hover:bg-tobler-gold/20 transition-colors text-sm font-medium"
          >
            <Download size={14} /> Download
          </a>
        ) : (
          <span className="inline-block text-xs text-tobler-body/40 font-medium">Coming Soon</span>
        )}
      </div>
    )
  }

  return (
    <>
      <SEO
        title="Download Brochures & Resources | Tobler"
        description="Download product brochures, technical documents, certificates, and media assets."
        path="/download-brochures"
      />
      <PageHero
        title="Downloads & Resources"
        description="Access our comprehensive library of brochures, technical documents, and media"
        breadcrumbItems={[{ label: 'Downloads' }]}
        imageId={MEDIA.warehouse}
      />

      <section className="py-24 md:py-32">
        <Container>
          {/* Quick Stats */}
          <div className="grid md:grid-cols-4 gap-6 mb-16">
            <div className="p-6 rounded-card bg-tobler-blue/5 border border-tobler-blue/20 text-center">
              <p className="text-3xl font-bold text-tobler-blue mb-1">50+</p>
              <p className="text-xs text-tobler-body">Documents Available</p>
            </div>
            <div className="p-6 rounded-card bg-tobler-gold/5 border border-tobler-gold/20 text-center">
              <p className="text-3xl font-bold text-tobler-gold mb-1">500+</p>
              <p className="text-xs text-tobler-body">Downloads Monthly</p>
            </div>
            <div className="p-6 rounded-card bg-green-500/10 border border-green-500/20 text-center">
              <p className="text-3xl font-bold text-green-700 mb-1">4K</p>
              <p className="text-xs text-tobler-body">Image Resolution</p>
            </div>
            <div className="p-6 rounded-card bg-purple-500/10 border border-purple-500/20 text-center">
              <p className="text-3xl font-bold text-purple-700 mb-1">24/7</p>
              <p className="text-xs text-tobler-body">Access Available</p>
            </div>
          </div>

          {/* Categories */}
          <div className="space-y-12">
            {downloadCategories.map((category) => {
              const Icon = category.icon
              const isStringIcon = typeof Icon === 'string'
              return (
                <div key={category.id}>
                  {/* Category Header */}
                  <div className="flex items-center gap-4 mb-8">
                    {!isStringIcon && (
                      <div className="p-3 rounded-lg bg-tobler-blue/10">
                        <Icon size={24} className="text-tobler-blue" />
                      </div>
                    )}
                    <div>
                      <h2 className="text-2xl font-semibold text-tobler-heading">{category.title}</h2>
                      <p className="text-sm text-tobler-body mt-1">{category.description}</p>
                    </div>
                  </div>

                  {/* Items Grid */}
                  <div className="grid md:grid-cols-2 gap-6 mb-12">
                    {category.items.map((item) => (
                      <DownloadItem key={item.id} item={item} category={category} />
                    ))}
                  </div>
                </div>
              )
            })}
          </div>

          {/* CTA Section */}
          <div className="mt-20 pt-16 border-t border-tobler-border">
            <MediaBand imageId={MEDIA.extrusionStack} className="p-12 text-white text-center">
              <h3 className="text-2xl font-semibold mb-3 text-white">Need Custom Documentation?</h3>
              <p className="text-white/80 mb-6 max-w-md mx-auto">
                If you need specific technical documents or custom brochures for your project, our team can provide tailored resources.
              </p>
              <a
                href="mailto:info@gezu-impex.nl?subject=Custom%20Documentation%20Request"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-card bg-tobler-gold text-tobler-heading font-medium hover:bg-tobler-gold/90 transition-colors"
              >
                Request Custom Documents
              </a>
            </MediaBand>
          </div>
        </Container>
      </section>
    </>
  )
}

export default Downloads
