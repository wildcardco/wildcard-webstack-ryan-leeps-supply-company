import { useState } from 'react'
import { business, footerLinks } from '../data/catalog'
import { LocationLists, Page, PageHeader, PhoneList, SourceNote } from '../components/Facts'

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
      <PageHeader heading="Contact Us">
        <SourceNote url={contactLink.sourceUrl} />
        <p>
          {business.name}
          <br />
          {business.town}, {business.region}
        </p>
        <p className="fine">Street and ZIP are omitted here because they were not verified.</p>
        <PhoneList />
      </PageHeader>
      <LocationLists />
      <form className="form-panel" autoComplete="off" onSubmit={onSubmit} data-testid="contact-form">
        <h2>Static mock message</h2>
        <p className="fine">Nothing you type is saved or transmitted.</p>
        <label className="field" htmlFor="contact-name">
          Name
          <input id="contact-name" name="name" />
        </label>
        <label className="field" htmlFor="contact-phone">
          Phone
          <input id="contact-phone" name="phone" />
        </label>
        <label className="field" htmlFor="contact-message">
          Message
          <textarea id="contact-message" name="message" rows={4} />
        </label>
        <button type="submit" className="btn">
          Submit mock message
        </button>
        {notice ? (
          <p role="status" data-testid="contact-notice">
            {notice}
          </p>
        ) : null}
      </form>
    </Page>
  )
}
