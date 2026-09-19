import Image from 'next/image';
import Link from 'next/link';
import { Icon } from '@/components/ui/Icon';
import { isSignaturePiece, printLabel, type ProductSet } from '@/data/catalog';
import { image } from '@/lib/image';
import { money } from '@/lib/utils';
import styles from './SetCard.module.css';

type SetCardProps = {
  set: ProductSet;
  /** Reveal stagger step within a row, 0 to 5. */
  stagger?: number;
};

/** A designed pair presented as one unit: two pieces, one price, separate sizes. */
export function SetCard({ set, stagger = 0 }: SetCardProps) {
  const top = image(set.top.images[0]);
  const bottom = image(set.bottom.images[0]);
  const family = set.top.title.replace(/ top$/i, '');

  return (
    <article className={styles.card} data-reveal="fade" data-reveal-delay={stagger || undefined}>
      <Link href={`/product/${set.top.handle}`} className={styles.media} aria-label={`${family} set`}>
        <span className={`${styles.frame} frame`}>
          <Image src={top.src} alt={set.top.title} width={top.width} height={top.height} sizes="(max-width: 719px) 50vw, 20vw" />
        </span>
        <span className={`${styles.frame} frame`}>
          <Image src={bottom.src} alt={set.bottom.title} width={bottom.width} height={bottom.height} sizes="(max-width: 719px) 50vw, 20vw" />
        </span>
      </Link>

      <div className={styles.copy}>
        <p className={styles.print}>
          {printLabel(set.top)}
          {isSignaturePiece(set.top) ? ' · The Signature Triangle' : ''}
        </p>
        <div className={styles.row}>
          <h3 className={styles.title}>{family} set</h3>
          <span className={styles.price}>{money(set.price)}</span>
        </div>
        <p className={styles.pieces}>
          {set.top.title} {money(set.top.price)} + {set.bottom.title} {money(set.bottom.price)}
        </p>
        <Link href={`/product/${set.top.handle}`} className={`${styles.cta} text-link`}>
          Build the set
          <Icon name="arrow" />
        </Link>
      </div>
    </article>
  );
}
