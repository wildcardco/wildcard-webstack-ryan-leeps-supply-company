import { Link } from 'react-router-dom'
import { footerLinks, headerNav } from '../data/catalog'
import { LocationLists, Page, PhoneList, SiteLink, SourceNote } from '../components/Facts'

const help = headerNav.find((item) => item.id === 'help')

export function HelpPage() {
  return (
    <Page title="Help | Leeps Supply Company">
      <h1 className="text-2xl font-semibold">Help</h1>
      <SourceNote url={help.sourceUrl}>Source help page</SourceNote>
      <p className="mt-4 max-w-3xl">
        This sample help page lists the phones, locations, and service documents from the supplied discovery. The
        source help center stays on leeps.com.
      </p>
      <div className="mt-4">
        <PhoneList />
      </div>
      <p className="mt-4">
        <Link to="/contact">Contact Us</Link>
      </p>
      <div className="mt-8">
        <LocationLists />
      </div>
      <section className="mt-8">
        <h2 className="text-xl font-semibold">Service links</h2>
        <ul className="mt-3 flex flex-col gap-2">
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
