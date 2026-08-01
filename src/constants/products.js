export const PRODUCT_CATEGORIES = [
  {
    slug: 'facade-scaffolding',
    image: '/images/products/facade-scaffolding.jpg',
    name: 'Facade Scaffolding',
    summary:
      'Modular tube-and-coupler and frame scaffolding systems engineered for fast assembly and long-term reliability on building facades.',
    specifications: [
      { label: 'Material', value: 'Galvanized Steel / Aluminium' },
      { label: 'Standard Bay Width', value: '1.09m / 1.57m / 2.07m' },
      { label: 'Working Load', value: 'Up to 4.5 kN/m²' },
      { label: 'Compliance', value: 'EN 12810 / EN 12811' },
    ],
    downloads: ['Facade Scaffolding Brochure', 'Technical Datasheet', 'Load Chart'],
  },
  {
    slug: 'shoring-systems',
    image: '/images/products/shoring-systems.jpg',
    name: 'Shoring Systems',
    summary:
      'Heavy-duty modular shoring towers designed for slab, beam and bridge deck support across variable heights and loads.',
    specifications: [
      { label: 'Material', value: 'High-Grade Steel' },
      { label: 'Max Height', value: 'Up to 30m (with extensions)' },
      { label: 'Load Capacity', value: 'Up to 100 kN per leg' },
      { label: 'Compliance', value: 'EN 12812' },
    ],
    downloads: ['Shoring Systems Brochure', 'Load Calculation Guide'],
  },
  {
    slug: 'slab-formwork',
    image: '/images/products/slab-formwork.jpg',
    name: 'Slab Formwork',
    summary:
      'Table, beam and panel-based slab formwork systems built for fast cycle times on large and repetitive floor plates.',
    specifications: [
      { label: 'Material', value: 'Steel Frame / Aluminium Panel' },
      { label: 'Panel Sizes', value: 'Modular, project-specific' },
      { label: 'Concrete Finish', value: 'Fair-faced, class A' },
      { label: 'Cycle Time', value: 'Optimized for 3–5 day floor cycles' },
    ],
    downloads: ['Slab Formwork Brochure', 'Cycle Planning Guide'],
  },
  {
    slug: 'wall-formwork',
    image: '/images/products/wall-formwork.jpg',
    name: 'Wall Formwork',
    summary:
      'Lightweight, high-precision wall formwork panels for shear walls, core walls and repetitive vertical elements.',
    specifications: [
      { label: 'Material', value: 'Aluminium / Steel Frame' },
      { label: 'Panel Height', value: 'Up to 3.6m' },
      { label: 'Pour Pressure', value: 'Up to 60 kN/m²' },
      { label: 'Finish', value: 'Fair-faced architectural concrete' },
    ],
    downloads: ['Wall Formwork Brochure', 'Technical Datasheet'],
  },
  {
    slug: 'climbing-systems',
    image: '/images/products/climbing-systems.jpg',
    name: 'Climbing Systems',
    summary:
      'Self-climbing and crane-climbed formwork systems engineered for high-rise cores, shear walls and bridge pylons.',
    specifications: [
      { label: 'Climb Type', value: 'Self-Climbing / Crane-Climbed' },
      { label: 'Max Building Height', value: 'Unlimited (cyclic system)' },
      { label: 'Safety Features', value: 'Integrated screens, guardrails' },
      { label: 'Compliance', value: 'EN 12812 / EN 12811' },
    ],
    downloads: ['Climbing Systems Brochure', 'Safety Certification'],
  },
  {
    slug: 'staircase-access',
    image: '/images/products/staircase-access.jpg',
    name: 'Staircase Access',
    summary:
      'Modular staircase towers and access systems for safe vertical movement across scaffolding and shoring installations.',
    specifications: [
      { label: 'Material', value: 'Galvanized Steel' },
      { label: 'Stair Angle', value: '32–45 degrees' },
      { label: 'Load Rating', value: 'Up to 2.5 kN/m²' },
      { label: 'Compliance', value: 'EN 12811-3' },
    ],
    downloads: ['Staircase Access Brochure'],
  },
]

export const getProductBySlug = (slug) => PRODUCT_CATEGORIES.find((p) => p.slug === slug)
