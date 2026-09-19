import { Photo } from '@/components/ui/Photo';
import type { ReactNode } from 'react';
import type { ImageAsset } from '@/lib/image';
import './PageHero.css';

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
    <section className={`page-hero page-hero--${size} under-header`}>
      <Photo src={image.src} alt={alt} fill priority sizes="100vw" quality={85} className="page-hero__image" />
      <div className="page-hero__scrim" aria-hidden="true" />
      <div className="page-hero__content container">
        <p className="label">{eyebrow}</p>
        <h1 className={`page-hero__title display display-${display}`}>
          {title[0]}
          {display === 'xl' ? <br /> : ' '}
          <em>{title[1]}</em>
        </h1>
        {children}
      </div>
    </section>
  );
}
