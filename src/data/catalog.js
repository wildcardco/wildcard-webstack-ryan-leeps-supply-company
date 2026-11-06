/**
 * Shared sample catalog for Leeps Supply Company.
 * Products, categories, header labels, and footer links come from the
 * supplied offline discovery. Do not add products or prices.
 */

export const business = {
  name: 'Leeps Supply Company',
  homepageTitle: 'Home | Leeps Supply Company',
  website: 'https://www.leeps.com/',
  town: 'Lowell',
  region: 'Indiana',
  phones: [
    { display: '1-800-854-4373', href: 'tel:1-800-854-4373' },
    { display: '1-219-661-7021', href: 'tel:1-219-661-7021' },
  ],
}

export const counterLocations = [
  'Merrillville',
  'De Motte',
  'Highland',
  'Lynwood',
  'Crown Point',
  'Lowell',
  'Valparaiso',
  'Michigan City',
  'St Joseph',
]

export const showroomLocations = ['Crown Point', 'Valparaiso']

export const sampleNotes = [
  'Three product pages from the supplied discovery. The full catalog was not imported.',
  'AKER® BY MAAX and TOTO prices were loading or blank. ZADRO® showed Call for Price.',
  'Branch availability on the source pages was loading, unlabeled as a quantity, or left unverified in this sample.',
  'This checkout stores a test review in the browser tab. It does not take payment or place an order.',
]

const akerSlug = 'aker-by-maax-142038-000-002-084-455593'
const totoSlug = 'toto-st784s-12-241841'
const zadroSlug = 'zadro-lurv410-645626'

export const products = [
  {
    slug: akerSlug,
    path: `/products/${akerSlug}`,
    name: 'AKER® BY MAAX 142038-000-002-084 455593',
    brand: 'AKER® BY MAAX',
    brandSlug: 'aker-by-maax',
    partNumber: '455593',
    shortDescription:
      'AKER® BY MAAX SPS 142038-000-002-084 Shower Base, Right Hand Drain Location, 59-7/8 in L, 30 to 58-3/8 in W',
    price: null,
    priceDisplay: 'not-verified',
    priceObservation: 'Price area remained a loading indicator; no price captured.',
    availabilityDisplay: 'not-verified',
    availabilityObservation:
      'Product page displayed Available at Highland and Available at All Branches labels, but inventory values remained loading indicators.',
    sourceUrl: 'https://www.leeps.com/aker-by-maax-142038-000-002-084-455593',
    categorySlugs: ['plumbing'],
    images: [
      {
        src: '/img/aker-by-maax-142038-000-002-084.jpg',
        sourceUrl: 'https://assets.unilogcorp.com/267/ITEM/IMG/AKER_BY_MAAX_142038_000_002_084.jpg',
        width: 1500,
        height: 1500,
      },
      {
        src: '/img/aker-by-maax-142038-000-002-084-1.jpg',
        sourceUrl: 'https://assets.unilogcorp.com/267/ITEM/IMG/AKER_BY_MAAX_142038_000_002_084_1.jpg',
        width: 1500,
        height: 1500,
      },
    ],
  },
  {
    slug: totoSlug,
    path: `/products/${totoSlug}`,
    name: 'TOTO ST784S#12 241841',
    brand: 'TOTO',
    brandSlug: 'toto',
    partNumber: '241841',
    shortDescription:
      'TOTO Clayton® ST784S#12 Toilet Tank and Cover, 1.6 gpf Flush Rate, 12 in Rough-In, Vitreous China, Sedona Beige',
    price: null,
    priceDisplay: 'not-verified',
    priceObservation: 'Price label was present but no value appeared in visible page text.',
    availabilityDisplay: 'not-verified',
    availabilityObservation:
      'Page displayed Available at Highland and Available at All Branches. Exact quantities were not shown in captured text.',
    sourceUrl: 'https://www.leeps.com/toto-st784s%2312-241841',
    categorySlugs: ['plumbing'],
    images: [
      {
        src: '/img/toto-st784s-12.jpg',
        sourceUrl: 'https://assets.unilogcorp.com/267/ITEM/IMG/TOTO_ST784S_12.jpg',
        width: 400,
        height: 400,
      },
      {
        src: '/img/toto-olyveyc6ijkxlwc43sq5.jpg',
        sourceUrl: 'https://assets.unilogcorp.com/267/ITEM/IMG/TOT-OLYVEYC6IJKXLWC43SQ5.jpg',
        width: 1000,
        height: 1001,
      },
    ],
  },
  {
    slug: zadroSlug,
    path: `/products/${zadroSlug}`,
    name: 'ZADRO® LURV410 645626',
    brand: 'ZADRO®',
    brandSlug: 'zadro',
    partNumber: '645626',
    shortDescription:
      'ZADRO® LURV410 Makeup Mirror With Light, 19 in H, 11 in W, Round, Metal Frame, Satin Nickel Frame',
    price: null,
    priceDisplay: 'call-for-price',
    priceObservation: 'Call for Price',
    availabilityDisplay: 'not-verified',
    availabilityObservation:
      'Page displayed 0 beside Available at Highland and 0 beside Available at All Branches in the captured accessible structure.',
    sourceUrl: 'https://www.leeps.com/zadro-lurv410-645626',
    categorySlugs: [],
    images: [
      {
        src: '/img/zadro-lurv410.jpg',
        sourceUrl: 'https://assets.unilogcorp.com/267/ITEM/IMG/ZADRO_LURV410.jpg',
        width: 3500,
        height: 3500,
      },
    ],
  },
]

