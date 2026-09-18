import Image from "next/image";
import { CartDrawer } from "@/components/commerce/CartDrawer";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { STORY_LONGFORM } from "@/data/site";
import { image } from "@/lib/image";
import { Reveal } from "@/components/ui/Reveal";

const storyFrames = [
  ["stills/boat-sunset-look-back.jpg", "A look back toward the water"],
  ["stills/boat-sunset-poster.jpg", "Piura at sunset"],
  ["stills/boat-sunset-profile.jpg", "Piura on the boat at sunset"],
] as const;

export default function StoryPage() {
  const miami = image("lifestyle/life-01.jpg");
  const peru = image("lifestyle/life-68.jpg");

  return (
    <>
      <SiteHeader overlay />
      <main>
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

              <div className="story-hero-reel" aria-label="Three photographic frames from Piura’s story">
                {storyFrames.map(([key, alt], index) => {
                  const frame = image(key);
                  return (
                    <figure key={key} className={`story-hero-frame story-hero-frame-${index + 1}`}>
                      <Image
                        src={frame.src}
                        alt={alt}
                        width={frame.width}
                        height={frame.height}
                        sizes="(max-width: 620px) 31vw, 16vw"
                      />
                      <figcaption>0{index + 1}</figcaption>
                    </figure>
                  );
                })}
              </div>
            </Reveal>
          </div>
        </section>

        {/* Lead Quote */}
        <section className="story-intro-section section">
          <div className="container">
            <Reveal>
              <p className="label text-ember">The Beginning</p>
              <blockquote className="font-display story-lead-quote">
                “The bikinis her grandmother brought from Peru felt unlike anything she could find at home.”
              </blockquote>
            </Reveal>
          </div>
        </section>

        {/* Chapters */}
        <StoryChapter
          eyebrow="I · Miami"
          title="Practically raised in a bikini."
          lines={STORY_LONGFORM.miami}
          asset={miami}
          alt="Piura bikini at the coast"
        />

        <StoryChapter
          reversed
          eyebrow="II · Piura, Perú"
          title="The city of eternal heat."
          lines={STORY_LONGFORM.peru}
          asset={peru}
          alt="Piura by the water"
        />

        {/* Closing Manifestation */}
        <section className="story-close-section on-dark">
          <div className="container story-close-container">
            <Reveal>
              <p className="label text-ember-soft">III · Now</p>
              <h2 className="display-xl story-close-title">
                A celebration of <em>where we come from.</em>
              </h2>
              <p className="story-close-body">{STORY_LONGFORM.now[0]}</p>
              <p className="story-close-body">{STORY_LONGFORM.now[1]}</p>
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
  eyebrow,
  title,
  lines,
  asset,
  alt,
  reversed = false,
}: {
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
          <p className="label text-ember">{eyebrow}</p>
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
