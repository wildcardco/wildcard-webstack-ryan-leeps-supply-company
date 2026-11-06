import { useLocation, Link } from 'react-router-dom'
import { loadTestReview } from '../cart/testReview'
import { Page, TestBanner } from '../components/Facts'

export function ConfirmationPage() {
  const location = useLocation()
  const review = location.state?.review || loadTestReview()

  return (
    <Page title="Test review | Leeps Supply Company">
      <TestBanner />
      <h1 className="mt-4 text-2xl font-semibold">Test review only</h1>
      {!review ? (
        <div className="mt-4">
          <p>No local test review is stored in this browser tab.</p>
          <p className="mt-3">
            <Link to="/cart">Return to cart</Link>
          </p>
        </div>
      ) : (
        <div className="mt-4 max-w-3xl" data-testid="test-review">
          <p>No payment was collected. No order was placed. No information was sent.</p>
          <p className="mt-2">Local test reference: {review.reference}</p>
          <p className="mt-2">The browser cart was left unchanged.</p>
          <ul className="mt-4 flex flex-col gap-3">
            {review.items.map((item) => (
              <li key={item.slug} className="border border-line bg-surface p-3">
                <p className="font-semibold">{item.name}</p>
                <p className="text-sm">Part number {item.partNumber}</p>
                <p>Quantity {item.quantity}</p>
                <p>{item.priceLabel}</p>
              </li>
            ))}
          </ul>
          <p className="mt-4">
            <Link to="/cart">Return to cart</Link>
            {' · '}
            <Link to="/products">Sample products</Link>
          </p>
        </div>
      )}
    </Page>
  )
}
