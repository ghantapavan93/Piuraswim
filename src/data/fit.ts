/**
 * Fit language, curated by hand from Piura's published product copy and size
 * guide. Every value below is either verbatim from piuraswim.com or a direct
 * shortening of it. Nothing here is estimated. See docs/SOURCE_NOTES.md.
 */

import type { Size } from './products';

export type FitFact = { label: string; value: string };

/** "Fit at a glance" rows shown on product pages, keyed by product handle. */
export const FIT_AT_A_GLANCE: Record<string, FitFact[]> = {
  'sunchild-triangle-top': [
    { label: 'Silhouette', value: 'Classic triangle' },
    { label: 'Adjustability', value: 'Adjustable ties' },
    { label: 'Support', value: 'Sculpt and support' },
  ],
  'moonchild-triangle-top': [
    { label: 'Silhouette', value: 'Classic triangle' },
    { label: 'Adjustability', value: 'Adjustable ties' },
    { label: 'Support', value: 'Sculpt and support' },
  ],
  'sunchild-triangle-bottom': [
    { label: 'Coverage', value: 'Minimal / cheeky' },
    { label: 'Silhouette', value: 'Seamless triangle' },
    { label: 'Lining', value: 'Fully lined' },
  ],
  'moonchild-triangle-bottom': [
    { label: 'Coverage', value: 'Minimal / cheeky' },
    { label: 'Silhouette', value: 'Seamless triangle' },
    { label: 'Lining', value: 'Fully lined' },
  ],
  'moonchild-bottom': [
    { label: 'Coverage', value: 'Cheeky' },
    { label: 'Detail', value: 'Soft mesh' },
    { label: 'Silhouette', value: 'Smooth, seamless' },
  ],
  'lotus-bottom': [
    { label: 'Coverage', value: 'Cheeky' },
    { label: 'Detail', value: 'Soft mesh' },
    { label: 'Silhouette', value: 'Smooth, seamless' },
  ],
  'moonchild-bandeau-top': [
    { label: 'Silhouette', value: 'Strapless bandeau' },
    { label: 'Support', value: 'No padding, natural fit' },
    { label: 'Detail', value: 'Soft mesh' },
  ],
  'sunchild-bandeau-top': [
    { label: 'Silhouette', value: 'Strapless bandeau' },
    { label: 'Support', value: 'No padding, natural fit' },
    { label: 'Detail', value: 'Soft mesh' },
  ],
  'bella-side-tie-scrunch-bottom': [
    { label: 'Coverage', value: 'Minimal / cheeky' },
    { label: 'Adjustability', value: 'Side ties' },
    { label: 'Detail', value: 'Scrunch back' },
  ],
  'bella-bikini-top': [
    { label: 'Silhouette', value: 'Classic triangle' },
    { label: 'Adjustability', value: 'Neck and back ties' },
    { label: 'Colour', value: 'Soft baby pink' },
  ],
  'bali-side-tie-bikini-scrunch-bottom': [
    { label: 'Coverage', value: 'Minimal / cheeky' },
    { label: 'Adjustability', value: 'Side ties' },
    { label: 'Detail', value: 'Scrunch back, contrast ties' },
  ],
  'bali-bikini-top': [
    { label: 'Silhouette', value: 'Classic triangle' },
    { label: 'Adjustability', value: 'Neck and back ties' },
    { label: 'Detail', value: 'Contrasting edges' },
  ],
  'sara-side-tie-scrunch-bottom': [
    { label: 'Coverage', value: 'Cheeky' },
    { label: 'Silhouette', value: 'Clean, seamless' },
    { label: 'Made for', value: 'Effortless tan lines' },
  ],
  'sara-bikini-top': [
    { label: 'Silhouette', value: 'Minimal' },
    { label: 'Adjustability', value: 'Adjustable straps' },
    { label: 'Hardware', value: 'None, seamless' },
  ],
  'marina-tri-bandeau-bottom': [
    { label: 'Coverage', value: 'Cheeky' },
    { label: 'Silhouette', value: 'V-cut waist' },
    { label: 'Detail', value: 'Breathable mesh' },
  ],
  'marina-tri-bandeau-top': [
    { label: 'Silhouette', value: 'Curved bandeau' },
    { label: 'Support', value: 'Side support for lift and shape' },
    { label: 'Detail', value: 'Breathable mesh cutout' },
  ],
};

/** Stated on every Piura product page. */
export const FIT_UNIVERSAL: FitFact[] = [
  { label: 'Fit', value: 'True to size' },
  { label: 'Model', value: 'Wears size S' },
];

/** Body measurements in inches, from piuraswim.com/size-guide. */
export type SizeRow = { size: Size; bust: [number, number]; waist: [number, number]; hips: [number, number] };

export const SIZE_CHART: SizeRow[] = [
  { size: 'S', bust: [32, 34], waist: [25, 26], hips: [35, 36] },
  { size: 'M', bust: [34, 36], waist: [27, 28], hips: [37, 38] },
  { size: 'L', bust: [37, 39], waist: [29, 31], hips: [39, 41] },
  { size: 'XL', bust: [40, 42], waist: [32, 34], hips: [42, 44] },
];

export const MEASURING_STEPS = [
  { key: 'bust', letter: 'A', name: 'Bust', how: 'Measure around the fullest part of your chest, tape level and soft.' },
  { key: 'waist', letter: 'B', name: 'Waist', how: 'Measure around the narrowest part of your natural waistline.' },
  { key: 'hips', letter: 'C', name: 'Hips', how: 'Feet together, measure around the fullest part of your hips and seat.' },
] as const;

export const MEASURING_NOTE = 'Use a soft tape measure over bare skin or fitted underwear, keep it snug, never tight.';

export const BETWEEN_SIZES =
  'Size up in bottoms for more coverage, down for extra cheeky. Triangle tops tie to you, so they flex a full size.';

export const SIZE_RANGE_NOTE = 'Every Piura piece runs true to size, Small through X-Large.';

/**
 * Matches a measurement to the published chart. This is a lookup against the
 * size guide, not a recommendation engine: it returns the rows whose range
 * contains the value, or the nearest row when the value falls in a gap.
 */
export function matchSize(measure: 'bust' | 'waist' | 'hips', inches: number): { size: Size; exact: boolean } | null {
  if (!Number.isFinite(inches) || inches <= 0) return null;
  const exact = SIZE_CHART.find((row) => inches >= row[measure][0] && inches <= row[measure][1]);
  if (exact) return { size: exact.size, exact: true };
  const nearest = [...SIZE_CHART].sort((a, b) => {
    const da = Math.min(Math.abs(inches - a[measure][0]), Math.abs(inches - a[measure][1]));
    const db = Math.min(Math.abs(inches - b[measure][0]), Math.abs(inches - b[measure][1]));
    return da - db;
  })[0];
  return { size: nearest.size, exact: false };
}
