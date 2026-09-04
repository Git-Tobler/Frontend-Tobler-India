function Card({ children, className = '', hover = true }) {
  return (
    <div
      className={`group relative bg-white border border-tobler-border rounded-card p-7 transition-all duration-300 ease-premium ${
        hover ? 'hover:shadow-card hover:-translate-y-1 hover:border-tobler-heading/30' : ''
      } ${className}`}
    >
      {children}
    </div>
  )
}

export default Card
