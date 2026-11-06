import { Link, useNavigate } from 'react-router-dom'
import { getProduct, priceLabel } from '../data/catalog'
import { buildTestReview, saveTestReview } from '../cart/testReview'
import { useCart } from '../context/CartContext'
import { Page, TestBanner } from '../components/Facts'

export function CheckoutPage() {
  const { items } = useCart()
  const navigate = useNavigate()
  const lines = items
    .map((item) => {
      const product = getProduct(item.slug)
      if (!product) return null
      return {
        slug: product.slug,
        name: product.name,
        partNumber: product.partNumber,
        quantity: item.quantity,
        priceLabel: priceLabel(product),
      }
    })
    .filter(Boolean)

  function confirmTestReview() {
    if (!lines.length) return
    const review = buildTestReview(lines)
    saveTestReview(review)
    navigate('/checkout/confirmation', { state: { review } })
  }

  return (
    <Page title="Test checkout | Leeps Supply Company">
      <TestBanner />
      <h1 className="mt-4 text-2xl font-semibold">Test checkout</h1>
      <p className="mt-3 max-w-3xl">
        Review the sample cart in this browser. Confirming writes a local test reference in this tab. It does not
        contact a payment provider, send a notification, collect customer details, or place an order.
      </p>
      {lines.length === 0 ? (
        <div className="mt-6">
          <p>Your cart is empty, so there is nothing to review.</p>
          <p className="mt-3">
            <Link to="/products">Browse the sample products</Link>
          </p>
        </div>
      ) : (
        <ul className="mt-6 flex flex-col gap-3">
          {lines.map((line) => (
            <li key={line.slug} className="border border-line bg-surface p-3" data-testid={`review-${line.slug}`}>
              <p className="font-semibold">{line.name}</p>
              <p className="text-sm">Part number {line.partNumber}</p>
              <p>Quantity {line.quantity}</p>
              <p>{line.priceLabel}</p>
            </li>
          ))}
        </ul>
      )}
      <p className="mt-4 text-sm">No total is shown. Observed prices were blank, still loading, or Call for Price.</p>
      <button
        type="button"
        className="mt-4 min-h-11 border border-ink bg-accent px-3 text-accent-contrast disabled:opacity-50"
        data-testid="confirm-test-review"
        disabled={lines.length === 0}
        onClick={confirmTestReview}
      >
        Confirm test review
      </button>
    </Page>
  )
}
