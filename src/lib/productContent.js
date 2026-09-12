/* Normalises the product catalog's uneven shapes into what ProductPage renders.

   The catalog grew field by field as copy arrived from Tobler's source
   documents, so the same idea reaches us under several different keys and two
   fields still carry formatting nobody stripped. Everything that has to know
   about that lives here, so the page itself stays declarative. */

// Long-form copy arrived under a product-specific key for three products —
// all three hold the identical [{title, content}] shape.
const DETAIL_KEYS = ['details', 'mato8Details', 'matorDetails', 'matozoDetails']

// Same story for the "why us" paragraphs.
const WHY_KEYS = ['whyTobler', 'whyChooseToblerProps', 'whyToblerCuplock']

export const getDetailBlocks = (product) => DETAIL_KEYS.flatMap((key) => product[key] ?? [])

export const getWhyTobler = (product) => WHY_KEYS.flatMap((key) => product[key] ?? [])

/* `typicalApplications` was pasted out of a PDF with its bullet glyphs baked
   into the strings, and spaced inconsistently ('●Construction…' has no space
   after the glyph). Stripped here rather than in the data, because the data
   gets re-pasted from the same source documents. */
export const cleanList = (items = []) =>
  items
    .map((item) => String(item).replace(/^[\s●•*–-]+/, '').trim())
    .filter(Boolean)

/* `toblerAdvantage` ships in two shapes: one product pipe-joins several
   sentences into a single string, another lists short chip labels. Splitting on
   the pipe lands both on one flat list. */
export const getAdvantageChips = (product) =>
  cleanList((product.toblerAdvantage ?? []).flatMap((item) => String(item).split('|')))

export const getApplications = (product) =>
  cleanList([...(product.applications ?? []), ...(product.typicalApplications ?? [])])

/* `keyUSPs` and `features` are flat sentences, but the USPs are written as
   "Label – explanation". Recovering that split gives the showcase a heading;
   anything without the pattern stays one block of prose. */
function splitTitled(text) {
  const match = text.match(/^(.{3,60}?)\s*[–—:-]\s+(.+)$/s)
  return match ? { title: match[1].trim(), content: match[2].trim() } : { title: null, content: text }
}

/* The showcase is built from a product's long-form copy only — its `details`
   blocks, or failing those its keyUSPs. `features` deliberately does not feed it:
   features already have a tab of their own, and sourcing both from the same
   array printed the same sentences twice on one page.

   Images are positional — media.showcase[i] pairs with block i, and an empty
   slot renders that block as centred prose rather than half an empty row. */
export function getShowcaseBlocks(product) {
  const images = product.media?.showcase ?? []
  const details = getDetailBlocks(product)

  const source = details.length ? details : cleanList(product.keyUSPs ?? []).slice(0, 4).map(splitTitled)

  return source.map((block, index) => ({ ...block, publicId: images[index] }))
}

