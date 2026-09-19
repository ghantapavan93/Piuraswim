'use client';

import { Photo } from '@/components/ui/Photo';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { Icon } from '@/components/ui/Icon';
import { SizeChips } from '@/components/ui/SizeChips';
import { getPair, isAvailable, printLabel, type Product, type Size } from '@/data/catalog';
import { image } from '@/lib/image';
import { SERVICE } from '@/data/site';
import { money } from '@/lib/utils';
import { useCart, type CartLine } from './CartProvider';
import './CartDrawer.css';

const SIGNATURE_HANDLES = new Set([
  'sunchild-triangle-top',
  'sunchild-triangle-bottom',
  'moonchild-triangle-top',
  'moonchild-triangle-bottom',
]);

/** The designed partner of the most recent line that is not in the bag yet. */
function findPairSuggestion(lines: CartLine[]): { line: CartLine; pair: Product } | null {
  for (let index = lines.length - 1; index >= 0; index -= 1) {
    const line = lines[index];
    const pair = getPair(line.product);
    if (!pair) continue;
    const alreadyInBag = lines.some((other) => other.product.handle === pair.handle);
    if (!alreadyInBag) return { line, pair };
  }
  return null;
}

export function CartDrawer() {
  const { lines, count, subtotal, isOpen, close, add, remove, setQuantity } = useCart();
  const closeButton = useRef<HTMLButtonElement>(null);
  const [checkoutNotice, setCheckoutNotice] = useState(false);
  const [wasOpen, setWasOpen] = useState(isOpen);

  // Clear the checkout notice whenever the drawer closes (state adjusted during render).
  if (wasOpen !== isOpen) {
    setWasOpen(isOpen);
    if (!isOpen) setCheckoutNotice(false);
  }

  useEffect(() => {
    if (isOpen) closeButton.current?.focus();
  }, [isOpen]);

  const remaining = Math.max(0, SERVICE.freeShippingThreshold - subtotal);
  const progress = Math.min(100, (subtotal / SERVICE.freeShippingThreshold) * 100);
  const suggestion = findPairSuggestion(lines);

  return (
    <div className="cart-drawer" data-open={isOpen ? '' : undefined} inert={!isOpen}>
      <button type="button" className="cart-drawer__scrim" onClick={close} aria-label="Close bag" tabIndex={-1} />
      <aside className="cart-drawer__panel" role="dialog" aria-modal="true" aria-labelledby="bag-title">
        <header className="cart-drawer__header">
          <h2 id="bag-title" className="label">
            Your bag{count > 0 ? <span className="cart-drawer__count"> · {count}</span> : null}
          </h2>
          <button ref={closeButton} type="button" onClick={close} aria-label="Close bag" className="cart-drawer__close">
            <Icon name="close" size={20} />
          </button>
        </header>

        {lines.length === 0 ? (
          <div className="cart-drawer__empty">
            <p className="display display-sm">
              Your bag is <em>empty.</em>
            </p>
            <p className="cart-drawer__empty-note">Find your next piece.</p>
            <Link href="/shop" className="button" onClick={close}>
              Shop the collection
              <Icon name="arrow" />
            </Link>
          </div>
        ) : (
          <>
            <div className="cart-drawer__body">
              <ul className="cart-drawer__lines">
                {lines.map((line) => (
                  <BagLine
                    key={`${line.product.handle}-${line.size}`}
                    line={line}
                    onClose={close}
                    onRemove={() => remove(line.product.handle, line.size)}
                    onQuantity={(quantity) => setQuantity(line.product.handle, line.size, quantity)}
                  />
                ))}
              </ul>

              {suggestion ? (
                <PairSuggestion
                  line={suggestion.line}
                  pair={suggestion.pair}
                  onAdd={(size) => add(suggestion.pair, size)}
                />
              ) : null}
            </div>

            <footer className="cart-drawer__footer">
              <p className="cart-drawer__shipping">
                {remaining > 0
                  ? `${money(remaining)} away from free US shipping.`
                  : 'Free US shipping on this order.'}
              </p>
              <progress className="cart-drawer__meter" value={Math.round(progress)} max={100} aria-hidden="true" />
              <div className="cart-drawer__subtotal">
                <span className="label">Subtotal</span>
                <strong>{money(subtotal)}</strong>
              </div>
              <button type="button" className="button button-block" onClick={() => setCheckoutNotice(true)}>
                Checkout
                <Icon name="arrow" />
              </button>
              <p className="cart-drawer__footnote" role="status">
                {checkoutNotice
                  ? 'Checkout is not connected in this concept; in production this hands off to the store.'
                  : 'Shipping and taxes calculated at checkout.'}
              </p>
            </footer>
          </>
        )}
      </aside>
    </div>
  );
}

