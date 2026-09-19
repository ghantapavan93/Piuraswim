'use client';

import { createContext, useCallback, useContext, useEffect, useMemo, useState, useSyncExternalStore, type ReactNode } from 'react';
import { getProduct, type Product, type Size } from '@/data/catalog';
import { bagStore, type StoredLine } from '@/lib/bag-store';

export type CartLine = { product: Product; size: Size; quantity: number };

type CartContextValue = {
  lines: CartLine[];
  count: number;
  subtotal: number;
  isOpen: boolean;
  add: (product: Product, size: Size, quantity?: number) => void;
  remove: (handle: string, size: Size) => void;
  setQuantity: (handle: string, size: Size, quantity: number) => void;
  open: () => void;
  close: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);

bagStore.setValidator((line) => Boolean(getProduct(line.handle)));

/**
 * Bag state for the concept. Lines are kept as handle + size + quantity in
 * localStorage; products are resolved from the catalog on read.
 */
export function CartProvider({ children }: { children: ReactNode }) {
  const stored = useSyncExternalStore(bagStore.subscribe, bagStore.getSnapshot, bagStore.getServerSnapshot);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    document.body.toggleAttribute('data-scroll-lock', isOpen);
    return () => document.body.removeAttribute('data-scroll-lock');
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen]);

  const update = useCallback((mutate: (current: StoredLine[]) => StoredLine[]) => {
    bagStore.set(mutate(bagStore.getSnapshot()));
  }, []);

  const add = useCallback(
    (product: Product, size: Size, quantity = 1) => {
      update((current) => {
        const existing = current.find((line) => line.handle === product.handle && line.size === size);
        if (existing) {
          return current.map((line) =>
            line === existing ? { ...line, quantity: line.quantity + quantity } : line,
          );
        }
        return [...current, { handle: product.handle, size, quantity }];
      });
      setIsOpen(true);
    },
    [update],
  );

  const remove = useCallback(
    (handle: string, size: Size) => {
      update((current) => current.filter((line) => !(line.handle === handle && line.size === size)));
    },
    [update],
  );

  const setQuantity = useCallback(
    (handle: string, size: Size, quantity: number) => {
      if (quantity < 1) {
        remove(handle, size);
        return;
      }
      update((current) =>
        current.map((line) => (line.handle === handle && line.size === size ? { ...line, quantity } : line)),
      );
    },
    [remove, update],
  );

  const value = useMemo<CartContextValue>(() => {
    const lines = stored
      .map((line) => {
        const product = getProduct(line.handle);
        return product ? { product, size: line.size, quantity: line.quantity } : null;
      })
      .filter((line): line is CartLine => line !== null);
    return {
      lines,
      count: lines.reduce((sum, line) => sum + line.quantity, 0),
      subtotal: lines.reduce((sum, line) => sum + line.product.price * line.quantity, 0),
      isOpen,
      add,
      remove,
      setQuantity,
      open: () => setIsOpen(true),
      close: () => setIsOpen(false),
    };
  }, [stored, isOpen, add, remove, setQuantity]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used inside <CartProvider>');
  return context;
}
