import Link from "next/link";
import { HERO, BRAND } from "@/data/site";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";

export function CampaignHero() {
  return (
    <section className="campaign-hero">
      <div className="campaign-hero-media">
        <video
          className="hero-video hero-video-desktop"
          autoPlay
          muted
          loop
          playsInline
          poster="/video/piura-water-wide-poster.jpg"
        >
          <source src="/video/piura-water-wide.mp4" type="video/mp4" />
        </video>
        <video
          className="hero-video hero-video-mobile"
          autoPlay
          muted
          loop
          playsInline
          poster="/video/piura-hero-water-01-poster.jpg"
        >
          <source src="/video/piura-hero-water-01.mp4" type="video/mp4" />
        </video>
      </div>

      <div className="hero-scrim" />

      <div className="campaign-hero-top container">
        <p className="label">Nº 01 · Eternal Heat</p>
        <p className="label hero-desktop-only">{BRAND.coordinates}</p>
      </div>

      <div className="campaign-hero-content container">
        <Reveal>
          <h1 className="display-xl hero-heading">
            <span className="hero-mobile-only">
              A love letter <em>to the water.</em>
            </span>
            <span className="hero-desktop-only">
              A love letter<br />
              <em>to the water.</em>
            </span>
          </h1>

          <p className="hero-body">{HERO.body}</p>

          <div className="hero-actions">
            <Link href={HERO.primary.href} className="cta-underline label hero-cta-primary">
              {HERO.primary.label}
              <Icon name="arrow" size={14} />
            </Link>
            <Link href="/waitlist" className="cta-underline label hero-cta-secondary">
              Join the waitlist
            </Link>
          </div>
        </Reveal>
      </div>

      <div className="hero-scroll-indicator" aria-hidden="true">
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12 5v14" />
          <path d="m19 12-7 7-7-7" />
        </svg>
      </div>
    </section>
  );
}
