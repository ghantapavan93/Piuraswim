'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { useCart } from '@/components/commerce/CartProvider';
import { FitGuideButton } from '@/components/fit/FitGuideButton';
import { Icon } from '@/components/ui/Icon';
import { SizeChips } from '@/components/ui/SizeChips';
import { getFitFacts, requireProduct, type Size } from '@/data/catalog';
import { SIGNATURE_SET } from '@/data/site';
import { image } from '@/lib/image';
import { money } from '@/lib/utils';
import styles from './SignatureSet.module.css';

type Print = keyof typeof SIGNATURE_SET.topHandles;

const PRINTS: { key: Print; label: string }[] = [
  { key: 'sunchild', label: 'Sunchild' },
  { key: 'moonchild', label: 'Moonchild' },
];

/**
 * The Signature Triangle as one shopping unit: choose the print, then a size
 * for the top and a size for the bottom, and add both with one action. The
 * price is the plain sum of the two pieces; nothing is discounted or invented.
 */
export function SignatureSet() {
  const [print, setPrint] = useState<Print>('sunchild');
  const [topSize, setTopSize] = useState<Size | null>(null);
  const [bottomSize, setBottomSize] = useState<Size | null>(null);
  const { add } = useCart();

  const top = requireProduct(SIGNATURE_SET.topHandles[print]);
  const bottom = requireProduct(SIGNATURE_SET.bottomHandles[print]);
  const total = top.price + bottom.price;
  const ready = Boolean(topSize && bottomSize);

  // Fit facts published for the top and bottom, without repeating shared lines.
  const facts = [...getFitFacts(top), ...getFitFacts(bottom)].filter(
    (fact, index, all) => all.findIndex((other) => other.value === fact.value) === index,
  );

  function addSet() {
    if (!topSize || !bottomSize) return;
    add(top, topSize);
    add(bottom, bottomSize);
  }

  return (
    <section className={styles.section} aria-labelledby="signature-title">
      <div className={styles.media}>
        {PRINTS.map(({ key }) => {
          const asset = image(requireProduct(SIGNATURE_SET.topHandles[key]).images[0]);
          return (
            <Image
              key={key}
              src={asset.src}
              alt={`The Signature Triangle set in the ${key === 'sunchild' ? 'Sunchild' : 'Moonchild'} print`}
              width={asset.width}
              height={asset.height}
              sizes="(max-width: 899px) 100vw, 50vw"
              quality={85}
              className={styles.image}
              data-active={print === key || undefined}
            />
          );
        })}
        <p className={`${styles.caption} label`}>{SIGNATURE_SET.tagline}</p>
      </div>

      <div className={styles.panel}>
        <p className="label accent">{SIGNATURE_SET.eyebrow}</p>
        <h2 id="signature-title" className="display display-lg">
          {SIGNATURE_SET.title[0]} <em>{SIGNATURE_SET.title[1]}</em>
        </h2>
        <p className={styles.body}>{SIGNATURE_SET.body}</p>

        <dl className={styles.facts}>
          {facts.map((fact) => (
            <div key={`${fact.label}-${fact.value}`}>
              <dt>{fact.label}</dt>
              <dd>{fact.value}</dd>
            </div>
          ))}
        </dl>

        <div className={styles.print} role="radiogroup" aria-label="Print">
          {PRINTS.map(({ key, label }) => {
            const thumb = image(requireProduct(SIGNATURE_SET.bottomHandles[key]).images[0]);
            return (
              <button
                key={key}
                type="button"
                role="radio"
                aria-checked={print === key}
                className={styles.printOption}
                data-selected={print === key || undefined}
                onClick={() => setPrint(key)}
              >
                <span className={`${styles.printThumb} frame`}>
                  <Image src={thumb.src} alt="" width={thumb.width} height={thumb.height} sizes="48px" />
                </span>
                <span>The {label} print</span>
              </button>
            );
          })}
        </div>

        <fieldset className={styles.sizes}>
          <legend className="visually-hidden">Choose a size for the top and a size for the bottom</legend>
          <div className={styles.sizeGroup}>
            <div className={styles.sizeHead}>
              <span className="label">Top size</span>
              <FitGuideButton className={styles.guide}>Size guide</FitGuideButton>
            </div>
            <SizeChips label="Top size" available={top.available} value={topSize} onChange={setTopSize} />
          </div>
          <div className={styles.sizeGroup}>
            <div className={styles.sizeHead}>
              <span className="label">Bottom size</span>
            </div>
            <SizeChips label="Bottom size" available={bottom.available} value={bottomSize} onChange={setBottomSize} />
          </div>
        </fieldset>

        <div className={styles.summary}>
          <p className={styles.price}>
            <span className="label">The full set</span>
            <strong className="display">{money(total)}</strong>
            <span className={styles.priceNote}>
              {top.title} {money(top.price)} + {bottom.title} {money(bottom.price)}
            </span>
          </p>
          <button type="button" className="button" disabled={!ready} onClick={addSet}>
            {ready ? `Add the set · ${money(total)}` : 'Choose both sizes'}
            <Icon name="arrow" />
          </button>
        </div>

        <p className={styles.links}>
          <Link href={`/product/${top.handle}`} className="text-link">
            Shop the top
          </Link>
          <Link href={`/product/${bottom.handle}`} className="text-link">
            Shop the bottom
          </Link>
        </p>
      </div>
    </section>
  );
}
