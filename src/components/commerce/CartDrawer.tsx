"use client";

import Image from "next/image";
import Link from "next/link";
import { SERVICE } from "@/data/site";
import { image } from "@/lib/image";
import { money } from "@/lib/utils";
import { useCart } from "./CartProvider";
import { useState } from "react";
import { Icon } from "@/components/ui/Icon";

export function CartDrawer() {
  const { lines, isOpen, close, remove, setQuantity } = useCart();
  const [checkoutMessage, setCheckoutMessage] = useState(false);
  const subtotal = lines.reduce((sum, line) => sum + line.product.price * line.quantity, 0);
  const remaining = Math.max(0, SERVICE.freeShippingThreshold - subtotal);
  const progress = Math.min(100, (subtotal / SERVICE.freeShippingThreshold) * 100);
  return <div className={`drawer-shell ${isOpen ? "drawer-visible" : ""}`} aria-hidden={!isOpen}>
    <button type="button" className="drawer-scrim" onClick={close} aria-label="Close bag" />
    <aside className="cart-drawer" aria-label="Shopping bag">
      <header><div><span className="label">Your bag</span><h2 className="display display-sm">The good stuff.</h2></div><button type="button" onClick={close} aria-label="Close bag"><Icon name="close" /></button></header>
      <div className="shipping-progress"><p>{remaining > 0 ? <><strong>{money(remaining)}</strong> away from free US shipping.</> : <>Your order qualifies for <strong>free US shipping.</strong></>}</p><span><i style={{ width: `${progress}%` }} /></span></div>
      {lines.length === 0 ? <div className="cart-empty"><p className="display display-sm">Your bag is waiting.</p><p>Find the pieces that follow you to the water.</p><Link href="/shop" onClick={close} className="text-link">Shop all swim <Icon name="arrow" size={15} /></Link></div> : <>
        <ul className="cart-lines">{lines.map((line) => { const asset = image(line.product.images[0]); return <li key={`${line.product.handle}-${line.size}`}><Link href={`/product/${line.product.handle}`} onClick={close} className="cart-image"><Image src={asset.src} alt="" width={asset.width} height={asset.height} /></Link><div className="cart-line-info"><div><Link href={`/product/${line.product.handle}`} onClick={close}>{line.product.title}</Link><span>Size {line.size}</span></div><strong>{money(line.product.price * line.quantity)}</strong><div className="quantity"><button type="button" onClick={() => setQuantity(line.product.handle, line.size, line.quantity - 1)} aria-label="Decrease quantity"><Icon name="minus" size={13} /></button><span>{line.quantity}</span><button type="button" onClick={() => setQuantity(line.product.handle, line.size, line.quantity + 1)} aria-label="Increase quantity"><Icon name="plus" size={13} /></button><button type="button" className="remove-link" onClick={() => remove(line.product.handle, line.size)}>Remove</button></div></div></li>; })}</ul>
        <footer className="cart-footer"><div><span>Subtotal</span><strong>{money(subtotal)}</strong></div><p>{checkoutMessage ? "Checkout is intentionally outside this concept." : "Taxes and shipping calculated at checkout."}</p><button type="button" className="button button-dark" onClick={() => setCheckoutMessage(true)}>Checkout <Icon name="arrow" size={16} /></button></footer>
      </>}
    </aside>
  </div>;
}
