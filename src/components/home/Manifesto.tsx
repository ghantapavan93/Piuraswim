import { Reveal } from "@/components/ui/Reveal";

export function Manifesto() {
  return (
    <section className="manifesto-section" aria-label="Brand Manifesto">
      <div className="container manifesto-container">
        <Reveal className="manifesto-content">
          <svg
            viewBox="0 0 100 100"
            className="manifesto-sun-icon"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.3"
            strokeLinecap="round"
            aria-hidden="true"
          >
            <circle cx="50" cy="50" r="15" />
            <line x1="73" y1="50" x2="83" y2="50" />
            <line x1="71.25" y1="58.8" x2="75.87" y2="60.72" />
            <line x1="66.26" y1="66.26" x2="73.33" y2="73.33" />
            <line x1="58.8" y1="71.25" x2="60.72" y2="75.87" />
            <line x1="50" y1="73" x2="50" y2="83" />
            <line x1="41.2" y1="71.25" x2="39.28" y2="75.87" />
            <line x1="33.74" y1="66.26" x2="26.67" y2="73.33" />
            <line x1="28.75" y1="58.8" x2="24.13" y2="60.72" />
            <line x1="27" y1="50" x2="17" y2="50" />
            <line x1="28.75" y1="41.2" x2="24.13" y2="39.28" />
            <line x1="33.74" y1="33.74" x2="26.67" y2="26.67" />
            <line x1="41.2" y1="28.75" x2="39.28" y2="24.13" />
            <line x1="50" y1="27" x2="50" y2="17" />
            <line x1="58.8" y1="28.75" x2="60.72" y2="24.13" />
            <line x1="66.26" y1="33.74" x2="73.33" y2="26.67" />
            <line x1="71.25" y1="41.2" x2="75.87" y2="39.28" />
          </svg>

          <h2 className="font-display manifesto-heading">
            Confident. Effortless. <em>Free.</em>
          </h2>

          <p className="manifesto-body">
            Piura is a reminder to collect memories, wear confidence, and feel your
            best through every destination.
          </p>

          <p className="label text-muted manifesto-origin">
            Designed in Miami · Crafted in Peru
          </p>
        </Reveal>
      </div>
    </section>
  );
}
