import Link from 'next/link';
import { SiteFooter } from '@/components/layout/SiteFooter';
import { SiteHeader } from '@/components/layout/SiteHeader';
import { Icon } from '@/components/ui/Icon';
import styles from './not-found.module.css';

export default function NotFound() {
  return (
    <>
      <SiteHeader />
      <main id="main" className={`${styles.main} container`}>
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
