import { useCallback, useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'
import { cldImage, cldVideo } from '../../lib/cloudinary.js'

const FOCUSABLE = 'button:not([disabled])'

/* Full-viewport viewer for the gallery tiles in the detail drawers.

   Portalled to <body> because the drawer panel carries a transform, which makes
   it a containing block for `fixed` descendants — rendered in place, this would
   be positioned and clipped against the panel instead of the viewport.

   Keys are handled in the capture phase and stopped there: SidePanel listens for
   Escape and Tab on `document` too, so an uncaught Escape would close the drawer
   underneath along with the viewer, and Tab would be yanked back into the panel. */
function Lightbox({ items, index, onClose, onIndexChange }) {
  const containerRef = useRef(null)
  const count = items.length
  const item = items[index]

  const goPrev = useCallback(() => onIndexChange((index - 1 + count) % count), [index, count, onIndexChange])
  const goNext = useCallback(() => onIndexChange((index + 1) % count), [index, count, onIndexChange])

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        event.stopPropagation()
        onClose()
      } else if (event.key === 'ArrowLeft' && count > 1) {
        event.stopPropagation()
        goPrev()
      } else if (event.key === 'ArrowRight' && count > 1) {
        event.stopPropagation()
        goNext()
      } else if (event.key === 'Tab') {
        event.stopPropagation()
        const focusable = containerRef.current?.querySelectorAll(FOCUSABLE)
        if (!focusable?.length) return
        const first = focusable[0]
        const last = focusable[focusable.length - 1]
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault()
          last.focus()
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault()
          first.focus()
        }
      }
    }

    document.addEventListener('keydown', handleKeyDown, true)
    return () => document.removeEventListener('keydown', handleKeyDown, true)
  }, [onClose, goPrev, goNext, count])

  useEffect(() => {
    const previouslyFocused = document.activeElement
    containerRef.current?.querySelector(FOCUSABLE)?.focus()
    return () => previouslyFocused?.focus?.()
  }, [])

  if (!item) return null

  const video = item.type === 'video' ? cldVideo(item.publicId, { w: 1600, quality: 'auto:best' }) : null

  return createPortal(
    <div
      ref={containerRef}
      role="dialog"
      aria-modal="true"
      aria-label={item.label || 'Media viewer'}
      className="fixed inset-0 z-[90] bg-black/95"
    >
      <div className="absolute inset-0" onClick={onClose} aria-hidden="true" />

      {/* Transparent to the pointer so a click anywhere but the media itself
          falls through to the backdrop above and closes the viewer. */}
      <figure className="pointer-events-none relative flex h-full w-full flex-col items-center justify-center gap-4 p-4 md:px-24 md:py-16">
        {video ? (
          <video
            key={item.publicId}
            className="pointer-events-auto max-h-full max-w-full rounded-img"
            controls
            autoPlay
            muted
            loop
            playsInline
            poster={video.poster}
          >
            {video.sources.map((source) => (
              <source key={source.type} src={source.src} type={source.type} />
            ))}
          </video>
        ) : (
          <img
            key={item.publicId}
            src={cldImage(item.publicId, { w: 1920, crop: 'limit' })}
            alt={item.label || ''}
            className="pointer-events-auto max-h-full max-w-full rounded-img object-contain"
          />
        )}

        {item.label && <figcaption className="label-mono text-center text-white/70">{item.label}</figcaption>}
      </figure>

      <button
        type="button"
        onClick={onClose}
        aria-label="Close viewer"
        className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/25 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
      >
        <X size={22} />
      </button>

      {count > 1 && (
        <>
          <button
            type="button"
            onClick={goPrev}
            aria-label="Previous item"
            className="absolute left-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/25 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70 md:left-6"
          >
            <ChevronLeft size={24} />
          </button>

          <button
            type="button"
            onClick={goNext}
            aria-label="Next item"
            className="absolute right-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/25 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70 md:right-6"
          >
            <ChevronRight size={24} />
          </button>

          <p className="label-mono absolute bottom-5 left-1/2 -translate-x-1/2 text-white/60">
            {index + 1} / {count}
          </p>
        </>
      )}
    </div>,
    document.body
  )
}

export default Lightbox
