import { Photo } from '@/components/ui/Photo';
import Link from 'next/link';
import { Icon } from '@/components/ui/Icon';
import { BRAND, HERITAGE } from '@/data/site';
import { image } from '@/lib/image';
import './HeritageChapter.css';

export function HeritageChapter() {
  const lead = image('lifestyle/life-61.jpg');
  const detail = image('lifestyle/life-71.jpg');

  return (
    <section className="heritage on-dark" aria-labelledby="heritage-title">
      <div className="heritage__grid container">
        <ol className="heritage__index" data-reveal="fade">
          {HERITAGE.chapters.map((chapter) => (
            <li key={chapter.index}>
              <span className="heritage__numeral">{chapter.index}</span>
              <span>{chapter.place}</span>
            </li>
          ))}
        </ol>

        <div className="heritage__copy" data-reveal="fade" data-reveal-delay="1">
          <p className="label accent-soft">{HERITAGE.eyebrow}</p>
          <h2 id="heritage-title" className="display display-xl">
            {HERITAGE.title[0]}
            <br />
            <em>{HERITAGE.title[1]}</em>
          </h2>
          <p className="heritage__body">{HERITAGE.body}</p>
          <blockquote className="heritage__quote">
            <p>&ldquo;{HERITAGE.quote}&rdquo;</p>
            <footer className="label">{HERITAGE.attribution}</footer>
          </blockquote>
          <Link href="/story" className="heritage__link text-link">
            Read the story
            <Icon name="arrow" />
          </Link>
        </div>

        <div className="heritage__media">
          <div className="heritage__lead frame" data-reveal="mask">
            <Photo
              src={lead.src}
              alt="A Piura bikini worn above a cove of turquoise water"
              width={lead.width}
              height={lead.height}
              sizes="(max-width: 899px) 100vw, 36vw"
              quality={85}
            />
          </div>
          <div className="heritage__detail frame" data-reveal="mask" data-reveal-delay="2">
            <Photo
              src={detail.src}
              alt="A quiet rocky cove at midday"
              width={detail.width}
              height={detail.height}
              sizes="(max-width: 899px) 50vw, 16vw"
            />
          </div>
          <p className="heritage__coordinates label">{BRAND.coordinates}</p>
        </div>
      </div>
    </section>
  );
}
