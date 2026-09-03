import { useState } from 'react'
import ResponsiveImage from '../ui/ResponsiveImage.jsx'
import VideoPanel from '../ui/VideoPanel.jsx'

/* Drawer's Gallery tab.

   A swipeable carousel of images and/or video. The lead is either:
   - `imageId`: real Tobler photography of the system in use
   - `videoId`: a product animation (e.g., protection screen bracket detail)
   - Both (e.g., a gallery of site photos plus a CAD walk-through)

   Images are fed via `gallery`, which can contain the same `imageId` or
   independent photographs. If no `gallery` is provided, the carousel falls
   back to a single-image display. */
function ProductGallery({ product, icon }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const hasVideo = Boolean(product.videoId)
  const hasGallery = product.gallery && product.gallery.length > 0
  const images = hasGallery ? product.gallery : product.imageId ? [product.imageId] : []
  const currentImage = images[currentImageIndex]

  // Toggle between video and first image on double-tap / explicit click
  // For now: show image gallery. Video stays at the front via gallery order if included.

  const handlePrevImage = () => {
    setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))
  }

  const handleNextImage = () => {
    setCurrentImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))
  }

  return (
    <div className="space-y-4">
      {product.videoId && (
        <VideoPanel
          publicId={product.videoId}
          aspect="aspect-[16/9]"
          fit="contain"
          label={product.model}
          width={1100}
          className="rounded-img"
        />
      )}

      {images.length > 0 && (
        <div className="relative">
          <ResponsiveImage
            publicId={currentImage}
            icon={icon}
            label={product.model}
            iconSize={56}
            alt=""
            className={hasGallery && images.length > 1 ? "w-full h-auto rounded-img" : "aspect-[16/9] rounded-img"}
            displayWidth={1040}
          />

          {hasGallery && images.length > 1 && (
        <>
          <button
            onClick={handlePrevImage}
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-md transition-all z-10"
            aria-label="Previous image"
          >
            <svg className="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button
            onClick={handleNextImage}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-md transition-all z-10"
            aria-label="Next image"
          >
            <svg className="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-2 z-10">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentImageIndex ? 'bg-white w-8' : 'bg-white/50'
                }`}
                aria-label={`Go to image ${index + 1}`}
              />
            ))}
          </div>
          </>
          )}
        </div>
      )}
    </div>
  )
}

export default ProductGallery
