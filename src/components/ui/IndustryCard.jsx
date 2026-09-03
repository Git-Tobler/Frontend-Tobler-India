import CornerMarks from './CornerMarks.jsx'
import ResponsiveImage from './ResponsiveImage.jsx'

/* `soft` only changes the frame — the dark photo treatment inside stays, since
   it's the contrast element on an otherwise light homepage. */
function IndustryCard({ industry, soft = false }) {
  return (
    <div
      className={`group relative flex flex-col justify-end h-80 overflow-hidden border p-7 transition-all duration-300 ease-premium bg-blueprint ${
        soft
          ? 'rounded-card-lg border-transparent hover:-translate-y-1 hover:shadow-lift'
          : 'rounded-card border-tobler-heading/20'
      }`}
    >
      {/* Photography sits under the existing icon/scrim treatment rather than
          replacing it, so a card without a shot yet looks exactly as it did. */}
      {industry.imageId && (
        <div className="absolute inset-0">
          <ResponsiveImage
            publicId={industry.imageId}
            alt=""
            className="h-full w-full"
            displayWidth={520}
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          />
        </div>
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-tobler-heading via-tobler-heading/45 to-transparent group-hover:from-tobler-blue-dark transition-colors duration-300" />
      <CornerMarks always className="text-white/25" />
      <div className="relative z-10">
        <h3 className="text-xl text-white mb-3">{industry.name}</h3>
        <p className="text-white/65 text-sm leading-relaxed normal-case">{industry.summary}</p>
      </div>
    </div>
  )
}

export default IndustryCard
