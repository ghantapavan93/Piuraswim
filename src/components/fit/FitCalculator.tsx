"use client";

import { useState } from "react";
import Link from "next/link";
import { Icon } from "@/components/ui/Icon";

const bustOptions = [
  { label: "30A – 32B", size: "S", desc: "Petite to standard Small" },
  { label: "32C – 34B", size: "M", desc: "Standard Medium sculpt" },
  { label: "34C – 36B", size: "L", desc: "Enhanced coverage Large" },
  { label: "36C – 38D", size: "XL", desc: "Full support X-Large" },
] as const;

const hipOptions = [
  { label: "US 0–2 (34–36″ hips)", size: "S", desc: "Small / Cheeky" },
  { label: "US 4–6 (37–39″ hips)", size: "M", desc: "Medium true-to-size" },
  { label: "US 8–10 (40–42″ hips)", size: "L", desc: "Large comfort fit" },
  { label: "US 12–14 (43–45″ hips)", size: "XL", desc: "X-Large relaxed" },
] as const;

export function FitCalculator() {
  const [selectedBust, setSelectedBust] = useState<number | null>(0);
  const [selectedHip, setSelectedHip] = useState<number | null>(0);

  const topSize = selectedBust !== null ? bustOptions[selectedBust].size : "S";
  const bottomSize = selectedHip !== null ? hipOptions[selectedHip].size : "S";

  return (
    <div className="fit-calculator-card" id="calculator">
      <div className="fit-calculator-header">
        <p className="label text-ember">Interactive Size Finder</p>
        <h3 className="font-display fit-calculator-title">
          Find your exact <em>Piura size.</em>
        </h3>
        <p className="fit-calculator-sub">
          Top and bottom sizes are chosen separately to guarantee your most flattering silhouette.
        </p>
      </div>

      <div className="fit-calculator-selectors">
        {/* Step 1: Top / Bust Selection */}
        <div className="fit-step-group">
          <div className="fit-step-label-row">
            <span className="fit-step-badge">1</span>
            <span className="label text-ink">Select your bust / cup size</span>
          </div>
          <div className="fit-options-grid">
            {bustOptions.map((opt, idx) => (
              <button
                key={opt.label}
                type="button"
                className={`fit-option-btn ${selectedBust === idx ? "is-active" : ""}`}
                onClick={() => setSelectedBust(idx)}
              >
                <strong>{opt.label}</strong>
                <span>Suggests Top: {opt.size}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Step 2: Bottom / Hip Selection */}
        <div className="fit-step-group">
          <div className="fit-step-label-row">
            <span className="fit-step-badge">2</span>
            <span className="label text-ink">Select your hips / dress size</span>
          </div>
          <div className="fit-options-grid">
            {hipOptions.map((opt, idx) => (
              <button
                key={opt.label}
                type="button"
                className={`fit-option-btn ${selectedHip === idx ? "is-active" : ""}`}
                onClick={() => setSelectedHip(idx)}
              >
                <strong>{opt.label}</strong>
                <span>Suggests Bottom: {opt.size}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Step 3: Instant Recommendation Output */}
      <div className="fit-recommendation-banner">
        <div className="fit-rec-left">
          <span className="label text-ember">Your Tailored Fit</span>
          <div className="fit-rec-sizes">
            <div className="fit-size-badge">
              <small>Top Size</small>
              <strong>{topSize}</strong>
            </div>
            <span className="fit-size-divider">+</span>
            <div className="fit-size-badge">
              <small>Bottom Size</small>
              <strong>{bottomSize}</strong>
            </div>
          </div>
        </div>

        <div className="fit-rec-right">
          <p className="fit-rec-note">
            Every Piura piece features self-tie side strings and adjustable triangle cups so you can customize your coverage effortlessly.
          </p>
          <Link href="/product/sunchild-triangle-top" className="button button-dark fit-rec-btn">
            Build Your {topSize} / {bottomSize} Set
            <Icon name="arrow" size={14} />
          </Link>
        </div>
      </div>
    </div>
  );
}
