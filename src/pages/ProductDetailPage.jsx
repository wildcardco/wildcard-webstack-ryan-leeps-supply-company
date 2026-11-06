import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { availabilityLabel, getCategory, getProduct, priceLabel } from '../data/catalog'
import { useCart } from '../context/CartContext'
import { ExternalAnchor, Page, PageHeader } from '../components/Facts'
import { AvailabilityBlock, PriceBlock } from '../components/ProductViews'
import { usePageTitle } from '../hooks/usePageTitle'

export function ProductDetailPage() {
  const { slug } = useParams()
  const product = getProduct(slug)
  usePageTitle(product ? product.name : 'Page not in this sample | Leeps Supply Company')
  const { addItem } = useCart()
  const [imageIndex, setImageIndex] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [added, setAdded] = useState(false)

  if (!product) {
    return (
      <Page title="Page not in this sample | Leeps Supply Company">
        <PageHeader heading="Page not in this sample">
          <p>That product is not one of the three sample pages.</p>
          <p>
            <Link to="/products">Browse the sample products</Link>
          </p>
        </PageHeader>
      </Page>
    )
  }

  const category = product.categorySlugs.length ? getCategory(product.categorySlugs[0]) : null
  const image = product.images[imageIndex] || product.images[0]

  return (
    <div className="detail">
      <nav aria-label="Breadcrumb" className="crumbs">
        <ol>
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
      <div className="detail-layout">
        <div className="detail-media reveal">
          {image ? (
            <img
              className="detail-hero-img photo-settle"
              src={image.src}
              alt={`${product.name} product image ${imageIndex + 1}`}
              width={image.width}
              height={image.height}
            />
          ) : null}
          {product.images.length > 1 ? (
            <ul className="thumbs">
              {product.images.map((item, index) => (
                <li key={item.src}>
                  <button
                    type="button"
                    aria-pressed={index === imageIndex}
                    onClick={() => setImageIndex(index)}
                  >
                    <img src={item.src} alt="" />
                    <span className="sr-only">
                      Show image {index + 1} of {product.name}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          ) : null}
        </div>
        <div className="detail-buy reveal">
          <h1 data-testid="product-title">{product.name}</h1>
          <span className="draw-rule rule-red" />
          <p>
            Brand <Link to={`/brands/${product.brandSlug}`}>{product.brand}</Link>
          </p>
          <p>Part number {product.partNumber}</p>
          <p>{product.shortDescription}</p>
          <PriceBlock product={product} />
          <AvailabilityBlock product={product} />
          <form
            className="buy-row"
            onSubmit={(event) => {
              event.preventDefault()
              const qty = Number.parseInt(quantity, 10)
              if (!Number.isInteger(qty) || qty < 1) return
              addItem(product.slug, qty)
              setAdded(true)
            }}
          >
            <label className="field field-inline" htmlFor={`qty-${product.slug}`}>
              Quantity
              <input
                id={`qty-${product.slug}`}
                className="qty-input"
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
            <button type="submit" className="btn" data-testid={`detail-add-${product.slug}`}>
              Add to cart
            </button>
          </form>
          {added ? (
            <p role="status" className="status-line">
              Added to cart. <Link to="/cart">View cart</Link>
            </p>
          ) : null}
          <p className="fine">
            Shown price text: {priceLabel(product)}. Availability in this sample: {availabilityLabel(product)}.
          </p>
        </div>
      </div>
      <section className="notes reveal">
        <h2>Source notes</h2>
        <p>
          These notes are what discovery captured on the source page. They are a record of that capture, and this
          sample does not re-check a live quote or live inventory.
        </p>
        <p>Price observation: {product.priceObservation}</p>
        <p>Availability observation: {product.availabilityObservation}</p>
        <p>
          <ExternalAnchor href={product.sourceUrl}>Source product page</ExternalAnchor>
        </p>
        <ul>
          {product.images.map((item) => (
            <li key={item.sourceUrl}>{item.sourceUrl}</li>
          ))}
        </ul>
      </section>
    </div>
  )
}
