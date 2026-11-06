import { Link } from 'react-router-dom'
import { business, products, sampleNotes } from '../data/catalog'
import { CategoryLinkList, ExternalAnchor, LocationLists, Page, PhoneList } from '../components/Facts'
import { ProductList } from '../components/ProductViews'

export function HomePage() {
  return (
    <Page title={business.homepageTitle}>
      <h1 className="text-2xl font-semibold">{business.name}</h1>
      <p className="mt-2">
        {business.town}, {business.region}
      </p>
      <p className="mt-1 text-sm text-muted">Street and ZIP are omitted here because they were not verified.</p>
      <div className="mt-4">
        <PhoneList />
      </div>
      <p className="mt-3">
        <ExternalAnchor href={business.website}>Source site: leeps.com</ExternalAnchor>
      </p>
      <p className="mt-4 max-w-3xl">
        This sample includes the three product pages captured for the demo, category labels from the source catalog,
        and a browser cart. It is a working sample of the storefront foundation, and the live catalog stays on
        leeps.com.
      </p>
      <section className="mt-8">
        <h2 className="text-xl font-semibold">Sample products</h2>
        <div className="mt-4">
          <ProductList products={products} />
        </div>
      </section>
      <section className="mt-8">
        <h2 className="text-xl font-semibold">Sample categories</h2>
        <div className="mt-3">
          <CategoryLinkList />
        </div>
        <p className="mt-3">
          <Link to="/shopproducts">Shop Products</Link>
          {' · '}
          <Link to="/products">Products</Link>
          {' · '}
          <Link to="/brands">Featured Brands</Link>
        </p>
      </section>
      <section className="mt-8">
        <LocationLists />
      </section>
      <section className="mt-8">
        <h2 className="text-xl font-semibold">What this sample includes</h2>
        <ul className="mt-3 list-disc pl-5">
          {sampleNotes.map((note) => (
            <li key={note} className="mt-1">
              {note}
            </li>
          ))}
        </ul>
      </section>
    </Page>
  )
}