export const categories = [
  {
    slug: 'plumbing',
    path: '/category/plumbing',
    heading: 'Plumbing',
    documentTitle: 'Plumbing | Leeps Supply Company',
    sourceUrl: 'https://www.leeps.com/150024/category/plumbing',
    productSlugs: [akerSlug, totoSlug],
  },
  {
    slug: 'plumbing/kitchen-accessories',
    path: '/category/plumbing/kitchen-accessories',
    heading: 'Kitchen Accessories',
    documentTitle: 'Plumbing | Kitchen Accessories | Leeps Supply Company',
    sourceUrl: 'https://www.leeps.com/150035/category/plumbing/kitchen-accessories',
    productSlugs: [],
  },
  {
    slug: 'pumps-motors/pumps-accessories/sump-pumps',
    path: '/category/pumps-motors/pumps-accessories/sump-pumps',
    heading: 'Sump Pumps',
    documentTitle: 'Sump Pumps | Leeps Supply Company',
    sourceUrl: 'https://www.leeps.com/149644/category/pumps-motors/pumps-accessories/sump-pumps',
    productSlugs: [],
  },
  {
    slug: 'plumbing/water-heaters-accessories',
    path: '/category/plumbing/water-heaters-accessories',
    heading: 'Water Heaters & Accessories',
    documentTitle: 'Plumbing | Water Heaters & Accessories | Leeps Supply Company',
    sourceUrl: 'https://www.leeps.com/150208/category/plumbing/water-heaters-accessories',
    productSlugs: [],
  },
  {
    slug: 'valves',
    path: '/category/valves',
    heading: 'Valves',
    documentTitle: 'Valves | Leeps Supply Company',
    sourceUrl: 'https://www.leeps.com/149156/category/valves',
    productSlugs: [],
  },
]

export const catalogSurfaces = [
  {
    id: 'products',
    label: 'Products',
    to: '/products',
    sourceUrl: 'https://www.leeps.com/products',
    documentTitle: 'Products | Leeps Supply Company',
  },
  {
    id: 'shopproducts',
    label: 'Shop Products',
    to: '/shopproducts',
    sourceUrl: 'https://www.leeps.com/shopproducts',
    documentTitle: 'shopproducts | Leeps Supply Company',
  },
  {
    id: 'counters',
    label: 'counters',
    to: '/counters',
    sourceUrl: 'https://www.leeps.com/counters',
    documentTitle: 'counters | Leeps Supply Company',
  },
]

