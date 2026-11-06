import { Link } from 'react-router-dom'
import { footerLinks, headerNav } from '../data/catalog'
import { LocationLists, Page, PageHeader, PhoneList, SiteLink, SourceNote } from '../components/Facts'

const help = headerNav.find((item) => item.id === 'help')

export function HelpPage() {
  return (
    <Page title="Help | Leeps Supply Company">
      <PageHeader heading="Help">
        <SourceNote url={help.sourceUrl}>Source help page</SourceNote>
        <p>
          This sample help page lists the phones, locations, and service documents from the supplied discovery. The
          source help center stays on leeps.com.
        </p>
        <PhoneList />
        <p>
          <Link to="/contact">Contact Us</Link>
        </p>
      </PageHeader>
      <LocationLists />
      <section className="info-card">
        <h2>Service links</h2>
        <ul className="link-stack">
          {footerLinks.map((item) => (
            <li key={item.label}>
              <SiteLink item={item} />
            </li>
          ))}
        </ul>
      </section>
    </Page>
  )
}
