import { Link } from 'react-router-dom'
import { catalogSurfaces, categories, products } from '../data/catalog'
import { ExternalAnchor, Page, SourceNote } from '../components/Facts'
import { ProductList } from '../components/ProductViews'

const shop = catalogSurfaces.find((surface) => surface.id === 'shopproducts')

export function ShopPage() {
  return (
    <Page title={shop.documentTitle}>
      <h1 className="text-2xl font-semibold">Shop Products</h1>
      <SourceNote url={shop.sourceUrl} />
      <p className="mt-4 max-w-3xl">
        Sample shop for the discovered shopproducts page. One source link labeled Shop Products pointed here, and
        another pointed at the counters surface.
      </p>
      <section className="mt-6">
        <h2 className="text-xl font-semibold">Catalog surfaces</h2>
        <ul className="mt-3 flex flex-col gap-2">
          {catalogSurfaces.map((surface) => (
            <li key={surface.id}>
              <Link to={surface.to}>{surface.label}</Link>
              <span className="text-sm text-muted"> — </span>
              <ExternalAnchor href={surface.sourceUrl} className="text-sm">
                source
              </ExternalAnchor>
            </li>
          ))}
        </ul>
      </section>
      <section className="mt-6">
        <h2 className="text-xl font-semibold">Categories</h2>
        <ul className="mt-3 flex flex-col gap-2">
          {categories.map((category) => (
            <li key={category.slug}>
              <Link to={category.path}>{category.heading}</Link>
            </li>
          ))}
        </ul>
      </section>
      <section className="mt-8">
        <h2 className="text-xl font-semibold">Sample products</h2>
        <div className="mt-4">
          <ProductList products={products} />
        </div>
      </section>
    </Page>
  )
}

export function ProductsPage() {
  const surface = catalogSurfaces.find((item) => item.id === 'products')
  return (
    <Page title={surface.documentTitle}>
      <h1 className="text-2xl font-semibold">Products</h1>
      <SourceNote url={surface.sourceUrl} />
      <p className="mt-4">These are the only products included in this sample.</p>
      <div className="mt-4">
        <ProductList products={products} />
      </div>
    </Page>
  )
}

export function CountersPage() {
  const surface = catalogSurfaces.find((item) => item.id === 'counters')
  return (
    <Page title={surface.documentTitle}>
      <h1 className="text-2xl font-semibold">counters</h1>
      <SourceNote url={surface.sourceUrl} />
      <p className="mt-4 max-w-3xl">
        None of the three sample products are counters, so this page lists no products. The header COUNTERS link goes
        to the counters site.
      </p>
      <p className="mt-3">
        <ExternalAnchor href="http://www.leepscounters.com/">COUNTERS</ExternalAnchor>
      </p>
      <p className="mt-6">
        <Link to="/products">Browse the sample products</Link>
      </p>
    </Page>
  )
}
