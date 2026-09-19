import { Photo } from '@/components/ui/Photo';
import Link from 'next/link';
import { Icon } from '@/components/ui/Icon';
import { RUNWAY } from '@/data/site';
import { image, type ImageKey } from '@/lib/image';
import { RunwayFilm } from './RunwayFilm';
import './RunwayEditorial.css';

const FRAMES: { key: ImageKey; time: string; alt: string }[] = [
  { key: 'stills/runway-detail.jpg', time: '0:08', alt: 'A close frame of a yellow triangle top mid-walk' },
  { key: 'stills/runway-walk-red.jpg', time: '0:11', alt: 'A model walks the runway in a red-trimmed bikini' },
  { key: 'stills/runway-walk-bandeau.jpg', time: '0:14', alt: 'A model in the Moonchild bandeau set on the runway' },
  { key: 'stills/runway-walk-trio.jpg', time: '0:17', alt: 'Three models walking together in front of the Piura backdrop' },
];

export function RunwayEditorial() {
  return (
    <section className="section" aria-labelledby="runway-title">
      <div className="runway container">
        <div className="runway__film" data-reveal="mask">
          <RunwayFilm
            poster={image('stills/runway-backdrop.jpg')}
            src="/video/runway.mp4"
            alt="A model pauses in front of the Piura Swim backdrop at Miami Swim Week"
          />
        </div>

        <div className="runway__copy">
          <div data-reveal="fade">
            <p className="label accent">{RUNWAY.eyebrow}</p>
            <h2 id="runway-title" className="display display-xl">
              {RUNWAY.title[0]}
              <br />
              <em>{RUNWAY.title[1]}</em>
            </h2>
            <p className="runway__body">{RUNWAY.body}</p>
            <Link href="/waitlist" className="text-link">
              Join the Coastlines waitlist
              <Icon name="arrow" />
            </Link>
          </div>

          <div data-reveal="fade" data-reveal-delay="1">
            <ol className="runway__filmstrip" aria-label="Frames from the runway film">
              {FRAMES.map((frame) => {
                const asset = image(frame.key);
                return (
                  <li key={frame.key}>
                    <div className="runway__frame frame">
                      <Photo src={asset.src} alt={frame.alt} width={asset.width} height={asset.height} sizes="(max-width: 719px) 40vw, 12vw" />
                    </div>
                    <span className="runway__time">{frame.time}</span>
                  </li>
                );
              })}
            </ol>
            <p className="runway__caption label">{RUNWAY.caption}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
