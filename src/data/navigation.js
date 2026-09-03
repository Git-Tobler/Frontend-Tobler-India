export const NAV_LINKS = [
  { label: 'Home', path: '/' },
  {
    label: 'About',
    path: '/about',
    children: [
      { label: 'Who We Are', path: '/about' },
      { label: 'Our Story', path: '/about#our-story' },
      { label: 'Swiss Engineering', path: '/about#swiss-engineering' },
      { label: 'India Presence', path: '/about#india-presence' },
      { label: 'Philosophy', path: '/about#philosophy' },
      { label: 'Values', path: '/about#values' },
      { label: 'Leadership', path: '/about#leadership' },
      { label: 'Timeline', path: '/about#timeline' },
      { label: 'Quality & Certifications', path: '/about#certifications' },
    ],
  },
  {
    label: 'Solutions',
    path: '/products',
    children: [
      { label: 'All Products', path: '/products' },
      { label: 'Scaffolding Systems', path: '/products/scaffolding-systems' },
      { label: 'Formwork Systems', path: '/products/formwork-systems' },
    ],
  },
  {
    label: 'Manufacturing',
    path: '/manufacturing',
    children: [
      { label: 'Overview', path: '/manufacturing' },
      { label: 'Our Story', path: '/manufacturing#story' },
      { label: 'Swiss + Indian', path: '/manufacturing#swiss-india' },
      { label: 'Production Facility', path: '/manufacturing#facility' },
      { label: 'Quality Control', path: '/manufacturing#quality' },
      { label: 'Certifications', path: '/manufacturing#certifications' },
      { label: 'Process', path: '/manufacturing#process' },
      { label: 'Factory Gallery', path: '/manufacturing#gallery' },
    ],
  },
  { label: 'Projects', path: '/projects' },
  {
    label: 'Contact',
    path: '/contact',
    children: [
      { label: 'General Enquiry', path: '/contact' },
      { label: 'Careers', path: '/careers' },
      { label: 'News & Media', path: '/news-media' },
    ],
  },
]

export const FOOTER_LINKS = {
  company: [
    { label: 'About Us', path: '/about' },
    { label: 'Our Story', path: '/about#our-story' },
    { label: 'Leadership', path: '/about#leadership' },
  ],
  solutions: [
    { label: 'Products', path: '/products' },
    { label: 'Projects', path: '/projects' },
    { label: 'Request a Quote', path: '/contact#rfq' },
  ],
  resources: [
    { label: 'Certifications', path: '/certifications' },
    { label: 'Events & Exhibitions', path: '/exhibitions' },
    { label: 'News & Media', path: '/news-media' },
    { label: 'Download Brochures', path: '/download-brochures' },
    { label: 'Testimonials', path: '/testimonials' },
    { label: 'FAQ', path: '/faq' },
    { label: 'Careers', path: '/careers' },
    { label: 'Privacy Policy', path: '/privacy-policy' },
    { label: 'Terms & Conditions', path: '/terms-conditions' },
  ],
}
