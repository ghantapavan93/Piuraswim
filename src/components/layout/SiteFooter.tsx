import Link from 'next/link';
import { WaitlistForm } from '@/components/commerce/WaitlistForm';
import { Icon, type IconName } from '@/components/ui/Icon';
import { SunMark } from '@/components/ui/SunMark';
import { BRAND, FOOTER_CAPTURE, SERVICE_PILLARS } from '@/data/site';
import './SiteFooter.css';

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
    <footer className="site-footer">
      <div className="site-footer__pillars">
        <ul className="site-footer__pillar-list container">
          {SERVICE_PILLARS.map((pillar, index) => (
            <li key={pillar.title} className="site-footer__pillar">
              <Icon name={PILLAR_ICONS[index]} size={18} className="site-footer__pillar-icon" />
              <div>
                <p className="label">{pillar.title}</p>
                <p className="site-footer__pillar-text">{pillar.text}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="site-footer__main container">
        <div className="site-footer__capture">
          <p className="label accent">{FOOTER_CAPTURE.eyebrow}</p>
          <h2 className="site-footer__capture-title display display-sm">
            {FOOTER_CAPTURE.title[0]} <em>{FOOTER_CAPTURE.title[1]}</em>
          </h2>
          <p className="site-footer__capture-note">{FOOTER_CAPTURE.note}</p>
          <WaitlistForm layout="inline" />
        </div>

        <nav className="site-footer__columns" aria-label="Footer">
          {COLUMNS.map((column) => (
            <div key={column.title}>
              <p className="site-footer__column-title label">{column.title}</p>
              <ul className="site-footer__column-list">
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

      <div className="site-footer__bottom container">
        <p className="site-footer__brand">
          <SunMark size={16} strokeWidth={4} className="site-footer__brand-mark" />
          <span>{BRAND.name}</span>
        </p>
        <p className="site-footer__origin label">{BRAND.originLong}</p>
        <p className="site-footer__copyright">&copy; 2026 {BRAND.name}. All rights reserved.</p>
      </div>
    </footer>
  );
}
