import Image from 'next/image';
import Link from 'next/link';
import { Icon } from '@/components/ui/Icon';
import { Reveal } from '@/components/ui/Reveal';
import { BRAND, HERITAGE } from '@/data/site';
import { image } from '@/lib/image';
import styles from './HeritageChapter.module.css';

export function HeritageChapter() {
  const lead = image('lifestyle/life-61.jpg');
  const detail = image('lifestyle/life-71.jpg');

  return (
    <section className={`${styles.section} on-dark`} aria-labelledby="heritage-title">
      <div className={`${styles.grid} container`}>
        <Reveal className={styles.index}>
          <ol>
            {HERITAGE.chapters.map((chapter) => (
              <li key={chapter.index}>
                <span className={styles.numeral}>{chapter.index}</span>
                <span>{chapter.place}</span>
              </li>
            ))}
          </ol>
        </Reveal>

        <Reveal delay={80} className={styles.copy}>
          <p className="label" style={{ color: 'var(--color-ember-soft)' }}>
            {HERITAGE.eyebrow}
          </p>
          <h2 id="heritage-title" className="display display-xl">
            {HERITAGE.title[0]}
            <br />
            <em>{HERITAGE.title[1]}</em>
          </h2>
          <p className={styles.body}>{HERITAGE.body}</p>
          <blockquote className={styles.quote}>
            <p>&ldquo;{HERITAGE.quote}&rdquo;</p>
            <footer className="label">{HERITAGE.attribution}</footer>
          </blockquote>
          <Link href="/story" className={`${styles.link} text-link`}>
            Read the story
            <Icon name="arrow" />
          </Link>
        </Reveal>

        <div className={styles.media}>
          <Reveal variant="mask" className={styles.lead}>
            <div className="frame">
              <Image
                src={lead.src}
                alt="A Piura bikini worn above a cove of turquoise water"
                width={lead.width}
                height={lead.height}
                sizes="(max-width: 899px) 100vw, 36vw"
                quality={85}
              />
            </div>
          </Reveal>
          <Reveal variant="mask" delay={200} className={styles.detail}>
            <div className="frame">
              <Image
                src={detail.src}
                alt="A quiet rocky cove at midday"
                width={detail.width}
                height={detail.height}
                sizes="(max-width: 899px) 50vw, 16vw"
              />
            </div>
          </Reveal>
          <p className={`${styles.coordinates} label`}>{BRAND.coordinates}</p>
        </div>
      </div>
    </section>
  );
}
