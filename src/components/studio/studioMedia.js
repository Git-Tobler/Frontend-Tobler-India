// The Cloudinary assets the studio layout runs on — the marquee strip, the
// mouse-trail thumbnails and the project showcase all draw from here so the
// page never reaches for stock imagery.

export const MARQUEE_TILES = [
  { id: 'tobler/site/image', alt: 'Reinforced concrete structure under construction' },
  { id: 'tobler/site/screenshot-2025-09-13-at-4-04-28-pm', alt: 'Wide view of the Tobler manufacturing hall' },
  { id: 'tobler/site/image-5', alt: 'Meshed facade of a building under construction' },
  { id: 'tobler/site/screenshot-2025-09-10-at-3-11-04-pm', alt: 'Welding a steel component in production' },
  { id: 'tobler/site/image-6', alt: 'Tower crane over a building under construction' },
  { id: 'tobler/site/screenshot-2025-09-16-at-11-41-07-pm', alt: 'Machined steel components on the workbench' },
  { id: 'tobler/site/site-visit-picture', alt: 'The Tobler team on a site visit' },
  { id: 'tobler/site/screenshot-2025-09-13-at-4-20-24-pm', alt: 'Tobler-branded machinery on the production line' },
]

// The project showcase reads its frames off PROJECTS[].imageId directly.
