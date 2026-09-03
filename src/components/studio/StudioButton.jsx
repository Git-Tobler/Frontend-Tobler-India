import { Link } from 'react-router-dom'

/* Pill button for the studio layout.

   The layered shadow is the whole point of the look: five stacked ambient
   shadows plus an inset highlight along the top edge, which reads as a soft
   physical button rather than a flat rectangle. It is deliberately not the
   site's standard Button — that one belongs to the engineering pages. */

const PRIMARY_SHADOW =
  'shadow-[0_1px_2px_0_rgba(5,26,36,0.1),0_4px_4px_0_rgba(5,26,36,0.09),0_9px_6px_0_rgba(5,26,36,0.05),0_17px_7px_0_rgba(5,26,36,0.01),0_26px_7px_0_rgba(5,26,36,0),inset_0_2px_8px_0_rgba(255,255,255,0.5)]'
const SOFT_SHADOW = 'shadow-[0_0_0_0.5px_rgba(0,0,0,0.05),0_4px_30px_rgba(0,0,0,0.08)]'

const VARIANTS = {
  primary: `bg-[#051A24] text-white ${PRIMARY_SHADOW}`,
  secondary: `bg-white text-[#051A24] ${SOFT_SHADOW}`,
  tertiary: `bg-white text-[#051A24] ${SOFT_SHADOW} ${PRIMARY_SHADOW}`,
}

function StudioButton({ children, to, href, variant = 'primary', className = '', ...rest }) {
  const classes = `inline-flex items-center justify-center gap-3 rounded-full px-7 py-3 text-sm font-medium transition-opacity duration-300 hover:opacity-90 ${
    VARIANTS[variant] ?? VARIANTS.primary
  } ${className}`

  if (to) {
    return (
      <Link to={to} className={classes} {...rest}>
        {children}
      </Link>
    )
  }
  if (href) {
    return (
      <a href={href} className={classes} {...rest}>
        {children}
      </a>
    )
  }
  return (
    <button type="button" className={classes} {...rest}>
      {children}
    </button>
  )
}

export default StudioButton
