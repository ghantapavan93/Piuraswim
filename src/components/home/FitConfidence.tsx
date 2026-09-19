import { Photo } from '@/components/ui/Photo';
import Link from 'next/link';
import { FitGuideButton } from '@/components/fit/FitGuideButton';
import { Icon } from '@/components/ui/Icon';
import { BETWEEN_SIZES, FIT_UNIVERSAL, MEASURING_STEPS } from '@/data/fit';
import { FIT_CONFIDENCE } from '@/data/site';
import { image } from '@/lib/image';
import './FitConfidence.css';

/** Fit as product experience. The three letters carry the composition; the guide is one tap away. */
export function FitConfidence() {
  const figure = image('figure.svg');

  return (
    <section className="section" aria-labelledby="fit-title">
      <div className="fit-confidence container">
        <div className="fit-confidence__copy">
          <p className="label accent">{FIT_CONFIDENCE.eyebrow}</p>
          <h2 id="fit-title" className="display display-sm">
            {FIT_CONFIDENCE.title[0]} <em>{FIT_CONFIDENCE.title[1]}</em>
          </h2>

          <ol className="fit-confidence__steps">
            {MEASURING_STEPS.map((step, index) => (
              <li key={step.key} className="fit-confidence__step" data-reveal="fade" data-reveal-delay={index}>
                <span className="fit-confidence__letter display">{step.letter}</span>
                <div className="fit-confidence__step-body">
                  <strong className="label">{step.name}</strong>
                  <p>{step.how}</p>
                </div>
              </li>
            ))}
          </ol>

          <p className="fit-confidence__body" data-reveal="fade" data-reveal-delay="3">
            {FIT_CONFIDENCE.body}
          </p>

          <div className="fit-confidence__actions" data-reveal="fade" data-reveal-delay="3">
            <FitGuideButton className="button">
              Find your Piura fit
              <Icon name="arrow" />
            </FitGuideButton>
            <Link href="/size-guide" className="text-link">
              The full size guide
            </Link>
          </div>
        </div>

        <aside className="fit-confidence__aside" data-reveal="mask" data-reveal-delay="1" aria-label="Fit facts">
          <div className="fit-confidence__figure">
            <Photo src={figure.src} alt="Where to measure: bust, waist and hips" width={figure.width} height={figure.height} sizes="(max-width: 899px) 70vw, 30vw" />
          </div>
          <dl className="fit-confidence__facts">
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
