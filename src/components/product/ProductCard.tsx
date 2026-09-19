import Image from 'next/image';
import Link from 'next/link';
import { Reveal } from '@/components/ui/Reveal';
import { printLabel, type Product } from '@/data/catalog';
import { image } from '@/lib/image';
import { money } from '@/lib/utils';
import { QuickAdd } from './QuickAdd';
import styles from './ProductCard.module.css';

type ProductCardProps = {
  product: Product;
  delay?: number;
  priority?: boolean;
  sizes?: string;
};

export function ProductCard({
  product,
  delay = 0,
  priority = false,
  sizes = '(max-width: 719px) 50vw, (max-width: 1099px) 33vw, 25vw',
}: ProductCardProps) {
  const primary = image(product.images[0]);
  const alternate = product.images[1] ? image(product.images[1]) : null;
  const href = `/product/${product.handle}`;

  return (
    <Reveal as="article" delay={delay} className={styles.card}>
      <div className={styles.media}>
        <Link href={href} className={`${styles.link} frame`} aria-label={product.title}>
          <Image
            src={primary.src}
            alt={`${product.title}, front`}
            width={primary.width}
            height={primary.height}
            sizes={sizes}
            priority={priority}
            className={styles.primary}
          />
          {alternate ? (
            <Image
              src={alternate.src}
              alt=""
              width={alternate.width}
              height={alternate.height}
              sizes={sizes}
              className={styles.alternate}
            />
          ) : null}
        </Link>
        <QuickAdd product={product} />
      </div>

      <div className={styles.copy}>
        <p className={styles.print}>{printLabel(product)}</p>
        <div className={styles.row}>
          <Link href={href} className={styles.title}>
            {product.title}
          </Link>
          <span className={styles.price}>{money(product.price)}</span>
        </div>
      </div>
    </Reveal>
  );
}
