import Image from 'next/image';
import type { ReactNode } from 'react';
import type { ImageAsset } from '@/lib/image';
import styles from './PageHero.module.css';

type PageHeroProps = {
  image: ImageAsset;
  alt: string;
  eyebrow: string;
  title: readonly [string, string];
  /** `short` for utility pages, `tall` for editorial ones. */
  size?: 'short' | 'tall';
  /** Upper-case display for the tall variant. */
  display?: 'lg' | 'xl';
  children?: ReactNode;
};

/** A still-image page opener that sits under the transparent header. Nothing here fades in: it is the first paint. */
export function PageHero({ image, alt, eyebrow, title, size = 'short', display = 'lg', children }: PageHeroProps) {
  return (
    <section className={`${styles.hero} ${styles[size]} under-header`}>
      <Image src={image.src} alt={alt} fill priority sizes="100vw" quality={85} className={styles.image} />
      <div className={styles.scrim} aria-hidden="true" />
      <div className={`${styles.content} container`}>
        <p className="label">{eyebrow}</p>
        <h1 className={`${styles.title} display display-${display}`}>
          {title[0]}
          {display === 'xl' ? <br /> : ' '}
          <em>{title[1]}</em>
        </h1>
        {children}
      </div>
    </section>
  );
}
