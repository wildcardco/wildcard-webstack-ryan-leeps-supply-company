import { Link } from 'react-router-dom'
import { cartNav, getProduct, priceLabel } from '../data/catalog'
import { useCart } from '../context/CartContext'
import { Page, PageHeader, SourceNote } from '../components/Facts'

export function CartPage() {
  const { items, count, setItemQuantity, removeItem } = useCart()
  const lines = items
    .map((item) => ({ ...item, product: getProduct(item.slug) }))
    .filter((item) => item.product)

  return (
    <Page title="Cart | Leeps Supply Company">
      <PageHeader heading={`Cart (${count})`}>
        <SourceNote url={cartNav.sourceUrl}>Live site cart</SourceNote>
        <p>
          This cart is stored in this browser. The live Leeps cart is a separate page. Pricing that was not observed is
          left as a label, and this sample does not calculate a total.
        </p>
      </PageHeader>
      {lines.length === 0 ? (
        <div className="empty-note">
          <p>Your cart is empty.</p>
          <p>
            <Link to="/products">Browse the sample products</Link>
          </p>
        </div>
      ) : (
        <ul className="stack-list">
          {lines.map((line) => (
            <li key={line.slug} className="stack-card">
              <img src={line.product.images[0].src} alt="" />
              <div>
                <h2>
                  <Link to={line.product.path}>{line.product.name}</Link>
                </h2>
                <p className="meta-line">Part number {line.product.partNumber}</p>
                <p className="price-line">{priceLabel(line.product)}</p>
                <div className="stepper">
                  <button
                    type="button"
                    className="icon-btn"
                    aria-label={`Decrease quantity for ${line.product.name}`}
                    disabled={line.quantity <= 1}
                    onClick={() => setItemQuantity(line.slug, line.quantity - 1)}
                  >
                    −
                  </button>
                  <label className="sr-only" htmlFor={`cart-qty-${line.slug}`}>
                    Quantity for {line.product.name}
                  </label>
                  <input
                    id={`cart-qty-${line.slug}`}
                    inputMode="numeric"
                    value={line.quantity}
                    data-testid={`qty-${line.slug}`}
                    onChange={(event) => {
                      if (event.target.value.trim() === '') return
                      setItemQuantity(line.slug, event.target.value)
                    }}
                  />
                  <button
                    type="button"
                    className="icon-btn"
                    aria-label={`Increase quantity for ${line.product.name}`}
                    onClick={() => setItemQuantity(line.slug, line.quantity + 1)}
                  >
                    +
                  </button>
                  <button
                    type="button"
                    className="btn-ghost btn"
                    data-testid={`remove-${line.slug}`}
                    onClick={() => removeItem(line.slug)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
      <p>
        <Link to="/checkout" className="btn" data-testid="go-checkout">
          Continue to test checkout
        </Link>
      </p>
    </Page>
  )
}
