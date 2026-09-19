'use client';

import { useEffect, useRef, useState } from 'react';
import type { ImageAsset } from '@/data/image-manifest';
import './AmbientVideo.css';
import { cx } from '@/lib/utils';

type Source = { src: string; poster: ImageAsset };

type AmbientVideoProps = {
  /** Landscape source, used from 720px up. */
  desktop: Source;
  /** Optional portrait source and poster for phones. Falls back to `desktop`. */
  mobile?: Source;
  /** Describes the scene for assistive tech; the video itself is decorative. */
  alt: string;
  className?: string;
};

const MOBILE_QUERY = '(max-width: 719px)';

/**
 * A silent, looping background video that never blocks the page. The poster
 * is an art-directed <picture> so each viewport downloads one still (this is
 * the largest contentful paint, hence `fetchPriority="high"` and no lazy
 * loading). The file is only requested once the element is on screen, and
 * nothing plays for people who prefer reduced motion or asked to save data.
 */
export function AmbientVideo({ desktop, mobile, alt, className }: AmbientVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const connection = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
    if (reducedMotion || connection?.saveData) return;

    let started = false;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (!started) {
            const useMobile = mobile && window.matchMedia(MOBILE_QUERY).matches;
            video.src = useMobile ? mobile.src : desktop.src;
            started = true;
          }
          video.play().catch(() => {
            /* Autoplay refused: the poster stays. */
          });
        } else if (started) {
          video.pause();
        }
      },
      { threshold: 0.1 },
    );
    observer.observe(video);

    return () => {
      observer.disconnect();
      video.pause();
      video.removeAttribute('src');
      video.load();
    };
  }, [desktop, mobile]);

  return (
    <div className={cx('ambient-video', className)}>
      <picture>
        {mobile ? <source media={MOBILE_QUERY} srcSet={mobile.poster.src} /> : null}
        <img
          src={desktop.poster.src}
          alt={alt}
          width={desktop.poster.width}
          height={desktop.poster.height}
          fetchPriority="high"
          decoding="async"
          className="ambient-video__poster"
        />
      </picture>
      <video
        ref={videoRef}
        className="ambient-video__video"
        data-playing={playing ? '' : undefined}
        muted
        loop
        playsInline
        preload="none"
        aria-hidden="true"
        tabIndex={-1}
        onPlaying={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
      />
    </div>
  );
}
