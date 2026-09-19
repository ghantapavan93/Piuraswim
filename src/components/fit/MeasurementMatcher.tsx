'use client';

import { useId, useState } from 'react';
import { BETWEEN_SIZES, MEASURING_STEPS, matchSize } from '@/data/fit';
import type { Size } from '@/data/products';
import styles from './MeasurementMatcher.module.css';

type Measure = (typeof MEASURING_STEPS)[number]['key'];

const ORDER: Size[] = ['S', 'M', 'L', 'XL'];
const larger = (a: Size, b: Size) => (ORDER.indexOf(a) >= ORDER.indexOf(b) ? a : b);

/**
 * Looks each measurement up in the published chart. Tops follow the bust row;
 * bottoms take the larger of the waist and hip rows so both fit. No guessing
 * happens beyond that: it is the size chart, made quicker to read.
 */
export function MeasurementMatcher({ compact = false }: { compact?: boolean }) {
  const id = useId();
  const [values, setValues] = useState<Record<Measure, string>>({ bust: '', waist: '', hips: '' });

  const matches = {
    bust: matchSize('bust', Number(values.bust)),
    waist: matchSize('waist', Number(values.waist)),
    hips: matchSize('hips', Number(values.hips)),
  };

  const top = matches.bust?.size ?? null;
  const bottom =
    matches.waist && matches.hips
      ? larger(matches.waist.size, matches.hips.size)
      : (matches.hips?.size ?? matches.waist?.size ?? null);
  const approximate = Object.values(matches).some((match) => match && !match.exact);

  return (
    <div className={[styles.root, compact && styles.compact].filter(Boolean).join(' ')} id="match">
      <div className={styles.fields}>
        {MEASURING_STEPS.map((step) => (
          <div key={step.key} className={styles.field}>
            <label htmlFor={`${id}-${step.key}`} className={styles.fieldLabel}>
              <span className={styles.letter}>{step.letter}</span>
              <span className="label">{step.name}</span>
            </label>
            <div className={styles.inputWrap}>
              <input
                id={`${id}-${step.key}`}
                type="number"
                inputMode="decimal"
                min={20}
                max={60}
                step={0.5}
                placeholder="—"
                value={values[step.key]}
                onChange={(event) => setValues({ ...values, [step.key]: event.target.value })}
                className={styles.input}
                aria-describedby={`${id}-${step.key}-match`}
              />
              <span className={styles.unit} aria-hidden="true">
                in
              </span>
            </div>
            <p id={`${id}-${step.key}-match`} className={styles.match} aria-live="polite">
              {matches[step.key]
                ? `${matches[step.key]!.exact ? 'Chart size' : 'Nearest'} ${matches[step.key]!.size}`
                : 'Enter inches'}
            </p>
          </div>
        ))}
      </div>

      <div className={styles.result} aria-live="polite">
        <div className={styles.resultSizes}>
          <div>
            <span className="label">Top</span>
            <strong className="display">{top ?? '—'}</strong>
          </div>
          <span className={styles.plus} aria-hidden="true">
            +
          </span>
          <div>
            <span className="label">Bottom</span>
            <strong className="display">{bottom ?? '—'}</strong>
          </div>
        </div>
        <p className={styles.resultNote}>
          {top || bottom
            ? `Matched against the size chart only. Tops follow your bust; bottoms take the larger of waist and hips.${
                approximate ? ' A measurement sits between rows, so the nearest row is shown.' : ''
              }`
            : 'Matched against the size chart only. Tops and bottoms are sized separately.'}
        </p>
        <p className={styles.betweenSizes}>{BETWEEN_SIZES}</p>
      </div>
    </div>
  );
}
