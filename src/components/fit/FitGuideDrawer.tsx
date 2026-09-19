'use client';

import Link from 'next/link';
import { useEffect, useRef } from 'react';
import { Icon } from '@/components/ui/Icon';
import { BETWEEN_SIZES, MEASURING_NOTE, MEASURING_STEPS } from '@/data/fit';
import { FIT_CONFIDENCE } from '@/data/site';
import { useFitGuide } from './FitGuideProvider';
import { MeasurementMatcher } from './MeasurementMatcher';
import { SizeChart } from './SizeChart';
import styles from './FitGuideDrawer.module.css';

/** Size and fit reference, reachable from the header, product pages and the set builder. */
export function FitGuideDrawer() {
  const { isOpen, close } = useFitGuide();
  const closeButton = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (isOpen) closeButton.current?.focus();
  }, [isOpen]);

  return (
    <div className={styles.shell} data-open={isOpen || undefined} inert={!isOpen}>
      <button type="button" className={styles.scrim} onClick={close} aria-label="Close the fit guide" tabIndex={-1} />
      <aside className={styles.panel} role="dialog" aria-modal="true" aria-labelledby="fit-guide-title">
        <header className={styles.header}>
          <div>
            <p className="label accent">{FIT_CONFIDENCE.eyebrow}</p>
            <h2 id="fit-guide-title" className="display display-sm">
              {FIT_CONFIDENCE.title[0]} <em>{FIT_CONFIDENCE.title[1]}</em>
            </h2>
          </div>
          <button ref={closeButton} type="button" onClick={close} aria-label="Close the fit guide" className={styles.close}>
            <Icon name="close" size={20} />
          </button>
        </header>

        <div className={styles.body}>
          <p className={styles.intro}>{FIT_CONFIDENCE.body}</p>

          <section className={styles.block} aria-labelledby="fit-guide-match">
            <h3 id="fit-guide-match" className="label">
              Match your measurements
            </h3>
            <MeasurementMatcher compact />
          </section>

          <section className={styles.block} aria-labelledby="fit-guide-chart">
            <h3 id="fit-guide-chart" className="label">
              Body measurements · inches
            </h3>
            <SizeChart compact />
          </section>

          <section className={styles.block} aria-labelledby="fit-guide-measure">
            <h3 id="fit-guide-measure" className="label">
              How to measure
            </h3>
            <p className={styles.note}>{MEASURING_NOTE}</p>
            <ol className={styles.steps}>
              {MEASURING_STEPS.map((step) => (
                <li key={step.key}>
                  <span className={styles.letter}>{step.letter}</span>
                  <div>
                    <strong>{step.name}</strong>
                    <p>{step.how}</p>
                  </div>
                </li>
              ))}
            </ol>
          </section>

          <section className={styles.block} aria-labelledby="fit-guide-between">
            <h3 id="fit-guide-between" className="label">
              Between sizes?
            </h3>
            <p className={styles.note}>{BETWEEN_SIZES}</p>
          </section>

          <p className={styles.help}>
            Still unsure?{' '}
            <Link href="/contact" className="inline-link" onClick={close}>
              Write to us
            </Link>
            , we answer every fit question personally, usually the same day.{' '}
            <Link href="/size-guide" className="inline-link" onClick={close}>
              Open the full size guide
            </Link>
            .
          </p>
        </div>
      </aside>
    </div>
  );
}
