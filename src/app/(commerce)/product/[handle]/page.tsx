import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ProductGallery } from '@/components/product/ProductGallery';
import { ProductPurchasePanel } from '@/components/product/ProductPurchasePanel';
import { RelatedPieces } from '@/components/product/RelatedPieces';
import { JsonLd } from '@/components/seo/JsonLd';
import { ALL_PRODUCTS, getProduct } from '@/data/catalog';
import { image } from '@/lib/image';
import { productJsonLd } from '@/lib/structured-data';
import './page.css';

export function generateStaticParams() {
  return ALL_PRODUCTS.map(({ handle }) => ({ handle }));
}

export async function generateMetadata({ params }: PageProps<'/product/[handle]'>): Promise<Metadata> {
  const { handle } = await params;
  const product = getProduct(handle);
  if (!product) return { title: 'Piece not found' };
  const cover = image(product.images[0]);
  return {
    title: product.title,
    description: product.description,
    openGraph: {
      title: `${product.title} · Piura Swim`,
      description: product.description,
      images: [{ url: cover.src, width: cover.width, height: cover.height, alt: product.title }],
    },
  };
}

export default async function ProductPage({ params }: PageProps<'/product/[handle]'>) {
  const { handle } = await params;
  const product = getProduct(handle);
  if (!product) notFound();

  return (
    <main id="main" className="product-page">
      <div className="product-page__layout container">
        <div className="product-page__gallery">
          <ProductGallery product={product} />
        </div>
        <div className="product-page__panel">
          <ProductPurchasePanel product={product} />
        </div>
      </div>
      <RelatedPieces product={product} />
      <JsonLd data={productJsonLd(product)} />
    </main>
  );
}
