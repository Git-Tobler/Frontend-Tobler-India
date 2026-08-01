function FormField({
  label,
  name,
  type = 'text',
  as = 'input',
  required = false,
  error,
  options = [],
  ...rest
}) {
  const baseClasses = `w-full rounded-form border px-4 py-3 text-sm text-tobler-heading placeholder:text-tobler-body/50 bg-white transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-tobler-blue/30 ${
    error ? 'border-tobler-error' : 'border-tobler-border focus:border-tobler-blue'
  }`

  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={name} className="text-sm font-semibold text-tobler-heading">
        {label} {required && <span className="text-tobler-error">*</span>}
      </label>

      {as === 'textarea' ? (
        <textarea id={name} name={name} rows={5} className={baseClasses} {...rest} />
      ) : as === 'select' ? (
        <select id={name} name={name} className={baseClasses} {...rest}>
          <option value="">Select an option</option>
          {options.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      ) : (
        <input id={name} name={name} type={type} className={baseClasses} {...rest} />
      )}

      {error && <span className="text-xs text-tobler-error">{error}</span>}
    </div>
  )
}

export default FormField
