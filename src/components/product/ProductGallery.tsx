'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { Icon } from '@/components/ui/Icon';
import type { Product } from '@/data/catalog';
import { image } from '@/lib/image';
import styles from './ProductGallery.module.css';

const pad = (value: number) => String(value).padStart(2, '0');

/**
 * One scroll-snap strip for every viewport: swipe on a phone, arrows and
 * thumbnails on a desktop. The active index follows the scroll position.
 */
export function ProductGallery({ product }: { product: Product }) {
  const stripRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const total = product.images.length;

  useEffect(() => {
    const strip = stripRef.current;
    if (!strip) return;
    const slides = Array.from(strip.children) as HTMLElement[];
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting);
        if (!visible.length) return;
        const index = slides.indexOf(visible[0].target as HTMLElement);
        if (index >= 0) setActive(index);
      },
      { root: strip, threshold: 0.6 },
    );
    slides.forEach((slide) => observer.observe(slide));
    return () => observer.disconnect();
  }, [product.handle]);

  function scrollTo(index: number) {
    const strip = stripRef.current;
    if (!strip) return;
    const clamped = (index + total) % total;
    const slide = strip.children[clamped] as HTMLElement | undefined;
    slide?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' });
  }

  return (
    <div className={styles.gallery}>
      <div className={styles.stage}>
        <div ref={stripRef} className={styles.strip} aria-roledescription="carousel" aria-label={`${product.title} images`}>
          {product.images.map((key, index) => {
            const asset = image(key);
            return (
              <figure
                key={key}
                className={`${styles.slide} frame`}
                aria-roledescription="slide"
                aria-label={`${index + 1} of ${total}`}
              >
                <Image
                  src={asset.src}
                  alt={`${product.title}, view ${index + 1}`}
                  width={asset.width}
                  height={asset.height}
                  sizes="(max-width: 899px) 100vw, 55vw"
                  priority={index === 0}
                  quality={85}
                />
              </figure>
            );
          })}
        </div>

        {total > 1 ? (
          <>
            <button type="button" className={`${styles.arrow} ${styles.prev}`} onClick={() => scrollTo(active - 1)} aria-label="Previous image">
              <Icon name="chevron-left" />
            </button>
            <button type="button" className={`${styles.arrow} ${styles.next}`} onClick={() => scrollTo(active + 1)} aria-label="Next image">
              <Icon name="chevron-right" />
            </button>
            <p className={styles.counter} aria-live="polite">
              {pad(active + 1)} / {pad(total)}
            </p>
          </>
        ) : null}
      </div>

      {total > 1 ? (
        <div className={styles.thumbs} role="tablist" aria-label="Choose an image">
          {product.images.map((key, index) => {
            const asset = image(key);
            return (
              <button
                key={key}
                type="button"
                role="tab"
                aria-selected={active === index}
                aria-label={`Image ${index + 1}`}
                className={`${styles.thumb} frame`}
                data-active={active === index || undefined}
                onClick={() => scrollTo(index)}
              >
                <Image src={asset.src} alt="" width={asset.width} height={asset.height} sizes="72px" />
              </button>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}
