"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import type { Product, Size } from "@/data/products";
import { image } from "@/lib/image";
import { money } from "@/lib/utils";
import { useCart } from "@/components/commerce/CartProvider";
import { isAvailable } from "@/data/catalog";

const QUICK_SIZES: Size[] = ["S", "M", "L", "XL"];

export function ProductCard({
  product,
  priority = false,
}: {
  product: Product;
  priority?: boolean;
}) {
  const { add } = useCart();
  const [addingSize, setAddingSize] = useState<Size | null>(null);
  const primary = image(product.images[0]);
  const alternate = product.images[1] ? image(product.images[1]) : primary;

  function handleQuickAdd(e: React.MouseEvent, size: Size) {
    e.preventDefault();
    e.stopPropagation();
    setAddingSize(size);
    add(product, size);
    if (typeof navigator !== "undefined" && "vibrate" in navigator) {
      navigator.vibrate(12);
    }
    setTimeout(() => setAddingSize(null), 600);
  }

  return (
    <article className="product-card group">
      <div className="product-card-media-wrapper">
        <Link className="product-card-media" href={`/product/${product.handle}`}>
          <Image
            src={primary.src}
            alt={product.title}
            width={primary.width}
            height={primary.height}
            priority={priority}
            sizes="(max-width: 700px) 50vw, (max-width: 1100px) 33vw, 25vw"
            className="product-img-primary"
          />
          <Image
            className="product-card-alt"
            src={alternate.src}
            alt={`${product.title} alternate view`}
            width={alternate.width}
            height={alternate.height}
            sizes="(max-width: 700px) 50vw, (max-width: 1100px) 33vw, 25vw"
          />
          <span className="product-card-arrow" aria-hidden="true">
            ↗
          </span>
        </Link>

        {/* Quick Add Slide-up Ribbon on Hover */}
        <div className="quick-add-ribbon" aria-label={`Quick add ${product.title}`}>
          <span className="quick-add-label">Quick Add</span>
          <div className="quick-size-chips">
            {QUICK_SIZES.map((size) => {
              const available = isAvailable(product, size);
              const isSelected = addingSize === size;
              return (
                <button
                  key={size}
                  type="button"
                  disabled={!available}
                  onClick={(e) => handleQuickAdd(e, size)}
                  className={`quick-size-btn ${isSelected ? "is-added" : ""}`}
                  aria-label={`Add size ${size}`}
                >
                  {isSelected ? "✓" : size}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="product-card-copy">
        <p className="product-card-collection">
          {product.collection === "classics"
            ? "The Classics"
            : `The ${product.collection[0].toUpperCase()}${product.collection.slice(1)} Print`}
        </p>
        <div className="product-card-title-row">
          <Link href={`/product/${product.handle}`} className="product-card-title-link">
            {product.title}
          </Link>
          <span className="product-card-price">{money(product.price)}</span>
        </div>
      </div>
    </article>
  );
}
