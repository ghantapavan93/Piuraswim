/**
 * Read helpers over the generated catalog. Components import from here so
 * the data shape can change in one place.
 */

import { BETWEEN_SIZES_BOTTOMS, BETWEEN_SIZES_TRIANGLE_TOPS, FIT_AT_A_GLANCE, FIT_UNIVERSAL, type FitFact } from './fit';
import { PRODUCTS, type CollectionKey, type Product, type Size } from './products';

export type { Product, Size, CollectionKey };

export const SIZES: Size[] = ['S', 'M', 'L', 'XL'];

const byHandle = new Map(PRODUCTS.map((product) => [product.handle, product]));

/** The four pieces Piura calls the Signature Triangle, in both prints. */
const SIGNATURE_HANDLES = new Set([
  'sunchild-triangle-top',
  'sunchild-triangle-bottom',
  'moonchild-triangle-top',
  'moonchild-triangle-bottom',
]);

export function getProduct(handle: string): Product | undefined {
  return byHandle.get(handle);
}

export function requireProduct(handle: string): Product {
  const product = byHandle.get(handle);
  if (!product) throw new Error(`Unknown product handle: ${handle}`);
  return product;
}

export function getPair(product: Product): Product | undefined {
  return byHandle.get(product.pairsWith);
}

/** A top and its designed bottom, or vice versa, with the plain combined price. */
export type ProductSet = { top: Product; bottom: Product; price: number };

export function getSet(product: Product): ProductSet | undefined {
  const pair = getPair(product);
  if (!pair) return undefined;
  const top = product.category === 'tops' ? product : pair;
  const bottom = product.category === 'bottoms' ? product : pair;
  return { top, bottom, price: top.price + bottom.price };
}

/** Every designed pair in the catalog, listed once (by the top). */
export function getAllSets(): ProductSet[] {
  return PRODUCTS.filter((product) => product.category === 'tops')
    .map((top) => getSet(top))
    .filter((set): set is ProductSet => Boolean(set));
}

export function isSignaturePiece(product: Product): boolean {
  return SIGNATURE_HANDLES.has(product.handle);
}

export function getFitFacts(product: Product): FitFact[] {
  return [...(FIT_AT_A_GLANCE[product.handle] ?? []), ...FIT_UNIVERSAL];
}

export function isAvailable(product: Product, size: Size): boolean {
  return product.available.includes(size);
}

/** Print or colour family shown above product titles. */
export function printLabel(product: Product): string {
  return { sunchild: 'The Sunchild print', moonchild: 'The Moonchild print', classics: 'The Classics' }[product.collection];
}

const PRINT_PREFIX = /^(Sunchild|Moonchild)\s+/;

/** The same cut in the other print, e.g. Sunchild Triangle Top ↔ Moonchild Triangle Top. */
export function getSiblings(product: Product): Product[] {
  const cut = product.title.replace(PRINT_PREFIX, '');
  if (cut === product.title) return [];
  return PRODUCTS.filter((candidate) => candidate.handle !== product.handle && candidate.title.replace(PRINT_PREFIX, '') === cut);
}

/** The published between-sizes guidance that applies to this piece, if any. */
export function sizingTip(product: Product): string | null {
  if (product.category === 'bottoms') return BETWEEN_SIZES_BOTTOMS;
  if (product.fitNotes.some((note) => /triangle/i.test(note))) return BETWEEN_SIZES_TRIANGLE_TOPS;
  return null;
}

/** Other pieces from the same print or family, excluding the product and its pair. */
export function getRelated(product: Product, limit = 4): Product[] {
  return PRODUCTS.filter(
    (candidate) =>
      candidate.collection === product.collection &&
      candidate.handle !== product.handle &&
      candidate.handle !== product.pairsWith,
  ).slice(0, limit);
}

export const JUST_DROPPED = PRODUCTS.filter((product) => product.justDropped);
export const ALL_PRODUCTS = PRODUCTS;
