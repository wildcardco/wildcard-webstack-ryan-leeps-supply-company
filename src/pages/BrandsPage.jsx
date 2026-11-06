import { Link, useParams } from 'react-router-dom'
import { getBrand, listBrands, productsForBrand } from '../data/catalog'
import { Page, PageHeader, SourceNote } from '../components/Facts'
import { ProductList } from '../components/ProductViews'

const brandsSource = 'https://www.leeps.com/brands'

export function BrandsPage() {
  const brands = listBrands()
  return (
    <Page title="Featured Brands | Leeps Supply Company">
      <PageHeader heading="Featured Brands">
        <SourceNote url={brandsSource}>Source brands page</SourceNote>
        <p>
          Brands listed here are the brands on the three sample products. The source brands page includes the wider
          catalog.
        </p>
      </PageHeader>
      <ul className="stack-list">
        {brands.map((brand) => (
          <li key={brand.slug}>
            <h2>
              <Link to={brand.path}>{brand.name}</Link>
            </h2>
            <ProductList products={productsForBrand(brand)} />
          </li>
        ))}
      </ul>
    </Page>
  )
}

export function BrandPage() {
  const { slug } = useParams()
  const brand = getBrand(slug)
  if (!brand) {
    return (
      <Page title="Page not in this sample | Leeps Supply Company">
        <PageHeader heading="Page not in this sample">
          <p>That brand is not on a sample product.</p>
          <p>
            <Link to="/brands">Featured Brands</Link>
          </p>
        </PageHeader>
      </Page>
    )
  }
  return (
    <Page title={`${brand.name} | Leeps Supply Company`}>
      <PageHeader heading={brand.name}>
        <p>
          <Link to="/brands">Featured Brands</Link>
        </p>
      </PageHeader>
      <ProductList products={productsForBrand(brand)} />
    </Page>
  )
}
