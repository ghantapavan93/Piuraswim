import Link from 'next/link';
import { SiteFooter } from '@/components/layout/SiteFooter';
import { SiteHeader } from '@/components/layout/SiteHeader';
import { Icon } from '@/components/ui/Icon';

export default function NotFound() {
  return (
    <>
      <SiteHeader />
      <main id="main" className="container section" style={{ display: 'grid', gap: '1.5rem', justifyItems: 'start' }}>
        <p className="label accent">404</p>
        <h1 className="display display-lg">
          That page has <em>drifted away.</em>
        </h1>
        <Link href="/shop" className="button">
          Shop all swim
          <Icon name="arrow" />
        </Link>
      </main>
      <SiteFooter />
    </>
  );
}
