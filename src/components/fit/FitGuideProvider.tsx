'use client';

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from 'react';

type FitGuideContextValue = {
  isOpen: boolean;
  open: () => void;
  close: () => void;
  /** The element that opened the guide, so focus can return to it. */
  returnFocusTo: React.MutableRefObject<HTMLElement | null>;
};

const FitGuideContext = createContext<FitGuideContextValue | null>(null);

/** Opens the size and fit guide from anywhere: header, product page, set builder. */
export function FitGuideProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const returnFocusTo = useRef<HTMLElement | null>(null);

  const open = useCallback(() => {
    returnFocusTo.current = document.activeElement as HTMLElement | null;
    setIsOpen(true);
  }, []);

  const close = useCallback(() => {
    setIsOpen(false);
    returnFocusTo.current?.focus();
  }, []);

  useEffect(() => {
    document.body.toggleAttribute('data-scroll-lock', isOpen);
    return () => document.body.removeAttribute('data-scroll-lock');
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') close();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen, close]);

  const value = useMemo(() => ({ isOpen, open, close, returnFocusTo }), [isOpen, open, close]);

  return <FitGuideContext.Provider value={value}>{children}</FitGuideContext.Provider>;
}

export function useFitGuide(): FitGuideContextValue {
  const context = useContext(FitGuideContext);
  if (!context) throw new Error('useFitGuide must be used inside <FitGuideProvider>');
  return context;
}
