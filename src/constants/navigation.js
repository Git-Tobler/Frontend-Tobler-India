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
    label: 'Industries',
    path: '/industries',
    children: [
      { label: 'All Industries', path: '/industries' },
      { label: 'High-Rise Buildings', path: '/industries/high-rise-buildings' },
      { label: 'Commercial Construction', path: '/industries/commercial-construction' },
      { label: 'Residential Construction', path: '/industries/residential-construction' },
      { label: 'Infrastructure', path: '/industries/infrastructure' },
      { label: 'Industrial Facilities', path: '/industries/industrial-facilities' },
    ],
  },
  {
    label: 'Products',
    path: '/products',
    children: [
      { label: 'All Products', path: '/products' },
      { label: 'Facade Scaffolding', path: '/products/facade-scaffolding' },
      { label: 'Shoring Systems', path: '/products/shoring-systems' },
      { label: 'Slab Formwork', path: '/products/slab-formwork' },
      { label: 'Wall Formwork', path: '/products/wall-formwork' },
      { label: 'Climbing Systems', path: '/products/climbing-systems' },
      { label: 'Staircase Access', path: '/products/staircase-access' },
    ],
  },
  { label: 'Projects', path: '/projects' },
  { label: 'Contact', path: '/contact' },
]

export const FOOTER_LINKS = {
  company: [
    { label: 'About Us', path: '/about' },
    { label: 'Our Story', path: '/about#our-story' },
    { label: 'Leadership', path: '/about#leadership' },
    { label: 'Careers', path: '/contact#careers' },
  ],
  solutions: [
    { label: 'Industries', path: '/industries' },
    { label: 'Products', path: '/products' },
    { label: 'Projects', path: '/projects' },
    { label: 'Request a Quote', path: '/contact#rfq' },
  ],
  resources: [
    { label: 'Certifications', path: '/about#certifications' },
    { label: 'Timeline', path: '/about#timeline' },
    { label: 'Contact', path: '/contact' },
  ],
}
