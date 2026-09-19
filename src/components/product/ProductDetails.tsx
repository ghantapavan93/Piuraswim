import Link from 'next/link';
import { Icon } from '@/components/ui/Icon';
import type { Product } from '@/data/catalog';
import { SERVICE } from '@/data/site';
import styles from './ProductDetails.module.css';

/** The published fit notes, fabric copy and service terms, as native disclosures. */
export function ProductDetails({ product }: { product: Product }) {
  return (
    <div className={styles.details}>
      <details className={styles.item} open>
        <summary className={styles.summary}>
          The fit
          <Icon name="plus" size={14} className={styles.icon} />
        </summary>
        <div className={styles.body}>
          <ul className={styles.list}>
            {product.fitNotes.map((note) => (
              <li key={note}>{note}</li>
            ))}
          </ul>
        </div>
      </details>

      <details className={styles.item}>
        <summary className={styles.summary}>
          Fabric and care
          <Icon name="plus" size={14} className={styles.icon} />
        </summary>
        <div className={styles.body}>
          <ul className={styles.list}>
            {product.fabric.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
          <p>Designed in Miami. Crafted in Peru, the city of eternal heat.</p>
        </div>
      </details>

      <details className={styles.item}>
        <summary className={styles.summary}>
          Shipping and exchanges
          <Icon name="plus" size={14} className={styles.icon} />
        </summary>
        <div className={styles.body}>
          <p>{SERVICE.shipping}</p>
          <p>
            Easy exchanges. If the fit isn&rsquo;t right,{' '}
            <Link href="/contact" className="inline-link">
              write to us
            </Link>{' '}
            and we&rsquo;ll make it right.
          </p>
        </div>
      </details>
    </div>
  );
}
