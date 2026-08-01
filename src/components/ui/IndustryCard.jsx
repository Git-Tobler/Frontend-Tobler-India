import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import CornerMarks from './CornerMarks.jsx'
import { INDUSTRY_ICONS, DEFAULT_ICON } from '../../constants/icons.js'

function IndustryCard({ industry }) {
  const Icon = INDUSTRY_ICONS[industry.name] || DEFAULT_ICON
  return (
    <Link
      to={`/industries/${industry.slug}`}
      className="group relative flex flex-col justify-end h-80 rounded-card overflow-hidden border border-tobler-heading/20 p-7 transition-all duration-300 ease-premium hover:shadow-elevated bg-blueprint"
    >
      <Icon
        size={120}
        strokeWidth={0.8}
        className="absolute -right-4 -top-4 text-white/[0.08] transition-transform duration-500 ease-premium group-hover:scale-110 group-hover:rotate-3"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-tobler-heading via-tobler-heading/45 to-transparent group-hover:from-tobler-blue-dark transition-colors duration-300" />
      <CornerMarks always className="text-white/25" />
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-xl text-white">{industry.name}</h3>
          <ArrowUpRight
            size={20}
            strokeWidth={2}
            className="text-tobler-gold shrink-0 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
          />
        </div>
        <p className="text-white/65 text-sm leading-relaxed normal-case">{industry.summary}</p>
      </div>
    </Link>
  )
}

export default IndustryCard
