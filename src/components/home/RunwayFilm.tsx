'use client';

import Image from 'next/image';
import { useState } from 'react';
import { Icon } from '@/components/ui/Icon';
import type { ImageAsset } from '@/data/image-manifest';
import styles from './RunwayFilm.module.css';

type RunwayFilmProps = {
  poster: ImageAsset;
  src: string;
  alt: string;
};

/**
 * A runway still with an explicit play control. The 26 MB video is only
 * requested when someone asks for it, never on page load.
 */
export function RunwayFilm({ poster, src, alt }: RunwayFilmProps) {
  const [playing, setPlaying] = useState(false);

  return (
    <div className={`${styles.root} frame`}>
      {playing ? (
        <video className={styles.video} src={src} poster={poster.src} controls autoPlay playsInline preload="auto">
          <track kind="captions" />
        </video>
      ) : (
        <>
          <Image src={poster.src} alt={alt} width={poster.width} height={poster.height} sizes="(max-width: 899px) 100vw, 50vw" quality={85} />
          <button type="button" className={styles.play} onClick={() => setPlaying(true)}>
            <span className={styles.playIcon}>
              <Icon name="play" size={18} />
            </span>
            <span className="label">Watch the walk · 0:26</span>
          </button>
        </>
      )}
    </div>
  );
}
