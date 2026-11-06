import { Link, useParams } from 'react-router-dom'
import { categories, getCategory, productsForCategory } from '../data/catalog'
import { Page, SourceNote } from '../components/Facts'
import { ProductList } from '../components/ProductViews'

export function CategoryIndexPage() {
  return (
    <Page title="Categories | Leeps Supply Company">
      <h1 className="text-2xl font-semibold">Categories</h1>
      <ul className="mt-4 flex flex-col gap-2">
        {categories.map((category) => (
          <li key={category.slug}>
            <Link to={category.path}>{category.heading}</Link>
          </li>
        ))}
      </ul>
    </Page>
  )
}

export function CategoryPage() {
  const params = useParams()
  const slug = params['*'] || ''
  const category = getCategory(slug)

  if (!category) {
    return (
      <Page title="Page not in this sample | Leeps Supply Company">
        <h1 className="text-2xl font-semibold">Page not in this sample</h1>
        <p className="mt-3">That category is not part of the supplied sample.</p>
        <p className="mt-3">
          <Link to="/category">View sample categories</Link>
        </p>
      </Page>
    )
  }

  const items = productsForCategory(category)

  return (
    <Page title={category.documentTitle}>
      <h1 className="text-2xl font-semibold">{category.heading}</h1>
      <SourceNote url={category.sourceUrl} />
      {items.length ? (
        <div className="mt-6">
          <ProductList products={items} />
        </div>
      ) : (
        <p className="mt-4 max-w-3xl">
          This sample does not include products in {category.heading}. No extra products were added to fill the
          category.
        </p>
      )}
      <p className="mt-6">
        <Link to="/products">Browse the sample products</Link>
      </p>
    </Page>
  )
}
