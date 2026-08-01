import { Routes, Route, Navigate } from 'react-router-dom'

import Home from '../pages/Home/Home.jsx'

import About from '../pages/About/About.jsx'

import Industries from '../pages/Industries/Industries.jsx'
import IndustryDetail from '../pages/Industries/IndustryDetail.jsx'

import Products from '../pages/Products/Products.jsx'
import ProductDetail from '../pages/Products/ProductDetail.jsx'

import Projects from '../pages/Projects/Projects.jsx'
import ProjectDetail from '../pages/Projects/ProjectDetail.jsx'

import Contact from '../pages/Contact/Contact.jsx'
import NotFound from '../pages/NotFound/NotFound.jsx'

/* Every /about/* sub-page used to be its own thin route (hero + one content
   block + repeated CTA). They're now sections on the single /about page —
   these redirects keep old links and bookmarks landing in the right place. */
const ABOUT_REDIRECTS = [
  'our-story',
  'swiss-engineering',
  'india-presence',
  'philosophy',
  'values',
  'leadership',
  'timeline',
  'certifications',
]

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />

      <Route path="/about" element={<About />} />
      {ABOUT_REDIRECTS.map((slug) => (
        <Route key={slug} path={`/about/${slug}`} element={<Navigate to={`/about#${slug}`} replace />} />
      ))}

      <Route path="/industries" element={<Industries />} />
      <Route path="/industries/:slug" element={<IndustryDetail />} />

      <Route path="/products" element={<Products />} />
      <Route path="/products/:slug" element={<ProductDetail />} />

      <Route path="/projects" element={<Projects />} />
      <Route path="/projects/:slug" element={<ProjectDetail />} />

      <Route path="/contact" element={<Contact />} />

      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default AppRoutes
