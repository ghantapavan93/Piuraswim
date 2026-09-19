import Image from 'next/image';
import { BRAND, REAL_WOMEN } from '@/data/site';
import { image, type ImageKey } from '@/lib/image';
import styles from './RealWomen.module.css';

const FRAMES: { key: ImageKey; alt: string }[] = [
  { key: 'lifestyle/life-42.jpg', alt: 'Two friends in Piura mesh bottoms, photographed from behind on the sand' },
  { key: 'lifestyle/life-13.jpg', alt: 'Two women walking the shoreline in Piura bikinis' },
  { key: 'lifestyle/life-52.jpg', alt: 'Friends at a beach club in the Sunchild and Moonchild prints' },
  { key: 'lifestyle/life-56.jpg', alt: 'Two women lying on a sunbed in Piura swim' },
  { key: 'lifestyle/life-06.jpg', alt: 'A beach afternoon between the parasols' },
];

export function RealWomen() {
  return (
    <section className="section" aria-labelledby="real-women-title">
      <div className="container">
        <div className={styles.head} data-reveal="fade">
          <p className="label accent">{REAL_WOMEN.eyebrow}</p>
          <blockquote id="real-women-title" className={`${styles.quote} display display-lg`}>
            &ldquo;{REAL_WOMEN.quote[0]} <em>{REAL_WOMEN.quote[1]}</em> {REAL_WOMEN.quote[2]}&rdquo;
          </blockquote>
          <p className={`${styles.caption} label`}>{REAL_WOMEN.caption}</p>
        </div>

        <ul className={styles.strip}>
          {FRAMES.map((frame, index) => {
            const asset = image(frame.key);
            return (
              <li key={frame.key} className={styles.item} data-reveal="mask" data-reveal-delay={index}>
                <div className={`${styles.frame} frame`}>
                  <Image
                    src={asset.src}
                    alt={frame.alt}
                    width={asset.width}
                    height={asset.height}
                    sizes="(max-width: 719px) 60vw, 22vw"
                  />
                </div>
              </li>
            );
          })}
        </ul>

        <p className={styles.note} data-reveal="fade">
          {REAL_WOMEN.note} Tag{' '}
          <a href={BRAND.instagram} target="_blank" rel="noopener noreferrer" className="inline-link">
            {BRAND.instagramHandle}
          </a>{' '}
          {REAL_WOMEN.tag}
        </p>
      </div>
    </section>
  );
}
