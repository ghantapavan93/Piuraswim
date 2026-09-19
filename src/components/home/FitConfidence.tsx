import Image from 'next/image';
import Link from 'next/link';
import { FitGuideButton } from '@/components/fit/FitGuideButton';
import { Icon } from '@/components/ui/Icon';
import { BETWEEN_SIZES, FIT_UNIVERSAL, MEASURING_STEPS } from '@/data/fit';
import { FIT_CONFIDENCE } from '@/data/site';
import { image } from '@/lib/image';
import styles from './FitConfidence.module.css';

/** Fit as product experience. The three letters carry the composition; the guide is one tap away. */
export function FitConfidence() {
  const figure = image('figure.svg');

  return (
    <section className="section" aria-labelledby="fit-title">
      <div className={`${styles.grid} container`}>
        <div className={styles.copy}>
          <p className="label accent">{FIT_CONFIDENCE.eyebrow}</p>
          <h2 id="fit-title" className="display display-sm">
            {FIT_CONFIDENCE.title[0]} <em>{FIT_CONFIDENCE.title[1]}</em>
          </h2>

          <ol className={styles.steps}>
            {MEASURING_STEPS.map((step, index) => (
              <li key={step.key} className={styles.step} data-reveal="fade" data-reveal-delay={index}>
                <span className={`${styles.letter} display`}>{step.letter}</span>
                <div className={styles.stepBody}>
                  <strong className="label">{step.name}</strong>
                  <p>{step.how}</p>
                </div>
              </li>
            ))}
          </ol>

          <p className={styles.body} data-reveal="fade" data-reveal-delay="3">
            {FIT_CONFIDENCE.body}
          </p>

          <div className={styles.actions} data-reveal="fade" data-reveal-delay="3">
            <FitGuideButton className="button">
              Find your Piura fit
              <Icon name="arrow" />
            </FitGuideButton>
            <Link href="/size-guide" className="text-link">
              The full size guide
            </Link>
          </div>
        </div>

        <aside className={styles.aside} data-reveal="mask" data-reveal-delay="1" aria-label="Fit facts">
          <div className={styles.figure}>
            <Image src={figure.src} alt="Where to measure: bust, waist and hips" width={figure.width} height={figure.height} sizes="(max-width: 899px) 70vw, 30vw" />
          </div>
          <dl className={styles.facts}>
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
        </aside>
      </div>
    </section>
  );
}
