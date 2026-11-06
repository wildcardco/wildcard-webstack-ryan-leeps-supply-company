import { useLocation, Link } from 'react-router-dom'
import { getProduct } from '../data/catalog'
import { loadTestReview } from '../cart/testReview'
import { Page, PageHeader, TestBanner } from '../components/Facts'

export function ConfirmationPage() {
  const location = useLocation()
  const review = location.state?.review || loadTestReview()

  return (
    <Page title="Test review | Leeps Supply Company" banner={<TestBanner />}>
      <PageHeader heading="Test review only" />
      {!review ? (
        <div className="empty-note">
          <p>No local test review is stored in this browser tab.</p>
          <p>
            <Link to="/cart">Return to cart</Link>
          </p>
        </div>
      ) : (
        <div data-testid="test-review">
          <p>No payment was collected. No order was placed. No information was sent.</p>
          <p>Local test reference: {review.reference}</p>
          <p>The browser cart was left unchanged.</p>
          <ul className="stack-list">
            {review.items.map((item) => {
              const product = getProduct(item.slug)
              return (
                <li key={item.slug} className="stack-card">
                  {product?.images[0] ? <img src={product.images[0].src} alt="" /> : null}
                  <div>
                    <p className="price-line">{item.name}</p>
                    <p className="meta-line">Part number {item.partNumber}</p>
                    <p>Quantity {item.quantity}</p>
                    <p>{item.priceLabel}</p>
                  </div>
                </li>
              )
            })}
          </ul>
          <p className="inline-links">
            <Link to="/cart">Return to cart</Link>
            <Link to="/products">Sample products</Link>
          </p>
        </div>
      )}
    </Page>
  )
}
