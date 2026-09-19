import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { MeasurementMatcher } from '@/components/fit/MeasurementMatcher';
import { SizeChart } from '@/components/fit/SizeChart';
import { SiteFooter } from '@/components/layout/SiteFooter';
import { SiteHeader } from '@/components/layout/SiteHeader';
import { Reveal } from '@/components/ui/Reveal';
import { BETWEEN_SIZES, MEASURING_NOTE, MEASURING_STEPS } from '@/data/fit';
import { FIT_CONFIDENCE, REAL_WOMEN } from '@/data/site';
import { image } from '@/lib/image';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'Size guide, find your Piura fit',
  description: FIT_CONFIDENCE.body,
};

export default function SizeGuidePage() {
  const figure = image('figure.svg');

  return (
    <>
      <SiteHeader />
      <main id="main" className={`${styles.main} container`}>
        <Reveal as="header" className={styles.head}>
          <p className="label accent">The fit guide</p>
          <h1 className="display display-lg">
            Fit is <em>everything.</em>
          </h1>
          <p className={styles.intro}>{FIT_CONFIDENCE.body}</p>
        </Reveal>

        <section className={styles.measure} aria-labelledby="measure-title">
          <Reveal className={styles.measureCopy}>
            <p className="label accent">How to measure</p>
            <h2 id="measure-title" className="display display-md">
              {FIT_CONFIDENCE.title[0]} <em>{FIT_CONFIDENCE.title[1]}</em>
            </h2>
            <p className={styles.note}>{MEASURING_NOTE}</p>
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
          </Reveal>
          <Reveal delay={120} className={styles.figure}>
            <Image src={figure.src} alt="Where to measure: bust, waist and hips" width={figure.width} height={figure.height} sizes="(max-width: 899px) 80vw, 36vw" />
          </Reveal>
        </section>

        <section className={styles.chart} aria-labelledby="chart-title">
          <Reveal>
            <div className={styles.chartHead}>
              <div>
                <p className="label accent">The chart</p>
                <h2 id="chart-title" className="display display-md">
                  Body measurements
                </h2>
              </div>
              <p className="label muted">Inches</p>
            </div>
            <SizeChart />
          </Reveal>
        </section>

        <section className={styles.match} aria-labelledby="match-title">
          <Reveal>
            <p className="label accent">Match your measurements</p>
            <h2 id="match-title" className="display display-md">
              Your numbers, <em>on the chart.</em>
            </h2>
            <p className={styles.note}>
              Enter your measurements in inches to read them against the chart above. Tops follow the bust row; bottoms take
              the larger of waist and hips.
            </p>
          </Reveal>
          <Reveal delay={120}>
            <MeasurementMatcher />
          </Reveal>
        </section>

        <section className={styles.tips} aria-label="Sizing advice">
          <Reveal className={styles.tip}>
            <h3 className="display display-sm">Between sizes?</h3>
            <p>{BETWEEN_SIZES}</p>
          </Reveal>
          <Reveal delay={100} className={styles.tip}>
            <h3 className="display display-sm">Still unsure?</h3>
            <p>
              <Link href="/contact" className="inline-link">
                Write to us
              </Link>
              , we answer every fit question personally, usually the same day.
            </p>
          </Reveal>
        </section>

        <Reveal as="section" className={styles.quote}>
          <blockquote className="display display-lg">
            &ldquo;{REAL_WOMEN.quote[0]} <em>{REAL_WOMEN.quote[1]}</em> {REAL_WOMEN.quote[2]}&rdquo;
          </blockquote>
          <p className="label muted">The fit we hold every piece to</p>
        </Reveal>
      </main>
      <SiteFooter />
    </>
  );
}
