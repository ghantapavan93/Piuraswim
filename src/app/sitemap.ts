import type { MetadataRoute } from 'next';
import { ALL_PRODUCTS } from '@/data/catalog';
import { SITE_URL } from '@/data/site';

const STATIC_ROUTES = ['', '/shop', '/size-guide', '/story', '/waitlist', '/contact'];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return [
    ...STATIC_ROUTES.map((route) => ({
      url: `${SITE_URL}${route}`,
      lastModified,
      changeFrequency: 'weekly' as const,
      priority: route === '' ? 1 : 0.7,
    })),
    ...ALL_PRODUCTS.map((product) => ({
      url: `${SITE_URL}/product/${product.handle}`,
      lastModified,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    })),
  ];
}
