// Regenerates public/sitemap.xml from the site's data files, so the sitemap
// stays correct automatically when a category/subcategory/product/
// project is added — no hand-maintained URL list. Runs as a postbuild step.
import { writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { PRODUCT_FAMILIES } from '../src/data/products/index.js'
import { PROJECTS } from '../src/data/projects.js'

const ORIGIN = 'https://www.tobler-india.com'

const staticPaths = [
  '/',
  '/about',
  '/manufacturing',
  '/products',
  '/projects',
  '/contact',
]

const projectPaths = PROJECTS.map((p) => `/projects/${p.slug}`)

// A subcategory occupies the same URL segment as a product — both are real
// pages on ProductFamilyPage, so both belong in the sitemap.
const productPaths = PRODUCT_FAMILIES.flatMap((family) => [
  `/products/${family.slug}`,
  ...family.subcategories.flatMap((subcategory) => [
    `/products/${family.slug}/${subcategory.slug}`,
    ...subcategory.products.map((product) => `/products/${family.slug}/${product.slug}`),
  ]),
])

const allPaths = [...staticPaths, ...productPaths, ...projectPaths]

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allPaths.map((path) => `  <url>\n    <loc>${ORIGIN}${path}</loc>\n  </url>`).join('\n')}
</urlset>
`

const outPath = fileURLToPath(new URL('../public/sitemap.xml', import.meta.url))
writeFileSync(outPath, xml)
console.log(`sitemap.xml written with ${allPaths.length} URLs`)
