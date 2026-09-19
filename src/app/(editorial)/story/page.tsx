import type { Metadata } from 'next';
import { Photo } from '@/components/ui/Photo';
import Link from 'next/link';
import { PageHero } from '@/components/layout/PageHero';
import { Icon } from '@/components/ui/Icon';
import { SunMark } from '@/components/ui/SunMark';
import { MANIFESTO, STORY } from '@/data/site';
import { image, type ImageKey } from '@/lib/image';
import './page.css';
import { cx } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'Our story, Peru to Miami',
  description:
    "Piura began with bikinis a grandmother sent from Peru. The founder's story, from Miami beach weekends to the city of eternal heat.",
};

type ChapterArt = {
  lead: ImageKey;
  leadAlt: string;
  /** CSS object-position for the lead crop. */
  leadFocus?: string;
  detail?: ImageKey;
  detailAlt?: string;
};

const CHAPTER_IMAGES: Record<string, ChapterArt> = {
  miami: { lead: 'lifestyle/life-45.jpg', leadAlt: 'Lying under a parasol at the beach in the Sunchild bandeau', leadFocus: '50% 40%' },
  peru: {
    lead: 'lifestyle/life-37.jpg',
    leadAlt: 'A rocky cove and turquoise water, a Piura bikini in the foreground',
    leadFocus: '50% 25%',
    detail: 'lifestyle/life-71.jpg',
    detailAlt: 'A quiet cove at midday',
  },
  now: { lead: 'lifestyle/life-34.jpg', leadAlt: 'The Moonchild bandeau set above the water' },
};

export default function StoryPage() {
  return (
    <main id="main">
      <PageHero
        image={image('stills/boat-sunset-look-back.jpg')}
        alt="Looking back from the deck of a boat at sunset"
        eyebrow={STORY.eyebrow}
        title={STORY.title}
        size="tall"
      />

      {STORY.chapters.map((chapter, index) => {
        const art = CHAPTER_IMAGES[chapter.key];
        const lead = image(art.lead);
        const detail = art.detail ? image(art.detail) : null;
        return (
          <section
            key={chapter.key}
            className={cx('story-chapter', index % 2 === 1 && 'story-chapter--reversed', index === 1 && 'on-sand')}
            aria-labelledby={`chapter-${chapter.key}`}
          >
            <div className="story-chapter__grid container">
              <div className="story-chapter__media">
                <div className="story-chapter__lead frame" data-reveal="mask">
                  <Photo
                    src={lead.src}
                    alt={art.leadAlt}
                    width={lead.width}
                    height={lead.height}
                    sizes="(max-width: 899px) 100vw, 45vw"
                    quality={85}
                    style={art.leadFocus ? { objectPosition: art.leadFocus } : undefined}
                  />
                </div>
                {detail ? (
                  <div className="story-chapter__detail frame" data-reveal="mask" data-reveal-delay="2">
                    <Photo src={detail.src} alt={art.detailAlt ?? ''} width={detail.width} height={detail.height} sizes="(max-width: 899px) 45vw, 18vw" />
                  </div>
                ) : null}
              </div>

              <div className="story-chapter__copy" data-reveal="fade" data-reveal-delay="1">
                <p className="label accent">{chapter.label}</p>
                <h2 id={`chapter-${chapter.key}`} className="display display-md">
                  {chapter.title[0]} <em>{chapter.title[1]}</em>
                </h2>
                <blockquote className="story-chapter__quote">
                  {chapter.paragraphs.map((paragraph, paragraphIndex) => (
                    <p key={paragraphIndex}>
                      {paragraphIndex === 0 ? '“' : ''}
                      {paragraph}
                      {paragraphIndex === chapter.paragraphs.length - 1 ? '”' : ''}
                    </p>
                  ))}
                  <footer className="label muted">{STORY.attribution}</footer>
                </blockquote>
              </div>
            </div>
          </section>
        );
      })}

      <section className="story-page__close container" data-reveal="fade">
        <SunMark size={36} className="story-page__mark" />
        <p className="display display-lg">
          {MANIFESTO.title[0]} <em>{MANIFESTO.title[1]}</em>
        </p>
        <p className="story-page__close-body">{MANIFESTO.body}</p>
        <Link href="/shop" className="button">
          Wear the story
          <Icon name="arrow" />
        </Link>
      </section>
    </main>
  );
}
