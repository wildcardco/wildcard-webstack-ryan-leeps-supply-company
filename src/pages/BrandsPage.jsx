import { Link, useParams } from 'react-router-dom'
import { getBrand, listBrands, productsForBrand } from '../data/catalog'
import { Page, SourceNote } from '../components/Facts'
import { ProductList } from '../components/ProductViews'

const brandsSource = 'https://www.leeps.com/brands'

export function BrandsPage() {
  const brands = listBrands()
  return (
    <Page title="Featured Brands | Leeps Supply Company">
      <h1 className="text-2xl font-semibold">Featured Brands</h1>
      <SourceNote url={brandsSource}>Source brands page</SourceNote>
      <p className="mt-4 max-w-3xl">
        Brands listed here are the brands on the three sample products. The source brands page includes the wider
        catalog.
      </p>
      <ul className="mt-6 flex flex-col gap-6">
        {brands.map((brand) => (
          <li key={brand.slug}>
            <h2 className="text-xl font-semibold">
              <Link to={brand.path}>{brand.name}</Link>
            </h2>
            <div className="mt-3">
              <ProductList products={productsForBrand(brand)} />
            </div>
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
        <h1 className="text-2xl font-semibold">Page not in this sample</h1>
        <p className="mt-3">That brand is not on a sample product.</p>
        <p className="mt-3">
          <Link to="/brands">Featured Brands</Link>
        </p>
      </Page>
    )
  }
  return (
    <Page title={`${brand.name} | Leeps Supply Company`}>
      <h1 className="text-2xl font-semibold">{brand.name}</h1>
      <p className="mt-3">
        <Link to="/brands">Featured Brands</Link>
      </p>
      <div className="mt-6">
        <ProductList products={productsForBrand(brand)} />
      </div>
    </Page>
  )
}
