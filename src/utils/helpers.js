export function slugify(text) {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

export function truncate(text, length = 120) {
  if (!text || text.length <= length) return text
  return `${text.slice(0, length).trim()}…`
}

export function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

export function isValidPhone(phone) {
  return /^[+]?[\d\s()-]{7,15}$/.test(phone)
}
