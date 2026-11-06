import { useState } from 'react'
import { Link } from 'react-router-dom'
import { availabilityLabel, priceLabel } from '../data/catalog'
import { useCart } from '../context/CartContext'

export function PriceBlock({ product }) {
  return (
    <p className="price-line" data-testid={`price-${product.slug}`}>
      {priceLabel(product)}
    </p>
  )
}

export function AvailabilityBlock({ product }) {
  return (
    <p className="avail-line" data-testid={`availability-${product.slug}`}>
      {availabilityLabel(product)}
    </p>
  )
}

function LocalImage({ image, alt, className }) {
  const [failed, setFailed] = useState(false)
  if (failed) {
    return (
      <div className={`grid place-items-center bg-surface text-sm text-muted ${className || ''}`} role="img" aria-label={alt}>
        Image file unavailable
      </div>
    )
  }
  return (
    <img
      src={image.src}
      alt={alt}
      width={image.width}
      height={image.height}
      className={className}
      onError={() => setFailed(true)}
    />
  )
}

export function ProductCard({ product }) {
  const { addItem } = useCart()
  const [added, setAdded] = useState(false)
  const image = product.images[0]

  return (
    <article className="product-card reveal" data-testid={`card-${product.slug}`}>
      <Link to={product.path} className="product-card-media" aria-label={product.name}>
        {image ? <LocalImage image={image} alt="" className="photo-settle" /> : null}
      </Link>
      <div className="product-card-body">
        <p className="eyebrow">{product.brand}</p>
        <h3>
          <Link to={product.path} data-testid={`product-link-${product.slug}`}>
            {product.name}
          </Link>
        </h3>
        <p className="meta-line">Part number {product.partNumber}</p>
        <PriceBlock product={product} />
        <div className="card-actions">
          <button
            type="button"
            className="btn"
            data-testid={`add-${product.slug}`}
            onClick={() => {
              addItem(product.slug, 1)
              setAdded(true)
            }}
          >
            Add to cart
          </button>
          {added ? (
            <p role="status" className="status-line">
              Added to cart. <Link to="/cart">View cart</Link>
            </p>
          ) : null}
        </div>
      </div>
    </article>
  )
}

export function ProductList({ products }) {
  if (!products.length) return null
  return (
    <ul className="product-stage">
      {products.map((product) => (
        <li key={product.slug}>
          <ProductCard product={product} />
        </li>
      ))}
    </ul>
  )
}
