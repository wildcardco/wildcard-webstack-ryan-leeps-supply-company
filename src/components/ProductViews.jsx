import { useState } from 'react'
import { Link } from 'react-router-dom'
import { availabilityLabel, priceLabel } from '../data/catalog'
import { useCart } from '../context/CartContext'

export function PriceBlock({ product }) {
  return (
    <p data-testid={`price-${product.slug}`}>
      <span className="font-semibold">{priceLabel(product)}</span>
    </p>
  )
}

export function AvailabilityBlock({ product }) {
  return (
    <p data-testid={`availability-${product.slug}`}>
      <span className="font-semibold">{availabilityLabel(product)}</span>
    </p>
  )
}

function LocalImage({ image, alt, className }) {
  const [failed, setFailed] = useState(false)
  if (failed) {
    return (
      <div className={`grid place-items-center bg-surface text-sm text-muted ${className}`} role="img" aria-label={alt}>
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
    <article className="flex h-full flex-col border border-line bg-surface p-3" data-testid={`card-${product.slug}`}>
      <Link to={product.path} data-testid={`product-link-${product.slug}`}>
        {image ? (
          <LocalImage image={image} alt="" className="aspect-square w-full object-contain" />
        ) : null}
        <h3 className="mt-3 text-base font-semibold">{product.name}</h3>
      </Link>
      <p className="mt-1 text-sm text-muted">{product.brand}</p>
      <p className="text-sm">Part number {product.partNumber}</p>
      <div className="mt-2">
        <PriceBlock product={product} />
      </div>
      <div className="mt-auto flex flex-wrap items-center gap-3 pt-3">
        <button
          type="button"
          className="min-h-11 border border-ink bg-accent px-3 text-accent-contrast"
          data-testid={`add-${product.slug}`}
          onClick={() => {
            addItem(product.slug, 1)
            setAdded(true)
          }}
        >
          Add to cart
        </button>
        {added ? (
          <p role="status" className="text-sm">
            Added to cart. <Link to="/cart">View cart</Link>
          </p>
        ) : null}
      </div>
    </article>
  )
}

export function ProductList({ products }) {
  if (!products.length) return null
  return (
    <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {products.map((product) => (
        <li key={product.slug}>
          <ProductCard product={product} />
        </li>
      ))}
    </ul>
  )
}
