// Flat, searchable index of everything on the site — every product, every
// subcategory, every industry, every project, every FAQ, every team member,
// every certification, every downloadable document, every blog post, every
// open role. Built once from the same data modules the pages themselves
// render from, so the search bar can never drift out of sync with the site:
// add a product to data/products/index.js and it's searchable immediately,
// no second list to maintain.
//
// Consumed by components/common/SearchModal.jsx via lib/search.js's scorer.
// See lib/answerCards.js for the small set of "direct answer" facts (phone
// number, certifications, delivery policy…) layered on top of this index.

import { PRODUCT_FAMILIES, familyPath, subcategoryPath, productPath } from './products/index.js'
import { INDUSTRIES } from './industries.js'
import { PROJECTS } from './projects.js'
import { SITE_FAQS, isDraftAnswer } from './faqs.js'
import { LEADERSHIP, CERTIFICATIONS, TIMELINE, VALUES } from './team.js'
import { POSITIONS } from './careers.js'
import { BLOG_POSTS } from './blog.js'
import { DOWNLOAD_CATEGORIES } from './downloads.js'
import { CAPABILITIES, QUALITY_CHECKS, PROCESS_STEPS } from './manufacturing.js'
import { EXHIBITIONS } from './exhibitions.js'

// Only routes that are actually wired up in routes/AppRoutes.jsx — Testimonials
// and NewsMedia are built but their routes are commented out there, so
// linking to them from search would 404.
const STATIC_PAGES = [
  { id: 'home', title: 'Home', path: '/', category: 'Pages', description: 'Swiss-engineered scaffolding and formwork for Indian construction.', weight: 1.5 },
  { id: 'about', title: 'About Us', path: '/about', category: 'Pages', description: "Tobler's story, Swiss engineering heritage and India presence.", weight: 2 },
  { id: 'products', title: 'Products', path: '/products', category: 'Pages', description: 'Browse the full scaffolding and formwork product portfolio.', weight: 2.5 },
  { id: 'manufacturing', title: 'Manufacturing', path: '/manufacturing', category: 'Pages', description: 'Inside the production facility — capability, quality and process.', weight: 2 },
  { id: 'projects', title: 'Projects', path: '/projects', category: 'Pages', description: 'Completed and ongoing projects built with Tobler systems.', weight: 2 },
  { id: 'contact', title: 'Contact', path: '/contact', category: 'Pages', description: 'Get in touch, or request a quote.', weight: 2 },
  { id: 'careers', title: 'Careers', path: '/careers', category: 'Pages', description: 'Open roles at Tobler India.', weight: 1.5 },
  { id: 'faq', title: 'FAQs', path: '/faq', category: 'Pages', description: 'Frequently asked questions.', weight: 1.5 },
  { id: 'download-brochures', title: 'Downloads', path: '/download-brochures', category: 'Pages', description: 'Brochures, technical documents, media and certificates.', weight: 1.5 },
  { id: 'certifications', title: 'Certifications', path: '/certifications', category: 'Pages', description: 'ISO, EN and CE certifications and compliance documents.', weight: 1.5 },
  { id: 'exhibitions', title: 'Exhibitions & Events', path: '/exhibitions', category: 'Pages', description: 'Photos and coverage from industry exhibitions and events.', weight: 1.2 },
  { id: 'blogs', title: 'Blog', path: '/blogs', category: 'Pages', description: 'Articles on scaffolding safety, engineering and industry insight.', weight: 1.2 },
  { id: 'privacy-policy', title: 'Privacy Policy', path: '/privacy-policy', category: 'Pages', description: 'How Tobler handles personal data.', weight: 0.5 },
  { id: 'cookies-policy', title: 'Cookies Policy', path: '/cookies-policy', category: 'Pages', description: 'How Tobler uses cookies.', weight: 0.5 },
  { id: 'terms-conditions', title: 'Terms & Conditions', path: '/terms-conditions', category: 'Pages', description: 'Terms of use for the Tobler website.', weight: 0.5 },
]

