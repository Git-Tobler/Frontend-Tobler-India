import { cldImage } from '../../lib/cloudinary.js'
import { CLIENTS } from '../../data/clients.js'

/* The social-proof strip directly under the hero — the 16 client marks from
 * Cloudinary, drifting left to right on a continuous loop.
 *
 * The track is duplicated once because the `ticker` keyframe travels -50%:
 * the second copy is exactly what fills the gap as the first scrolls out, so
 * the loop has no visible seam. Hovering pauses it, and reduced-motion
 * preferences stop it entirely (the strip is still readable, just static).
 */
function LogoScroller() {
  const track = [...CLIENTS, ...CLIENTS]

  return (
    <section className="border-b border-tobler-border-light bg-white py-12 md:py-16">
      <p className="label-mono mb-10 text-center text-tobler-muted">
        Trusted by leading developers and contractors
      </p>

      {/* Full-bleed on purpose — the strip should run past the container edges
          so it reads as continuous rather than as a boxed row. */}
      <div className="group relative overflow-hidden [-webkit-mask-image:linear-gradient(to_right,transparent,black_7%,black_93%,transparent)] [mask-image:linear-gradient(to_right,transparent,black_7%,black_93%,transparent)]">
        {/* `animation-direction: reverse` runs the -50% keyframe backwards, so
            the marks drift left → right instead of the usual right → left. */}
        <div className="flex w-max animate-logoScroll items-center gap-x-12 pr-12 [animation-direction:reverse] group-hover:[animation-play-state:paused] motion-reduce:animate-none md:gap-x-16 md:pr-16">
          {track.map((client, idx) => (
            <img
              key={`${client.id}-${idx}`}
              src={cldImage(client.logo, { w: 640, crop: 'scale', trim: true })}
              alt={idx >= CLIENTS.length ? '' : `${client.name} logo`}
              aria-hidden={idx >= CLIENTS.length ? 'true' : undefined}
              loading="lazy"
              decoding="async"
              className="h-20 w-auto max-w-[200px] shrink-0 object-contain transition-opacity duration-300 md:h-28 md:max-w-[260px]"
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default LogoScroller
