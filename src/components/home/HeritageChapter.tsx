import Image from 'next/image';
import Link from 'next/link';
import { Icon } from '@/components/ui/Icon';
import { BRAND, HERITAGE } from '@/data/site';
import { image } from '@/lib/image';
import styles from './HeritageChapter.module.css';

export function HeritageChapter() {
  const lead = image('lifestyle/life-61.jpg');
  const detail = image('lifestyle/life-71.jpg');

  return (
    <section className={`${styles.section} on-dark`} aria-labelledby="heritage-title">
      <div className={`${styles.grid} container`}>
        <ol className={styles.index} data-reveal="fade">
          {HERITAGE.chapters.map((chapter) => (
            <li key={chapter.index}>
              <span className={styles.numeral}>{chapter.index}</span>
              <span>{chapter.place}</span>
            </li>
          ))}
        </ol>

        <div className={styles.copy} data-reveal="fade" data-reveal-delay="1">
          <p className="label accent-soft">{HERITAGE.eyebrow}</p>
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
        </div>

        <div className={styles.media}>
          <div className={`${styles.lead} frame`} data-reveal="mask">
            <Image
              src={lead.src}
              alt="A Piura bikini worn above a cove of turquoise water"
              width={lead.width}
              height={lead.height}
              sizes="(max-width: 899px) 100vw, 36vw"
              quality={85}
            />
          </div>
          <div className={`${styles.detail} frame`} data-reveal="mask" data-reveal-delay="2">
            <Image
              src={detail.src}
              alt="A quiet rocky cove at midday"
              width={detail.width}
              height={detail.height}
              sizes="(max-width: 899px) 50vw, 16vw"
            />
          </div>
          <p className={`${styles.coordinates} label`}>{BRAND.coordinates}</p>
        </div>
      </div>
    </section>
  );
}
