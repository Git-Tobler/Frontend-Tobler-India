function EngineeringProcessCard({ step }) {
  const Icon = step.icon

  return (
    <div className="group relative flex h-full flex-col overflow-hidden rounded-[16px] border border-tobler-border bg-white p-6 shadow-[0_10px_30px_rgba(20,24,26,0.04)] transition-all duration-300 hover:-translate-y-1 hover:border-tobler-blue hover:shadow-[0_18px_45px_rgba(20,24,26,0.08)]">
      <div className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-tobler-blue transition-transform duration-300 group-hover:scale-x-100" />
      <div className="flex items-center justify-between">
        <span className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-tobler-gold/40 bg-tobler-gold/10 text-[11px] font-semibold uppercase tracking-[0.22em] text-tobler-blue">
          {step.number}
        </span>
        <span className="rounded-full border border-tobler-border bg-tobler-bg-light p-2 text-tobler-blue">
          <Icon size={18} strokeWidth={1.8} />
        </span>
      </div>

      <div className="mt-6 flex-1">
        <h3 className="font-display text-[1.15rem] leading-tight text-tobler-heading">
          {step.title}
        </h3>
        <p className="mt-3 text-sm leading-7 text-tobler-body">
          {step.description}
        </p>
      </div>

      <div className="mt-6 flex items-center gap-2 text-sm font-medium text-tobler-blue">
        <span className="h-2.5 w-2.5 rounded-full bg-tobler-gold" />
        <span>Precision by design</span>
      </div>
    </div>
  )
}

export default EngineeringProcessCard
