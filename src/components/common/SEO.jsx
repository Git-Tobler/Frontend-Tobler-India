import { useEffect } from 'react'
import { SITE } from '../../data/site.js'

function setMeta(name, content, attr = 'name') {
  if (!content) return
  let el = document.querySelector(`meta[${attr}="${name}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, name)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

function SEO({ title, description, path = '', structuredData }) {
  useEffect(() => {
    const fullTitle = title ? `${title} | ${SITE.name}` : `${SITE.name} | Swiss Engineered Formwork & Scaffolding`
    document.title = fullTitle

    const desc = description || SITE.description
    setMeta('description', desc)
    setMeta('og:title', fullTitle, 'property')
    setMeta('og:description', desc, 'property')
    setMeta('og:type', 'website', 'property')
    setMeta('og:url', `https://www.toblerindia.com${path}`, 'property')
    setMeta('twitter:card', 'summary_large_image')
    setMeta('twitter:title', fullTitle)
    setMeta('twitter:description', desc)

    let canonical = document.querySelector('link[rel="canonical"]')
    if (!canonical) {
      canonical = document.createElement('link')
      canonical.setAttribute('rel', 'canonical')
      document.head.appendChild(canonical)
    }
    canonical.setAttribute('href', `https://www.toblerindia.com${path}`)
  }, [title, description, path])

  useEffect(() => {
    if (!structuredData || structuredData.length === 0) return undefined

    const nodes = structuredData.map((schema) => {
      const script = document.createElement('script')
      script.type = 'application/ld+json'
      script.text = JSON.stringify(schema)
      document.head.appendChild(script)
      return script
    })

    return () => nodes.forEach((node) => node.remove())
  }, [structuredData])

  return null
}

export default SEO
