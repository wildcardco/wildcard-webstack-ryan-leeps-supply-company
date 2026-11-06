import { Link } from 'react-router-dom'
import { business } from '../data/catalog'
import { ExternalAnchor, Page } from '../components/Facts'

export function NotFoundPage() {
  return (
    <Page title="Page not in this sample | Leeps Supply Company">
      <h1 className="text-2xl font-semibold">Page not in this sample</h1>
      <p className="mt-3">This sample catalog does not include that page.</p>
      <p className="mt-3">
        <Link to="/">Home</Link>
        {' · '}
        <Link to="/shopproducts">Shop Products</Link>
        {' · '}
        <ExternalAnchor href={business.website}>leeps.com</ExternalAnchor>
      </p>
    </Page>
  )
}
