import type { Metadata } from 'next';
import Link from 'next/link';
import { CoastlinesWaitlist } from '@/components/home/CoastlinesWaitlist';
import { PageHero } from '@/components/layout/PageHero';
import { Icon } from '@/components/ui/Icon';
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

      <section className={`${styles.access} container`} data-reveal="fade">
        <SunMark size={32} className={styles.mark} />
        <p className="label accent">Waitlist access</p>
        <h2 className="display display-lg">
          {COASTLINES.earlyTitle[0]} <em>{COASTLINES.earlyTitle[1]}</em>
        </h2>
        <p className={styles.accessBody}>{COASTLINES.accessLong}</p>
      </section>

      <div id="join">
        <CoastlinesWaitlist withPhone />
      </div>
    </main>
  );
}
