import { useEffect, useRef, useState } from 'react'
import { Link, Outlet, useLocation } from 'react-router-dom'
import { business, cartNav, footerLinks, headerNav } from '../data/catalog'
import { useCart } from '../context/CartContext'
import { ExternalAnchor, LocationLists, SiteLink } from './Facts'

export function Layout() {
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()
  const menuButtonRef = useRef(null)
  const panelRef = useRef(null)
  const { count } = useCart()

  useEffect(() => {
    setMenuOpen(false)
    window.scrollTo(0, 0)
  }, [location.pathname])

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
      <button
        type="button"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:bg-surface focus:px-3 focus:py-2"
        onClick={() => document.getElementById('content')?.focus()}
      >
        Skip to content
      </button>
      <header className="sticky top-0 z-40 border-b border-line bg-surface">
        <div className="mx-auto flex w-full max-w-page flex-wrap items-center gap-2 px-4 py-3">
          <Link to="/" className="min-w-0 max-w-full text-base font-semibold leading-tight">
            {business.name}
          </Link>
          <div className="ml-auto flex items-center gap-2">
            <Link to={cartNav.to} className="inline-flex min-h-11 items-center px-2 font-semibold" data-testid="cart-count">
              Cart (<span aria-live="polite">{count}</span>)
            </Link>
            <button
              type="button"
              ref={menuButtonRef}
              className="min-h-11 min-w-11 border border-line bg-surface px-3 md:hidden"
              aria-expanded={menuOpen}
              aria-controls="mobile-nav"
              data-testid="menu-button"
              onClick={() => setMenuOpen((open) => !open)}
            >
              {menuOpen ? 'Close' : 'Menu'}
            </button>
          </div>
        </div>
        <nav aria-label="Primary" className="mx-auto hidden w-full max-w-page flex-wrap gap-x-4 gap-y-2 px-4 pb-3 md:flex" data-testid="desktop-nav">
          {headerNav.map((item) => (
            <SiteLink key={item.id} item={item} className="inline-flex min-h-11 items-center" />
          ))}
        </nav>
        <nav
          id="mobile-nav"
          ref={panelRef}
          tabIndex={-1}
          aria-label="Mobile"
          data-testid="mobile-nav"
          className={`${menuOpen ? 'block' : 'hidden'} max-h-[calc(100vh-4.25rem)] overflow-y-auto border-t border-line bg-surface px-4 py-3 md:hidden`}
        >
          <ul className="flex flex-col">
            {headerNav.map((item) => (
              <li key={item.id} className="border-b border-line">
                <SiteLink item={item} className="flex min-h-11 items-center" onClick={closeMenu} />
              </li>
            ))}
            <li>
              <Link to={cartNav.to} className="flex min-h-11 items-center font-semibold" onClick={closeMenu}>
                Cart ({count})
              </Link>
            </li>
          </ul>
        </nav>
      </header>
      <div className="border-b border-line bg-notice text-sm text-notice-ink">
        <p className="mx-auto w-full max-w-page px-4 py-2">
          Sample catalog. Checkout on this demo does not take payment or place an order.
        </p>
      </div>
      <main id="content" tabIndex={-1} className="flex-1" {...(menuOpen ? { inert: '' } : {})}>
        <Outlet />
      </main>
      <footer className="mt-8 border-t border-line bg-surface" {...(menuOpen ? { inert: '' } : {})}>
        <div className="mx-auto grid w-full max-w-page gap-8 px-4 py-8">
          <div>
            <p className="font-semibold">{business.name}</p>
            <p className="mt-1">
              {business.town}, {business.region}
            </p>
            <p className="mt-2 text-sm">
              <a href={business.phones[0].href}>{business.phones[0].display}</a>
              {' · '}
              <a href={business.phones[1].href}>{business.phones[1].display}</a>
            </p>
            <p className="mt-2 text-sm">
              <ExternalAnchor href={business.website}>leeps.com</ExternalAnchor>
            </p>
          </div>
          <nav aria-label="Footer">
            <ul className="flex flex-col gap-2">
              {footerLinks.map((item) => (
                <li key={item.label}>
                  <SiteLink item={item} />
                </li>
              ))}
            </ul>
          </nav>
          <LocationLists />
          <p className="text-sm text-muted">
            Sample catalog for demonstration. Prices stay unverified unless the source page showed Call for Price. The
            cart stays in this browser.
          </p>
        </div>
      </footer>
    </div>
  )
}
