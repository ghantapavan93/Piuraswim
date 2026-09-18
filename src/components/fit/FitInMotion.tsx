import { Reveal } from "@/components/ui/Reveal";

export function FitInMotion() {
  return (
    <section className="fit-in-motion-section" aria-label="Fit in Motion Showcase">
      <div className="fit-in-motion-grid">
        {/* Left Video Showcase */}
        <div className="fit-video-frame">
          <video
            className="fit-motion-video"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            poster="/video/runway-poster.jpg"
          >
            <source src="/video/runway.mp4" type="video/mp4" />
          </video>
          <div className="fit-video-badge">
            <span className="fit-live-dot" />
            <span className="label">Fit in Motion · Runway 2026</span>
          </div>
        </div>

        {/* Right Feature Cards */}
        <div className="fit-attributes-panel">
          <Reveal>
            <p className="label text-ember">Craft & Silhouette</p>
            <h2 className="font-display fit-attributes-heading">
              How Piura sits on <em>the body.</em>
            </h2>
            <p className="fit-attributes-intro">
              Engineered with lightweight double-lined Peruvian stretch fabric, each cut molds naturally without digging into the skin or slipping in the water.
            </p>

            <div className="fit-metrics-list">
              <div className="fit-metric-item">
                <div className="fit-metric-header">
                  <span className="label text-ink">Coverage Profile</span>
                  <span className="fit-metric-val">Minimal / Cheeky</span>
                </div>
                <div className="fit-metric-bar">
                  <div className="fit-metric-fill" style={{ width: "40%" }} />
                </div>
                <p className="fit-metric-desc">Curved Brazilian cut bottom designed to elongate legs with minimal tan lines.</p>
              </div>

              <div className="fit-metric-item">
                <div className="fit-metric-header">
                  <span className="label text-ink">Support & Sculpt</span>
                  <span className="fit-metric-val">Natural Lift</span>
                </div>
                <div className="fit-metric-bar">
                  <div className="fit-metric-fill" style={{ width: "80%" }} />
                </div>
                <p className="fit-metric-desc">Double-lined construction provides gentle compression and flattering hold without underwires.</p>
              </div>

              <div className="fit-metric-item">
                <div className="fit-metric-header">
                  <span className="label text-ink">Adjustability</span>
                  <span className="fit-metric-val">100% Micro-Tie</span>
                </div>
                <div className="fit-metric-bar">
                  <div className="fit-metric-fill" style={{ width: "100%" }} />
                </div>
                <p className="fit-metric-desc">Slide cups along the under-bust band for customizable coverage from modest to minimal.</p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
