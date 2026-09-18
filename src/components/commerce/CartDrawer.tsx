"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { SERVICE } from "@/data/site";
import { image } from "@/lib/image";
import { money } from "@/lib/utils";
import { useCart } from "./CartProvider";
import { Icon } from "@/components/ui/Icon";
import { ALL_PRODUCTS } from "@/data/catalog";

export function CartDrawer() {
  const { lines, isOpen, close, remove, setQuantity, add } = useCart();
  const [giftWrap, setGiftWrap] = useState(true);
  const [checkoutMessage, setCheckoutMessage] = useState(false);

  const subtotal = lines.reduce((sum, line) => sum + line.product.price * line.quantity, 0);
  const remaining = Math.max(0, SERVICE.freeShippingThreshold - subtotal);
  const progress = Math.min(100, (subtotal / SERVICE.freeShippingThreshold) * 100);
  const isUnlocked = subtotal >= SERVICE.freeShippingThreshold;

  // Find an upsell recommendation not currently in cart
  const upsellProduct = ALL_PRODUCTS.find(
    (p) => !lines.some((l) => l.product.handle === p.handle)
  ) ?? ALL_PRODUCTS[0];
  const upsellAsset = image(upsellProduct.images[0]);

  return (
    <div className={`drawer-shell ${isOpen ? "drawer-visible" : ""}`} aria-hidden={!isOpen}>
      <button type="button" className="drawer-scrim" onClick={close} aria-label="Close bag" />
      <aside className="cart-drawer" aria-label="Shopping bag">
        {/* Header */}
        <header className="cart-header">
          <div>
            <span className="label text-ember">Your Bag</span>
            <h2 className="display display-sm cart-title">The Good Stuff.</h2>
          </div>
          <button type="button" onClick={close} className="cart-close-btn" aria-label="Close bag">
            <Icon name="close" size={20} />
          </button>
        </header>

        {/* Dynamic Free Shipping Progress Bar */}
        <div className={`shipping-progress-banner ${isUnlocked ? "is-unlocked" : ""}`}>
          <div className="shipping-progress-info">
            {isUnlocked ? (
              <p className="shipping-unlocked-text">
                <span className="shipping-sparkle">✦</span> Complimentary US Priority Shipping Unlocked!
              </p>
            ) : (
              <p className="shipping-away-text">
                Add <strong>{money(remaining)}</strong> to unlock Free US Priority Shipping
              </p>
            )}
          </div>
          <div className="shipping-meter-track">
            <div className="shipping-meter-fill" style={{ width: `${progress}%` }} />
          </div>
        </div>

        {/* Empty State vs Item List */}
        {lines.length === 0 ? (
          <div className="cart-empty">
            <p className="display display-sm">Your bag is waiting.</p>
            <p className="cart-empty-sub">
              Find the pieces that follow you into the water this season.
            </p>
            <Link href="/shop" onClick={close} className="button button-dark cart-empty-btn">
              Explore All Swim <Icon name="arrow" size={15} />
            </Link>
          </div>
        ) : (
          <div className="cart-scroll-area">
            <ul className="cart-lines-list">
              {lines.map((line) => {
                const asset = image(line.product.images[0]);
                return (
                  <li key={`${line.product.handle}-${line.size}`} className="cart-line-card">
                    <Link
                      href={`/product/${line.product.handle}`}
                      onClick={close}
                      className="cart-line-thumb"
                    >
                      <Image
                        src={asset.src}
                        alt={line.product.title}
                        width={asset.width}
                        height={asset.height}
                      />
                    </Link>

                    <div className="cart-line-details">
                      <div className="cart-line-head">
                        <Link
                          href={`/product/${line.product.handle}`}
                          onClick={close}
                          className="cart-line-title"
                        >
                          {line.product.title}
                        </Link>
                        <span className="cart-line-size-pill">Size {line.size}</span>
                      </div>

                      <strong className="cart-line-price">
                        {money(line.product.price * line.quantity)}
                      </strong>

                      <div className="cart-line-qty-row">
                        <div className="cart-qty-control">
                          <button
                            type="button"
                            onClick={() =>
                              setQuantity(line.product.handle, line.size, line.quantity - 1)
                            }
                            aria-label="Decrease quantity"
                          >
                            <Icon name="minus" size={12} />
                          </button>
                          <span>{line.quantity}</span>
                          <button
                            type="button"
                            onClick={() =>
                              setQuantity(line.product.handle, line.size, line.quantity + 1)
                            }
                            aria-label="Increase quantity"
                          >
                            <Icon name="plus" size={12} />
                          </button>
                        </div>

                        <button
                          type="button"
                          className="cart-line-remove"
                          onClick={() => remove(line.product.handle, line.size)}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>

            {/* Quick Add Pairing Upsell */}
            {upsellProduct && (
              <div className="cart-upsell-module">
                <span className="label text-ember">Pairs Flawlessly With</span>
                <div className="cart-upsell-card">
                  <div className="cart-upsell-thumb">
                    <Image
                      src={upsellAsset.src}
                      alt={upsellProduct.title}
                      width={upsellAsset.width}
                      height={upsellAsset.height}
                    />
                  </div>
                  <div className="cart-upsell-info">
                    <strong>{upsellProduct.title}</strong>
                    <span>{money(upsellProduct.price)}</span>
                  </div>
                  <button
                    type="button"
                    className="cart-upsell-add-btn"
                    onClick={() => add(upsellProduct, "S")}
                  >
                    + Add S
                  </button>
                </div>
              </div>
            )}

            {/* Gift Packaging Toggle */}
            <div className="cart-gift-toggle">
              <label className="cart-gift-label">
                <input
                  type="checkbox"
                  checked={giftWrap}
                  onChange={(e) => setGiftWrap(e.target.checked)}
                  className="cart-gift-checkbox"
                />
                <span className="cart-gift-text">
                  <strong>Complimentary Linen Dust Bag</strong>
                  <small>Eco-friendly Peruvian cotton travel pouch included with your order.</small>
                </span>
              </label>
            </div>
          </div>
        )}

        {/* Footer */}
        {lines.length > 0 && (
          <footer className="cart-footer-panel">
            <div className="cart-subtotal-row">
              <span>Estimated Subtotal</span>
              <strong className="cart-subtotal-val">{money(subtotal)}</strong>
            </div>

            <p className="cart-shipping-note">
              {isUnlocked
                ? "Free Priority US Shipping applied at checkout."
                : "Taxes and shipping calculated at checkout."}
            </p>

            <button
              type="button"
              className="button button-dark cart-checkout-btn"
              onClick={() => setCheckoutMessage(true)}
            >
              <span>Proceed to Checkout</span>
              <Icon name="arrow" size={15} />
            </button>

            {checkoutMessage && (
              <p className="cart-demo-notice">
                ✦ Concept Showcase: Thank you for testing Piura Swim!
              </p>
            )}
          </footer>
        )}
      </aside>
    </div>
  );
}
