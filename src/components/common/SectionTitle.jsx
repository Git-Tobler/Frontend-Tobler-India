function SectionTitle({ eyebrow, title, description, align = 'left', light = false, index }) {
  const alignClass = align === 'center' ? 'text-center mx-auto items-center' : 'text-left items-start'
  return (
    <div className={`flex flex-col gap-5 max-w-2xl ${alignClass}`}>
      <h2 className={`text-h2 ${light ? 'text-white' : 'text-tobler-heading'}`}>{title}</h2>
      {description && (
        <p className={`text-base md:text-lg leading-relaxed normal-case font-sans ${light ? 'text-white/75' : 'text-tobler-body'}`}>
          {description}
        </p>
      )}
    </div>
  )
}

export default SectionTitle
