import RotatingWord from '../ui/RotatingWord.jsx'
import VideoPanel from '../ui/VideoPanel.jsx'
import { MEDIA } from '../../data/media-map.js'


const HEADLINE_ENDINGS = ['Swiss Engineering for Better Construction', 'Safer, Smarter Construction', 'Scaffolding & Formwork Engineered to Perform']

/* The white frame */
function HeroSection() {
  return (
    <section className="relative -mt-20 flex min-h-[100svh] items-stretch overflow-hidden border-t-[8px] border-white sm:border-t-[10px] lg:-mt-24 lg:border-t-[12px]">
      {/* No brightness filter here — the old 848x480 welding clip needed a
          1.18x lift, but the banner footage is properly exposed and carries
          its own darkened lower edge for the headline to sit on. */}
      <VideoPanel
        publicId={MEDIA.heroVideo}
        fill
        priority
        marks={false}
        width={1920}
        quality="auto:best"
      />

      {/* Stretched by the section rather than sized with `h-full`: the section has
          only a min-height, so a percentage height here has nothing definite to
          resolve against and the column would collapse to its content. Left-hung
          rather than mx-auto centered — the headline belongs on the left edge,
          and centering the 1480px cap left a dead margin there on wide screens. */}
      <div className="relative z-10 flex w-full max-w-[1480px] flex-col">
        {/* Headline on the left, standfirst on the right, both hung off the same
            bottom baseline. `items-end` is what keeps the standfirst still while
            the rotating headline changes line count above it. */}
        <div className="flex flex-1 items-end px-6 pb-20 pt-28 sm:px-8 lg:px-10 lg:pb-28">
          <div className="w-full max-w-[54rem]">
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.22em] text-tobler-gold sm:text-sm lg:mb-6">
              We build
            </p>
            {/* min-h reserves two lines in em, so the block only grows for a
                phrase that genuinely wraps to three — no jump on every cycle. */}
            <h1 className="font-display text-[2.125rem] font-bold leading-[1.08] tracking-tight text-white sm:text-5xl lg:min-h-[2.16em] lg:text-[3.5rem] xl:text-[4rem]">
              <RotatingWord items={HEADLINE_ENDINGS} />
            </h1>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HeroSection
