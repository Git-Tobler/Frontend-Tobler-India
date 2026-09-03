import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import ResponsiveImage from '../ui/ResponsiveImage.jsx'
import { cldVideo } from '../../lib/cloudinary.js'

/* Cinematic capability carousel: each capability cycles its 3 stills →
   crossfades → muted autoplay video → last frame → next capability.

   Stages per item:
   1. IMAGE: hold each still for imageDuration, advancing through the set
   2. CROSSFADE: transition the final still into the video
   3. VIDEO: autoplay muted, hold last frame
   4. NEXT: move to the next capability with a short transition

   `activeIndex` is owned by the parent (Facility) so a click on a
   capability card can jump the carousel directly, not just the
   auto-advance loop. */

const STAGE = {
  IMAGE: 'image',
  CROSSFADE: 'crossfade',
  VIDEO: 'video',
  NEXT: 'next',
}

const CROSSFADE_DURATION = 800 // ms, smooth fade between the last still and the video

function MediaSequenceCarousel({ items = [], activeIndex = 0, onIndexChange }) {
  const [stage, setStage] = useState(STAGE.IMAGE)
  const [imageIndex, setImageIndex] = useState(0)
  const [imageOpacity, setImageOpacity] = useState(1)
  const [videoOpacity, setVideoOpacity] = useState(0)
  const [showVideo, setShowVideo] = useState(false)
  const videoRef = useRef(null)
  const crossfadeTimerRef = useRef(null)

  const current = items[activeIndex]

  const images = current?.media?.images?.length ? current.media.images : [current?.media?.image]
  const hasVideo = Boolean(current?.media?.video)
  const imageDuration = current?.media?.imageDuration || 1400
  const videoDuration = current?.media?.videoDuration || 4000
  const isLastImage = imageIndex >= images.length - 1

  const videoMedia = hasVideo ? cldVideo(current.media.video) : null

  /* A new active capability always restarts its own sequence from the top. */
  useEffect(() => {
    setStage(STAGE.IMAGE)
    setImageIndex(0)
    setImageOpacity(1)
    setVideoOpacity(0)
    setShowVideo(false)
  }, [activeIndex])

  /* Stage: IMAGE - hold the current still, then advance to the next still
     or, once the set is exhausted, move on to crossfade/next capability. */
  useEffect(() => {
    if (!current || stage !== STAGE.IMAGE) return

    const timer = setTimeout(() => {
      if (!isLastImage) {
        setImageIndex((prev) => prev + 1)
      } else if (hasVideo) {
        setStage(STAGE.CROSSFADE)
      } else {
        setStage(STAGE.NEXT)
      }
    }, imageDuration)

    return () => clearTimeout(timer)
  }, [stage, imageIndex, isLastImage, imageDuration, hasVideo, current])

  /* Stage: CROSSFADE - fade from the last still to the video over CROSSFADE_DURATION */
  useEffect(() => {
    if (!current || stage !== STAGE.CROSSFADE) return

    setShowVideo(true)
    crossfadeTimerRef.current = setInterval(() => {
      setImageOpacity((prev) => Math.max(0, prev - 0.05))
      setVideoOpacity((prev) => Math.min(1, prev + 0.05))
    }, CROSSFADE_DURATION / 20)

    const timer = setTimeout(() => {
      clearInterval(crossfadeTimerRef.current)
      setImageOpacity(0)
      setVideoOpacity(1)
      setStage(STAGE.VIDEO)
    }, CROSSFADE_DURATION)

    return () => {
      clearTimeout(timer)
      clearInterval(crossfadeTimerRef.current)
    }
  }, [stage, current])

  /* Stage: VIDEO - play video, then hold last frame for a moment */
  useEffect(() => {
    if (!current || stage !== STAGE.VIDEO || !videoRef.current) return

    const video = videoRef.current
    const onEnded = () => {
      setTimeout(() => setStage(STAGE.NEXT), 400)
    }

    video.addEventListener('ended', onEnded)

    const fallbackTimer = setTimeout(() => {
      setStage(STAGE.NEXT)
    }, videoDuration + 400)

    return () => {
      video.removeEventListener('ended', onEnded)
      clearTimeout(fallbackTimer)
    }
  }, [stage, videoDuration, current])

  /* Stage: NEXT - hand off to the next capability; the activeIndex effect
     above resets stage/imageIndex/opacities once the parent applies it. */
  useEffect(() => {
    if (!current || stage !== STAGE.NEXT) return

    const timer = setTimeout(() => {
      onIndexChange?.((activeIndex + 1) % items.length)
    }, 300)

    return () => clearTimeout(timer)
  }, [stage, activeIndex, items.length, current, onIndexChange])

  if (!current) return null

  const handlePrev = () => {
    onIndexChange?.((activeIndex - 1 + items.length) % items.length)
  }

  const handleNext = () => {
    onIndexChange?.((activeIndex + 1) % items.length)
  }

  return (
    <div className="group relative min-h-[600px] w-full overflow-hidden rounded-[14px] bg-tobler-bg-dark sm:min-h-[700px] lg:min-h-[800px]">
      <AnimatePresence mode="wait">
        {/* IMAGE LAYER — crossfades between the 3 stills, then holds while
            imageOpacity fades it into the video during CROSSFADE. */}
        <motion.div
          key={`image-${activeIndex}-${imageIndex}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: imageOpacity }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="absolute inset-0"
        >
          <ResponsiveImage
            publicId={images[imageIndex]}
            alt={current.title}
            className="h-full w-full object-cover"
            displayWidth={800}
            sizes="(min-width: 1024px) 50vw, 100vw"
          />
        </motion.div>
      </AnimatePresence>

      {/* VIDEO LAYER */}
      {showVideo && videoMedia && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: videoOpacity }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0"
        >
          <video
            ref={videoRef}
            muted
            playsInline
            autoPlay
            poster={videoMedia.poster}
            className="h-full w-full object-cover"
            onCanPlayThrough={() => videoRef.current?.play()}
          >
            {videoMedia.sources.map((s) => (
              <source key={s.type} src={s.src} type={s.type} />
            ))}
          </video>
        </motion.div>
      )}

      {/* Navigation — grouped bottom-right so it reads as one control cluster */}
      <div className="absolute bottom-4 right-4 flex items-center gap-2">
        <button
          onClick={handlePrev}
          className="rounded-full bg-white/20 p-2 text-white transition-all duration-300 hover:bg-white/40 focus:outline-none focus:ring-2 focus:ring-white/60"
          aria-label="Previous capability"
        >
          <ChevronLeft size={20} strokeWidth={2} />
        </button>

        <button
          onClick={handleNext}
          className="rounded-full bg-white/20 p-2 text-white transition-all duration-300 hover:bg-white/40 focus:outline-none focus:ring-2 focus:ring-white/60"
          aria-label="Next capability"
        >
          <ChevronRight size={20} strokeWidth={2} />
        </button>
      </div>
    </div>
  )
}

export default MediaSequenceCarousel
