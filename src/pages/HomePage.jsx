import { Link } from 'react-router-dom'
import { business, products, sampleNotes } from '../data/catalog'
import { CategoryLinkList, ExternalAnchor, LocationLists, PhoneList } from '../components/Facts'
import { ProductList } from '../components/ProductViews'
import { usePageTitle } from '../hooks/usePageTitle'

const aker = products[0]
const zadro = products[2]
const lifestyle = aker.images[1]

export function HomePage() {
  usePageTitle(business.homepageTitle)
  return (
    <div className="home">
      <section className="hero reveal">
        <div className="hero-copy">
          <p className="kicker">Sample catalog</p>
          <h1>
            Leeps
            <br /> Supply
            <br /> Company
          </h1>
          <span className="draw-rule rule-red" />
          <p className="hero-place">
            {business.town}, {business.region}
          </p>
          <p className="fine">Street and ZIP are omitted here because they were not verified.</p>
          <PhoneList />
          <p className="hero-source">
            <ExternalAnchor href={business.website}>Source site: leeps.com</ExternalAnchor>
          </p>
          <p className="lede">
            This sample includes the three product pages captured for the demo, category labels from the source catalog,
            and a browser cart. It is a working sample of the storefront foundation, and the live catalog stays on
            leeps.com.
          </p>
          <div className="cta-row">
            <Link to="/products" className="btn">
              Sample products
            </Link>
            <Link to="/shopproducts" className="btn btn-line">
              Shop Products
            </Link>
          </div>
        </div>
        <div className="hero-stage">
          <div className="hero-slab" aria-hidden="true" />
          <Link to={aker.path} className="hero-photo-link">
            <img
              className="photo-settle"
              src={lifestyle.src}
              alt={aker.name}
              width={lifestyle.width}
              height={lifestyle.height}
            />
          </Link>
          <Link to={zadro.path} className="hero-cutout" aria-label={zadro.name}>
            <img
              src={zadro.images[0].src}
              alt=""
              width={zadro.images[0].width}
              height={zadro.images[0].height}
            />
            <span aria-hidden="true">Part {zadro.partNumber}</span>
          </Link>
        </div>
      </section>

      <section className="band product-band">
        <div className="band-head reveal">
          <h2>Sample products</h2>
          <span className="draw-rule" />
          <p>Three pages from the supplied discovery. Pricing stays as captured.</p>
        </div>
        <ProductList products={products} />
      </section>

      <section className="split-band">
        <Link to={aker.path} className="split-photo reveal">
          <img className="photo-settle" src={aker.images[0].src} alt={aker.name} width={aker.images[0].width} height={aker.images[0].height} />
        </Link>
        <div className="split-panel reveal">
          <h2>Sample categories</h2>
          <span className="draw-rule rule-red" />
          <CategoryLinkList />
          <p className="inline-links">
            <Link to="/shopproducts">Shop Products</Link>
            <Link to="/products">Products</Link>
            <Link to="/brands">Featured Brands</Link>
          </p>
        </div>
      </section>

      <section className="band loc-band reveal">
        <h2>Counters and showrooms</h2>
        <span className="draw-rule" />
        <LocationLists />
      </section>

      <section className="ledger reveal">
        <h2>What this sample includes</h2>
        <span className="draw-rule rule-red" />
        <ul>
          {sampleNotes.map((note) => (
            <li key={note}>{note}</li>
          ))}
        </ul>
      </section>
    </div>
  )
}
