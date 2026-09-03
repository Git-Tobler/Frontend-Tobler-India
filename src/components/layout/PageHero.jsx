import Container from '../common/Container.jsx'
import Breadcrumb from '../common/Breadcrumb.jsx'
import CornerMarks from '../ui/CornerMarks.jsx'
import VideoPanel from '../ui/VideoPanel.jsx'
import { cldImage } from '../../lib/cloudinary.js'

/* Banner crop, 2.63:1. Built here rather than through cldSrcSet because that
   helper varies width only — at a fixed `h` the narrow rungs would come back
   as portrait crops of the same photo. */
const HERO_RATIO = 0.38
const HERO_WIDTHS = [640, 1024, 1440, 2000]
const heroSrc = (id, w) => cldImage(id, { w, h: Math.round(w * HERO_RATIO) })

/* The banner every inner page opens with.

   Media is optional but expected: without `imageId`/`videoId` the hero falls
   back to the flat blueprint panel, which is what most of the site shipped
   with and why so many pages read as an empty blue slab. With media it becomes
   a photograph (or a clip) under a navy scrim.

   The scrim is the part that matters. An earlier version dropped the photo in
   bare and flipped the type to navy so it stayed legible on a bright shot,
   which meant every hero photo had to have a calm, pale top-left corner or the
   heading disappeared into it. Scrimming instead keeps white type on every
   photo — the same treatment IndustryCard and ProductFamilyCard already use —
   so any frame in the library can sit here.

   `subtitle` is accepted as an alias for `description`: several pages were
   already passing it, and it was being silently dropped. */
function PageHero({
  title,
  description,
  subtitle,
  eyebrow,
  breadcrumbItems = [],
  imageId,
  videoId,
  priority = true,
}) {
  const photo = imageId ? heroSrc(imageId, 2000) : null
  const media = Boolean(photo || videoId)
  const copy = description || subtitle

  return (
    <section
      className={`relative overflow-hidden bg-blueprint text-tobler-yellow ${
        media ? 'pt-32 pb-20 md:pt-44 md:pb-28' : 'pt-28 pb-16 md:pt-36 md:pb-20'
      }`}
    >
      {videoId ? (
        <VideoPanel publicId={videoId} fill marks={false} width={1800} priority={priority} />
      ) : (
        photo && (
          <img
            src={photo}
            srcSet={HERO_WIDTHS.map((w) => `${heroSrc(imageId, w)} ${w}w`).join(', ')}
            sizes="100vw"
            alt=""
            aria-hidden="true"
            className="absolute inset-0 h-full w-full object-cover"
            loading={priority ? 'eager' : 'lazy'}
            {...{ fetchpriority: priority ? 'high' : undefined }}
          />
        )
      )}

      {/* Dark overlay scrim for better text readability */}
      {media && <div className="absolute inset-0 bg-black/40" />}

      <CornerMarks always className="hidden md:block text-white/25" />

      <Container className="relative">
        <div className="mb-8">
          <Breadcrumb items={breadcrumbItems} light />
        </div>

        {eyebrow && <p className="label-mono mb-4 text-tobler-gold">{eyebrow}</p>}

        <h1 className="text-h1 max-w-3xl text-white">{title}</h1>

        {copy && (
          <p className="text-lg max-w-2xl mt-6 leading-relaxed normal-case font-sans text-white/75">
            {copy}
          </p>
        )}
      </Container>
    </section>
  )
}

export default PageHero
