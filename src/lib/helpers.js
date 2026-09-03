export function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

export function isValidPhone(phone) {
  return /^[+]?[\d\s()-]{7,15}$/.test(phone)
}
