import { Link } from 'react-router-dom'
import { cartNav, getProduct, priceLabel } from '../data/catalog'
import { useCart } from '../context/CartContext'
import { Page, SourceNote } from '../components/Facts'

export function CartPage() {
  const { items, count, setItemQuantity, removeItem } = useCart()
  const lines = items
    .map((item) => ({ ...item, product: getProduct(item.slug) }))
    .filter((item) => item.product)

  return (
    <Page title="Cart | Leeps Supply Company">
      <h1 className="text-2xl font-semibold">Cart ({count})</h1>
      <SourceNote url={cartNav.sourceUrl}>Live site cart</SourceNote>
      <p className="mt-3 max-w-3xl">
        This cart is stored in this browser. The live Leeps cart is a separate page. Pricing that was not observed is
        left as a label, and this sample does not calculate a total.
      </p>
      {lines.length === 0 ? (
        <div className="mt-6">
          <p>Your cart is empty.</p>
          <p className="mt-3">
            <Link to="/products">Browse the sample products</Link>
          </p>
        </div>
      ) : (
        <ul className="mt-6 flex flex-col gap-4">
          {lines.map((line) => (
            <li key={line.slug} className="grid gap-3 border border-line bg-surface p-3 sm:grid-cols-[6rem_1fr]">
              <img
                src={line.product.images[0].src}
                alt=""
                className="h-24 w-full object-contain sm:w-24"
              />
              <div>
                <h2 className="font-semibold">
                  <Link to={line.product.path}>{line.product.name}</Link>
                </h2>
                <p className="text-sm">Part number {line.product.partNumber}</p>
                <p className="mt-1">{priceLabel(line.product)}</p>
                <div className="mt-3 flex flex-wrap items-center gap-2">
                  <button
                    type="button"
                    className="min-h-11 min-w-11 border border-line bg-surface"
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
                    className="h-11 w-16 border border-line bg-surface px-2 text-center"
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
                    className="min-h-11 min-w-11 border border-line bg-surface"
                    aria-label={`Increase quantity for ${line.product.name}`}
                    onClick={() => setItemQuantity(line.slug, line.quantity + 1)}
                  >
                    +
                  </button>
                  <button
                    type="button"
                    className="min-h-11 border border-line bg-surface px-3"
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
      <div className="mt-6">
        <Link to="/checkout" className="inline-flex min-h-11 items-center border border-ink bg-accent px-3 text-accent-contrast" data-testid="go-checkout">
          Continue to test checkout
        </Link>
      </div>
    </Page>
  )
}
