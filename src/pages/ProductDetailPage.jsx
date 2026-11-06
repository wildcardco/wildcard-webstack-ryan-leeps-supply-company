import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { availabilityLabel, getCategory, getProduct, priceLabel } from '../data/catalog'
import { useCart } from '../context/CartContext'
import { ExternalAnchor, Page } from '../components/Facts'
import { AvailabilityBlock, PriceBlock } from '../components/ProductViews'

export function ProductDetailPage() {
  const { slug } = useParams()
  const product = getProduct(slug)
  const { addItem } = useCart()
  const [imageIndex, setImageIndex] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [added, setAdded] = useState(false)

  if (!product) {
    return (
      <Page title="Page not in this sample | Leeps Supply Company">
        <h1 className="text-2xl font-semibold">Page not in this sample</h1>
        <p className="mt-3">That product is not one of the three sample pages.</p>
        <p className="mt-3">
          <Link to="/products">Browse the sample products</Link>
        </p>
      </Page>
    )
  }

  const category = product.categorySlugs.length ? getCategory(product.categorySlugs[0]) : null
  const image = product.images[imageIndex] || product.images[0]

  return (
    <Page title={product.name}>
      <nav aria-label="Breadcrumb" className="text-sm">
        <ol className="flex flex-wrap gap-x-2 gap-y-1">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li aria-hidden="true">/</li>
          <li>
            <Link to="/shopproducts">Shop Products</Link>
          </li>
          {category ? (
            <>
              <li aria-hidden="true">/</li>
              <li>
                <Link to={category.path}>{category.heading}</Link>
              </li>
            </>
          ) : null}
          <li aria-hidden="true">/</li>
          <li aria-current="page">{product.partNumber}</li>
        </ol>
      </nav>
      <div className="mt-4 grid gap-6 md:grid-cols-2">
        <div>
          {image ? (
            <img
              src={image.src}
              alt={`${product.name} product image ${imageIndex + 1}`}
              width={image.width}
              height={image.height}
              className="aspect-square w-full border border-line bg-surface object-contain"
            />
          ) : null}
          {product.images.length > 1 ? (
            <ul className="mt-3 flex gap-2">
              {product.images.map((item, index) => (
                <li key={item.src}>
                  <button
                    type="button"
                    className="relative h-16 w-16 overflow-hidden border border-line bg-surface"
                    aria-pressed={index === imageIndex}
                    onClick={() => setImageIndex(index)}
                  >
                    <img src={item.src} alt="" className="h-full w-full object-contain" />
                    <span className="sr-only">Show image {index + 1} of {product.name}</span>
                  </button>
                </li>
              ))}
            </ul>
          ) : null}
        </div>
        <div>
          <h1 className="text-2xl font-semibold" data-testid="product-title">
            {product.name}
          </h1>
          <p className="mt-2">
            Brand <Link to={`/brands/${product.brandSlug}`}>{product.brand}</Link>
          </p>
          <p>Part number {product.partNumber}</p>
          <p className="mt-3">{product.shortDescription}</p>
          <div className="mt-4">
            <PriceBlock product={product} />
            <AvailabilityBlock product={product} />
          </div>
          <form
            className="mt-4 flex flex-wrap items-end gap-3"
            onSubmit={(event) => {
              event.preventDefault()
              const qty = Number.parseInt(quantity, 10)
              if (!Number.isInteger(qty) || qty < 1) return
              addItem(product.slug, qty)
              setAdded(true)
            }}
          >
            <label className="text-sm font-semibold" htmlFor={`qty-${product.slug}`}>
              Quantity
              <input
                id={`qty-${product.slug}`}
                className="mt-1 block w-24 border border-line bg-surface px-3 py-2"
                inputMode="numeric"
                value={quantity}
                data-testid={`detail-qty-${product.slug}`}
                onChange={(event) => {
                  const next = Number.parseInt(event.target.value, 10)
                  if (event.target.value.trim() === '') {
                    setQuantity('')
                    return
                  }
                  if (Number.isInteger(next) && next >= 1 && next <= 999) setQuantity(next)
                }}
              />
            </label>
            <button
              type="submit"
              className="min-h-11 border border-ink bg-accent px-3 text-accent-contrast"
              data-testid={`detail-add-${product.slug}`}
            >
              Add to cart
            </button>
          </form>
          {added ? (
            <p role="status" className="mt-3 text-sm">
              Added to cart. <Link to="/cart">View cart</Link>
            </p>
          ) : null}
          <p className="mt-4 text-sm text-muted">
            Shown price text: {priceLabel(product)}. Availability in this sample: {availabilityLabel(product)}.
          </p>
        </div>
      </div>
      <section className="mt-8 max-w-3xl">
        <h2 className="text-xl font-semibold">Source notes</h2>
        <p className="mt-2">
          These notes are what discovery captured on the source page. They are a record of that capture, and this
          sample does not re-check a live quote or live inventory.
        </p>
        <p className="mt-2">Price observation: {product.priceObservation}</p>
        <p className="mt-2">Availability observation: {product.availabilityObservation}</p>
        <p className="mt-3 break-all">
          <ExternalAnchor href={product.sourceUrl}>Source product page</ExternalAnchor>
        </p>
        <ul className="mt-3 list-disc break-all pl-5 text-sm">
          {product.images.map((item) => (
            <li key={item.sourceUrl}>{item.sourceUrl}</li>
          ))}
        </ul>
      </section>
    </Page>
  )
}
