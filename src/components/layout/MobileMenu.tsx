'use client';

import Link from 'next/link';
import { useEffect, useRef } from 'react';
import { useFitGuide } from '@/components/fit/FitGuideProvider';
import { Icon } from '@/components/ui/Icon';
import { SunMark } from '@/components/ui/SunMark';
import { BRAND, NAV } from '@/data/site';
import './MobileMenu.css';

type MobileMenuProps = {
  open: boolean;
  onClose: () => void;
};

export function MobileMenu({ open, onClose }: MobileMenuProps) {
  const closeButton = useRef<HTMLButtonElement>(null);
  const fitGuide = useFitGuide();

  useEffect(() => {
    document.body.toggleAttribute('data-scroll-lock', open);
    if (open) closeButton.current?.focus();
    return () => document.body.removeAttribute('data-scroll-lock');
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  return (
    <div
      id="mobile-menu"
      className="mobile-menu"
      role="dialog"
      aria-modal="true"
      aria-label="Menu"
      data-open={open ? '' : undefined}
      aria-hidden={!open}
      // Keep the whole dialog out of the tab order while it is closed.
      inert={!open}
    >
      <div className="mobile-menu__top">
        <span className="mobile-menu__wordmark">
          <SunMark size={14} strokeWidth={5} className="mobile-menu__mark" />
          {BRAND.wordmark} <small>{BRAND.descriptor}</small>
        </span>
        <button ref={closeButton} type="button" onClick={onClose} aria-label="Close menu" className="mobile-menu__close">
          <Icon name="close" size={20} />
        </button>
      </div>

      <nav className="mobile-menu__nav" aria-label="Primary">
        {NAV.map((item, index) =>
          item.action === 'fit-guide' ? (
            <button
              key={item.label}
              type="button"
              className="mobile-menu__item display"
              onClick={() => {
                onClose();
                fitGuide.open();
              }}
            >
              <span className="mobile-menu__index">0{index + 1}</span>
              {item.label}
            </button>
          ) : (
            <Link key={item.href} href={item.href} className="mobile-menu__item display" onClick={onClose}>
              <span className="mobile-menu__index">0{index + 1}</span>
              {item.label}
            </Link>
          ),
        )}
      </nav>

      <p className="mobile-menu__origin label">{BRAND.origin}</p>
    </div>
  );
}
