import { useState } from 'react'
import { Maximize2, Play } from 'lucide-react'
import ResponsiveImage from './ResponsiveImage.jsx'
import Lightbox from './Lightbox.jsx'
import { cldVideo } from '../../lib/cloudinary.js'

const PREVIEW_THUMBS = 3

/* Gallery rail for the detail drawers: one lead frame, a row of small
   thumbnails, and a full-screen viewer behind every tile.

   Items are `{ type: 'image' | 'video', publicId, label }`. Video thumbnails
   are posters rather than <video> elements — a rail of autoplaying clips costs
   more than the rest of the panel put together, and none of them is the thing
   being looked at until it is opened. */
function Thumb({ item, icon, label, aspect, width, sizes }) {
  if (item.type === 'video') {
    const media = cldVideo(item.publicId, { w: width })
    return (
      <div className={`relative ${aspect} w-full overflow-hidden bg-tobler-bg-dark`}>
        {media?.poster && (
          <img src={media.poster} alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
        )}
        <span className="absolute inset-0 flex items-center justify-center" aria-hidden="true">
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white/85 text-tobler-heading">
            <Play size={15} className="ml-0.5" fill="currentColor" />
          </span>
        </span>
      </div>
    )
  }

  return (
    <ResponsiveImage
      publicId={item.publicId}
      alt={item.label || ''}
      icon={icon}
      label={label}
      iconSize={44}
      className={`${aspect} w-full`}
      displayWidth={width}
      sizes={sizes}
    />
  )
}

function MediaGallery({ items = [], icon, label, className = '', sizes = '(min-width: 1024px) 32vw, 100vw' }) {
  const [lightboxIndex, setLightboxIndex] = useState(-1)
  const [expanded, setExpanded] = useState(false)

  if (items.length === 0) return null

  const [lead, ...rest] = items
  const visible = expanded ? rest : rest.slice(0, PREVIEW_THUMBS)
  const hiddenCount = rest.length - visible.length

  return (
    <div className={className}>
      <button
        type="button"
        onClick={() => setLightboxIndex(0)}
        aria-label={`Open ${lead.label || 'media'} full screen`}
        className="group relative block w-full overflow-hidden rounded-card focus:outline-none focus-visible:ring-2 focus-visible:ring-tobler-blue"
      >
        <Thumb
          item={lead}
          icon={icon}
          label={label}
          aspect="aspect-[16/10]"
          width={900}
          sizes={sizes}
        />
        <span className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-black/45 text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100">
          <Maximize2 size={15} />
        </span>
      </button>

      {rest.length > 0 && (
        <div className="mt-2 grid grid-cols-3 gap-2">
          {visible.map((item, i) => (
            <button
              key={item.publicId}
              type="button"
              onClick={() => setLightboxIndex(i + 1)}
              aria-label={`Open ${item.label || `item ${i + 2}`} full screen`}
              className="group relative overflow-hidden rounded-img focus:outline-none focus-visible:ring-2 focus-visible:ring-tobler-blue"
            >
              <Thumb item={item} aspect="aspect-[4/3]" width={280} sizes="(min-width: 1024px) 11vw, 30vw" />
              <span className="absolute inset-0 bg-tobler-heading/0 transition-colors duration-300 group-hover:bg-tobler-heading/20" />
            </button>
          ))}
        </div>
      )}

      {rest.length > PREVIEW_THUMBS && (
        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          className="label-mono mt-3 text-tobler-blue transition-colors duration-300 hover:text-tobler-blue-dark"
        >
          {expanded ? 'Show fewer4' : `See all ${items.length} — +${hiddenCount} more`}
        </button>
      )}

      {lightboxIndex >= 0 && (
        <Lightbox
          items={items}
          index={lightboxIndex}
          onClose={() => setLightboxIndex(-1)}
          onIndexChange={setLightboxIndex}
        />
      )}
    </div>
  )
}

export default MediaGallery
