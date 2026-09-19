'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { useCart } from '@/components/commerce/CartProvider';
import { FitGuideButton } from '@/components/fit/FitGuideButton';
import { Icon } from '@/components/ui/Icon';
import { SizeChips } from '@/components/ui/SizeChips';
import { getFitFacts, getPair, getSiblings, isAvailable, printLabel, sizingTip, type Product, type Size } from '@/data/catalog';
import { SERVICE } from '@/data/site';
import { money } from '@/lib/utils';
import { CompleteTheSet } from './CompleteTheSet';
import { ProductDetails } from './ProductDetails';
import './ProductPurchasePanel.css';

export function ProductPurchasePanel({ product }: { product: Product }) {
  const pair = getPair(product);
  const { add } = useCart();
  const [size, setSize] = useState<Size | null>(null);
  const [pairSize, setPairSize] = useState<Size | null>(null);
  const [needsSize, setNeedsSize] = useState(false);
  const [showStickyBar, setShowStickyBar] = useState(false);
  const addButton = useRef<HTMLButtonElement>(null);
  const facts = getFitFacts(product);
  const siblings = getSiblings(product);
  const tip = sizingTip(product);

  // The sticky bar appears on phones once the main button has scrolled away.
  useEffect(() => {
    const button = addButton.current;
    if (!button) return;
    const observer = new IntersectionObserver(([entry]) => {
      setShowStickyBar(!entry.isIntersecting && entry.boundingClientRect.top < 0);
    });
    observer.observe(button);
    return () => observer.disconnect();
  }, []);

  function chooseSize(next: Size) {
    setSize(next);
    setNeedsSize(false);
    // Mirror the first chosen size onto the pair when that size exists for it.
    if (pair && pairSize === null && isAvailable(pair, next)) setPairSize(next);
  }

  function addToBag() {
    if (!size) {
      setNeedsSize(true);
      return;
    }
    add(product, size);
  }

  function addSet() {
    if (!size || !pair || !pairSize) return;
    add(product, size);
    add(pair, pairSize);
  }

  return (
    <div className="purchase-panel">
      <nav className="purchase-panel__breadcrumb" aria-label="Breadcrumb">
        <Link href="/shop">Shop</Link>
        <span aria-hidden="true">/</span>
        <Link href={`/shop?filter=${product.category}`}>{product.category === 'tops' ? 'Tops' : 'Bottoms'}</Link>
        <span aria-hidden="true">/</span>
        <span aria-current="page">{product.title}</span>
      </nav>

      <p className="purchase-panel__print-row">
        <span className="label accent">{printLabel(product)}</span>
        {siblings.map((sibling) => (
          <Link key={sibling.handle} href={`/product/${sibling.handle}`} className="purchase-panel__sibling">
            Also in {printLabel(sibling).replace(/^The /, 'the ')}
          </Link>
        ))}
      </p>
      <div className="purchase-panel__title-row">
        <h1 className="display display-md">{product.title}</h1>
        <p className="purchase-panel__price">{money(product.price)}</p>
      </div>
      <p className="purchase-panel__description">{product.description}</p>

      <dl className="purchase-panel__facts" aria-label="Fit at a glance">
        {facts.map((fact) => (
          <div key={fact.label}>
            <dt>{fact.label}</dt>
            <dd>{fact.value}</dd>
          </div>
        ))}
      </dl>

      <div className="purchase-panel__size-block">
        <div className="purchase-panel__size-head">
          <span className="label" id="size-label">
            Size
          </span>
          <FitGuideButton className="purchase-panel__guide">Size guide</FitGuideButton>
        </div>
        <SizeChips label="Size" available={product.available} value={size} onChange={chooseSize} />
        <p className="purchase-panel__size-hint" role="status" data-visible={needsSize ? '' : undefined}>
          Please choose a size.
        </p>
        {tip ? <p className="purchase-panel__size-tip">{tip}</p> : null}
      </div>

      <button ref={addButton} type="button" className="button button-block" onClick={addToBag}>
        {size ? `Add to bag · ${money(product.price)}` : 'Add to bag'}
        <Icon name="arrow" />
      </button>
      <p className="purchase-panel__service">
        {SERVICE.shipping} {SERVICE.exchanges}
      </p>

      {pair ? (
        <CompleteTheSet
          product={product}
          pair={pair}
          productSize={size}
          pairSize={pairSize}
          onPairSize={setPairSize}
          onAddSet={addSet}
        />
      ) : null}

      <ProductDetails product={product} />

      <div className="purchase-panel__sticky-bar" data-visible={showStickyBar ? '' : undefined} aria-hidden={!showStickyBar}>
        <div>
          <p className="purchase-panel__sticky-title">{product.title}</p>
          <p className="purchase-panel__sticky-meta">
            {money(product.price)}
            {size ? ` · Size ${size}` : ''}
          </p>
        </div>
        <button type="button" className="button" onClick={addToBag} tabIndex={showStickyBar ? 0 : -1}>
          {size ? 'Add to bag' : 'Choose a size'}
        </button>
      </div>
    </div>
  );
}
