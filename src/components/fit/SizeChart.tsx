import { SIZE_CHART } from '@/data/fit';
import './SizeChart.css';
import { cx } from '@/lib/utils';

const range = ([low, high]: readonly [number, number]) => `${low} – ${high}″`;

/** The published body-measurement chart, in inches. */
export function SizeChart({ compact = false }: { compact?: boolean }) {
  return (
    <table className={cx('size-chart', compact && 'size-chart--compact')}>
      <caption className="visually-hidden">Body measurements in inches</caption>
      <thead>
        <tr>
          <th scope="col">Size</th>
          <th scope="col">Bust (A)</th>
          <th scope="col">Waist (B)</th>
          <th scope="col">Hips (C)</th>
        </tr>
      </thead>
      <tbody>
        {SIZE_CHART.map((row) => (
          <tr key={row.size}>
            <th scope="row">{row.size}</th>
            <td>{range(row.bust)}</td>
            <td>{range(row.waist)}</td>
            <td>{range(row.hips)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
