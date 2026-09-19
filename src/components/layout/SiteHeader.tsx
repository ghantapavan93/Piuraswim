'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useCart } from '@/components/commerce/CartProvider';
import { useFitGuide } from '@/components/fit/FitGuideProvider';
import { Icon } from '@/components/ui/Icon';
import { SunMark } from '@/components/ui/SunMark';
import { BRAND, NAV } from '@/data/site';
import { AnnouncementBar } from './AnnouncementBar';
import { MobileMenu } from './MobileMenu';
import styles from './SiteHeader.module.css';

type SiteHeaderProps = {
  /** Sit transparently over a full-bleed hero until the page scrolls. */
  overlay?: boolean;
};

export function SiteHeader({ overlay = false }: SiteHeaderProps) {
  const pathname = usePathname();
  const { count, open: openBag } = useCart();
  const fitGuide = useFitGuide();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 24);
    update();
    window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, []);

  return (
    <>
      <AnnouncementBar />
      <header
        className={styles.header}
        data-overlay={overlay || undefined}
        data-scrolled={scrolled || undefined}
      >
        <div className={`${styles.inner} container`}>
          <button
            type="button"
            className={styles.menuButton}
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
          >
            <Icon name="menu" />
          </button>

          <Link href="/" className={styles.wordmark} aria-label={`${BRAND.name} home`}>
            <SunMark size={15} strokeWidth={5} className={styles.mark} />
            <span>{BRAND.wordmark}</span>
            <small>{BRAND.descriptor}</small>
          </Link>

          <nav className={styles.nav} aria-label="Primary">
            {NAV.map((item) =>
              item.action === 'fit-guide' ? (
                <button key={item.label} type="button" className={styles.navItem} onClick={fitGuide.open}>
                  {item.label}
                </button>
              ) : (
                <Link
                  key={item.href}
                  href={item.href}
                  className={styles.navItem}
                  aria-current={pathname === item.href ? 'page' : undefined}
                >
                  {item.label}
                </Link>
              ),
            )}
          </nav>

          <button
            type="button"
            className={styles.bagButton}
            onClick={openBag}
            aria-label={`Open bag, ${count} ${count === 1 ? 'item' : 'items'}`}
          >
            <Icon name="bag" />
            <span className={styles.bagLabel}>Bag</span>
            {count > 0 ? <span className={styles.bagCount}>{count}</span> : null}
          </button>
        </div>
      </header>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
