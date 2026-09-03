import { useScrollReveal } from '../../hooks/useScrollReveal.js'

/* Fades + lifts children into place the first time they cross into the
   viewport. Wrap any section-level block; disabled automatically for users
   who prefer reduced motion via the global CSS media query in index.css. */
function Reveal({ children, className = '', as: Tag = 'div', delay = 0 }) {
  const [ref, visible] = useScrollReveal()

  return (
    <Tag
      ref={ref}
      className={`transition-all duration-700 ease-premium ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
      } ${className}`}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </Tag>
  )
}

export default Reveal
