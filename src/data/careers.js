/* Open roles and employee benefits — the /careers page's content.
   Extracted from pages/Careers/Careers.jsx so the search index can reach it
   without importing a lazy-loaded route component. */

export const POSITIONS = [
  {
    id: 1,
    title: 'Senior Manufacturing Engineer',
    department: 'Engineering',
    location: 'Bangalore, India',
    type: 'Full-time',
    description: 'Lead manufacturing innovation and process optimization for our scaffolding systems.',
    requirements: ['10+ years experience', 'Manufacturing expertise', 'Leadership skills'],
  },
  {
    id: 2,
    title: 'Product Manager',
    department: 'Product',
    location: 'New Delhi, India',
    type: 'Full-time',
    description: "Drive product strategy and market expansion for Tobler India's portfolio.",
    requirements: ['8+ years PM experience', 'Construction industry knowledge', 'Strategic thinking'],
  },
  {
    id: 3,
    title: 'Sales Executive - North India',
    department: 'Sales',
    location: 'Delhi NCR, India',
    type: 'Full-time',
    description: 'Build and manage customer relationships in high-rise and infrastructure segments.',
    requirements: ['5+ years sales experience', 'B2B sales track record', 'Technical aptitude'],
  },
  {
    id: 4,
    title: 'Quality Assurance Manager',
    department: 'Quality',
    location: 'Bangalore, India',
    type: 'Full-time',
    description: 'Establish and maintain quality standards across manufacturing operations.',
    requirements: ['7+ years QA experience', 'ISO standards knowledge', 'Process improvement'],
  },
  {
    id: 5,
    title: 'Supply Chain Analyst',
    department: 'Operations',
    location: 'Bangalore, India',
    type: 'Full-time',
    description: 'Optimize supply chain and logistics for efficient delivery across India.',
    requirements: ['5+ years supply chain experience', 'ERP systems knowledge', 'Data analysis'],
  },
  {
    id: 6,
    title: 'Civil Engineer - Design',
    department: 'Engineering',
    location: 'New Delhi, India',
    type: 'Full-time',
    description: 'Design innovative solutions for complex construction challenges.',
    requirements: ['5+ years civil engineering', 'BIM experience', 'Problem-solving'],
  },
]

export const BENEFITS = [
  { icon: '💼', title: 'Competitive Salary', description: 'Market-competitive compensation packages with performance bonuses' },
  { icon: '🏥', title: 'Health Benefits', description: 'Comprehensive health insurance for you and your family' },
  { icon: '📚', title: 'Learning & Development', description: 'Continuous training and professional development opportunities' },
  { icon: '🌍', title: 'Global Exposure', description: 'Work with Swiss engineering standards and international clients' },
  { icon: '⏰', title: 'Flexible Work', description: 'Modern work environment with flexible arrangements' },
  { icon: '🎯', title: 'Career Growth', description: 'Clear advancement paths and leadership opportunities' },
]
