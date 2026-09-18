"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { BRAND, NAV } from "@/data/site";
import { useCart } from "@/components/commerce/CartProvider";
import { Icon } from "@/components/ui/Icon";
import { AnnouncementBar } from "./AnnouncementBar";

export function SiteHeader({ overlay = false }: { overlay?: boolean }) {
  const { lines, open } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const count = lines.reduce((total, line) => total + line.quantity, 0);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.toggleAttribute("data-scroll-lock", menuOpen);
    return () => document.body.removeAttribute("data-scroll-lock");
  }, [menuOpen]);

  useEffect(() => {
    if (!menuOpen) return;
    const close = (event: KeyboardEvent) => event.key === "Escape" && setMenuOpen(false);
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, [menuOpen]);

  return (
    <>
      <AnnouncementBar />
      <header
        className={`site-header ${overlay ? "site-header-overlay" : ""} ${
          isScrolled ? "site-header-scrolled" : ""
        }`}
      >
        <div className="site-header-inner container">
          <button
            className="header-mobile-button"
            type="button"
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
          >
            <Icon name="menu" />
          </button>

          <Link className="wordmark" href="/" aria-label="Piura Swim home">
            <span>{BRAND.wordmark}</span>
            <small>{BRAND.descriptor}</small>
          </Link>

          <nav className="site-nav" aria-label="Main navigation">
            {NAV.map((item) => (
              <Link key={item.href} href={item.href}>
                {item.label}
              </Link>
            ))}
          </nav>

          <button
            className="bag-button"
            type="button"
            onClick={open}
            aria-label={`Open bag, ${count} ${count === 1 ? "item" : "items"}`}
          >
            <Icon name="bag" />
            <span>Bag{count ? ` (${count})` : ""}</span>
          </button>
        </div>
      </header>

      <div
        className={`mobile-menu ${menuOpen ? "mobile-menu-open" : ""}`}
        aria-hidden={!menuOpen}
      >
        <div className="mobile-menu-top">
          <button
            type="button"
            onClick={() => setMenuOpen(false)}
            aria-label="Close menu"
          >
            <Icon name="close" />
          </button>
          <span className="label">Menu</span>
        </div>
        <nav>
          {NAV.map((item, index) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMenuOpen(false)}
            >
              <span>0{index + 1}</span>
              {item.label}
              <Icon name="arrow" />
            </Link>
          ))}
        </nav>
        <p>
          Designed in Miami.
          <br />
          Crafted in Peru.
        </p>
      </div>
    </>
  );
}
