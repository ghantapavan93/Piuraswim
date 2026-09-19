import Image from 'next/image';
import Link from 'next/link';
import { FitGuideButton } from '@/components/fit/FitGuideButton';
import { Icon } from '@/components/ui/Icon';
import { Reveal } from '@/components/ui/Reveal';
import { BETWEEN_SIZES, FIT_UNIVERSAL, MEASURING_STEPS } from '@/data/fit';
import { FIT_CONFIDENCE } from '@/data/site';
import { image } from '@/lib/image';
import styles from './FitConfidence.module.css';

/** Fit as product experience: the published guidance, surfaced before checkout. */
export function FitConfidence() {
  const figure = image('figure.svg');

  return (
    <section className="section" aria-labelledby="fit-title">
      <div className={`${styles.grid} container`}>
        <Reveal className={styles.copy}>
          <p className="label accent">{FIT_CONFIDENCE.eyebrow}</p>
          <h2 id="fit-title" className="display display-lg">
            {FIT_CONFIDENCE.title[0]} <em>{FIT_CONFIDENCE.title[1]}</em>
          </h2>
          <p className={styles.body}>{FIT_CONFIDENCE.body}</p>

          <ol className={styles.steps}>
            {MEASURING_STEPS.map((step) => (
              <li key={step.key}>
                <span className={styles.letter}>{step.letter}</span>
                <div>
                  <strong className="label">{step.name}</strong>
                  <p>{step.how}</p>
                </div>
              </li>
            ))}
          </ol>

          <div className={styles.actions}>
            <FitGuideButton className="button">
              Find your Piura fit
              <Icon name="arrow" />
            </FitGuideButton>
            <Link href="/size-guide" className="text-link">
              The full size guide
            </Link>
          </div>
        </Reveal>

        <Reveal delay={120} className={styles.aside}>
          <figure className={styles.figure}>
            <Image src={figure.src} alt="Where to measure: bust, waist and hips" width={figure.width} height={figure.height} sizes="(max-width: 899px) 70vw, 30vw" />
          </figure>
          <dl className={styles.universal}>
            {FIT_UNIVERSAL.map((fact) => (
              <div key={fact.label}>
                <dt className="label">{fact.label}</dt>
                <dd>{fact.value}</dd>
              </div>
            ))}
            <div>
              <dt className="label">Between sizes</dt>
              <dd>{BETWEEN_SIZES}</dd>
            </div>
          </dl>
        </Reveal>
      </div>
    </section>
  );
}
