import { Briefcase, Factory, Lightbulb, Cog, GraduationCap, Clipboard } from 'lucide-react'

const ICON_MAP = {
  briefcase: Briefcase,
  factory: Factory,
  lightbulb: Lightbulb,
  cog: Cog,
  graduation: GraduationCap,
  clipboard: Clipboard,
}

function ConsultationServiceCard({ title, description, icon }) {
  const Icon = ICON_MAP[icon] || Briefcase

  return (
    <div className="p-8 rounded-card border border-tobler-border bg-white hover:border-tobler-blue hover:shadow-card transition-all duration-300 group">
      <div className="w-12 h-12 rounded-lg bg-tobler-bg-light flex items-center justify-center mb-5 group-hover:bg-tobler-gold group-hover:text-tobler-heading transition-colors duration-300">
        <Icon size={24} className="text-tobler-blue group-hover:text-tobler-heading" />
      </div>

      <h3 className="text-base font-semibold text-tobler-heading mb-3">{title}</h3>
      <p className="text-sm text-tobler-body leading-relaxed">{description}</p>
    </div>
  )
}

export default ConsultationServiceCard
