import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

const VARIANTS = {
  primary:
    'bg-tobler-blue text-white border border-tobler-blue hover:bg-[#214A7E] hover:border-[#214A7E] hover:shadow-xl hover:-translate-y-0.5',

  secondary:
    'bg-white text-tobler-blue border border-tobler-blue hover:bg-tobler-blue hover:text-white hover:shadow-xl hover:-translate-y-0.5',

  accent:
    'bg-tobler-gold text-tobler-heading border border-tobler-gold hover:bg-[#E4CF2E] hover:border-[#E4CF2E] hover:shadow-xl hover:-translate-y-0.5',

  ghost:
    'bg-transparent text-tobler-blue border border-transparent hover:bg-blue-50 hover:text-tobler-blue',

  white:
    'bg-white text-tobler-heading border border-gray-200 hover:border-tobler-blue hover:text-tobler-blue hover:shadow-lg',
}

const SIZES = {
  sm: 'px-4 py-2.5 text-sm',
  md: 'px-6 py-3.5 text-sm',
  lg: 'px-8 py-4 text-base',
}

function Button({
  children,
  to,
  href,
  onClick,
  type = 'button',
  variant = 'primary',
  size = 'md',
  icon = true,
  className = '',
  ...rest
}) {
  const classes = [
    'inline-flex items-center justify-center gap-2.5',
    'rounded-[10px]',
    'font-sans',
    'font-semibold',
    'tracking-[0.06em]',
    'uppercase',
    'transition-all',
    'duration-300',
    'ease-out',
    'whitespace-nowrap',
    'shadow-sm',
    'hover:shadow-lg',
    'hover:-translate-y-[2px]',
    'active:translate-y-0',
    'focus:outline-none',
    'focus:ring-2',
    'focus:ring-tobler-blue/25',
    VARIANTS[variant] ?? VARIANTS.primary,
    SIZES[size] ?? SIZES.md,
    className,
  ]
    .filter(Boolean)
    .join(' ')

  const content = (
  <>
    <span>{children}</span>

    {icon && (
      <ArrowRight
        className="h-4 w-4 shrink-0 transition-transform duration-300 ease-out group-hover:translate-x-1"
        strokeWidth={1.8}
      />
    )}
  </>
)

  if (to) {
    return (
      <Link to={to} className={classes} {...rest}>
        {content}
      </Link>
    )
  }

  if (href) {
    return (
      <a href={href} className={classes} {...rest}>
        {content}
      </a>
    )
  }

  return (
    <button type={type} onClick={onClick} className={classes} {...rest}>
      {content}
    </button>
  )
}

export default Button
