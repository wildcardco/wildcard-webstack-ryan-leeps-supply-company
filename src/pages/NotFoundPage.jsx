import { Link } from 'react-router-dom'
import { business } from '../data/catalog'
import { ExternalAnchor, Page, PageHeader } from '../components/Facts'

export function NotFoundPage() {
  return (
    <Page title="Page not in this sample | Leeps Supply Company">
      <PageHeader heading="Page not in this sample">
        <p>This sample catalog does not include that page.</p>
        <p className="inline-links">
          <Link to="/">Home</Link>
          <Link to="/shopproducts">Shop Products</Link>
          <ExternalAnchor href={business.website}>leeps.com</ExternalAnchor>
        </p>
      </PageHeader>
    </Page>
  )
}