const ABOUT_SECTIONS = [
  { id: 'about-our-story', title: 'Our Story', path: '/about#our-story', category: 'About', description: "The history of Tobler.", weight: 1 },
  { id: 'about-swiss-engineering', title: 'Swiss Engineering', path: '/about#swiss-engineering', category: 'About', description: 'Precision, structural performance and practical functionality behind every system.', weight: 1 },
  { id: 'about-india-presence', title: 'India Presence', path: '/about#india-presence', category: 'About', description: 'Local manufacturing and technical support across India.', weight: 1 },
  { id: 'about-philosophy', title: 'Philosophy', path: '/about#philosophy', category: 'About', description: 'Our core beliefs.', weight: 0.8 },
  { id: 'about-values', title: 'Our Values', path: '/about#values', category: 'About', description: VALUES.map((v) => v.title).join(', '), weight: 0.8 },
  { id: 'about-leadership', title: 'Leadership', path: '/about#leadership', category: 'About', description: 'Meet the board and leadership team.', weight: 1 },
  { id: 'about-timeline', title: 'Our Timeline', path: '/about#timeline', category: 'About', description: "Tobler's journey since 1996.", weight: 0.8 },
  { id: 'about-certifications', title: 'Certifications', path: '/about#certifications', category: 'About', description: 'Quality & certifications overview.', weight: 0.8 },
]

const buildProductEntries = () => {
  const entries = []
  PRODUCT_FAMILIES.forEach((family) => {
    entries.push({
      id: `family-${family.slug}`,
      title: family.name,
      subtitle: 'Product Family',
      path: familyPath(family.slug),
      category: 'Products',
      description: family.summary,
      keywords: family.tagline,
      weight: 2.5,
    })

    family.subcategories.forEach((subcategory) => {
      entries.push({
        id: `subcategory-${subcategory.slug}`,
        title: subcategory.name,
        subtitle: family.name,
        path: subcategoryPath(subcategory.slug),
        category: 'Products',
        description: subcategory.summary,
        weight: 2.2,
      })

      ;(subcategory.faqs || []).forEach((faq, i) => {
        entries.push({
          id: `subcategory-faq-${subcategory.slug}-${i}`,
          title: faq.q,
          subtitle: `${subcategory.name} — FAQ`,
          path: subcategoryPath(subcategory.slug),
          category: 'FAQ',
          description: faq.a,
          weight: 1.4,
        })
      })

      subcategory.products.forEach((product) => {
        const keywordParts = [
          product.model,
          ...(product.features || []),
          ...(product.applications || []),
          ...(product.specifications || []).map((s) => `${s.label} ${s.value}`),
          ...(product.certifications || []),
        ]
        entries.push({
          id: `product-${product.slug}`,
          title: product.name,
          subtitle: `${product.model} · ${subcategory.name}`,
          path: productPath(family.slug, product.slug),
          category: 'Products',
          description: product.summary || product.description,
          keywords: keywordParts.join(' '),
          weight: 3,
        })
      })
    })
  })
  return entries
}

const buildIndustryEntries = () =>
  INDUSTRIES.map((industry) => ({
    id: `industry-${industry.slug}`,
    title: industry.name,
    subtitle: 'Industry',
    // No dedicated per-industry route — all industries render as cards in
    // this one section of /products.
    path: '/products#industries',
    category: 'Industries',
    description: industry.summary,
    keywords: [...(industry.challenges || []), ...(industry.solutions || [])].join(' '),
    weight: 1.8,
  }))

const buildProjectEntries = () =>
  PROJECTS.map((project) => ({
    id: `project-${project.slug}`,
    title: project.name,
    subtitle: project.location,
    path: `/projects/${project.slug}`,
    category: 'Projects',
    description: project.summary,
    keywords: [project.industry, ...(project.products || []), project.description].join(' '),
    weight: 2,
  }))

const buildFaqEntries = () =>
  SITE_FAQS.filter((faq) => !isDraftAnswer(faq.answer)).map((faq) => ({
    id: `faq-${faq.id}`,
    title: faq.question,
    subtitle: faq.category,
    path: `/faq?q=${encodeURIComponent(faq.question)}`,
    category: 'FAQ',
    description: faq.answer,
    weight: 1.6,
  }))