function BagLine({
  line,
  onClose,
  onRemove,
  onQuantity,
}: {
  line: CartLine;
  onClose: () => void;
  onRemove: () => void;
  onQuantity: (quantity: number) => void;
}) {
  const asset = image(line.product.images[0]);
  const href = `/product/${line.product.handle}`;
  return (
    <li className="cart-drawer__line">
      <Link href={href} onClick={onClose} className="cart-drawer__thumb frame">
        <Photo src={asset.src} alt={line.product.title} width={asset.width} height={asset.height} sizes="88px" />
      </Link>
      <div className="cart-drawer__line-body">
        <p className="cart-drawer__line-print">{printLabel(line.product)}</p>
        <div className="cart-drawer__line-head">
          <Link href={href} onClick={onClose} className="cart-drawer__line-title">
            {line.product.title}
          </Link>
          <span>{money(line.product.price * line.quantity)}</span>
        </div>
        <p className="cart-drawer__line-meta">Size {line.size}</p>
        <div className="cart-drawer__line-controls">
          <div className="cart-drawer__quantity" role="group" aria-label={`Quantity for ${line.product.title}, size ${line.size}`}>
            <button type="button" onClick={() => onQuantity(line.quantity - 1)} aria-label="Decrease quantity">
              <Icon name="minus" size={12} />
            </button>
            <span aria-live="polite">{line.quantity}</span>
            <button type="button" onClick={() => onQuantity(line.quantity + 1)} aria-label="Increase quantity">
              <Icon name="plus" size={12} />
            </button>
          </div>
          <button type="button" className="cart-drawer__remove" onClick={onRemove}>
            Remove
          </button>
        </div>
      </div>
    </li>
  );
}

function PairSuggestion({ line, pair, onAdd }: { line: CartLine; pair: Product; onAdd: (size: Size) => void }) {
  const [size, setSize] = useState<Size | null>(isAvailable(pair, line.size) ? line.size : null);
  const asset = image(pair.images[0]);
  const designedAsOne = SIGNATURE_HANDLES.has(line.product.handle) && SIGNATURE_HANDLES.has(pair.handle);

  return (
    <section className="cart-drawer__pair" aria-labelledby="bag-pair-title">
      <p id="bag-pair-title" className="label accent">
        {designedAsOne ? 'Designed as one' : 'Complete the set'}
      </p>
      <div className="cart-drawer__pair-card">
        <Link href={`/product/${pair.handle}`} className="cart-drawer__pair-thumb frame">
          <Photo src={asset.src} alt={pair.title} width={asset.width} height={asset.height} sizes="72px" />
        </Link>
        <div className="cart-drawer__pair-body">
          <p className="cart-drawer__pair-title">
            {pair.title} <span>{money(pair.price)}</span>
          </p>
          <p className="cart-drawer__pair-note">
            {pair.category === 'bottoms' ? 'The bottom' : 'The top'} of your {line.product.title}.
          </p>
          <SizeChips label={`${pair.title} size`} available={pair.available} value={size} onChange={setSize} compact />
          <button
            type="button"
            className="button button-outline cart-drawer__pair-add"
            disabled={!size}
            onClick={() => size && onAdd(size)}
          >
            {size ? `Add size ${size} · ${money(pair.price)}` : 'Choose a size'}
          </button>
        </div>
      </div>
    </section>
  );
}
