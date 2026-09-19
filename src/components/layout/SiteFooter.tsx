import Link from 'next/link';
import { WaitlistForm } from '@/components/commerce/WaitlistForm';
import { Icon, type IconName } from '@/components/ui/Icon';
import { SunMark } from '@/components/ui/SunMark';
import { BRAND, FOOTER_CAPTURE, SERVICE_PILLARS } from '@/data/site';
import styles from './SiteFooter.module.css';

const PILLAR_ICONS: IconName[] = ['ruler', 'waves', 'send', 'refresh'];

const COLUMNS = [
  {
    title: 'Shop',
    links: [
      { href: '/shop', label: 'All swim' },
      { href: '/shop?filter=sets', label: 'Sets' },
      { href: '/shop?filter=tops', label: 'Tops' },
      { href: '/shop?filter=bottoms', label: 'Bottoms' },
      { href: '/shop?filter=sunchild', label: 'The Sunchild print' },
      { href: '/shop?filter=moonchild', label: 'The Moonchild print' },
      { href: '/shop?filter=classics', label: 'The Classics' },
    ],
  },
  {
    title: 'Fit and service',
    links: [
      { href: '/size-guide', label: 'Size guide' },
      { href: '/size-guide#match', label: 'Match your measurements' },
      { href: '/contact', label: 'Exchanges' },
      { href: '/contact', label: 'Contact' },
    ],
  },
  {
    title: 'House',
    links: [
      { href: '/story', label: 'Our story' },
      { href: '/waitlist', label: 'The Coastlines waitlist' },
      { href: BRAND.instagram, label: 'Instagram', external: true },
    ],
  },
] as const;

export function SiteFooter() {
  return (
    <footer className={styles.footer}>
      <div className={styles.pillars}>
        <ul className={`${styles.pillarList} container`}>
          {SERVICE_PILLARS.map((pillar, index) => (
            <li key={pillar.title} className={styles.pillar}>
              <Icon name={PILLAR_ICONS[index]} size={18} className={styles.pillarIcon} />
              <div>
                <p className="label">{pillar.title}</p>
                <p className={styles.pillarText}>{pillar.text}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className={`${styles.main} container`}>
        <div className={styles.capture}>
          <p className="label accent">{FOOTER_CAPTURE.eyebrow}</p>
          <h2 className={`${styles.captureTitle} display display-sm`}>
            {FOOTER_CAPTURE.title[0]} <em>{FOOTER_CAPTURE.title[1]}</em>
          </h2>
          <p className={styles.captureNote}>{FOOTER_CAPTURE.note}</p>
          <WaitlistForm layout="inline" />
        </div>

        <nav className={styles.columns} aria-label="Footer">
          {COLUMNS.map((column) => (
            <div key={column.title}>
              <p className={`${styles.columnTitle} label`}>{column.title}</p>
              <ul className={styles.columnList}>
                {column.links.map((link) => (
                  <li key={link.label}>
                    {'external' in link && link.external ? (
                      <a href={link.href} target="_blank" rel="noopener noreferrer">
                        {link.label}
                      </a>
                    ) : (
                      <Link href={link.href}>{link.label}</Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
      </div>

      <div className={`${styles.bottom} container`}>
        <p className={styles.brand}>
          <SunMark size={16} strokeWidth={4} className={styles.brandMark} />
          <span>{BRAND.name}</span>
        </p>
        <p className={`${styles.origin} label`}>{BRAND.originLong}</p>
        <p className={styles.copyright}>&copy; 2026 {BRAND.name}. All rights reserved.</p>
      </div>
    </footer>
  );
}
