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
  const { add } = useCart();
  const facts = getFitFacts(product);
  function addSet() { if (!matching || !pair) return; add(product, size); add(matching, matchingSize); }
  return <section className="purchase-panel"><nav className="breadcrumb"><Link href="/shop">Shop</Link><span>/</span><span>{product.title}</span></nav><p className="label accent">{printLabel(product)}</p><div className="purchase-title"><h1 className="display display-md">{product.title}</h1><strong>{money(product.price)}</strong></div><p className="purchase-description">{product.description}</p><div className="fit-strip"><span className="label">Fit at a glance</span><div>{facts.map((fact) => <p key={fact.label}><b>{fact.label}</b><span>{fact.value}</span></p>)}</div></div><div className="variant-section"><div className="variant-label"><span>Size</span><FitGuideDrawer /></div><SizeChips product={product} value={size} onChange={setSize} /></div><button type="button" className="button button-dark purchase-add" onClick={() => add(product, size)}>Add to bag · {money(product.price)}<Icon name="arrow" size={16} /></button><div className="purchase-assurances"><span>{SERVICE.sizes}</span><span>{SERVICE.fabric}</span><span>{SERVICE.shipping}</span><span>{SERVICE.exchanges}</span></div>{matching && pair ? <div className="pair-module"><div><p className="label accent">Complete the set</p><h2 className="display display-sm">Made to be worn<br /><em>together.</em></h2></div><div className="pair-product"><Link href={`/product/${matching.handle}`}>{matching.title}</Link><strong>{money(matching.price)}</strong></div><div className="variant-section"><div className="variant-label"><span>{matching.category === "tops" ? "Top" : "Bottom"} size</span><span>Choose separately</span></div><SizeChips product={matching} value={matchingSize} onChange={setMatchingSize} /></div><button type="button" className="button pair-add" onClick={addSet}>Add set · {money(pair.price)}<Icon name="arrow" size={16} /></button><p className="pair-note">Top and bottom are selected independently.</p></div> : null}<div className="product-accordions"><Accordion id="details" title="Details" expanded={expanded === "details"} setExpanded={setExpanded}><p>{product.fitNotes.join(" · ")}</p></Accordion><Accordion id="fit" title="Fit & size" expanded={expanded === "fit"} setExpanded={setExpanded}><p>Fits true to size. Model wears size Small.</p><p>{product.category === "bottoms" ? "Size up in bottoms for more coverage, down for extra cheeky." : "Triangle tops tie to you, so they flex a full size."}</p></Accordion><Accordion id="fabric" title="Fabric & care" expanded={expanded === "fabric"} setExpanded={setExpanded}><ul>{product.fabric.map((line) => <li key={line}>{line}</li>)}</ul></Accordion><Accordion id="shipping" title="Shipping & exchanges" expanded={expanded === "shipping"} setExpanded={setExpanded}><p>{SERVICE.shipping}</p><p>{SERVICE.exchangesLong}</p></Accordion></div></section>;
}

function SizeChips({ product, value, onChange }: { product: Product; value: Size; onChange: (size: Size) => void }) { return <div className="size-chips">{SIZES.map((size) => <button key={size} type="button" disabled={!isAvailable(product, size)} className={value === size ? "is-selected" : ""} onClick={() => onChange(size)}>{size}</button>)}</div>; }
function Accordion({ id, title, expanded, setExpanded, children }: { id: string; title: string; expanded: boolean; setExpanded: (value: string | null) => void; children: React.ReactNode }) { return <section className="accordion"><button type="button" aria-expanded={expanded} aria-controls={`${id}-content`} onClick={() => setExpanded(expanded ? null : id)}><span>{title}</span><Icon name={expanded ? "minus" : "plus"} size={15} /></button><div id={`${id}-content`} hidden={!expanded}>{children}</div></section>; }
