import assert from 'node:assert/strict'
import test from 'node:test'
import {
  categories,
  footerLinks,
  getProduct,
  headerNav,
  priceLabel,
  products,
  productsForCategory,
} from '../src/data/catalog.js'

test('sample catalog keeps the three discovered products and no invented prices', () => {
  assert.equal(products.length, 3)
  const partNumbers = products.map((product) => product.partNumber).sort()
  assert.deepEqual(partNumbers, ['241841', '455593', '645626'])
  for (const product of products) {
    assert.equal(product.price, null)
    assert.equal(typeof product.sourceUrl, 'string')
    assert.equal(product.images.length > 0, true)
    for (const image of product.images) {
      assert.match(image.src, /^\/img\//)
      assert.match(image.sourceUrl, /^https:\/\/assets\.unilogcorp\.com\//)
    }
  }
  const zadro = getProduct('zadro-lurv410-645626')
  assert.equal(priceLabel(zadro), 'Call for Price')
  const aker = getProduct('aker-by-maax-142038-000-002-084-455593')
  const toto = getProduct('toto-st784s-12-241841')
  assert.equal(priceLabel(aker), 'Not verified / Contact for quote')
  assert.equal(priceLabel(toto), 'Not verified / Contact for quote')
  assert.equal(aker.shortDescription.includes('Shower Base'), true)
  assert.equal(toto.name, 'TOTO ST784S#12 241841')
  assert.equal(zadro.partNumber, '645626')
})

test('category assignments stay inside the discovered sample', () => {
  const plumbing = categories.find((category) => category.slug === 'plumbing')
  const names = productsForCategory(plumbing).map((product) => product.partNumber).sort()
  assert.deepEqual(names, ['241841', '455593'])
  for (const category of categories) {
    if (category.slug === 'plumbing') continue
    assert.deepEqual(category.productSlugs, [])
  }
})

test('navigation and footer links are real targets', () => {
  for (const item of [...headerNav, ...footerLinks]) {
    if (item.href) {
      assert.notEqual(item.href, '#')
      assert.notEqual(item.href, '')
      assert.match(item.href, /^https?:\/\//)
    } else {
      assert.match(item.to, /^\//)
    }
  }
})
