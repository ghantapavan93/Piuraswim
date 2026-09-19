'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Icon } from '@/components/ui/Icon';
import { SizeChips } from '@/components/ui/SizeChips';
import { isSignaturePiece, type Product, type Size } from '@/data/catalog';
import { image } from '@/lib/image';
import { money } from '@/lib/utils';
import styles from './CompleteTheSet.module.css';

type CompleteTheSetProps = {
  product: Product;
  pair: Product;
  productSize: Size | null;
  pairSize: Size | null;
  onPairSize: (size: Size) => void;
  onAddSet: () => void;
};

/**
 * The designed partner of the piece on the page, with its own size, and one
 * action that adds both. The set price is simply the two prices added.
 */
export function CompleteTheSet({ product, pair, productSize, pairSize, onPairSize, onAddSet }: CompleteTheSetProps) {
  const asset = image(pair.images[0]);
  const designedAsOne = isSignaturePiece(product) && isSignaturePiece(pair);
  const ready = Boolean(productSize && pairSize);
  const setPrice = product.price + pair.price;

  return (
    <section className={styles.root} aria-labelledby="complete-set-title">
      <p id="complete-set-title" className="label accent">
        {designedAsOne ? 'Designed as one' : 'Complete the set'}
      </p>

      <div className={styles.pair}>
        <Link href={`/product/${pair.handle}`} className={`${styles.thumb} frame`}>
          <Image src={asset.src} alt={pair.title} width={asset.width} height={asset.height} sizes="96px" />
        </Link>
        <div className={styles.body}>
          <div className={styles.row}>
            <Link href={`/product/${pair.handle}`} className={styles.title}>
              {pair.title}
            </Link>
            <span className={styles.price}>{money(pair.price)}</span>
          </div>
          <p className={styles.note}>
            The {pair.category === 'bottoms' ? 'bottom' : 'top'} this {product.category === 'tops' ? 'top' : 'bottom'} was
            designed with. Choose its size separately.
          </p>
        </div>
      </div>

      <div className={styles.sizes}>
        <span className="label">{pair.category === 'bottoms' ? 'Bottom size' : 'Top size'}</span>
        <SizeChips label={`${pair.title} size`} available={pair.available} value={pairSize} onChange={onPairSize} />
      </div>

      <button type="button" className="button button-outline button-block" disabled={!ready} onClick={onAddSet}>
        {ready ? `Add the set · ${money(setPrice)}` : `Choose both sizes · ${money(setPrice)} the set`}
        <Icon name="arrow" />
      </button>
    </section>
  );
}
