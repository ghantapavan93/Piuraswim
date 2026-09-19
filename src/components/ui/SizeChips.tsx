'use client';

import type { Size } from '@/data/products';
import { SIZES } from '@/data/catalog';
import styles from './SizeChips.module.css';

type SizeChipsProps = {
  /** Accessible name for the group, e.g. "Top size". */
  label: string;
  available: Size[];
  value: Size | null;
  onChange: (size: Size) => void;
  /** Smaller chips for secondary contexts such as the bag drawer. */
  compact?: boolean;
  /** Ivory chips for dark surfaces. */
  onDark?: boolean;
};

/**
 * Size selection as a radio group. Sizes that are sold out stay visible
 * but cannot be chosen, so the range of the piece is always clear.
 */
export function SizeChips({ label, available, value, onChange, compact = false, onDark = false }: SizeChipsProps) {
  return (
    <div
      role="radiogroup"
      aria-label={label}
      className={[styles.group, compact && styles.compact, onDark && styles.onDark].filter(Boolean).join(' ')}
    >
      {SIZES.map((size) => {
        const inStock = available.includes(size);
        const selected = value === size;
        return (
          <button
            key={size}
            type="button"
            role="radio"
            aria-checked={selected}
            aria-disabled={!inStock || undefined}
            disabled={!inStock}
            className={styles.chip}
            data-selected={selected || undefined}
            onClick={() => onChange(size)}
          >
            {size}
            {!inStock ? <span className="visually-hidden">, sold out</span> : null}
          </button>
        );
      })}
    </div>
  );
}
