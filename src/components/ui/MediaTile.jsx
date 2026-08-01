import CornerMarks from './CornerMarks.jsx'

/* Blueprint-style stand-in for photography that hasn't been shot/supplied
   yet: a dark technical panel with corner registration marks and a large
   line icon, in the same visual language as the hero/CTA bands. Drop-in
   replacement for an <img> — swap back to a real photo by rendering one
   instead once assets are available. */
function MediaTile({ icon: Icon = null, label, iconSize = 40, className = '' }) {
  return (
    <div className={`relative overflow-hidden bg-blueprint flex items-center justify-center ${className}`}>
      <CornerMarks always className="text-white/25" />
      {Icon && (
        <Icon
          size={iconSize}
          strokeWidth={1.1}
          className="text-white/60 transition-transform duration-500 ease-premium group-hover:scale-110"
        />
      )}
      {label && (
        <span className="absolute bottom-3 left-3 label-mono text-white/45">{label}</span>
      )}
    </div>
  )
}

export default MediaTile
