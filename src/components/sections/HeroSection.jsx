import RotatingWord from '../ui/RotatingWord.jsx'
import VideoPanel from '../ui/VideoPanel.jsx'
import { MEDIA } from '../../data/media-map.js'


const HEADLINE_ENDINGS = ['Swiss Engineering for Better Construction', 'Safer, Smarter Construction', 'Scaffolding & Formwork Engineered to Perform']

/* The white frame */
function HeroSection() {
  return (
    <section className="relative -mt-20 flex min-h-[100svh] items-stretch overflow-hidden border-t-[8px] border-white sm:border-t-[10px] lg:-mt-24 lg:border-t-[12px]">
      {/* No filter of any kind on the clip — the banner footage is properly
          exposed, and with the full-frame scrim gone it is now carrying the
          section on its own, so it is delivered at the top of what the source
          can give. 2400 at q_auto:best: the source is 4072x2036, the sharpest
          tier in the library, `c_limit` never upscales, and this is the one
          clip that fills a whole viewport — on anything wider than 1920 the old
          ceiling was being stretched, which reads as soft video. */}
      <VideoPanel
        publicId={MEDIA.heroVideo}
        fill
        priority
        marks={false}
        width={2400}
        quality="auto:best"
      />

      {/* Readability treatment, not a colour wash.

          What used to sit here was a pair of navy (`tobler-bg-dark`) gradients
          covering the whole frame — one up from the bottom, one across from the
          left. Together they tinted the entire clip blue and flattened the
          establishing shots the footage is worth running for.

          Both are gone. The clip plays in its own colour now, and all that is
          left is a single neutral gradient confined to the bottom of the frame,
          where the headline actually hangs. Neutral black rather than navy on
          purpose: black darkens, a hue tints. It fades out by the midpoint, so
          the cranes, the skyline and the hills above keep their full contrast.
          The type carries its own shadow as well (below) — that pair is what
          holds white type through the near-white overhead deck frames without
          putting a filter over the video. */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-[55%] bg-gradient-to-t from-black/70 via-black/25 via-50% to-transparent" />

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
            {/* min-h reserves two lines in em, so the block only grows for a
                phrase that genuinely wraps to three — no jump on every cycle.
                The shadow is belt and braces with the bottom gradient: on the
                overhead deck frames, which run near-white edge to edge, the
                gradient alone is carrying a lot. */}
            <h1 className="font-display text-[2.125rem] font-bold leading-[1.08] tracking-tight text-white [text-shadow:0_1px_3px_rgba(0,0,0,0.55),0_2px_28px_rgba(0,0,0,0.8)] sm:text-5xl lg:min-h-[2.16em] lg:text-[3.5rem] xl:text-[4rem]">
              <RotatingWord items={HEADLINE_ENDINGS} />
            </h1>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HeroSection
