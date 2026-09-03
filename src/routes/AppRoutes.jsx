import { createBrowserRouter, Navigate } from 'react-router-dom'
import App from '../App.jsx'
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

// Data-router code splitting: the module resolves to a route's `Component`
// on demand instead of wrapping every page in its own Suspense boundary.
const lazyPage = (importer) => ({
  lazy: () => importer().then((module) => ({ Component: module.default })),
})

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <NotFound />,
    children: [
      { index: true, ...lazyPage(() => import('../pages/Home/Home.jsx')) },

      { path: 'about', ...lazyPage(() => import('../pages/About/About.jsx')) },
      ...ABOUT_REDIRECTS.map((slug) => ({
        path: `about/${slug}`,
        element: <Navigate to={`/about#${slug}`} replace />,
      })),

      { path: 'manufacturing', ...lazyPage(() => import('../pages/Manufacturing/Manufacturing.jsx')) },

      { path: 'products', ...lazyPage(() => import('../pages/Products/ProductsPage.jsx')) },
      { path: 'products/:family', ...lazyPage(() => import('../pages/Products/ProductFamilyPage.jsx')) },
      {
        path: 'products/:family/:product',
        ...lazyPage(() => import('../pages/Products/ProductFamilyPage.jsx')),
      },

      { path: 'projects', ...lazyPage(() => import('../pages/Projects/Projects.jsx')) },
      // Same component as /projects — the slug opens a drawer over the grid.
      { path: 'projects/:slug', ...lazyPage(() => import('../pages/Projects/Projects.jsx')) },

      { path: 'contact', ...lazyPage(() => import('../pages/Contact/Contact.jsx')) },

      { path: 'careers', ...lazyPage(() => import('../pages/Careers/Careers.jsx')) },

      /* Footer Pages */
      { path: 'privacy-policy', ...lazyPage(() => import('../pages/PrivacyPolicy/PrivacyPolicy.jsx')) },
      { path: 'cookies-policy', ...lazyPage(() => import('../pages/CookiesPolicy/CookiesPolicy.jsx')) },
      { path: 'cookie-preferences', ...lazyPage(() => import('../pages/CookiesPolicy/CookiePreferencesPage.jsx')) },
      { path: 'terms-conditions', ...lazyPage(() => import('../pages/TermsConditions/TermsConditions.jsx')) },
      { path: 'faq', ...lazyPage(() => import('../pages/FAQ/FAQ.jsx')) },
      { path: 'testimonials', ...lazyPage(() => import('../pages/Testimonials/Testimonials.jsx')) },
      { path: 'news-media', ...lazyPage(() => import('../pages/NewsMedia/NewsMedia.jsx')) },
      { path: 'download-brochures', ...lazyPage(() => import('../pages/Downloads/Downloads.jsx')) },
      { path: 'certifications', ...lazyPage(() => import('../pages/Certifications/Certifications.jsx')) },
      { path: 'exhibitions', ...lazyPage(() => import('../pages/Exhibitions/Exhibitions.jsx')) },
      { path: 'blogs', ...lazyPage(() => import('../pages/Blogs/Blogs.jsx')) },

      { path: '*', element: <NotFound /> },
    ],
  },
])

export default router
