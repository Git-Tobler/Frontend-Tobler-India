function EngineeringProcessCard({ step }) {
  const Icon = step.icon

  return (
    <div className="group relative flex h-full flex-col overflow-hidden rounded-card-lg border border-shopify-border bg-white p-7 transition-all duration-300 ease-premium hover:-translate-y-1 hover:border-shopify-green-line hover:shadow-raised">
      <div className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-shopify-green transition-transform duration-300 group-hover:scale-x-100" />

      <div className="flex items-center justify-between">
        <span className="inline-flex h-10 w-10 items-center justify-center rounded-pill bg-shopify-green-tint text-sm font-semibold text-shopify-green-dark">
          {step.number}
        </span>
        <span className="rounded-pill bg-shopify-surface p-2.5 text-shopify-green">
          <Icon size={18} strokeWidth={1.8} aria-hidden="true" />
        </span>
      </div>

      <div className="mt-7 flex-1">
        <h3 className="font-display text-[1.15rem] leading-tight text-shopify-ink">
          {step.title}
        </h3>
        <p className="mt-3 text-sm normal-case leading-relaxed text-shopify-body">
          {step.description}
        </p>
      </div>

      
    </div>
  )
}

export default EngineeringProcessCard
