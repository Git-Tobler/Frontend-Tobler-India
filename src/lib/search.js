// Site search engine — fuzzy, synonym-aware ranking over a flat list of
// entries. No external dependency: the catalog is a few hundred rows, well
// within range for a hand-rolled scorer, and it keeps the search bar free of
// any network call or API key. See data/searchIndex.js for what gets indexed
// and lib/answerCards.js for the "direct answer" layer built on top of this.

const normalize = (str = '') =>
  str
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[̀-ͯ]/g, '') // strip accents (combining marks left behind by NFKD)
    .replace(/[^\w\s]/g, ' ') // punctuation → space so "mato-8" and "mato 8" tokenize the same
    .replace(/\s+/g, ' ')
    .trim()

const tokenize = (str) => (str ? normalize(str).split(' ').filter(Boolean) : [])

// Indian-construction-market synonyms and shorthand. Keys and values both
// point at each other implicitly — expandTokens looks the token up and adds
// whatever it maps to, so "staging" pulls in "scaffolding" results and vice
// versa isn't needed because "scaffolding" already appears in that content.
const SYNONYMS = {
  staging: ['scaffolding'],
  shuttering: ['formwork'],
  centering: ['formwork'],
  centring: ['formwork'],
  shutter: ['formwork'],
  prop: ['props', 'shoring', 'support'],
  props: ['prop', 'shoring', 'support'],
  shoring: ['prop', 'props'],
  cuplok: ['cuplock'],
  ringlock: ['ring', 'lock', 'rosette', 'mato8', 'mato'],
  mato8: ['mato', '8', 'ringlock', 'rosette'],
  rosette: ['ringlock', 'mato8'],
  scaffold: ['scaffolding'],
  alu: ['aluminium', 'aluminum'],
  aluminum: ['aluminium'],
  aluminium: ['aluminum'],
  quote: ['rfq', 'quotation', 'price', 'cost', 'enquiry', 'inquiry', 'estimate'],
  quotation: ['rfq', 'quote', 'price'],
  price: ['quote', 'cost', 'pricing', 'rfq'],
  pricing: ['quote', 'cost', 'price'],
  job: ['career', 'careers', 'vacancy', 'position', 'hiring', 'openings'],
  jobs: ['career', 'careers', 'vacancy', 'hiring'],
  vacancy: ['career', 'job', 'opening'],
  hiring: ['careers', 'jobs'],
  warranty: ['guarantee'],
  certificate: ['certification', 'certifications', 'compliance'],
  certificates: ['certification', 'certifications'],
  iso: ['certification', 'certifications', 'compliance', 'standard'],
  brochure: ['catalogue', 'catalog', 'download', 'pdf'],
  catalogue: ['brochure', 'catalog'],
  catalog: ['brochure', 'catalogue'],
  contact: ['phone', 'email', 'address', 'reach'],
  phone: ['call', 'mobile', 'number', 'contact'],
  call: ['phone', 'contact'],
  delivery: ['shipping', 'dispatch', 'logistics', 'ship'],
  shipping: ['delivery', 'dispatch'],
  climbing: ['screen', 'protection'],
  tower: ['rolling', 'mobile'],
  factory: ['manufacturing', 'plant', 'facility'],
  plant: ['factory', 'manufacturing', 'facility'],
  hq: ['headquarters', 'address', 'office'],
  headquarters: ['office', 'address', 'hq'],
  blog: ['blogs', 'article', 'articles', 'insight'],
  faq: ['faqs', 'question', 'questions'],
}

const expandTokens = (tokens) => {
  const expanded = new Set(tokens)
  tokens.forEach((t) => {
    (SYNONYMS[t] || []).forEach((s) => expanded.add(s))
  })
  return [...expanded]
}

// Iterative Levenshtein — used only for short single-word typo tolerance
// ("scafolding" → "scaffolding"), never on the full query.
function levenshtein(a, b) {
  if (a === b) return 0
  if (!a.length) return b.length
  if (!b.length) return a.length
  let prev = Array.from({ length: b.length + 1 }, (_, i) => i)
  for (let i = 1; i <= a.length; i++) {
    const row = [i]
    for (let j = 1; j <= b.length; j++) {
      row[j] =
        a[i - 1] === b[j - 1]
          ? prev[j - 1]
          : 1 + Math.min(prev[j - 1], prev[j], row[j - 1])
    }
    prev = row
  }
  return prev[b.length]
}

