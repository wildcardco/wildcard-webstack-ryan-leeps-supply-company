import assert from 'node:assert/strict'
import test from 'node:test'
import { addToCart, cartCount, removeFromCart, sanitizeCart, setQuantity } from '../src/cart/cartStore.js'
import { buildTestReview } from '../src/cart/testReview.js'
import { isKnownProductSlug } from '../src/data/catalog.js'

const aker = 'aker-by-maax-142038-000-002-084-455593'
const zadro = 'zadro-lurv410-645626'

test('cart adds, updates, removes, and ignores unknown products', () => {
  let items = []
  items = addToCart(items, aker, 1, isKnownProductSlug)
  items = addToCart(items, aker, 2, isKnownProductSlug)
  items = addToCart(items, 'not-a-product', 4, isKnownProductSlug)
  items = addToCart(items, zadro, 1, isKnownProductSlug)
  assert.equal(cartCount(items), 4)
  assert.equal(items.find((item) => item.slug === aker).quantity, 3)
  items = setQuantity(items, aker, 5)
  assert.equal(cartCount(items), 6)
  items = setQuantity(items, aker, 0)
  assert.equal(items.find((item) => item.slug === aker).quantity, 5)
  items = removeFromCart(items, zadro)
  assert.equal(cartCount(items), 5)
  assert.equal(items.some((item) => Object.hasOwn(item, 'price')), false)
})

test('stored cart drops unknown slugs and keeps quantity only', () => {
  const stored = sanitizeCart(
    [
      { slug: aker, quantity: 2, price: 10 },
      { slug: 'extra', quantity: 1 },
      { slug: zadro, quantity: 0 },
    ],
    isKnownProductSlug,
  )
  assert.deepEqual(stored, [{ slug: aker, quantity: 2 }])
})

test('test review keeps null prices and refuses to look like an order', () => {
  const review = buildTestReview([
    {
      slug: zadro,
      name: 'ZADRO® LURV410 645626',
      partNumber: '645626',
      quantity: 1,
      priceLabel: 'Call for Price',
    },
  ])
  assert.equal(review.orderPlaced, false)
  assert.equal(review.paymentCollected, false)
  assert.equal(review.transmitted, false)
  assert.equal(review.items[0].price, null)
  assert.equal(Object.hasOwn(review, 'total'), false)
  assert.match(review.reference, /^LOCAL-TEST-/)
})
