import { Link, useNavigate } from 'react-router-dom'
import { getProduct, priceLabel } from '../data/catalog'
import { buildTestReview, saveTestReview } from '../cart/testReview'
import { useCart } from '../context/CartContext'
import { Page, PageHeader, TestBanner } from '../components/Facts'

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
        image: product.images[0]?.src,
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
    <Page title="Test checkout | Leeps Supply Company" banner={<TestBanner />}>
      <PageHeader heading="Test checkout">
        <p>
          Review the sample cart in this browser. Confirming writes a local test reference in this tab. It does not
          contact a payment provider, send a notification, collect customer details, or place an order.
        </p>
      </PageHeader>
      {lines.length === 0 ? (
        <div className="empty-note">
          <p>Your cart is empty, so there is nothing to review.</p>
          <p>
            <Link to="/products">Browse the sample products</Link>
          </p>
        </div>
      ) : (
        <ul className="stack-list">
          {lines.map((line) => (
            <li key={line.slug} className="stack-card" data-testid={`review-${line.slug}`}>
              {line.image ? <img src={line.image} alt="" /> : null}
              <div>
                <p className="price-line">{line.name}</p>
                <p className="meta-line">Part number {line.partNumber}</p>
                <p>Quantity {line.quantity}</p>
                <p>{line.priceLabel}</p>
              </div>
            </li>
          ))}
        </ul>
      )}
      <p>No total is shown. Observed prices were blank, still loading, or Call for Price.</p>
      <button
        type="button"
        className="btn"
        data-testid="confirm-test-review"
        disabled={lines.length === 0}
        onClick={confirmTestReview}
      >
        Confirm test review
      </button>
    </Page>
  )
}
