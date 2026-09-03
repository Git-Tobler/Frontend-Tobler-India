import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import ResponsiveImage from '../ui/ResponsiveImage.jsx'
import { HERO_PANELS } from '../../data/manufacturing.js'

/* The hero's factory strip: an endless conveyor bent into a shallow lens.

   Geometry is matched to the client's reference recording (Reference 3.mp4,
   measured frame-by-frame): every card is cut with clip-path from two global
   quadratic boundary curves — the strip's top edge dips toward the centre,
   its bottom edge rises to mirror it — so cards stand tallest at the bleed
   edges and pinch as they approach the middle, where the centre card sits
   upright and square. Slants morph continuously as cards travel; nothing is
   rotated or scaled.

   Motion, also from the recording: the belt crawls right-to-left at 6.6% of
   one card-set per second (one card every ~3s), on a rAF loop over three
   copies of the set (more on very wide screens), wrapping seamlessly at one
   set's width. It eases to a halt while hovered (mouse or pen), focused, or
   dragged; a deliberate drag release hands back a little inertia, while a
   cancelled gesture (the browser claiming a vertical page scroll) drops it.
   The loop stops entirely while the strip is off-screen, and
   prefers-reduced-motion kills the crawl but keeps the composition and the
   drag. */

const PANEL_COUNT = HERO_PANELS.length
const SPEED_SETS = 0.12 // fraction of one card-set travelled per second (increased for faster scroll)
const MAX_FLING = 900 // px/s cap on drag-release inertia
const FLING_HOLD_MS = 100 // release this long after the last move = no fling
const SETTLE = 3 // 1/s — how quickly speed eases toward its target
const ARC_TOP = 10 // % of card height the top boundary dips at the centre
const ARC_BOT = 8 // % of card height the bottom boundary rises at the centre

