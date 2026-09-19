'use client';

import { useEffect, useRef, type CSSProperties, type ElementType, type ReactNode } from 'react';

type RevealProps = {
  children: ReactNode;
  /** `fade` slides up softly; `mask` wipes the content in from the top, for imagery. */
  variant?: 'fade' | 'mask';
  /** Stagger in milliseconds. */
  delay?: number;
  as?: ElementType;
  className?: string;
};

/**
 * Reveals children once when they enter the viewport. Styling lives in
 * globals.css under `[data-reveal]`; reduced-motion users see content
 * immediately.
 */
export function Reveal({ children, variant = 'fade', delay = 0, as: Tag = 'div', className }: RevealProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (typeof IntersectionObserver === 'undefined') {
      node.dataset.revealState = 'in';
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        node.dataset.revealState = 'in';
        observer.disconnect();
      },
      { threshold: 0.12, rootMargin: '0px 0px -6% 0px' },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      className={className}
      data-reveal={variant}
      style={{ '--reveal-delay': `${delay}ms` } as CSSProperties}
    >
      {children}
    </Tag>
  );
}
