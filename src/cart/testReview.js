/** Local test review. Never an order and never sent to a server. */

export const TEST_REVIEW_STORAGE_KEY = 'leeps-sample-test-review'

export function buildTestReview(lines) {
  return {
    kind: 'local-test-review',
    reference: `LOCAL-TEST-${Date.now().toString(36)}`,
    paymentCollected: false,
    orderPlaced: false,
    transmitted: false,
    items: lines.map((line) => ({
      slug: line.slug,
      name: line.name,
      partNumber: line.partNumber,
      quantity: line.quantity,
      price: null,
      priceLabel: line.priceLabel,
    })),
  }
}

export function saveTestReview(review) {
  sessionStorage.setItem(TEST_REVIEW_STORAGE_KEY, JSON.stringify(review))
  return review
}

export function loadTestReview() {
  try {
    const raw = sessionStorage.getItem(TEST_REVIEW_STORAGE_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw)
    if (!parsed || parsed.kind !== 'local-test-review') return null
    if (parsed.orderPlaced !== false || parsed.paymentCollected !== false || parsed.transmitted !== false) {
      return null
    }
    if (!Array.isArray(parsed.items)) return null
    return parsed
  } catch {
    return null
  }
}
