// One-off migration: pushes the photography in ../../Tobler Dox straight from
// local disk into Cloudinary.
//
// The original bulk import pulled from OneDrive, which rate-limited Cloudinary
// (TooManyRequestsMeTAException) and left 761 zero-byte error receipts instead
// of assets. Uploading from disk sidesteps the throttling entirely.
//
//   node scripts/upload-media.mjs --clean   remove the old error receipts first
//   node scripts/upload-media.mjs --dry     list what would upload, change nothing
import { readFileSync, readdirSync, statSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { join, extname, basename } from 'node:path'
import { v2 as cloudinary } from 'cloudinary'

const env = Object.fromEntries(
  readFileSync(fileURLToPath(new URL('../.env', import.meta.url)), 'utf8')
    .split('\n')
    .map((l) => l.match(/^\s*([A-Za-z0-9_]+)\s*=\s*(.*?)\s*$/))
    .filter(Boolean)
    .map((m) => [m[1], m[2]])
)

cloudinary.config({
  cloud_name: (env.VITE_CLOUDINARY_CLOUD_NAME || '').trim(),
  api_key: (env.Cloudinary_API_KEY || '').trim(),
  api_secret: (env.Cloudinary_API_SECRET || '').trim(),
})

const SOURCE = fileURLToPath(new URL('../../../Tobler Dox', import.meta.url))

// Source subfolder -> Cloudinary folder. Keeps the library browsable and lets
// media-map.js reference assets by a stable, meaningful path.
const FOLDERS = {
  '': 'tobler/misc',
  'Event & Exhibition': 'tobler/event',
  Site: 'tobler/site',
  Projects: 'tobler/projects',
  'Products and site': 'tobler/products',
}

// Free-plan ceilings. Anything above these is reported and skipped rather than
// failing mid-run.
const MAX_IMAGE = 10 * 1024 * 1024
const MAX_VIDEO = 100 * 1024 * 1024

const IMAGE_EXT = new Set(['.jpg', '.jpeg', '.png', '.webp'])
const VIDEO_EXT = new Set(['.mp4', '.mov', '.avi'])

const dry = process.argv.includes('--dry')
const clean = process.argv.includes('--clean')

function collect(dir, rel = '') {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const abs = join(dir, entry.name)
    if (entry.isDirectory()) return collect(abs, rel ? `${rel}/${entry.name}` : entry.name)
    const ext = extname(entry.name).toLowerCase()
    const kind = IMAGE_EXT.has(ext) ? 'image' : VIDEO_EXT.has(ext) ? 'video' : null
    if (!kind) return []
    return [{ abs, rel, kind, name: basename(entry.name, extname(entry.name)), size: statSync(abs).size }]
  })
}

// Wipes the failed-import receipts. They're raw resources and every one is an
// error page, so the whole raw type goes — batched at 100, the Admin API cap.
async function cleanErrors() {
  let removed = 0
  for (;;) {
    const { resources } = await cloudinary.api.resources({ resource_type: 'raw', max_results: 100 })
    if (!resources.length) break
    const ids = resources.map((r) => r.public_id)
    if (!ids.every((id) => /_Error_/.test(id))) {
      console.error('Refusing to delete: found a raw asset that is not an error receipt.')
      process.exit(1)
    }
    await cloudinary.api.delete_resources(ids, { resource_type: 'raw' })
    removed += ids.length
    process.stdout.write(`\r  deleted ${removed} error receipts`)
  }
  console.log(`\r  deleted ${removed} error receipts        `)
}

// Public IDs land in delivery URLs, so they get slugified — "Swiss Engineer (1)"
// would otherwise need percent-encoding everywhere it's referenced.
const slug = (s) =>
  s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')

async function upload(file) {
  const folder = FOLDERS[file.rel] ?? `tobler/${slug(file.rel)}`
  const opts = {
    folder,
    public_id: slug(file.name),
    resource_type: file.kind,
    unique_filename: false,
    overwrite: false,
  }
  // upload_large chunks the request, which is what keeps multi-megabyte video
  // off a single long-lived connection that a flaky link would drop.
  const fn = file.kind === 'video' ? cloudinary.uploader.upload_large : cloudinary.uploader.upload
  const res = await fn(file.abs, opts)
  return res.public_id
}

const files = collect(SOURCE)
const tooBig = files.filter((f) => f.size > (f.kind === 'video' ? MAX_VIDEO : MAX_IMAGE))
const queue = files.filter((f) => !tooBig.includes(f))

console.log(`found ${files.length} files in Tobler Dox`)
tooBig.forEach((f) => console.log(`  SKIP (over free-plan cap) ${f.rel}/${f.name} — ${(f.size / 1048576).toFixed(0)}MB`))
console.log(`uploading ${queue.length}: ${queue.filter((f) => f.kind === 'image').length} images, ${queue.filter((f) => f.kind === 'video').length} videos`)

if (dry) {
  queue.forEach((f) => console.log(`  ${FOLDERS[f.rel] ?? f.rel}/${f.name} (${f.kind}, ${(f.size / 1048576).toFixed(1)}MB)`))
  process.exit(0)
}

if (clean) {
  console.log('cleaning old error receipts...')
  await cleanErrors()
}

// Four at a time: fast enough to finish ~100 files quickly, gentle enough that
// the free plan's concurrent-upload limit never trips.
let done = 0
const failures = []
const workers = Array.from({ length: 4 }, async () => {
  for (;;) {
    const file = queue.shift()
    if (!file) return
    try {
      await upload(file)
    } catch (err) {
      failures.push(`${file.rel}/${file.name}: ${err.message}`)
    }
    process.stdout.write(`\r  ${++done} uploaded`)
  }
})
await Promise.all(workers)

console.log(`\r  ${done} uploaded          `)
if (failures.length) {
  console.log(`\n${failures.length} failed:`)
  failures.forEach((f) => console.log('  ' + f))
}
