/** Browser cart state. Slug and quantity only. No prices, tax, or shipping. */

export const CART_STORAGE_KEY = 'leeps-sample-cart-v1'

export function normalizeQuantity(value) {
  const number = typeof value === 'number' ? value : Number.parseInt(String(value), 10)
  if (!Number.isInteger(number) || number < 1 || number > 999) return null
  return number
}

export function sanitizeCart(items, isKnownSlug) {
  if (!Array.isArray(items)) return []
  const next = []
  for (const item of items) {
    if (!item || typeof item !== 'object') continue
    if (typeof item.slug !== 'string' || !isKnownSlug(item.slug)) continue
    const quantity = normalizeQuantity(item.quantity)
    if (!quantity) continue
    if (next.some((existing) => existing.slug === item.slug)) continue
    next.push({ slug: item.slug, quantity })
  }
  return next
}

export function addToCart(items, slug, quantity, isKnownSlug) {
  const qty = normalizeQuantity(quantity)
  if (!qty || typeof slug !== 'string' || !isKnownSlug(slug)) return items
  const index = items.findIndex((item) => item.slug === slug)
  if (index === -1) return [...items, { slug, quantity: qty }]
  return items.map((item, itemIndex) => {
    if (itemIndex !== index) return item
    return { slug, quantity: Math.min(item.quantity + qty, 999) }
  })
}

export function setQuantity(items, slug, quantity) {
  const qty = normalizeQuantity(quantity)
  if (!qty) return items
  if (!items.some((item) => item.slug === slug)) return items
  return items.map((item) => (item.slug === slug ? { slug, quantity: qty } : item))
}

export function removeFromCart(items, slug) {
  return items.filter((item) => item.slug !== slug)
}

export function cartCount(items) {
  return items.reduce((sum, item) => sum + item.quantity, 0)
}

export function loadCart(isKnownSlug) {
  try {
    const raw = localStorage.getItem(CART_STORAGE_KEY)
    if (!raw) return []
    return sanitizeCart(JSON.parse(raw), isKnownSlug)
  } catch {
    return []
  }
}

export function saveCart(items) {
  localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items))
}