const buildTeamEntries = () =>
  LEADERSHIP.map((person, i) => ({
    id: `team-${i}`,
    title: person.name,
    subtitle: person.role,
    path: '/about#leadership',
    category: 'Team',
    description: person.role,
    keywords: person.bio,
    weight: 1.6,
  }))

const buildCertificationEntries = () =>
  CERTIFICATIONS.map((cert) => ({
    id: `certification-${cert.name}`,
    title: cert.name,
    subtitle: 'Certification',
    path: '/certifications',
    category: 'Certifications',
    description: cert.description,
    weight: 1.6,
  }))

const buildManufacturingEntries = () => [
  ...CAPABILITIES.map((cap) => ({
    id: `capability-${cap.id}`,
    title: cap.title,
    subtitle: 'Manufacturing Capability',
    path: '/manufacturing#facility',
    category: 'Manufacturing',
    description: cap.description,
    weight: 1.3,
  })),
  ...QUALITY_CHECKS.map((qc, i) => ({
    id: `quality-${i}`,
    title: qc.stage,
    subtitle: 'Quality Control',
    path: '/manufacturing#quality',
    category: 'Manufacturing',
    description: qc.detail,
    weight: 1.1,
  })),
  ...PROCESS_STEPS.map((step, i) => ({
    id: `process-${i}`,
    title: step.step,
    subtitle: 'Manufacturing Process',
    path: '/manufacturing#process',
    category: 'Manufacturing',
    description: step.description,
    weight: 1.1,
  })),
]

const buildDownloadEntries = () =>
  DOWNLOAD_CATEGORIES.flatMap((category) =>
    category.items
      .filter((item) => !item.name.includes('['))
      .map((item) => ({
        id: `download-${category.id}-${item.id}`,
        title: item.name,
        subtitle: category.title,
        path: '/download-brochures',
        category: 'Downloads',
        description: item.description,
        weight: 1.3,
      }))
  )

const buildBlogEntries = () =>
  BLOG_POSTS.filter((post) => !post.title.includes('[')).map((post) => ({
    id: `blog-${post.id}`,
    title: post.title,
    subtitle: post.category,
    path: '/blogs',
    category: 'Blog',
    description: post.excerpt.replace('[Content to be added] - ', ''),
    keywords: (post.tags || []).join(' '),
    weight: 1,
  }))

const buildCareerEntries = () =>
  POSITIONS.map((position) => ({
    id: `career-${position.id}`,
    title: position.title,
    subtitle: `${position.department} · ${position.location}`,
    path: '/careers',
    category: 'Careers',
    description: position.description,
    keywords: (position.requirements || []).join(' '),
    weight: 1.6,
  }))

const buildTimelineEntries = () =>
  TIMELINE.map((t) => ({
    id: `timeline-${t.year}`,
    title: `${t.title} (${t.year})`,
    subtitle: 'Timeline',
    path: '/about#timeline',
    category: 'About',
    description: t.description,
    weight: 0.9,
  }))

// Built once at module load — this file has no React import, so pulling it
// into the search modal (or anywhere else) never drags a page bundle along.
export const SEARCH_ENTRIES = [
  ...STATIC_PAGES,
  ...ABOUT_SECTIONS,
  ...buildProductEntries(),
  ...buildIndustryEntries(),
  ...buildProjectEntries(),
  ...buildFaqEntries(),
  ...buildTeamEntries(),
  ...buildCertificationEntries(),
  ...buildManufacturingEntries(),
  ...buildDownloadEntries(),
  ...buildBlogEntries(),
  ...buildCareerEntries(),
  ...buildTimelineEntries(),
]

// A handful of data-driven starting points shown in the search modal's
// empty state, so "everything about the site" is discoverable even before
// someone knows what to type.
export const SUGGESTED_SEARCHES = [
  'MATO 8 Scaffolding',
  'Monolithic Formwork',
  'Certifications',
  'Careers',
  'Request a Quote',
  'Manufacturing Facility',
]

export const EXHIBITIONS_COUNT = EXHIBITIONS.length
