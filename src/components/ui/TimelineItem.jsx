function TimelineItem({ item, index, isLast }) {
  return (
    <div className="relative pl-12 pb-12 last:pb-0">
      {!isLast && (
        <span className="absolute left-[13px] top-3 bottom-0 w-px bg-tobler-border" aria-hidden="true" />
      )}
      <span className="absolute left-0 top-0 w-7 h-7 rounded-full bg-tobler-heading text-white text-[10px] font-mono font-bold flex items-center justify-center">
        {String(index + 1).padStart(2, '0')}
      </span>
      <span className="figure-mono text-sm font-bold text-tobler-blue tracking-wide">{item.year}</span>
      <h3 className="text-xl mt-1 mb-2">{item.title}</h3>
      <p className="text-tobler-body leading-relaxed max-w-xl normal-case">{item.description}</p>
    </div>
  )
}

export default TimelineItem
