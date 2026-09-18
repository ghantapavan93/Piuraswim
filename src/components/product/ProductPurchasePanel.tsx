"use client";

import Link from "next/link";
import { useState } from "react";
import type { Product, Size } from "@/data/products";
import { getFitFacts, getSet, isAvailable, printLabel, SIZES } from "@/data/catalog";
import { SERVICE } from "@/data/site";
import { money } from "@/lib/utils";
import { useCart } from "@/components/commerce/CartProvider";
import { Icon } from "@/components/ui/Icon";
import { FitGuideDrawer } from "./FitGuideDrawer";

export function ProductPurchasePanel({ product }: { product: Product }) {
  const pair = getSet(product);
  const matching = pair ? (product.category === "tops" ? pair.bottom : pair.top) : undefined;
  const [size, setSize] = useState<Size>(product.available[0] ?? "S");
  const [matchingSize, setMatchingSize] = useState<Size>(matching?.available[0] ?? "S");
  const [expanded, setExpanded] = useState<string | null>("details");
  const [addedNotice, setAddedNotice] = useState(false);
  const { add } = useCart();
  const facts = getFitFacts(product);

  function handleAddSolo() {
    add(product, size);
    if (typeof navigator !== "undefined" && "vibrate" in navigator) {
      navigator.vibrate(12);
    }
    setAddedNotice(true);
    setTimeout(() => setAddedNotice(false), 2000);
  }

  function handleAddSet() {
    if (!matching || !pair) return;
    add(product, size);
    add(matching, matchingSize);
    if (typeof navigator !== "undefined" && "vibrate" in navigator) {
      navigator.vibrate(12);
    }
    setAddedNotice(true);
    setTimeout(() => setAddedNotice(false), 2000);
  }

  return (
    <section className="purchase-panel">
      {/* Breadcrumb */}
      <nav className="breadcrumb">
        <Link href="/shop">Shop</Link>
        <span>/</span>
        <span>{product.category === "tops" ? "Tops" : "Bottoms"}</span>
        <span>/</span>
        <span>{product.title}</span>
      </nav>

      {/* Eyebrow & Title */}
      <p className="label text-ember">{printLabel(product)}</p>
      <div className="purchase-title">
        <h1 className="display display-md">{product.title}</h1>
        <strong className="purchase-price-tag">{money(product.price)}</strong>
      </div>

      <p className="purchase-description">{product.description}</p>

      {/* Model Spec Badge */}
      <div className="model-spec-badge">
        <span className="model-spec-icon">✦</span>
        <span><strong>Model Fit:</strong> Sofia is 5’9″ (175cm), 32C bust, wearing size <strong>Small</strong>.</span>
      </div>

      {/* Fit At a Glance Matrix */}
      <div className="fit-strip">
        <span className="label text-ember">Fit At A Glance</span>
        <div className="fit-facts-row">
          {facts.map((fact) => (
            <div key={fact.label} className="fit-fact-box">
              <b>{fact.label}</b>
              <span>{fact.value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Size Selector */}
      <div className="variant-section">
        <div className="variant-label">
          <span className="label text-ink">Select Your Size</span>
          <FitGuideDrawer />
        </div>
        <SizeChips product={product} value={size} onChange={setSize} />
      </div>

      {/* Primary Add Button */}
      <button
        type="button"
        className={`button button-dark purchase-add-btn ${addedNotice ? "is-success" : ""}`}
        onClick={handleAddSolo}
      >
        <span>{addedNotice ? "✓ Added to Bag" : `Add to Bag · ${money(product.price)}`}</span>
        <Icon name="arrow" size={15} />
      </button>

      {/* 4 Brand Assurances */}
      <div className="purchase-assurances-grid">
        <span>{SERVICE.sizes}</span>
        <span>{SERVICE.fabric}</span>
        <span>{SERVICE.shipping}</span>
        <span>{SERVICE.exchanges}</span>
      </div>

      {/* Complete the Set Bundle Module */}
      {matching && pair && (
        <div className="pair-studio-module">
          <div className="pair-studio-header">
            <span className="label text-ember">Curated Pairing</span>
            <h3 className="font-display pair-studio-title">
              Complete the <em>Signature Set.</em>
            </h3>
          </div>

          <div className="pair-product-row">
            <Link href={`/product/${matching.handle}`} className="pair-product-link">
              {matching.title}
            </Link>
            <strong className="pair-price-tag">{money(matching.price)}</strong>
          </div>

          <div className="variant-section">
            <div className="variant-label">
              <span className="label text-ink">
                {matching.category === "tops" ? "Top Size" : "Bottom Size"}
              </span>
              <span className="pair-note-pill">Choose separately</span>
            </div>
            <SizeChips product={matching} value={matchingSize} onChange={setMatchingSize} />
          </div>

          <button
            type="button"
            className="button button-light pair-add-btn"
            onClick={handleAddSet}
          >
            <span>Add Complete Set · {money(pair.price)}</span>
            <Icon name="arrow" size={15} />
          </button>

          <p className="pair-reassurance-note">
            Top and bottom sizes are customized independently for your best fit.
          </p>
        </div>
      )}

      {/* Accordions */}
      <div className="product-accordions">
        <Accordion id="details" title="Details & Construction" expanded={expanded === "details"} setExpanded={setExpanded}>
          <p>{product.fitNotes.join(" · ")}</p>
        </Accordion>

        <Accordion id="fit" title="Fit & Sizing Advice" expanded={expanded === "fit"} setExpanded={setExpanded}>
          <p>Runs true to size. If between sizes in bottoms, size up for more coverage or down for a cheekier look. Triangle tops feature sliding cups that adapt across a full cup size.</p>
        </Accordion>

        <Accordion id="fabric" title="Peruvian Fabric & Care" expanded={expanded === "fabric"} setExpanded={setExpanded}>
          <ul className="accordion-bullet-list">
            {product.fabric.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
        </Accordion>

        <Accordion id="shipping" title="Complimentary Shipping & 14-Day Exchanges" expanded={expanded === "shipping"} setExpanded={setExpanded}>
          <p>{SERVICE.shipping}</p>
          <p>{SERVICE.exchangesLong}</p>
        </Accordion>
      </div>
    </section>
  );
}

function SizeChips({
  product,
  value,
  onChange,
}: {
  product: Product;
  value: Size;
  onChange: (size: Size) => void;
}) {
  return (
    <div className="size-chips-grid">
      {SIZES.map((s) => {
        const available = isAvailable(product, s);
        return (
          <button
            key={s}
            type="button"
            disabled={!available}
            className={`size-chip-btn ${value === s ? "is-selected" : ""}`}
            onClick={() => onChange(s)}
          >
            <span>{s}</span>
            <small>{available ? "In Stock" : "Sold Out"}</small>
          </button>
        );
      })}
    </div>
  );
}

function Accordion({
  id,
  title,
  expanded,
  setExpanded,
  children,
}: {
  id: string;
  title: string;
  expanded: boolean;
  setExpanded: (value: string | null) => void;
  children: React.ReactNode;
}) {
  return (
    <section className="product-accordion-item">
      <button
        type="button"
        aria-expanded={expanded}
        aria-controls={`${id}-content`}
        onClick={() => setExpanded(expanded ? null : id)}
        className="accordion-trigger-btn"
      >
        <span>{title}</span>
        <Icon name={expanded ? "minus" : "plus"} size={14} />
      </button>
      <div id={`${id}-content`} hidden={!expanded} className="accordion-content-panel">
        {children}
      </div>
    </section>
  );
}
