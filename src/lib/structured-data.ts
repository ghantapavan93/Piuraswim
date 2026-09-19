import { isAvailable, SIZES, type Product } from '@/data/catalog';
import { BRAND, SITE_URL } from '@/data/site';
import { image } from '@/lib/image';

const SCHEMA = 'https://schema.org';

export function organizationJsonLd(): Record<string, unknown> {
  return {
    '@context': SCHEMA,
    '@graph': [
      {
        '@type': 'Organization',
        '@id': `${SITE_URL}/#organization`,
        name: BRAND.name,
        url: SITE_URL,
        logo: `${SITE_URL}/icon.svg`,
        sameAs: [BRAND.instagram],
      },
      {
        '@type': 'WebSite',
        '@id': `${SITE_URL}/#website`,
        name: BRAND.name,
        url: SITE_URL,
        publisher: { '@id': `${SITE_URL}/#organization` },
      },
    ],
  };
}

/** schema.org Product with one Offer per size, availability from the catalog snapshot. */
export function productJsonLd(product: Product): Record<string, unknown> {
  const url = `${SITE_URL}/product/${product.handle}`;
  return {
    '@context': SCHEMA,
    '@type': 'Product',
    '@id': `${url}#product`,
    name: product.title,
    description: product.description,
    image: product.images.map((key) => `${SITE_URL}${image(key).src}`),
    brand: { '@type': 'Brand', name: BRAND.name },
    category: product.category === 'tops' ? 'Bikini tops' : 'Bikini bottoms',
    url,
    offers: SIZES.map((size) => ({
      '@type': 'Offer',
      name: `${product.title}, size ${size}`,
      url,
      price: product.price,
      priceCurrency: 'USD',
      availability: isAvailable(product, size) ? `${SCHEMA}/InStock` : `${SCHEMA}/OutOfStock`,
      itemCondition: `${SCHEMA}/NewCondition`,
    })),
  };
}
