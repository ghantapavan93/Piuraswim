/**
 * Read helpers over the generated catalog. Components import from here so
 * the data shape can change in one place.
 */

import { FIT_AT_A_GLANCE, FIT_UNIVERSAL, type FitFact } from './fit';
import { PRODUCTS, type CollectionKey, type Product, type Size } from './products';

export type { Product, Size, CollectionKey };

export const SIZES: Size[] = ['S', 'M', 'L', 'XL'];

const byHandle = new Map(PRODUCTS.map((p) => [p.handle, p]));

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

/** A top and its designed bottom, or vice versa, with the combined price. */
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
  return PRODUCTS.filter((p) => p.category === 'tops')
    .map((top) => getSet(top))
    .filter((set): set is ProductSet => Boolean(set));
}

export function getFitFacts(product: Product): FitFact[] {
  return [...(FIT_AT_A_GLANCE[product.handle] ?? []), ...FIT_UNIVERSAL];
}

export function isAvailable(product: Product, size: Size): boolean {
  return product.available.includes(size);
}

/** Print or colour family name shown above product titles. */
export function printLabel(product: Product): string {
  return { sunchild: 'The Sunchild print', moonchild: 'The Moonchild print', classics: 'The Classics' }[product.collection];
}

/** Silhouette family, derived from the product title (used for filtering). */
export type Silhouette = 'Triangle' | 'Bandeau' | 'Mesh' | 'Side-tie';

export function silhouetteOf(product: Product): Silhouette {
  const t = product.title.toLowerCase();
  if (t.includes('bandeau')) return 'Bandeau';
  if (t.includes('mesh')) return 'Mesh';
  if (t.includes('side-tie')) return 'Side-tie';
  return 'Triangle';
}

export const JUST_DROPPED = PRODUCTS.filter((p) => p.justDropped);
export const ALL_PRODUCTS = PRODUCTS;
