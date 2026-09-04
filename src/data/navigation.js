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
      { label: 'Leadership', path: '/about#leadership' },
      { label: 'Certifications', path: '/certifications' },
    ],
  },
  {
    label: 'Solutions',
    path: '/products',
    children: [
      { label: 'All Products', path: '/products' },
      { label: 'Scaffolding Systems', path: '/products/scaffolding-systems' },
      { label: 'Formwork Systems', path: '/products/formwork-systems' },
      { label: 'Download Brochures', path: '/download-brochures' },
      { label: 'FAQ', path: '/faq' },
    ],
  },
  {
    label: 'Manufacturing',
    path: '/manufacturing',
    children: [
      { label: 'Overview', path: '/manufacturing' },
      { label: 'Production Facility', path: '/manufacturing#facility' },
      { label: 'Quality Control', path: '/manufacturing#quality' },
      { label: 'Factory Gallery', path: '/manufacturing#gallery' },
      { label: 'Certifications', path: '/certifications' },
    ],
  },
  { label: 'Projects', path: '/projects' },
  {
    label: 'Contact',
    path: '/contact',
    children: [
      { label: 'General Enquiry', path: '/contact' },
      { label: 'Careers', path: '/careers' },
      { label: 'Privacy Policy', path: '/privacy-policy' },
      { label: 'Terms & Conditions', path: '/terms-conditions' },
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
    { label: 'Download Brochures', path: '/download-brochures' },
    { label: 'FAQ', path: '/faq' },
    { label: 'Careers', path: '/careers' },
    { label: 'Privacy Policy', path: '/privacy-policy' },
    { label: 'Terms & Conditions', path: '/terms-conditions' },
  ],
}
