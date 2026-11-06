import { Link } from 'react-router-dom'
import { business, categories, counterLocations, showroomLocations } from '../data/catalog'
import { usePageTitle } from '../hooks/usePageTitle'

export function Page({ title, banner, children }) {
  usePageTitle(title)
  return (
    <>
      {banner}
      <div className="page-shell">{children}</div>
    </>
  )
}

export function PageHeader({ heading, children }) {
  return (
    <div className="page-intro reveal">
      <h1>{heading}</h1>
      <span className="draw-rule rule-red" />
      {children}
    </div>
  )
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
    <p className="source-note">
      {children || 'Source'}: <ExternalAnchor href={url}>{url}</ExternalAnchor>
    </p>
  )
}

export function TestBanner() {
  return (
    <p className="test-stamp" data-testid="test-banner">
      TEST / NO PAYMENT / NO REAL ORDER
    </p>
  )
}

export function PhoneList() {
  return (
    <ul className="phone-list">
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
    <div className="loc-grid">
      <section>
        <h2>Counters</h2>
        <p>
          <ExternalAnchor href="http://www.leepscounters.com/">COUNTERS</ExternalAnchor>
        </p>
        <ul>
          {counterLocations.map((location) => (
            <li key={location}>{location}</li>
          ))}
        </ul>
      </section>
      <section>
        <h2>Showrooms</h2>
        <p>
          <ExternalAnchor href="http://www.waterplaceshowrooms.com">SHOWROOMS</ExternalAnchor>
        </p>
        <ul>
          {showroomLocations.map((location) => (
            <li key={location}>{location}</li>
          ))}
        </ul>
      </section>
    </div>
  )
}

export function CategoryLinkList({ className = 'cat-index' }) {
  return (
    <ul className={className}>
      {categories.map((category) => (
        <li key={category.slug}>
          <Link to={category.path}>
            {category.heading}
            <span aria-hidden="true">→</span>
          </Link>
        </li>
      ))}
    </ul>
  )
}

export function SiteLink({ item, className, onClick, children }) {
  const content = (
    <>
      <span>{children || item.label}</span>
      {item.hint ? <span className="nav-hint">{item.hint}</span> : null}
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
