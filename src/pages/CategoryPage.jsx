import { Link, useParams } from 'react-router-dom'
import { getCategory, productsForCategory } from '../data/catalog'
import { CategoryLinkList, Page, PageHeader, SourceNote } from '../components/Facts'
import { ProductList } from '../components/ProductViews'

export function CategoryIndexPage() {
  return (
    <Page title="Categories | Leeps Supply Company">
      <PageHeader heading="Categories" />
      <CategoryLinkList />
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
        <PageHeader heading="Page not in this sample">
          <p>That category is not part of the supplied sample.</p>
          <p>
            <Link to="/category">View sample categories</Link>
          </p>
        </PageHeader>
      </Page>
    )
  }

  const items = productsForCategory(category)

  return (
    <Page title={category.documentTitle}>
      <PageHeader heading={category.heading}>
        <SourceNote url={category.sourceUrl} />
      </PageHeader>
      {items.length ? (
        <ProductList products={items} />
      ) : (
        <p className="empty-note">
          This sample does not include products in {category.heading}. No extra products were added to fill the
          category.
        </p>
      )}
      <p>
        <Link to="/products">Browse the sample products</Link>
      </p>
    </Page>
  )
}
