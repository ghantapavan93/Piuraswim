"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";

const trustPillars = [
  {
    title: "True to Size",
    subtitle: "Fits Small through X-Large",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
        className="footer-trust-icon"
      >
        <rect x="2.5" y="8.5" width="19" height="7" rx="1.2" />
        <line x1="7" y1="8.5" x2="7" y2="12" />
        <line x1="12" y1="8.5" x2="12" y2="13" />
        <line x1="17" y1="8.5" x2="17" y2="12" />
      </svg>
    ),
  },
  {
    title: "Peruvian Luxury Fabric",
    subtitle: "Crafted in Peru for sculpt & comfort",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
        className="footer-trust-icon"
      >
        <path d="M4 6 C8 3 10 9 14 6 C18 3 20 9 20 9" />
        <path d="M4 12 C8 9 10 15 14 12 C18 9 20 15 20 15" />
        <path d="M4 18 C8 15 10 21 14 18 C18 15 20 21 20 21" />
      </svg>
    ),
  },
  {
    title: "Free US Shipping",
    subtitle: "Complimentary on all orders over $100",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
        className="footer-trust-icon"
      >
        <path d="M3 20 L21 4" />
        <path d="M21 4 L14.5 21 L11 13 L3 9.5 Z" />
      </svg>
    ),
  },
  {
    title: "14-Day Easy Exchanges",
    subtitle: "Hassle-free sizing support",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
        className="footer-trust-icon"
      >
        <path d="M20 12 A8 8 0 1 1 12 4 C15 4 17.5 5.5 19 8" />
        <polyline points="19,3 19,8 14,8" />
      </svg>
    ),
  },
] as const;

export function SiteFooter() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
  }

  return (
    <footer className="luxury-footer" aria-label="Site Footer">
      {/* Zone 1: Trust Ribbon */}
      <div className="footer-trust-ribbon">
        <div className="container">
          <div className="footer-trust-grid">
            {trustPillars.map((pillar) => (
              <div key={pillar.title} className="footer-trust-card">
                <div className="footer-trust-icon-box">{pillar.icon}</div>
                <div>
                  <h4 className="label footer-trust-heading">{pillar.title}</h4>
                  <p className="footer-trust-sub">{pillar.subtitle}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Zone 2: Main Directory & VIP Newsletter */}
      <div className="footer-main-section">
        <div className="container">
          <div className="footer-main-grid">
            {/* VIP Club Signup Column */}
            <div className="footer-vip-box">
              <p className="label text-ember">VIP Access Club</p>
              <h3 className="font-display footer-vip-heading">
                First access to new drops, <em>before anyone else.</em>
              </h3>
              <p className="footer-vip-sub">
                Join our private list for 24-hour early drop access, private sales, and Miami Swim Week invitations. No noise.
              </p>

              <form className="footer-vip-form" onSubmit={handleSubmit}>
                {subscribed ? (
                  <div className="footer-vip-success">
                    <span className="label text-ember">✓ You’re on the list</span>
                    <p>We’ll notify you 24 hours before our next collection goes live.</p>
                  </div>
                ) : (
                  <div className="footer-input-wrapper">
                    <label htmlFor="footer-vip-email" className="sr-only">
                      Email address
                    </label>
                    <input
                      id="footer-vip-email"
                      type="email"
                      required
                      placeholder="Enter your email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="footer-vip-input"
                    />
                    <button type="submit" className="footer-vip-btn">
                      <span>Join</span>
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                      >
                        <path d="M5 12h14" />
                        <path d="m12 5 7 7-7 7" />
                      </svg>
                    </button>
                  </div>
                )}
              </form>
            </div>

            {/* Nav Columns */}
            <div className="footer-columns-group">
              <div className="footer-nav-column">
                <p className="label footer-col-label">Shop</p>
                <ul>
                  <li><Link href="/shop">All Swim</Link></li>
                  <li><Link href="/shop?filter=sets">Signature Sets</Link></li>
                  <li><Link href="/shop?filter=tops">Bikini Tops</Link></li>
                  <li><Link href="/shop?filter=bottoms">Bikini Bottoms</Link></li>
                  <li><Link href="/shop?filter=sunchild">The Sunchild Print</Link></li>
                  <li><Link href="/shop?filter=moonchild">The Moonchild Print</Link></li>
                </ul>
              </div>

              <div className="footer-nav-column">
                <p className="label footer-col-label">Fit & Service</p>
                <ul>
                  <li><Link href="/size-guide">Size & Fit Guide</Link></li>
                  <li><Link href="/size-guide#calculator">Fit Calculator</Link></li>
                  <li><Link href="/contact">14-Day Exchanges</Link></li>
                  <li><Link href="/contact">Shipping & Returns</Link></li>
                  <li><Link href="/contact">Client Concierge</Link></li>
                </ul>
              </div>

              <div className="footer-nav-column">
                <p className="label footer-col-label">The House</p>
                <ul>
                  <li><Link href="/story">Our Story</Link></li>
                  <li><Link href="/story#peru">Miami & Peru Heritage</Link></li>
                  <li><Link href="/#runway-title">Miami Swim Week 2026</Link></li>
                  <li><Link href="/waitlist">The Coastlines Drop</Link></li>
                  <li>
                    <Link
                      href="https://www.instagram.com/piuraswim"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="footer-ig-link"
                    >
                      Instagram @piuraswim
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Zone 3: Brand Lockup & Bottom Bar */}
      <div className="footer-bottom-bar">
        <div className="container footer-bottom-inner">
          <div className="footer-brand-signature">
            <svg
              viewBox="0 0 100 100"
              className="footer-sun-emblem"
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
            <span className="wordmark">Piura Swim</span>
            <span className="footer-origin-text">Designed in Miami · Crafted in Peru</span>
          </div>

          <div className="footer-legal-links">
            <Link href="/privacy">Privacy Policy</Link>
            <span className="footer-dot">·</span>
            <Link href="/terms">Terms of Service</Link>
            <span className="footer-dot">·</span>
            <span>© {new Date().getFullYear()} Piura Swim. All rights reserved.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
