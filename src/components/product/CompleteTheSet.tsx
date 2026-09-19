'use client';

import { Photo } from '@/components/ui/Photo';
import Link from 'next/link';
import { Icon } from '@/components/ui/Icon';
import { SizeChips } from '@/components/ui/SizeChips';
import { isSignaturePiece, type Product, type Size } from '@/data/catalog';
import { image } from '@/lib/image';
import { money } from '@/lib/utils';
import './CompleteTheSet.css';

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
    <section className="complete-the-set" aria-labelledby="complete-set-title">
      <p id="complete-set-title" className="label accent">
        {designedAsOne ? 'Designed as one' : 'Complete the set'}
      </p>

      <div className="complete-the-set__pair">
        <Link href={`/product/${pair.handle}`} className="complete-the-set__thumb frame">
          <Photo src={asset.src} alt={pair.title} width={asset.width} height={asset.height} sizes="96px" />
        </Link>
        <div className="complete-the-set__body">
          <div className="complete-the-set__row">
            <Link href={`/product/${pair.handle}`} className="complete-the-set__title">
              {pair.title}
            </Link>
            <span className="complete-the-set__price">{money(pair.price)}</span>
          </div>
          <p className="complete-the-set__note">
            The {pair.category === 'bottoms' ? 'bottom' : 'top'} this {product.category === 'tops' ? 'top' : 'bottom'} was
            designed with. Choose its size separately.
          </p>
        </div>
      </div>

      <div className="complete-the-set__sizes">
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
