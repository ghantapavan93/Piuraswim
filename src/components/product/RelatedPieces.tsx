import Link from 'next/link';
import { Icon } from '@/components/ui/Icon';
import { getRelated, printLabel, type Product } from '@/data/catalog';
import { ProductCard } from './ProductCard';
import styles from './RelatedPieces.module.css';

/** Other pieces from the same print or family, so the world stays in reach. */
export function RelatedPieces({ product }: { product: Product }) {
  const related = getRelated(product);
  if (related.length === 0) return null;

  return (
    <section className={`${styles.section} container`} aria-labelledby="related-title">
      <header className={styles.head}>
        <h2 id="related-title" className="display display-md">
          More from <em>{printLabel(product).replace(/^The /, 'the ')}</em>
        </h2>
        <Link href={`/shop?filter=${product.collection}`} className="text-link">
          See all
          <Icon name="arrow" />
        </Link>
      </header>
      <div className={styles.grid}>
        {related.map((item, index) => (
          <ProductCard key={item.handle} product={item} stagger={index} />
        ))}
      </div>
    </section>
  );
}
