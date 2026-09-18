"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import type { Product, Size } from "@/data/products";

export type CartLine = { product: Product; size: Size; quantity: number };
type CartContextValue = { lines: CartLine[]; isOpen: boolean; add: (product: Product, size: Size) => void; remove: (productHandle: string, size: Size) => void; setQuantity: (productHandle: string, size: Size, quantity: number) => void; open: () => void; close: () => void };
const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => { document.body.toggleAttribute("data-scroll-lock", isOpen); return () => document.body.removeAttribute("data-scroll-lock"); }, [isOpen]);
  useEffect(() => { if (!isOpen) return; const close = (event: KeyboardEvent) => event.key === "Escape" && setIsOpen(false); window.addEventListener("keydown", close); return () => window.removeEventListener("keydown", close); }, [isOpen]);
  const add = useCallback((product: Product, size: Size) => { setLines((current) => { const match = current.find((line) => line.product.handle === product.handle && line.size === size); if (match) return current.map((line) => line === match ? { ...line, quantity: line.quantity + 1 } : line); return [...current, { product, size, quantity: 1 }]; }); setIsOpen(true); }, []);
  const remove = useCallback((productHandle: string, size: Size) => setLines((current) => current.filter((line) => line.product.handle !== productHandle || line.size !== size)), []);
  const setQuantity = useCallback((productHandle: string, size: Size, quantity: number) => { if (quantity < 1) { remove(productHandle, size); return; } setLines((current) => current.map((line) => line.product.handle === productHandle && line.size === size ? { ...line, quantity } : line)); }, [remove]);
  const value = useMemo(() => ({ lines, isOpen, add, remove, setQuantity, open: () => setIsOpen(true), close: () => setIsOpen(false) }), [lines, isOpen, add, remove, setQuantity]);
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() { const context = useContext(CartContext); if (!context) throw new Error("useCart must be used inside CartProvider"); return context; }
