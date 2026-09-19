import Image from 'next/image';
import Link from 'next/link';
import { Icon } from '@/components/ui/Icon';
import { Reveal } from '@/components/ui/Reveal';
import { RUNWAY } from '@/data/site';
import { image, type ImageKey } from '@/lib/image';
import { RunwayFilm } from './RunwayFilm';
import styles from './RunwayEditorial.module.css';

const FRAMES: { key: ImageKey; time: string; alt: string }[] = [
  { key: 'stills/runway-detail.jpg', time: '0:08', alt: 'A close frame of a yellow triangle top mid-walk' },
  { key: 'stills/runway-walk-red.jpg', time: '0:11', alt: 'A model walks the runway in a red-trimmed bikini' },
  { key: 'stills/runway-walk-bandeau.jpg', time: '0:14', alt: 'A model in the Moonchild bandeau set on the runway' },
  { key: 'stills/runway-walk-trio.jpg', time: '0:17', alt: 'Three models walking together in front of the Piura backdrop' },
];

export function RunwayEditorial() {
  return (
    <section className="section" aria-labelledby="runway-title">
      <div className={`${styles.grid} container`}>
        <Reveal variant="mask" className={styles.film}>
          <RunwayFilm
            poster={image('stills/runway-backdrop.jpg')}
            src="/video/runway.mp4"
            alt="A model pauses in front of the Piura Swim backdrop at Miami Swim Week"
          />
        </Reveal>

        <div className={styles.copy}>
          <Reveal>
            <p className="label accent">{RUNWAY.eyebrow}</p>
            <h2 id="runway-title" className="display display-xl">
              {RUNWAY.title[0]}
              <br />
              <em>{RUNWAY.title[1]}</em>
            </h2>
            <p className={styles.body}>{RUNWAY.body}</p>
            <Link href="/waitlist" className="text-link">
              Join the Coastlines waitlist
              <Icon name="arrow" />
            </Link>
          </Reveal>

          <Reveal delay={120}>
            <ol className={styles.filmstrip} aria-label="Frames from the runway film">
              {FRAMES.map((frame) => {
                const asset = image(frame.key);
                return (
                  <li key={frame.key}>
                    <div className={`${styles.frame} frame`}>
                      <Image src={asset.src} alt={frame.alt} width={asset.width} height={asset.height} sizes="(max-width: 719px) 40vw, 12vw" />
                    </div>
                    <span className={styles.time}>{frame.time}</span>
                  </li>
                );
              })}
            </ol>
            <p className={`${styles.caption} label`}>{RUNWAY.caption}</p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
