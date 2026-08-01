function CornerMarks({ always = false, className = '' }) {
  return (
    <div className={`crop-marks ${always ? 'always' : ''} ${className}`} aria-hidden="true">
      <span />
      <span />
      <span />
      <span />
    </div>
  )
}

export default CornerMarks
