function SpecTable({ specifications = [] }) {
  return (
    <div className="border border-tobler-border rounded-card overflow-hidden">
      {specifications.map((spec, idx) => (
        <div
          key={spec.label}
          className={`flex items-center justify-between px-6 py-4 text-sm ${
            idx % 2 === 0 ? 'bg-white' : 'bg-tobler-bg-light'
          }`}
        >
          <span className="font-semibold text-tobler-heading">{spec.label}</span>
          <span className="text-tobler-body">{spec.value}</span>
        </div>
      ))}
    </div>
  )
}

export default SpecTable
