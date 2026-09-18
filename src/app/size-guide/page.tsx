import { CartDrawer } from "@/components/commerce/CartDrawer";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { FitCalculator } from "@/components/fit/FitCalculator";
import { FitInMotion } from "@/components/fit/FitInMotion";
import { BETWEEN_SIZES, MEASURING_NOTE, MEASURING_STEPS, SIZE_CHART } from "@/data/fit";
import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";

export default function SizeGuidePage() {
  return (
    <>
      <SiteHeader />
      <main className="guide-page">
        <div className="container">
          {/* Header */}
          <header className="guide-hero-header">
            <Reveal>
              <p className="label text-ember">Find Your Piura Fit</p>
              <h1 className="display-xl guide-hero-title">
                Made to feel <em>like yours.</em>
              </h1>
              <p className="guide-hero-sub">
                Every Piura piece runs true to size. Designed in Miami, crafted in Peru with self-tie adjustability to flatter every body shape.
              </p>
            </Reveal>
          </header>

          {/* Fit in Motion Video Showcase */}
          <FitInMotion />

          {/* Interactive Fit Calculator */}
          <FitCalculator />

          {/* Official Measurement Table */}
          <section className="guide-table-section">
            <Reveal>
              <div className="guide-table-head-row">
                <div>
                  <p className="label text-ember">Detailed Sizing</p>
                  <h2 className="font-display guide-section-heading">
                    Body measurements <em>(Inches).</em>
                  </h2>
                </div>
                <p className="guide-table-note">{MEASURING_NOTE}</p>
              </div>

              <div className="guide-table-container">
                <table className="luxury-size-table">
                  <thead>
                    <tr>
                      <th>Piura Size</th>
                      <th>US Numeric</th>
                      <th>Bust (Inches)</th>
                      <th>Waist (Inches)</th>
                      <th>Hips (Inches)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {SIZE_CHART.map((row, idx) => (
                      <tr key={row.size} className={idx % 2 === 0 ? "row-alt" : ""}>
                        <th className="size-col">{row.size}</th>
                        <td>{row.size === "S" ? "0 – 2" : row.size === "M" ? "4 – 6" : row.size === "L" ? "8 – 10" : "12 – 14"}</td>
                        <td>{row.bust.join(" – ")}″</td>
                        <td>{row.waist.join(" – ")}″</td>
                        <td>{row.hips.join(" – ")}″</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Reveal>
          </section>

          {/* How to Measure */}
          <section className="guide-measure-section">
            <Reveal>
              <p className="label text-ember">Measurement Protocol</p>
              <h2 className="font-display guide-section-heading">How to measure.</h2>
              <ol className="guide-steps-grid">
                {MEASURING_STEPS.map((step) => (
                  <li key={step.key} className="guide-step-card">
                    <span className="guide-step-letter">{step.letter}</span>
                    <div>
                      <h3 className="guide-step-name">{step.name}</h3>
                      <p className="guide-step-how">{step.how}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </Reveal>
          </section>

          {/* Between Sizes & Fit Concierge */}
          <section className="guide-between-card">
            <Reveal>
              <div className="guide-between-inner">
                <div>
                  <p className="label text-ember">Between Sizes?</p>
                  <h3 className="font-display guide-between-title">
                    Our Sizing Recommendation
                  </h3>
                  <p className="guide-between-copy">{BETWEEN_SIZES}</p>
                </div>
                <div className="guide-between-cta-col">
                  <p className="guide-concierge-msg">
                    Need personalized advice? Our Miami styling team will help you choose your ideal top and bottom sizes.
                  </p>
                  <Link href="/contact" className="button button-dark">
                    Contact Fit Concierge →
                  </Link>
                </div>
              </div>
            </Reveal>
          </section>
        </div>
      </main>
      <SiteFooter />
      <CartDrawer />
    </>
  );
}
