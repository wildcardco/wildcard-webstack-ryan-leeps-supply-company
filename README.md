# Leeps Supply Company — sample catalog

Restrained sample catalog for Leeps Supply Company. Three source product pages, category labels from the supplied discovery, a browser cart, and a test checkout that does not take payment or place an order.

## Scripts

- `npm run dev` — local dev server
- `npm run build` — production build
- `npm run preview` — preview the build
- `npm test` — catalog and cart checks

## Sample limits

- Products are only AKER® BY MAAX 455593, TOTO 241841, and ZADRO® 645626.
- AKER and TOTO prices were not captured. ZADRO showed Call for Price. Availability stays unverified in the cart.
- Street, ZIP, and email were not part of the verified facts.
- Checkout writes a local test review in the browser tab. It does not call a payment provider or an order API.
