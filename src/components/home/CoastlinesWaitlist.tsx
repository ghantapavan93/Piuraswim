import Image from 'next/image';
import { WaitlistForm } from '@/components/commerce/WaitlistForm';
import { Reveal } from '@/components/ui/Reveal';
import { COASTLINES } from '@/data/site';
import { image } from '@/lib/image';
import styles from './CoastlinesWaitlist.module.css';

type CoastlinesWaitlistProps = {
  /** The dedicated waitlist page asks for an optional phone number too. */
  withPhone?: boolean;
};

export function CoastlinesWaitlist({ withPhone = false }: CoastlinesWaitlistProps) {
  const finale = image('stills/runway-finale-wide.jpg');

  return (
    <section className={`${styles.section} on-dark`} aria-labelledby="coastlines-title">
      <div className={styles.copy}>
        <Reveal>
          <p className="label" style={{ color: 'var(--color-ember-soft)' }}>
            {COASTLINES.eyebrow}
          </p>
          <h2 id="coastlines-title" className="display display-xl">
            <em>{COASTLINES.name}</em>
          </h2>
          <p className={styles.body}>{COASTLINES.body}</p>
          <div className={styles.form}>
            <WaitlistForm layout="stacked" onDark withPhone={withPhone} />
          </div>
          <p className={styles.note}>{withPhone ? COASTLINES.formNote : COASTLINES.access}</p>
        </Reveal>
      </div>

      <div className={styles.media}>
        <Image
          src={finale.src}
          alt="The Coastlines runway finale at Miami Swim Week 2026"
          width={finale.width}
          height={finale.height}
          sizes="(max-width: 899px) 100vw, 50vw"
          quality={85}
          className={styles.image}
        />
      </div>
    </section>
  );
}
