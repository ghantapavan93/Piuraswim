'use client';

import { useId, useState } from 'react';
import { BETWEEN_SIZES, MEASURING_STEPS, matchSize } from '@/data/fit';
import type { Size } from '@/data/products';
import './MeasurementMatcher.css';
import { cx } from '@/lib/utils';

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
    <div className={cx('measurement-matcher', compact && 'measurement-matcher--compact')} id="match">
      <div className="measurement-matcher__fields">
        {MEASURING_STEPS.map((step) => (
          <div key={step.key} className="measurement-matcher__field">
            <label htmlFor={`${id}-${step.key}`} className="measurement-matcher__field-label">
              <span className="measurement-matcher__letter">{step.letter}</span>
              <span className="label">{step.name}</span>
            </label>
            <div className="measurement-matcher__input-wrap">
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
                className="measurement-matcher__input"
                aria-describedby={`${id}-${step.key}-match`}
              />
              <span className="measurement-matcher__unit" aria-hidden="true">
                in
              </span>
            </div>
            <p id={`${id}-${step.key}-match`} className="measurement-matcher__match" aria-live="polite">
              {matches[step.key]
                ? `${matches[step.key]!.exact ? 'Chart size' : 'Nearest'} ${matches[step.key]!.size}`
                : 'Enter inches'}
            </p>
          </div>
        ))}
      </div>

      <div className="measurement-matcher__result" aria-live="polite">
        <div className="measurement-matcher__result-sizes">
          <div>
            <span className="label">Top</span>
            <strong className="display">{top ?? '—'}</strong>
          </div>
          <span className="measurement-matcher__plus" aria-hidden="true">
            +
          </span>
          <div>
            <span className="label">Bottom</span>
            <strong className="display">{bottom ?? '—'}</strong>
          </div>
        </div>
        <p className="measurement-matcher__result-note">
          {top || bottom
            ? `Matched against the size chart only. Tops follow your bust; bottoms take the larger of waist and hips.${
                approximate ? ' A measurement sits between rows, so the nearest row is shown.' : ''
              }`
            : 'Matched against the size chart only. Tops and bottoms are sized separately.'}
        </p>
        <p className="measurement-matcher__between-sizes">{BETWEEN_SIZES}</p>
      </div>
    </div>
  );
}