// Typo budget scales with word length so "a" doesn't fuzzy-match everything.
const typoBudget = (len) => (len >= 8 ? 2 : len >= 4 ? 1 : 0)

const fieldHaystack = (entry) =>
  normalize([entry.title, entry.subtitle, entry.description, entry.keywords, entry.category].filter(Boolean).join(' '))

const titleHaystack = (entry) => normalize(entry.title)

/**
 * Score one entry against a query. Returns 0 for "no match" so callers can
 * filter with `.filter(Boolean)`-style truthiness on the score.
 */
function scoreEntry(entry, queryNorm, queryTokens, expandedTokens) {
  const title = titleHaystack(entry)
  const haystack = fieldHaystack(entry)
  const haystackWords = haystack.split(' ')
  let score = 0

  if (queryNorm.length >= 2) {
    if (title === queryNorm) score += 200
    else if (title.startsWith(queryNorm)) score += 120
    else if (title.includes(queryNorm)) score += 90
    else if (haystack.includes(queryNorm)) score += 35
  }

  let matchedQueryTokens = 0
  queryTokens.forEach((qt) => {
    if (qt.length < 2) return
    let tokenMatched = false
    if (new RegExp(`\\b${qt}`).test(title)) {
      score += 22
      tokenMatched = true
    } else if (title.includes(qt)) {
      score += 12
      tokenMatched = true
    } else if (haystack.includes(qt)) {
      score += 6
      tokenMatched = true
    }
    if (tokenMatched) matchedQueryTokens += 1
  })

  // Synonym-expanded tokens (the ones added on top of the literal query)
  // score lower than a direct hit — they widen recall without letting a
  // loosely-related synonym outrank an exact match.
  expandedTokens
    .filter((t) => !queryTokens.includes(t))
    .forEach((et) => {
      if (et.length < 3) return
      if (title.includes(et)) score += 8
      else if (haystack.includes(et)) score += 3
    })

  // Typo tolerance: only bother once a token has otherwise scored nothing,
  // and only for tokens long enough that a near-miss means something.
  if (matchedQueryTokens < queryTokens.length) {
    queryTokens.forEach((qt) => {
      if (qt.length < 4) return
      const budget = typoBudget(qt.length)
      const isCloseToHaystackWord = haystackWords.some(
        (w) => Math.abs(w.length - qt.length) <= budget && levenshtein(qt, w) <= budget
      )
      if (isCloseToHaystackWord) score += 9
    })
  }

  return Math.round(score * (entry.weight ?? 1))
}

/**
 * Rank `entries` against `query`. Returns entries with a `score` field,
 * highest first, filtered to score > 0.
 */
export function searchEntries(entries, query, { limit = 40 } = {}) {
  const queryNorm = normalize(query)
  if (!queryNorm) return []
  const queryTokens = tokenize(query)
  const expandedTokens = expandTokens(queryTokens)

  return entries
    .map((entry) => ({ entry, score: scoreEntry(entry, queryNorm, queryTokens, expandedTokens) }))
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score || (b.entry.weight ?? 1) - (a.entry.weight ?? 1) || a.entry.title.localeCompare(b.entry.title))
    .slice(0, limit)
    .map(({ entry, score }) => ({ ...entry, score }))
}

/**
 * Match "answer card" definitions against a query. A card matches if any of
 * its trigger phrases appears in the (normalized) query, or the query
 * appears inside a trigger phrase for short, specific queries like "moq".
 * Returns cards sorted by how specific the match was, most specific first.
 */
export function matchAnswerCards(cards, query) {
  const queryNorm = normalize(query)
  if (queryNorm.length < 2) return []

  const hits = []
  cards.forEach((card) => {
    let best = 0
    card.triggers.forEach((trigger) => {
      const t = normalize(trigger)
      if (!t) return
      if (queryNorm.includes(t)) best = Math.max(best, t.length)
      else if (t.includes(queryNorm) && queryNorm.length >= 3) best = Math.max(best, queryNorm.length)
    })
    if (best > 0) hits.push({ card, best })
  })

  return hits.sort((a, b) => b.best - a.best).map((h) => h.card)
}

export { normalize, tokenize }
