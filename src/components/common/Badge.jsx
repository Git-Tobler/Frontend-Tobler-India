function Badge({ children, variant = 'blue', className = '' }) {
  const variants = {
    blue: 'bg-tobler-blue/10 text-tobler-blue',
    gold: 'bg-tobler-gold/15 text-tobler-gold-dark',
    light: 'bg-white/15 text-white',
    outline: 'border border-tobler-border text-tobler-body',
  }
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-btn px-2.5 py-1 text-[11px] font-mono font-semibold uppercase tracking-[0.1em] ${variants[variant]} ${className}`}
    >
      {children}
    </span>
  )
}

export default Badge
