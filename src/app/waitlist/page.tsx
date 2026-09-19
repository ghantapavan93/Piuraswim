import type { Metadata } from 'next';
import Link from 'next/link';
import { CoastlinesWaitlist } from '@/components/home/CoastlinesWaitlist';
import { PageHero } from '@/components/layout/PageHero';
import { SiteFooter } from '@/components/layout/SiteFooter';
import { SiteHeader } from '@/components/layout/SiteHeader';
import { Icon } from '@/components/ui/Icon';
import { Reveal } from '@/components/ui/Reveal';
import { SunMark } from '@/components/ui/SunMark';
import { COASTLINES } from '@/data/site';
import { image } from '@/lib/image';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'The waitlist, first access to the next drop',
  description: `${COASTLINES.access} ${COASTLINES.accessLong}`,
};

export default function WaitlistPage() {
  return (
    <>
      <SiteHeader overlay />
      <main id="main">
        <PageHero
          image={image('stills/boat-sunset-back.jpg')}
          alt="Watching the sunset from the deck of a boat"
          eyebrow={COASTLINES.eyebrow}
          title={COASTLINES.pageTitle}
          size="tall"
          display="xl"
        >
          <p className={styles.heroBody}>{COASTLINES.access}</p>
          <Link href="#join" className={`${styles.heroLink} text-link`}>
            Join the waitlist
            <Icon name="arrow-down" />
          </Link>
        </PageHero>

        <Reveal as="section" className={`${styles.access} container`}>
          <SunMark size={32} className={styles.mark} />
          <p className="label accent">Waitlist access</p>
          <h2 className="display display-lg">
            {COASTLINES.earlyTitle[0]} <em>{COASTLINES.earlyTitle[1]}</em>
          </h2>
          <p className={styles.accessBody}>{COASTLINES.accessLong}</p>
        </Reveal>

        <div id="join">
          <CoastlinesWaitlist withPhone />
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
