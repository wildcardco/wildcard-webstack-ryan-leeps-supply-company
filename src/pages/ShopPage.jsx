import { Link } from 'react-router-dom'
import { catalogSurfaces, categories, products } from '../data/catalog'
import { ExternalAnchor, Page, PageHeader, SourceNote } from '../components/Facts'
import { ProductList } from '../components/ProductViews'

const shop = catalogSurfaces.find((surface) => surface.id === 'shopproducts')

export function ShopPage() {
  return (
    <Page title={shop.documentTitle}>
      <PageHeader heading="Shop Products">
        <SourceNote url={shop.sourceUrl} />
        <p>
          Sample shop for the discovered shopproducts page. One source link labeled Shop Products pointed here, and
          another pointed at the counters surface.
        </p>
      </PageHeader>
      <div className="info-grid">
        <section className="info-card">
          <h2>Catalog surfaces</h2>
          <ul className="link-stack">
            {catalogSurfaces.map((surface) => (
              <li key={surface.id}>
                <Link to={surface.to}>{surface.label}</Link>
                <ExternalAnchor href={surface.sourceUrl}>source</ExternalAnchor>
              </li>
            ))}
          </ul>
        </section>
        <section className="info-card info-card-shift">
          <h2>Categories</h2>
          <ul className="link-stack">
            {categories.map((category) => (
              <li key={category.slug}>
                <Link to={category.path}>{category.heading}</Link>
              </li>
            ))}
          </ul>
        </section>
      </div>
      <section>
        <h2>Sample products</h2>
        <ProductList products={products} />
      </section>
    </Page>
  )
}

export function ProductsPage() {
  const surface = catalogSurfaces.find((item) => item.id === 'products')
  return (
    <Page title={surface.documentTitle}>
      <PageHeader heading="Products">
        <SourceNote url={surface.sourceUrl} />
        <p>These are the only products included in this sample.</p>
      </PageHeader>
      <ProductList products={products} />
    </Page>
  )
}

export function CountersPage() {
  const surface = catalogSurfaces.find((item) => item.id === 'counters')
  return (
    <Page title={surface.documentTitle}>
      <PageHeader heading="counters">
        <SourceNote url={surface.sourceUrl} />
        <p>
          None of the three sample products are counters, so this page lists no products. The header COUNTERS link goes
          to the counters site.
        </p>
        <p>
          <ExternalAnchor href="http://www.leepscounters.com/">COUNTERS</ExternalAnchor>
        </p>
        <p>
          <Link to="/products">Browse the sample products</Link>
        </p>
      </PageHeader>
    </Page>
  )
}
