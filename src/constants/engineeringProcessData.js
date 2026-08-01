import {
  ArrowRightLeft,
  Boxes,
  Cpu,
  Factory,
  Gauge,
  Hammer,
  PackageCheck,
  ScanLine,
  ShieldCheck,
  Sparkles,
} from 'lucide-react'

export const ENGINEERING_PROCESS_STEPS = [
  {
    number: '01',
    title: 'Concept & Feasibility',
    description: 'We translate project requirements into engineered solution logic with fast, practical alignment from day one.',
    icon: ArrowRightLeft,
  },
  {
    number: '02',
    title: 'Engineering Design',
    description: 'Detailed calculations and system layouts are developed to suit structural performance, site constraints and sequencing.',
    icon: Cpu,
  },
  {
    number: '03',
    title: 'Material Planning',
    description: 'Every component is selected and staged with precision to maintain quality, delivery confidence and site readiness.',
    icon: Boxes,
  },
  {
    number: '04',
    title: 'Manufacturing Execution',
    description: 'Precision fabrication is carried out under controlled conditions with rigorous checks built into each production run.',
    icon: Factory,
  },
  {
    number: '05',
    title: 'Quality Assurance',
    description: 'Independent inspection and testing verify safety, durability and compliance before release to site.',
    icon: ShieldCheck,
  },
  {
    number: '06',
    title: 'Logistics Coordination',
    description: 'Deployment plans are tuned for schedule certainty, packaging integrity and efficient handling on arrival.',
    icon: PackageCheck,
  },
  {
    number: '07',
    title: 'Installation Support',
    description: 'Our team provides technical guidance through setup, alignment and implementation to keep performance on track.',
    icon: Hammer,
  },
  {
    number: '08',
    title: 'Performance Monitoring',
    description: 'We review field feedback and system behavior to refine future delivery and optimize long-term reliability.',
    icon: Gauge,
  },
  {
    number: '09',
    title: 'Refinement & Innovation',
    description: 'Lessons from production and deployment feed continuous improvement across every subsequent solution.',
    icon: Sparkles,
  },
  {
    number: '10',
    title: 'Delivery Confidence',
    description: 'The finished system arrives as a complete, dependable package built around the project’s operational reality.',
    icon: ScanLine,
  },
]
