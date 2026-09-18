import { Reveal } from "@/components/ui/Reveal";

export function RunwayEditorial() {
  return (
    <section className="runway-split" aria-labelledby="runway-title">
      <div className="runway-split-media">
        <video
          className="runway-split-video"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster="/video/runway-poster.jpg"
        >
          <source src="/video/runway.mp4" type="video/mp4" />
        </video>
      </div>

      <div className="runway-split-content">
        <Reveal className="runway-split-copy">
          <p className="label text-ember-soft">Miami Swim Week</p>
          <h2 id="runway-title" className="display-xl runway-split-heading">
            Piura on <em>the runway.</em>
          </h2>
          <p className="runway-split-caption">Swim Week 2026 · Miami</p>
        </Reveal>
      </div>
    </section>
  );
}
