import { MEDIA } from './media-map.js'

export const INDUSTRIES = [
  {
    slug: 'high-rise-buildings',
    imageId: MEDIA.highRiseIndustry,
    image: '/images/industries/high-rise-buildings.jpg',
    name: 'High-Rise Buildings',
    summary:
      'Climbing formwork and access systems engineered for speed, safety and precision at extreme heights.',
    challenges: [
      'Repetitive floor cycles that demand predictable, fast turnarounds',
      'Wind loads and safety compliance at significant heights',
      'Vertical transport and material handling constraints',
    ],
    solutions: [
      'Self-climbing formwork systems for core and shear walls',
      'Integrated safety screens and protection platforms',
      'Modular systems that reduce crane dependency',
    ],
    relatedProducts: ['climbing-systems', 'wall-formwork', 'all-in-one-scaffolding'],
  },
  {
    slug: 'commercial-construction',
    imageId: MEDIA.commercialIndustry,
    image: '/images/industries/commercial-construction.jpg',
    name: 'Commercial Construction',
    summary:
      'Flexible shoring and slab formwork systems built for large-span commercial developments.',
    challenges: [
      'Large column-free spans requiring long-span table formwork',
      'Tight project timelines with multiple contractors on site',
      'Aesthetic finish requirements for exposed concrete',
    ],
    solutions: [
      'Table and beam formwork systems for large slab spans',
      'Modular shoring towers for rapid deployment',
      'Finish-grade formwork panels for architectural concrete',
    ],
    relatedProducts: ['slab-formwork', 'heavy-duty-props'],
  },
  {
    slug: 'residential-construction',
    imageId: MEDIA.residentialIndustry,
    image: '/images/industries/residential-construction.jpg',
    name: 'Residential Construction',
    summary:
      'Efficient formwork systems designed for repetitive residential layouts and fast handover cycles.',
    challenges: [
      'Repetitive unit layouts requiring standardized formwork',
      'Cost sensitivity across large unit counts',
      'Labour availability and ease-of-use requirements',
    ],
    solutions: [
      'Lightweight aluminium and steel wall formwork',
      'Standardized panel systems for repetitive floors',
      'Simplified assembly reducing skilled-labour dependency',
    ],
    relatedProducts: ['wall-formwork', 'slab-formwork'],
  },
  {
    slug: 'infrastructure',
    imageId: MEDIA.infrastructureIndustry,
    image: '/images/industries/infrastructure.jpg',
    name: 'Infrastructure',
    summary:
      'Heavy-duty shoring and access solutions for bridges, flyovers, metro and industrial infrastructure.',
    challenges: [
      'Heavy loads and long spans over roads, rivers and rail',
      'Complex geometries for piers, pylons and deck sections',
      'Strict safety and quality compliance for public infrastructure',
    ],
    solutions: [
      'Heavy-duty shoring towers rated for high loads',
      'Bridge deck and pier formwork systems',
      'Engineering support for complex geometries',
    ],
    relatedProducts: ['heavy-duty-props', 'climbing-systems'],
  },
  {
    slug: 'industrial-facilities',
    imageId: 'tobler/site/screenshot-2025-09-13-at-4-04-28-pm',
    image: '/images/industries/industrial-facilities.jpg',
    name: 'Industrial Facilities',
    summary:
      'Robust scaffolding and access systems built for factories, plants and manufacturing facilities.',
    challenges: [
      'Complex access requirements around plant and machinery',
      'Fire, chemical and heavy-load safety considerations',
      'Fast-tracked construction schedules for operational plants',
    ],
    solutions: [
      'Multidirectional access scaffolding for irregular structures',
      'Heavy-duty facade scaffolding for tall industrial sheds',
      'Custom-engineered access solutions for plant shutdowns',
    ],
    relatedProducts: ['all-in-one-scaffolding', 'heavy-duty-props'],
  },
]

export const getIndustryBySlug = (slug) => INDUSTRIES.find((i) => i.slug === slug)
