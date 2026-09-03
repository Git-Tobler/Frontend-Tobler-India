import StudioButton from './StudioButton.jsx'

/* Floating pill pinned to the bottom of the studio layout.

   Desktop only: on mobile the site already has a fixed header and menu, and a
   second floating bar would sit on top of them. */
function StudioBottomNav() {
  return (
    <div className="fixed bottom-6 left-1/2 z-50 hidden -translate-x-1/2 md:block">
      <div className="flex items-center gap-6 rounded-full bg-white px-8 py-2 shadow-[0_1px_2px_0_rgba(5,26,36,0.1),0_4px_4px_0_rgba(5,26,36,0.09),0_9px_6px_0_rgba(5,26,36,0.05),0_17px_7px_0_rgba(5,26,36,0.01),inset_0_2px_8px_0_rgba(255,255,255,0.5)]">
        <span className="font-mondwest text-2xl font-semibold text-[#051A24]">T</span>
        <StudioButton to="/contact">Start a chat</StudioButton>
      </div>
    </div>
  )
}

export default StudioBottomNav
