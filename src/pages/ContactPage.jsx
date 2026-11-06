import { useState } from 'react'
import { business, footerLinks } from '../data/catalog'
import { LocationLists, Page, PhoneList, SourceNote } from '../components/Facts'

const contactLink = footerLinks.find((item) => item.label === 'Contact Us')

export function ContactPage() {
  const [notice, setNotice] = useState('')

  function onSubmit(event) {
    event.preventDefault()
    event.currentTarget.reset()
    setNotice('Static mock only. This form did not send a message, store what you typed, or place an order.')
  }

  return (
    <Page title="Contact Us | Leeps Supply Company">
      <h1 className="text-2xl font-semibold">Contact Us</h1>
      <SourceNote url={contactLink.sourceUrl} />
      <p className="mt-4">
        {business.name}
        <br />
        {business.town}, {business.region}
      </p>
      <p className="mt-1 text-sm text-muted">Street and ZIP are omitted here because they were not verified.</p>
      <div className="mt-4">
        <PhoneList />
      </div>
      <div className="mt-8">
        <LocationLists />
      </div>
      <form className="mt-8 max-w-lg" autoComplete="off" onSubmit={onSubmit} data-testid="contact-form">
        <fieldset className="border border-line bg-surface p-4">
          <legend className="px-1 font-semibold">Static mock message</legend>
          <p className="text-sm text-muted">Nothing you type is saved or transmitted.</p>
          <label className="mt-3 block text-sm font-semibold" htmlFor="contact-name">
            Name
            <input id="contact-name" name="name" className="mt-1 w-full border border-line px-3 py-2 font-normal" />
          </label>
          <label className="mt-3 block text-sm font-semibold" htmlFor="contact-phone">
            Phone
            <input id="contact-phone" name="phone" className="mt-1 w-full border border-line px-3 py-2 font-normal" />
          </label>
          <label className="mt-3 block text-sm font-semibold" htmlFor="contact-message">
            Message
            <textarea id="contact-message" name="message" rows={4} className="mt-1 w-full border border-line px-3 py-2 font-normal" />
          </label>
          <button type="submit" className="mt-4 min-h-11 border border-ink bg-accent px-3 text-accent-contrast">
            Submit mock message
          </button>
          {notice ? (
            <p role="status" className="mt-3" data-testid="contact-notice">
              {notice}
            </p>
          ) : null}
        </fieldset>
      </form>
    </Page>
  )
}
