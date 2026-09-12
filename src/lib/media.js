/* One media block per product and per project, so a Cloudinary key is pasted in
   exactly one place and every picture of that item follows.

     media: {
       main:     'Mato_8_lmdhnw',        // the frame used for cards, tiles and the gallery lead
       gallery:  [MEDIA.ringlock, ...],  // extra stills, shown after the main one
       video:    MEDIA.weldingRobotVideo,// one clip, or an array of them
       showcase: [...],                  // products only - one per feature block, in order
       inUse:    MEDIA.towerAerial,      // the wide full-bleed band
     }

   Every value is a Cloudinary public id. `MEDIA.foo` from media-map.js is just a
   named shortcut for one of those ids, so both forms work and can be mixed —
   use MEDIA for a frame that appears on several pages, and paste the raw id for
   a one-off. Any slot may be left out; the sections that use it hide themselves. */

const asArray = (value) => (Array.isArray(value) ? value : value ? [value] : [])

/* The single frame representing an item wherever it appears as a card or tile. */
export const mainImage = (item) => item?.media?.main

/* The clip behind the wide band, when the item has one. */
export const bandVideo = (item) => asArray(item?.media?.video)[0]

/* Every frame and clip the item has, deduped and tagged, in display order —
   what the gallery and its full-screen viewer run on. */
export function mediaItems(item, label) {
  const media = item?.media ?? {}
  const seen = new Set()
  const items = []

  const push = (type, publicId, itemLabel) => {
    if (!publicId || seen.has(publicId)) return
    seen.add(publicId)
    items.push({ type, publicId, label: itemLabel })
  }

  /* Video leads the gallery if present, so it's the first frame the viewer sees. */
  asArray(media.video).forEach((id) => push('video', id, media.videoLabel || label))
  push('image', media.main, label)
  asArray(media.gallery).forEach((id) => push('image', id, label))
  asArray(media.showcase).forEach((id) => push('image', id, label))

  return items
}
