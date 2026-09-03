/* `size="display"` is the homepage's larger, tighter setting; every other page
   keeps the default `text-h2`. */
const SIZES = {
  default: 'text-h2',
  display: 'text-display-lg',
}

function SectionTitle({
  title,
  description,
  align = 'left',
  light = false,
  size = 'default',
  className = '',
  gradient = true,
}) {
  const alignClass =
    align === 'center'
      ? 'text-center mx-auto items-center'
      : 'text-left items-start'

  const titleClasses = `${SIZES[size] ?? SIZES.default}`

  // Gradient text styling: smooth equal transition from black to brand blue
  const gradientStyle = gradient && !light ? {
    backgroundImage: 'linear-gradient(to right, #14181A 0%, #1B4E90 100%)',
    backgroundClip: 'text',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  } : {}

  return (
    <div className={`flex flex-col gap-5 max-w-3xl ${alignClass} ${className}`}>
      <h2
        className={`${titleClasses} ${light ? 'text-white' : ''}`}
        style={gradientStyle}
      >
        {title}
      </h2>

      {description && (
        <p
          className={`text-base md:text-lg leading-relaxed normal-case font-sans ${
            light ? 'text-white/75' : 'text-tobler-body'
          }`}
        >
          {description}
        </p>
      )}
    </div>
  )
}

export default SectionTitle
