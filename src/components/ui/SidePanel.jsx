import { useEffect, useRef } from 'react'
import { X } from 'lucide-react'

const FOCUSABLE = 'a[href], button:not([disabled]), input, textarea, select, [tabindex]:not([tabindex="-1"])'

/* The detail panel behind both ProductDrawer and ProjectDrawer.

   Two shapes, one component. On phones it is still a full-width drawer that
   slides in from the right, because a centred box on a narrow screen is just
   a drawer with wasted margins. From `md` up it becomes a centred modal —
   capped at 1100px and 90vh, fading and scaling in rather than sliding, since
   horizontal motion reads as wrong once the box is no longer edge-anchored.
   The two layouts are driven entirely by the responsive classes on the panel;
   there is no JS breakpoint to keep in sync.

   Always mounted and toggled via `open` (like MobileMenu), so it animates
   rather than pops and swapping content never replays a mount animation.
   Owns the modal behaviour the two drawers would otherwise duplicate: focus
   trap, Escape to close, background scroll lock, and returning focus to
   whatever opened it.

   `contentKey` snaps the scrollable body back to the top whenever the panel
   shows a different item — without it, clicking through from a related tile
   leaves you halfway down the previous item's copy.

   `fullScreenDesktop` makes the modal fill the viewport on `md` and up,
   instead of the default centred box. Mobile drawer behavior stays the same. */
function SidePanel({ open, onClose, eyebrow, title, footer, contentKey, children, fullScreenDesktop = false }) {
  const panelRef = useRef(null)
  const bodyRef = useRef(null)
  const closeBtnRef = useRef(null)

  useEffect(() => {
    if (!open) return undefined

    const previouslyFocused = document.activeElement
    closeBtnRef.current?.focus()
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose()
        return
      }
      if (e.key !== 'Tab' || !panelRef.current) return
      const focusable = panelRef.current.querySelectorAll(FOCUSABLE)
      if (focusable.length === 0) return
      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = previousOverflow
      previouslyFocused?.focus?.()
    }
  }, [open, onClose])

  useEffect(() => {
    if (open) bodyRef.current?.scrollTo(0, 0)
  }, [open, contentKey])

  return (
    <div
      className={`fixed inset-0 z-[70] transition-opacity duration-300 ${open ? 'visible opacity-100' : 'invisible opacity-0'}`}
    >
      <div className="absolute inset-0 bg-tobler-heading/60 backdrop-blur-sm" onClick={onClose} aria-hidden="true" />

      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="side-panel-title"
        className={`absolute bg-white shadow-elevated flex flex-col transition-transform duration-300 ease-premium
          top-0 right-0 h-full w-full
          ${fullScreenDesktop
            ? 'md:inset-0 md:rounded-none md:overflow-hidden'
            : 'md:top-1/2 md:left-1/2 md:right-auto md:h-auto md:w-[calc(100%-4rem)] md:max-w-[1700px] md:max-h-[95vh] md:rounded-card md:overflow-hidden'} ${
          open
            ? fullScreenDesktop
              ? 'translate-x-0'
              : 'translate-x-0 md:-translate-x-1/2 md:-translate-y-1/2 md:scale-100'
            : fullScreenDesktop
              ? 'translate-x-full'
              : 'translate-x-full md:-translate-x-1/2 md:-translate-y-1/2 md:scale-95'
        }`}
      >
        {title && (
          <>
            <header className="flex items-start justify-between gap-4 px-6 md:px-8 py-6 border-b border-tobler-border shrink-0">
              <div className="min-w-0">
                {eyebrow && <p className="label-mono text-tobler-blue mb-2 truncate">{eyebrow}</p>}
                <h2 id="side-panel-title" className="text-h4">
                  {title}
                </h2>
              </div>
              <button
                ref={closeBtnRef}
                type="button"
                onClick={onClose}
                aria-label="Close details"
                className="shrink-0 w-10 h-10 flex items-center justify-center rounded-full border border-tobler-border text-tobler-heading hover:bg-tobler-bg-light transition-colors"
              >
                <X size={20} />
              </button>
            </header>

            <div ref={bodyRef} className="flex-1 overflow-y-auto px-6 md:px-8 py-8 space-y-10">
              {children}
            </div>

            {footer && <footer className="shrink-0 border-t border-tobler-border px-6 md:px-8 py-5">{footer}</footer>}
          </>
        )}
      </div>
    </div>
  )
}

export default SidePanel
