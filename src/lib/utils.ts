/** Joins class names, skipping falsy values. */
export function cx(...values: Array<string | false | null | undefined>): string {
  return values.filter(Boolean).join(' ');
}

/** Formats a USD amount the way Piura prints prices: whole dollars, no cents. */
export function money(amount: number): string {
  return Number.isInteger(amount) ? `$${amount}` : `$${amount.toFixed(2)}`;
}

/** Superscript digits, used for collection counts (e.g. "All swim ¹⁶"). */
export function superscript(value: number): string {
  const digits = '⁰¹²³⁴⁵⁶⁷⁸⁹';
  return String(value)
    .split('')
    .map((d) => digits[Number(d)] ?? d)
    .join('');
}