function FactoryPanels() {
  const viewportRef = useRef(null)
  const trackRef = useRef(null)
  const [reps, setReps] = useState(3)

  /* Everything the rAF loop touches lives in one ref so per-frame updates
     never re-render React. */
  const state = useRef({
    offset: 0,
    speed: 0,
    setW: 0,
    viewW: 0,
    slots: [],
    pointerId: null,
    dragging: false,
    hasMovedSignificantly: false,
    hovered: false,
    focused: false,
    reduced: false,
    centered: false,
    painted: -1,
    dirty: true,
    lastX: 0,
    lastT: 0,
    flingV: 0,
    flingSeeded: false,
  })

  const apply = useCallback(() => {
    const s = state.current
    const track = trackRef.current
    if (!track || !s.setW) return
    if (s.offset === s.painted && !s.dirty) return
    s.painted = s.offset
    s.dirty = false

    track.style.transform = `translate3d(${-s.offset}px,0,0)`

    /* Each card edge's position on the arc, normalised so ±1 is a viewport
       edge. inset(u) is the quadratic boundary curve: full at dead centre,
       zero at the bleed edges — sampled at both card edges it yields the
       exact per-card slopes measured in the reference. */
    const half = s.viewW / 2
    for (const slot of s.slots) {
      const uL = (slot.center - slot.halfW - s.offset - half) / half
      const uR = (slot.center + slot.halfW - s.offset - half) / half
      const arcL = Math.max(0, 1 - uL * uL)
      const arcR = Math.max(0, 1 - uR * uR)
      const topL = (ARC_TOP * arcL).toFixed(3)
      const topR = (ARC_TOP * arcR).toFixed(3)
      const botL = (ARC_BOT * arcL).toFixed(3)
      const botR = (ARC_BOT * arcR).toFixed(3)
      slot.el.style.clipPath = `polygon(0% ${topL}%, 100% ${topR}%, 100% ${100 - botR}%, 0% ${100 - botL}%)`
    }
  }, [])

  const measure = useCallback(() => {
    const viewport = viewportRef.current
    const track = trackRef.current
    if (!viewport || !track) return
    const s = state.current
    const cards = Array.from(track.children)
    if (!cards.length) return

    s.viewW = viewport.clientWidth
    s.setW =
      cards.length > PANEL_COUNT
        ? cards[PANEL_COUNT].offsetLeft - cards[0].offsetLeft
        : track.scrollWidth
    s.slots = cards.map((el) => ({
      el,
      center: el.offsetLeft + el.offsetWidth / 2,
      halfW: el.offsetWidth / 2,
    }))
    s.dirty = true

    /* First measure: park a set's middle card exactly on the centre line so
       the page opens on the reference composition, not a cut edge. */
    if (!s.centered && s.setW) {
      s.centered = true
      const mid = s.slots[Math.floor(PANEL_COUNT / 2)]
      s.offset = ((((mid.center - s.viewW / 2) % s.setW) + s.setW) % s.setW)
    }

    /* Enough copies that the wrap window never exposes the track's ends. */
    if (s.setW) {
      const needed = Math.max(3, Math.ceil(s.viewW / s.setW) + 1)
      setReps((prev) => (prev === needed ? prev : needed))
    }
  }, [])

  useLayoutEffect(() => {
    measure()
    apply()
    const viewport = viewportRef.current
    if (!viewport || typeof ResizeObserver === 'undefined') return undefined
    const observer = new ResizeObserver(() => {
      measure()
      apply()
    })
    observer.observe(viewport)
    return () => observer.disconnect()
  }, [reps, measure, apply])

  useEffect(() => {
    const s = state.current
    const reduced = matchMedia('(prefers-reduced-motion: reduce)')
    s.reduced = reduced.matches
    if (s.reduced) s.speed = 0
    const onPreference = () => {
      s.reduced = reduced.matches
      if (s.reduced) s.speed = 0
    }
    reduced.addEventListener('change', onPreference)

    let frame = 0
    let running = false
    let last = 0
    const tick = (now) => {
      /* Clamped so a background tab or an off-screen stretch doesn't jump the
         belt on return. */
      const dt = Math.min(0.064, (now - last) / 1000)
      last = now

      /* Cruise speed is relative to the set width, so the belt covers one
         card in ~3s at any viewport size — the reference's pace. */
      const cruise = s.setW * SPEED_SETS
      const desired = (s.hasMovedSignificantly || s.reduced) ? 0 : cruise
      s.speed += (desired - s.speed) * Math.min(1, SETTLE * dt)
      if (!s.hasMovedSignificantly && Math.abs(s.speed) > 0.05) {
        s.offset += s.speed * dt
      }
      if (s.setW) {
        s.offset = ((s.offset % s.setW) + s.setW) % s.setW
      }
      apply()
      frame = requestAnimationFrame(tick)
    }
    const start = () => {
      if (running) return
      running = true
      last = performance.now()
      frame = requestAnimationFrame(tick)
    }
    const stop = () => {
      running = false
      cancelAnimationFrame(frame)
    }

    /* No frames while the hero is scrolled out of view — fifteen cards
       repainting behind other sections is pure battery drain. */
    let visibility
    if (viewportRef.current && typeof IntersectionObserver !== 'undefined') {
      visibility = new IntersectionObserver(
        ([entry]) => (entry.isIntersecting ? start() : stop()),
        { rootMargin: '15% 0px' },
      )
      visibility.observe(viewportRef.current)
    } else {
      start()
    }

    return () => {
      stop()
      visibility?.disconnect()
      reduced.removeEventListener('change', onPreference)
    }
  }, [apply])

  const onPointerDown = (event) => {
    const s = state.current
    /* One primary pointer owns the drag — a second finger or a context-menu
       button press must not re-seed it. */
    if (s.dragging || event.button !== 0 || !event.isPrimary) return
    s.dragging = true
    s.hasMovedSignificantly = false
    s.pointerId = event.pointerId
    s.flingV = 0
    s.flingSeeded = false
    s.lastX = event.clientX
    s.lastT = event.timeStamp
    try {
      event.currentTarget.setPointerCapture(event.pointerId)
    } catch {
      /* A pointer can deactivate between the event and the capture call;
         the drag still works for events that bubble here. */
    }
  }

  const onPointerMove = (event) => {
    const s = state.current
    if (!s.dragging || event.pointerId !== s.pointerId) return
    const dx = event.clientX - s.lastX
    const dt = (event.timeStamp - s.lastT) / 1000
    s.lastX = event.clientX
    s.lastT = event.timeStamp

    /* Mark as significant drag if movement exceeds threshold */
    if (Math.abs(dx) > 2) {
      s.hasMovedSignificantly = true
      s.offset -= dx
      if (dt > 0) {
        const v = -dx / dt
        s.flingV = s.flingSeeded ? s.flingV * 0.8 + v * 0.2 : v
        s.flingSeeded = true
      }
    }
  }

  /* Deliberate release: keep the flick's momentum — unless the pointer sat
     still before lifting, which reads as "scrub and place". */
  const endDrag = (event) => {
    const s = state.current
    if (!s.dragging || event.pointerId !== s.pointerId) return
    s.dragging = false
    s.pointerId = null

    /* If it was just a tap (no significant movement), keep cruise speed going */
    if (!s.hasMovedSignificantly) {
      s.speed = s.reduced ? 0 : s.setW * SPEED_SETS
      return
    }

    /* For actual drags, apply fling velocity */
    const stale = event.timeStamp - s.lastT > FLING_HOLD_MS
    const v = stale ? 0 : s.flingV
    s.speed = s.reduced ? 0 : Math.max(-MAX_FLING, Math.min(MAX_FLING, v))
  }

  /* Cancelled gesture — the browser claimed it for a page scroll. Whatever
     sideways jitter it left behind must not become belt speed. */
  const cancelDrag = (event) => {
    const s = state.current
    if (!s.dragging || event.pointerId !== s.pointerId) return
    s.dragging = false
    s.pointerId = null
    s.flingV = 0
    s.speed = 0
  }

  const onPointerEnter = (event) => {
    if (event.pointerType !== 'touch') state.current.hovered = true
  }

  const onPointerLeave = (event) => {
    if (event.pointerType !== 'touch') state.current.hovered = false
  }

  return (
    <div
      ref={viewportRef}
      role="region"
      aria-label="Inside the Tobler factory — moving image strip, hold or focus to pause"
      tabIndex={0}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={endDrag}
      onPointerCancel={cancelDrag}
      onLostPointerCapture={endDrag}
      onPointerEnter={onPointerEnter}
      onPointerLeave={onPointerLeave}
      onFocus={() => {
        state.current.focused = true
      }}
      onBlur={() => {
        state.current.focused = false
      }}
      className="relative w-full cursor-grab touch-pan-y select-none overflow-hidden py-6 outline-none focus-visible:ring-2 focus-visible:ring-tobler-blue focus-visible:ring-offset-2 active:cursor-grabbing md:py-8"
    >
      <div
        ref={trackRef}
        className="relative flex w-max items-center gap-[clamp(5px,0.6vw,10px)]"
      >
        {Array.from({ length: reps }, (_, rep) =>
          HERO_PANELS.map((panel) => (
            <div
              key={`${rep}-${panel.key}`}
              aria-hidden={rep > 0 || undefined}
              className="aspect-[7/10] w-[clamp(180px,20.5vw,360px)] shrink-0 bg-tobler-bg-light [will-change:clip-path] [&_img]:pointer-events-none"
            >
              <ResponsiveImage
                publicId={panel.publicId}
                alt={rep === 0 ? `${panel.label} — ${panel.caption}` : ''}
                label={panel.publicId ? undefined : panel.label}
                className="h-full w-full"
                displayWidth={640}
                sizes="(min-width: 1756px) 360px, (min-width: 768px) 20.5vw, 55vw"
                priority={rep <= 1}
              />
            </div>
          )),
        )}
      </div>
    </div>
  )
}

export default FactoryPanels
