import Image from "next/image";
import Link from "next/link";
import { CartDrawer } from "@/components/commerce/CartDrawer";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { STORY_LONGFORM } from "@/data/site";
import { image } from "@/lib/image";
import { Reveal } from "@/components/ui/Reveal";
import { Icon } from "@/components/ui/Icon";

export default function StoryPage() {
  const miami = image("lifestyle/life-01.jpg");
  const peru = image("lifestyle/life-68.jpg");

  return (
    <>
      <SiteHeader overlay />
      <main className="story-main-page">
        {/* Cinematic Video Hero */}
        <section className="story-hero-section">
          <div className="story-hero-media">
            <video
              className="story-hero-video"
              autoPlay
              muted
              loop
              playsInline
              poster="/video/hero-story-poster.jpg"
            >
              <source src="/video/hero-story.mp4" type="video/mp4" />
            </video>
          </div>
          <div className="story-hero-scrim" />

          <div className="container story-hero-content">
            <Reveal>
              <div className="story-hero-meta">
                <p className="label text-cream">Our Story</p>
                <p className="label text-cream">Miami / Piura, Perú</p>
              </div>
              <h1 className="display-xl story-hero-title">
                Two coasts.<br />
                <em>One summer.</em>
              </h1>
              <p className="story-hero-sub">
                Designed in Miami, crafted in Peru. The story of finding confidence, memory, and freedom by the water.
              </p>
            </Reveal>
          </div>
        </section>

        {/* Lead Quote */}
        <section className="story-intro-section">
          <div className="container">
            <Reveal className="story-intro-box">
              <span className="story-intro-ornament">✦</span>
              <p className="label text-ember">The Beginning</p>
              <blockquote className="font-display story-lead-quote">
                “The bikinis her grandmother brought from Peru felt unlike anything she could find at home.”
              </blockquote>
            </Reveal>
          </div>
        </section>

        {/* Chapters */}
        <StoryChapter
          number="01"
          eyebrow="I · Miami, Florida"
          title="Practically raised in a bikini."
          lines={STORY_LONGFORM.miami}
          asset={miami}
          alt="Piura bikini at the coast"
        />

        <StoryChapter
          reversed
          number="02"
          eyebrow="II · Piura, Perú"
          title="The city of eternal heat."
          lines={STORY_LONGFORM.peru}
          asset={peru}
          alt="Piura by the water"
        />

        {/* Closing Editorial: Founder's Note */}
        <section className="story-close-section">
          <div className="container story-close-container">
            <Reveal className="story-founder-card">
              <div className="story-founder-crest">
                <svg
                  viewBox="0 0 100 100"
                  className="story-sun-emblem"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                  aria-hidden="true"
                >
                  <circle cx="50" cy="50" r="14" />
                  <line x1="73" y1="50" x2="84" y2="50" />
                  <line x1="71.25" y1="58.8" x2="76.87" y2="61.2" />
                  <line x1="66.26" y1="66.26" x2="74.07" y2="74.07" />
                  <line x1="58.8" y1="71.25" x2="61.2" y2="76.87" />
                  <line x1="50" y1="73" x2="50" y2="84" />
                  <line x1="41.2" y1="71.25" x2="38.8" y2="76.87" />
                  <line x1="33.74" y1="66.26" x2="25.93" y2="74.07" />
                  <line x1="28.75" y1="58.8" x2="23.13" y2="61.2" />
                  <line x1="27" y1="50" x2="16" y2="50" />
                  <line x1="28.75" y1="41.2" x2="23.13" y2="38.8" />
                  <line x1="33.74" y1="33.74" x2="25.93" y2="25.93" />
                  <line x1="41.2" y1="28.75" x2="38.8" y2="23.13" />
                  <line x1="50" y1="27" x2="50" y2="16" />
                  <line x1="58.8" y1="28.75" x2="61.2" y2="23.13" />
                  <line x1="66.26" y1="33.74" x2="74.07" y2="25.93" />
                  <line x1="71.25" y1="41.2" x2="76.87" y2="38.8" />
                </svg>
              </div>

              <p className="label text-ember story-founder-eyebrow">
                Chapter III · A Note from the Founder
              </p>

              <h2 className="display-lg story-founder-title">
                A celebration of <em>where we come from.</em>
              </h2>

              <div className="story-pull-quote-wrapper">
                <span className="story-pull-quote-mark" aria-hidden="true">“</span>
                <p className="story-pull-quote">
                  {STORY_LONGFORM.now[0]}
                </p>
              </div>

              <p className="story-founder-body">
                {STORY_LONGFORM.now[1]}
              </p>

              <div className="story-signature-block">
                <div className="story-signature-line" />
                <div className="story-signature-content">
                  <span className="story-signature-name">Sofia</span>
                  <span className="story-signature-title">Founder & Creative Director</span>
                  <span className="story-signature-location">Miami, FL · Piura, Perú</span>
                </div>
              </div>

              <div className="story-founder-actions">
                <Link href="/shop" className="button button-dark">
                  <span>Explore The Collection</span>
                  <Icon name="arrow" size={14} />
                </Link>
                <Link href="/shop?filter=sets" className="cta-underline">
                  Shop Signature Sets <span aria-hidden="true">→</span>
                </Link>
              </div>
            </Reveal>
          </div>
        </section>
      </main>
      <SiteFooter />
      <CartDrawer />
    </>
  );
}

function StoryChapter({
  number,
  eyebrow,
  title,
  lines,
  asset,
  alt,
  reversed = false,
}: {
  number: string;
  eyebrow: string;
  title: string;
  lines: readonly string[];
  asset: ReturnType<typeof image>;
  alt: string;
  reversed?: boolean;
}) {
  return (
    <section className={`story-chapter-section ${reversed ? "is-reversed" : ""}`}>
      <div className="story-chapter-media">
        <Image
          src={asset.src}
          alt={alt}
          width={asset.width}
          height={asset.height}
          sizes="(max-width: 900px) 100vw, 50vw"
          className="story-chapter-img"
        />
      </div>
      <div className="story-chapter-text-panel">
        <Reveal>
          <div className="story-chapter-tag-row">
            <span className="story-chapter-num">{number}</span>
            <span className="label text-ember">{eyebrow}</span>
          </div>
          <h2 className="font-display story-chapter-title">{title}</h2>
          <div className="story-chapter-paragraphs">
            {lines.map((line, idx) => (
              <p key={idx}>{line}</p>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
