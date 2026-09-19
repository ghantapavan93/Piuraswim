import Link from 'next/link';
import { AmbientVideo } from '@/components/ui/AmbientVideo';
import { Icon } from '@/components/ui/Icon';
import { BRAND, HERO } from '@/data/site';
import { image } from '@/lib/image';
import styles from './CampaignHero.module.css';

/** The first screen. Nothing here waits for a scroll reveal: it is the largest contentful paint. */
export function CampaignHero() {
  return (
    <section className={`${styles.hero} under-header`} aria-labelledby="hero-title">
      <AmbientVideo
        desktop={{ src: '/video/piura-water-wide.mp4', poster: image('stills/shoreline-wide-poster.jpg') }}
        mobile={{ src: '/video/piura-hero-water-01.mp4', poster: image('stills/shoreline-portrait-poster.jpg') }}
        alt="A woman in a Piura bikini sitting in shallow water at golden hour"
      />
      <div className={styles.scrim} aria-hidden="true" />

      <div className={`${styles.meta} container`}>
        <p className="label">{HERO.eyebrow}</p>
        <p className={`${styles.coordinates} label`}>{BRAND.coordinates}</p>
      </div>

      <div className={`${styles.content} container`}>
        <h1 id="hero-title" className={`${styles.title} display display-xl`}>
          {HERO.title[0]}
          <br />
          <em>{HERO.title[1]}</em>
        </h1>
        <p className={styles.body}>{HERO.body}</p>
        <div className={styles.actions}>
          <Link href={HERO.primary.href} className="button button-light">
            {HERO.primary.label}
            <Icon name="arrow" />
          </Link>
          <Link href={HERO.secondary.href} className={`${styles.secondary} text-link`}>
            {HERO.secondary.label}
            <Icon name="arrow" />
          </Link>
        </div>
      </div>

      <p className={styles.scrollHint} aria-hidden="true">
        <Icon name="arrow-down" size={16} />
      </p>
    </section>
  );
}
