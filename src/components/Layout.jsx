import { useEffect, useRef, useState } from 'react'
import { Link, Outlet, useLocation } from 'react-router-dom'
import { business, cartNav, footerLinks, headerNav } from '../data/catalog'
import { useCart } from '../context/CartContext'
import { useReveal } from '../hooks/useReveal'
import { ExternalAnchor, LocationLists, SiteLink } from './Facts'

export function Layout() {
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()
  const menuButtonRef = useRef(null)
  const panelRef = useRef(null)
  const { count } = useCart()
  useReveal()

  useEffect(() => {
    setMenuOpen(false)
    window.scrollTo(0, 0)
  }, [location.pathname])

  useEffect(() => {
    document.body.classList.toggle('menu-lock', menuOpen)
    const header = document.querySelector('.site-header')
    const syncOffset = () => {
      if (!header) return
      document.documentElement.style.setProperty('--header-offset', `${header.getBoundingClientRect().height}px`)
    }
    syncOffset()
    window.addEventListener('resize', syncOffset)
    return () => {
      document.body.classList.remove('menu-lock')
      window.removeEventListener('resize', syncOffset)
    }
  }, [menuOpen])

  useEffect(() => {
    const onResize = () => {
      if (window.matchMedia('(min-width: 768px)').matches) setMenuOpen(false)
    }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  useEffect(() => {
    if (!menuOpen) return undefined
    const onKey = (event) => {
      if (event.key !== 'Escape') return
      setMenuOpen(false)
      menuButtonRef.current?.focus()
    }
    document.addEventListener('keydown', onKey)
    panelRef.current?.focus()
    return () => document.removeEventListener('keydown', onKey)
  }, [menuOpen])

  const closeMenu = () => setMenuOpen(false)

  return (
    <div className="flex min-h-screen flex-col" data-testid="sample-root">
      <a className="skip-link" href="#content">
        Skip to content
      </a>
      <header className="site-header">
        <div className="utility">
          <a href={business.phones[0].href}>{business.phones[0].display}</a>
          <span className="utility-place">
            {business.town}, {business.region}
          </span>
        </div>
        <div className="header-bar">
          <Link to="/" className="wordmark">
            <span className="wordmark-mark">Leeps</span>
            <span className="wordmark-sub">Supply Company</span>
          </Link>
          <Link to={cartNav.to} className="cart-link" data-testid="cart-count">
            Cart (<span aria-live="polite">{count}</span>)
          </Link>
          <button
            type="button"
            ref={menuButtonRef}
            className="menu-toggle"
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            data-testid="menu-button"
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? 'Close' : 'Menu'}
          </button>
        </div>
        <nav aria-label="Primary" className="desktop-nav" data-testid="desktop-nav">
          {headerNav.map((item) => (
            <SiteLink key={item.id} item={item} />
          ))}
        </nav>
        <nav
          id="mobile-nav"
          ref={panelRef}
          tabIndex={-1}
          aria-label="Mobile"
          data-testid="mobile-nav"
          className={`mobile-nav${menuOpen ? ' is-open' : ''}`}
        >
          <ul>
            {headerNav.map((item) => (
              <li key={item.id}>
                <SiteLink item={item} onClick={closeMenu} />
              </li>
            ))}
            <li>
              <Link to={cartNav.to} onClick={closeMenu}>
                Cart ({count})
              </Link>
            </li>
          </ul>
        </nav>
      </header>
      <div className="sample-strip">
        <p>Sample catalog. Checkout on this demo does not take payment or place an order.</p>
      </div>
      <main id="content" tabIndex={-1} className="flex-1" {...(menuOpen ? { inert: '' } : {})}>
        <Outlet />
      </main>
      <footer className="site-footer" {...(menuOpen ? { inert: '' } : {})}>
        <div className="footer-grid">
          <div>
            <p className="footer-name">{business.name}</p>
            <p>
              {business.town}, {business.region}
            </p>
            <p>
              <a className="phone" href={business.phones[0].href}>
                {business.phones[0].display}
              </a>
            </p>
            <p>
              <a className="phone" href={business.phones[1].href}>
                {business.phones[1].display}
              </a>
            </p>
            <p>
              <ExternalAnchor href={business.website}>leeps.com</ExternalAnchor>
            </p>
          </div>
          <nav aria-label="Footer">
            <ul className="footer-links">
              {footerLinks.map((item) => (
                <li key={item.label}>
                  <SiteLink item={item} />
                </li>
              ))}
            </ul>
          </nav>
          <div className="footer-locs">
            <LocationLists />
          </div>
          <p className="footer-note">
            Sample catalog for demonstration. Prices stay unverified unless the source page showed Call for Price. The
            cart stays in this browser.
          </p>
        </div>
      </footer>
    </div>
  )
}
