import { Link } from 'react-router-dom'
import { business, categories, counterLocations, showroomLocations } from '../data/catalog'
import { usePageTitle } from '../hooks/usePageTitle'

export function Page({ title, children }) {
  usePageTitle(title)
  return <div className="mx-auto w-full max-w-page px-4 py-6">{children}</div>
}

export function ExternalAnchor({ href, children, className }) {
  return (
    <a href={href} className={className} target="_blank" rel="noopener noreferrer">
      {children}
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  )
}

export function SourceNote({ url, children }) {
  if (!url) return null
  return (
    <p className="mt-2 break-all text-sm text-muted">
      {children || 'Source'}: <ExternalAnchor href={url}>{url}</ExternalAnchor>
    </p>
  )
}

export function TestBanner() {
  return (
    <p className="border border-line bg-notice px-3 py-2 font-semibold text-notice-ink" data-testid="test-banner">
      TEST / NO PAYMENT / NO REAL ORDER
    </p>
  )
}

export function PhoneList() {
  return (
    <ul className="flex flex-col gap-1">
      {business.phones.map((phone) => (
        <li key={phone.href}>
          <a href={phone.href}>{phone.display}</a>
        </li>
      ))}
    </ul>
  )
}

export function LocationLists() {
  return (
    <div className="grid gap-6 sm:grid-cols-2">
      <section>
        <h2 className="text-lg font-semibold">Counters</h2>
        <p className="mt-1 text-sm">
          <ExternalAnchor href="http://www.leepscounters.com/">COUNTERS</ExternalAnchor>
        </p>
        <ul className="mt-2 list-disc pl-5">
          {counterLocations.map((location) => (
            <li key={location}>{location}</li>
          ))}
        </ul>
      </section>
      <section>
        <h2 className="text-lg font-semibold">Showrooms</h2>
        <p className="mt-1 text-sm">
          <ExternalAnchor href="http://www.waterplaceshowrooms.com">SHOWROOMS</ExternalAnchor>
        </p>
        <ul className="mt-2 list-disc pl-5">
          {showroomLocations.map((location) => (
            <li key={location}>{location}</li>
          ))}
        </ul>
      </section>
    </div>
  )
}

export function CategoryLinkList() {
  return (
    <ul className="flex flex-col gap-2">
      {categories.map((category) => (
        <li key={category.slug}>
          <Link to={category.path}>{category.heading}</Link>
        </li>
      ))}
    </ul>
  )
}

export function SiteLink({ item, className, onClick, children }) {
  const content = (
    <>
      {children || item.label}
      {item.hint ? <span className="sr-only"> {item.hint}</span> : null}
    </>
  )
  if (item.to) {
    return (
      <Link to={item.to} className={className} onClick={onClick} title={item.hint}>
        {content}
      </Link>
    )
  }
  return (
    <a href={item.href} className={className} onClick={onClick} title={item.hint} target="_blank" rel="noopener noreferrer">
      {content}
      <span className="sr-only"> (opens source site in a new tab)</span>
    </a>
  )
}
