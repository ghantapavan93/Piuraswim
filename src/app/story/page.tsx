import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { SiteFooter } from '@/components/layout/SiteFooter';
import { SiteHeader } from '@/components/layout/SiteHeader';
import { PageHero } from '@/components/layout/PageHero';
import { Icon } from '@/components/ui/Icon';
import { Reveal } from '@/components/ui/Reveal';
import { SunMark } from '@/components/ui/SunMark';
import { MANIFESTO, STORY } from '@/data/site';
import { image, type ImageKey } from '@/lib/image';
import styles from './page.module.css';

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
    <>
      <SiteHeader overlay />
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
              className={[styles.chapter, index % 2 === 1 && styles.reversed, index === 1 && 'on-sand']
                .filter(Boolean)
                .join(' ')}
              aria-labelledby={`chapter-${chapter.key}`}
            >
              <div className={`${styles.chapterGrid} container`}>
                <div className={styles.media}>
                  <Reveal variant="mask">
                    <div className={`${styles.lead} frame`}>
                      <Image
                        src={lead.src}
                        alt={art.leadAlt}
                        width={lead.width}
                        height={lead.height}
                        sizes="(max-width: 899px) 100vw, 45vw"
                        quality={85}
                        style={art.leadFocus ? { objectPosition: art.leadFocus } : undefined}
                      />
                    </div>
                  </Reveal>
                  {detail ? (
                    <Reveal variant="mask" delay={200} className={styles.detail}>
                      <div className="frame">
                        <Image src={detail.src} alt={art.detailAlt ?? ''} width={detail.width} height={detail.height} sizes="(max-width: 899px) 45vw, 18vw" />
                      </div>
                    </Reveal>
                  ) : null}
                </div>

                <Reveal className={styles.copy} delay={80}>
                  <p className="label accent">{chapter.label}</p>
                  <h2 id={`chapter-${chapter.key}`} className="display display-md">
                    {chapter.title[0]} <em>{chapter.title[1]}</em>
                  </h2>
                  <blockquote className={styles.quote}>
                    {chapter.paragraphs.map((paragraph, paragraphIndex) => (
                      <p key={paragraphIndex}>
                        {paragraphIndex === 0 ? '“' : ''}
                        {paragraph}
                        {paragraphIndex === chapter.paragraphs.length - 1 ? '”' : ''}
                      </p>
                    ))}
                    <footer className="label muted">{STORY.attribution}</footer>
                  </blockquote>
                </Reveal>
              </div>
            </section>
          );
        })}

        <Reveal as="section" className={`${styles.close} container`}>
          <SunMark size={36} className={styles.mark} />
          <p className="display display-lg">
            {MANIFESTO.title[0]} <em>{MANIFESTO.title[1]}</em>
          </p>
          <p className={styles.closeBody}>{MANIFESTO.body}</p>
          <Link href="/shop" className="button">
            Wear the story
            <Icon name="arrow" />
          </Link>
        </Reveal>
      </main>
      <SiteFooter />
    </>
  );
}
