import { useState, useEffect } from 'react'

function ScrollIndicator() {
  const [scrollProgress, setScrollProgress] = useState(0)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0

      setScrollProgress(scrollPercent)
      setIsVisible(scrollTop > 300)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleScroll = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  if (!isVisible) return null

  return (
    <button
      onClick={handleScroll}
      className="fixed left-8 bottom-8 z-40 flex items-center justify-center w-14 h-14 rounded-full bg-tobler-blue text-white hover:bg-tobler-blue-dark transition-all duration-300 shadow-elevated hover:shadow-lift"
      aria-label="Scroll to top"
      title="Back to top"
    >
      <div className="relative flex items-center justify-center w-full h-full">
        {/* Progress circle background */}
        <svg className="absolute w-full h-full -rotate-90" viewBox="0 0 64 64">
          <circle
            cx="32"
            cy="32"
            r="28"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            opacity="0.2"
          />
          <circle
            cx="32"
            cy="32"
            r="28"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeDasharray={`${(scrollProgress / 100) * 176} 176`}
            className="transition-all duration-300"
          />
        </svg>

        {/* TOP text */}
        <span className="text-[14px] font-bold tracking-wider">
          TOP
        </span>
      </div>
    </button>
  )
}

export default ScrollIndicator