export const headerNav = [
  { id: 'store', label: 'STORE', to: '/', sourceUrl: 'https://www.leeps.com/' },
  { id: 'counters', label: 'COUNTERS', href: 'http://www.leepscounters.com/' },
  { id: 'showrooms', label: 'SHOWROOMS', href: 'http://www.waterplaceshowrooms.com' },
  { id: 'offers', label: 'OFFERS', href: 'https://www.leeps.com/offers' },
  {
    id: 'shop-counters',
    label: 'Shop Products',
    to: '/counters',
    sourceUrl: 'https://www.leeps.com/counters',
    hint: 'counters surface',
  },
  {
    id: 'shop-products',
    label: 'Shop Products',
    to: '/shopproducts',
    sourceUrl: 'https://www.leeps.com/shopproducts',
    hint: 'shopproducts surface',
  },
  {
    id: 'brands',
    label: 'Featured Brands',
    to: '/brands',
    sourceUrl: 'https://www.leeps.com/brands',
  },
  { id: 'help', label: 'Help', to: '/help', sourceUrl: 'https://www.leeps.com/help' },
  { id: 'login', label: 'Login', href: 'https://www.leeps.com/Login' },
  { id: 'register', label: 'Register', href: 'https://www.leeps.com/Register' },
  {
    id: 'forgot',
    label: 'Forgot your password?',
    href: 'https://www.leeps.com/ForgotPassword',
  },
]

export const cartNav = {
  id: 'cart',
  label: 'Cart',
  to: '/cart',
  sourceUrl: 'https://www.leeps.com/cart',
}

export const footerLinks = [
  {
    label: 'Contact Us',
    to: '/contact',
    sourceUrl: 'https://www.leeps.com/contactus',
  },
  {
    label: 'Returns',
    href: 'https://www.leeps.com/ASSETS/DOCUMENTS/CMS/EN/Returns.pdf',
  },
  { label: 'Feedback', href: 'http://www.leepscounters.com/feedback/' },
  {
    label: 'Terms & Conditions',
    href: 'https://www.leeps.com/ASSETS/DOCUMENTS/CMS/EN/Leeps_Supply_Terms_and_Conditions.pdf',
  },
  { label: 'FAQ', href: 'https://www.leeps.com/ASSETS/DOCUMENTS/CMS/EN/FAQ_Page.pdf' },
  {
    label: 'Navigation',
    href: 'https://www.leeps.com/ASSETS/DOCUMENTS/CMS/EN/Navigation.pdf',
  },
  {
    label: 'Privacy Policy',
    href: 'https://www.leeps.com/ASSETS/DOCUMENTS/CMS/EN/Leeps_Supply_Privacy_Policy.pdf',
  },
  {
    label: 'B2B eCommerce platform',
    href: 'https://www.unilogcorp.com/b2b-ecommerce-platform',
    observedHref: '//www.unilogcorp.com/b2b-ecommerce-platform',
  },
]

export function priceLabel(product) {
  if (product.priceDisplay === 'call-for-price') return 'Call for Price'
  return 'Not verified / Contact for quote'
}

export function availabilityLabel() {
  return 'Not verified / Contact for quote'
}

export function getProduct(slug) {
  return products.find((product) => product.slug === slug) ?? null
}

export function isKnownProductSlug(slug) {
  return products.some((product) => product.slug === slug)
}

export function getCategory(slug) {
  return categories.find((category) => category.slug === slug) ?? null
}

export function productsForCategory(category) {
  return category.productSlugs.map((slug) => getProduct(slug)).filter(Boolean)
}

export function listBrands() {
  const brands = []
  for (const product of products) {
    let brand = brands.find((item) => item.slug === product.brandSlug)
    if (!brand) {
      brand = {
        slug: product.brandSlug,
        name: product.brand,
        path: `/brands/${product.brandSlug}`,
        productSlugs: [],
      }
      brands.push(brand)
    }
    brand.productSlugs.push(product.slug)
  }
  return brands
}

export function getBrand(slug) {
  return listBrands().find((brand) => brand.slug === slug) ?? null
}

export function productsForBrand(brand) {
  return brand.productSlugs.map((slug) => getProduct(slug)).filter(Boolean)
}
