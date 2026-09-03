import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

const VARIANTS = {
  primary:
    'bg-tobler-blue text-white border border-tobler-blue hover:bg-tobler-blue-dark hover:border-tobler-blue-dark hover:shadow-xl hover:-translate-y-0.5 focus:ring-tobler-blue/25',

  secondary:
    'bg-white text-tobler-blue border border-tobler-blue hover:bg-tobler-blue hover:text-white hover:shadow-xl hover:-translate-y-0.5 focus:ring-tobler-blue/25',

  accent:
    'bg-tobler-gold text-tobler-heading border border-tobler-gold hover:bg-tobler-gold-dark hover:border-tobler-gold-dark hover:shadow-xl hover:-translate-y-0.5 focus:ring-tobler-blue/25',

  ghost:
    'bg-transparent text-tobler-blue border border-transparent hover:bg-tobler-blue/5 hover:text-tobler-blue focus:ring-tobler-blue/25',

  white:
    'bg-white text-tobler-heading border border-tobler-border hover:border-tobler-blue hover:text-tobler-blue hover:shadow-lg focus:ring-tobler-blue/25',

  /* ------------------------------------------------------------------------
     Homepage variants — pair these with shape="pill". Kept separate from the
     five above so the inner pages keep the navy/gold button language.
     ------------------------------------------------------------------------ */
  shopify:
    'bg-shopify-green text-white border border-shopify-green hover:bg-shopify-green-dark hover:border-shopify-green-dark focus:ring-shopify-green/30',

  'shopify-outline':
    'bg-transparent text-shopify-ink border border-shopify-ink/25 hover:border-shopify-ink hover:bg-shopify-ink/[0.04] focus:ring-shopify-green/30',

  'shopify-light':
    'bg-white text-shopify-ink border border-transparent hover:bg-white/90 focus:ring-white/40',
}

/* Radius, casing and hover motion travel together — the Swiss buttons are
   sharp, tracked-out uppercase with a lift; the homepage ones are pill,
   sentence case and barely move. */
const SHAPES = {
  default:
    'rounded-btn uppercase tracking-[0.06em] shadow-sm hover:shadow-lg hover:-translate-y-[2px]',

  pill:
    'rounded-pill normal-case tracking-[-0.01em] hover:-translate-y-px',
}

const SIZES = {
  sm: 'px-4 py-2.5 text-sm',
  md: 'px-6 py-3.5 text-sm',
  lg: 'px-8 py-4 text-base',
  xl: 'px-8 py-4 text-base md:px-9 md:py-[1.15rem] md:text-[1.0625rem]',
}

function Button({
  children,
  to,
  href,
  onClick,
  type = 'button',
  variant = 'primary',
  size = 'md',
  shape = 'default',
  icon = true,
  className = '',
  ...rest
}) {
  const classes = [
    'inline-flex items-center justify-center gap-2.5',
    'font-sans',
    'font-semibold',
    'transition-all',
    'duration-300',
    'ease-out',
    'whitespace-nowrap',
    'active:translate-y-0',
    'focus:outline-none',
    'focus:ring-2',
    SHAPES[shape] ?? SHAPES.default,
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
        aria-hidden="true"
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
