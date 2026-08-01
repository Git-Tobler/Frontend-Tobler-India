export const PROJECTS = [
  {
    slug: 'metro-viaduct-chandigarh',
    image: '/images/projects/metro-viaduct-chandigarh.jpg',
    name: 'Metro Viaduct — Chandigarh Corridor',
    location: 'Chandigarh, India',
    industry: 'Infrastructure',
    year: '2024',
    summary:
      'Heavy-duty shoring and pier formwork deployed across a 12km elevated metro corridor with strict tolerance requirements.',
    products: ['Shoring Systems', 'Climbing Systems'],
  },
  {
    slug: 'skyline-towers-gurugram',
    image: '/images/projects/skyline-towers-gurugram.jpg',
    name: 'Skyline Towers',
    location: 'Gurugram, India',
    industry: 'High-Rise Buildings',
    year: '2023',
    summary:
      'Self-climbing core formwork enabled a consistent 4-day floor cycle across twin 52-storey residential towers.',
    products: ['Climbing Systems', 'Wall Formwork'],
  },
  {
    slug: 'industrial-park-pune',
    image: '/images/projects/industrial-park-pune.jpg',
    name: 'Industrial Manufacturing Park',
    location: 'Pune, India',
    industry: 'Industrial Facilities',
    year: '2023',
    summary:
      'Multidirectional access scaffolding supported a fast-tracked build of five interconnected manufacturing sheds.',
    products: ['Facade Scaffolding', 'Shoring Systems'],
  },
  {
    slug: 'riverside-mall-ahmedabad',
    image: '/images/projects/riverside-mall-ahmedabad.jpg',
    name: 'Riverside Commercial Mall',
    location: 'Ahmedabad, India',
    industry: 'Commercial Construction',
    year: '2022',
    summary:
      'Long-span table formwork delivered column-free retail floors with an accelerated 30-day slab programme.',
    products: ['Slab Formwork', 'Shoring Systems'],
  },
  {
    slug: 'greenfield-homes-lucknow',
    image: '/images/projects/greenfield-homes-lucknow.jpg',
    name: 'Greenfield Homes Township',
    location: 'Lucknow, India',
    industry: 'Residential Construction',
    year: '2022',
    summary:
      'Standardized aluminium wall formwork enabled repetitive, cost-efficient construction across 900 housing units.',
    products: ['Wall Formwork'],
  },
  {
    slug: 'expressway-flyover-mumbai',
    image: '/images/projects/expressway-flyover-mumbai.jpg',
    name: 'Coastal Expressway Flyover',
    location: 'Mumbai, India',
    industry: 'Infrastructure',
    year: '2021',
    summary:
      'Custom-engineered pier and deck formwork supported complex geometries along a coastal flyover alignment.',
    products: ['Shoring Systems', 'Wall Formwork'],
  },
]

export const getProjectBySlug = (slug) => PROJECTS.find((p) => p.slug === slug)
