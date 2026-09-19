import type { Metadata } from 'next';
import { Photo } from '@/components/ui/Photo';
import Link from 'next/link';
import { MeasurementMatcher } from '@/components/fit/MeasurementMatcher';
import { SizeChart } from '@/components/fit/SizeChart';
import { BETWEEN_SIZES, MEASURING_NOTE, MEASURING_STEPS } from '@/data/fit';
import { FIT_CONFIDENCE, REAL_WOMEN } from '@/data/site';
import { image } from '@/lib/image';
import './page.css';

export const metadata: Metadata = {
  title: 'Size guide, find your Piura fit',
  description: FIT_CONFIDENCE.body,
};

export default function SizeGuidePage() {
  const figure = image('figure.svg');

  return (
    <main id="main" className="size-guide-page container">
      <header className="size-guide-page__head">
        <p className="label accent">The fit guide</p>
        <h1 className="display display-lg">
          Fit is <em>everything.</em>
        </h1>
        <p className="size-guide-page__intro">{FIT_CONFIDENCE.body}</p>
      </header>

      <section className="size-guide-page__measure" aria-labelledby="measure-title">
        <div className="size-guide-page__measure-copy" data-reveal="fade">
          <p className="label accent">How to measure</p>
          <h2 id="measure-title" className="display display-md">
            {FIT_CONFIDENCE.title[0]} <em>{FIT_CONFIDENCE.title[1]}</em>
          </h2>
          <p className="size-guide-page__note">{MEASURING_NOTE}</p>
          <ol className="size-guide-page__steps">
            {MEASURING_STEPS.map((step) => (
              <li key={step.key}>
                <span className="size-guide-page__letter">{step.letter}</span>
                <div>
                  <strong className="label">{step.name}</strong>
                  <p>{step.how}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
        <div className="size-guide-page__figure" data-reveal="fade" data-reveal-delay="1">
          <Photo src={figure.src} alt="Where to measure: bust, waist and hips" width={figure.width} height={figure.height} sizes="(max-width: 899px) 80vw, 36vw" />
        </div>
      </section>

      <section className="size-guide-page__chart" aria-labelledby="chart-title" data-reveal="fade">
        <div className="size-guide-page__chart-head">
          <div>
            <p className="label accent">The chart</p>
            <h2 id="chart-title" className="display display-md">
              Body measurements
            </h2>
          </div>
          <p className="label muted">Inches</p>
        </div>
        <SizeChart />
      </section>

      <section className="size-guide-page__match" aria-labelledby="match-title" data-reveal="fade">
        <div>
          <p className="label accent">Match your measurements</p>
          <h2 id="match-title" className="display display-md">
            Your numbers, <em>on the chart.</em>
          </h2>
          <p className="size-guide-page__note">
            Enter your measurements in inches to read them against the chart above. Tops follow the bust row; bottoms take
            the larger of waist and hips.
          </p>
        </div>
        <MeasurementMatcher />
      </section>

      <section className="size-guide-page__tips" aria-label="Sizing advice">
        <div className="size-guide-page__tip" data-reveal="fade">
          <h3 className="display display-sm">Between sizes?</h3>
          <p>{BETWEEN_SIZES}</p>
        </div>
        <div className="size-guide-page__tip" data-reveal="fade" data-reveal-delay="1">
          <h3 className="display display-sm">Still unsure?</h3>
          <p>
            <Link href="/contact" className="inline-link">
              Write to us
            </Link>
            , we answer every fit question personally, usually the same day.
          </p>
        </div>
      </section>

      <section className="size-guide-page__quote" data-reveal="fade">
        <blockquote className="display display-lg">
          &ldquo;{REAL_WOMEN.quote[0]} <em>{REAL_WOMEN.quote[1]}</em> {REAL_WOMEN.quote[2]}&rdquo;
        </blockquote>
        <p className="label muted">The fit we hold every piece to</p>
      </section>
    </main>
  );
}
