"use client";

import Image from "next/image";
import { useState } from "react";
import type { Product } from "@/data/products";
import { image } from "@/lib/image";

const GALLERY_VIEWS: Partial<Record<string, readonly string[]>> = {
  "sunchild-triangle-top": ["Front fit", "Back tie", "Full look"],
  "sunchild-triangle-bottom": ["Back coverage", "Back detail", "Front fit", "Back detail"],
};

export function ProductGallery({ product }: { product: Product }) {
  const [active, setActive] = useState(0);
  const current = image(product.images[active]);
  const views = GALLERY_VIEWS[product.handle];
  const view = views?.[active] ?? `Look ${String(active + 1).padStart(2, "0")}`;
  return <div className="product-gallery"><div className="product-gallery-main"><Image src={current.src} alt={`${product.title} — ${view.toLowerCase()}`} width={current.width} height={current.height} priority sizes="(max-width: 900px) 100vw, 58vw" /><p className="product-gallery-label"><span>Product view</span><strong>{view}</strong><small>{String(active + 1).padStart(2, "0")} / {String(product.images.length).padStart(2, "0")}</small></p></div><div className="product-thumbnails" aria-label="Product images">{product.images.map((key, index) => { const asset = image(key); const itemView = views?.[index] ?? `Look ${String(index + 1).padStart(2, "0")}`; return <button type="button" key={key} className={active === index ? "is-active" : ""} onClick={() => setActive(index)} aria-label={`Show ${itemView.toLowerCase()}`}><Image src={asset.src} alt="" width={asset.width} height={asset.height} sizes="96px" /></button>; })}</div></div>;
}
