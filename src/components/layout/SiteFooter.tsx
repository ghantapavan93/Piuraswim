"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";

const pillars = [
  {
    title: "True to size",
    subtitle: "Fits Small – X-Large",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
        className="footer-pillar-icon"
      >
        <rect x="2.5" y="8.5" width="19" height="7" rx="1.2" />
        <line x1="7" y1="8.5" x2="7" y2="12" />
        <line x1="12" y1="8.5" x2="12" y2="13" />
        <line x1="17" y1="8.5" x2="17" y2="12" />
      </svg>
    ),
  },
  {
    title: "Luxury fabric",
    subtitle: "Crafted in Peru",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
        className="footer-pillar-icon"
      >
        <path d="M4 6 C8 3 10 9 14 6 C18 3 20 9 20 9" />
        <path d="M4 12 C8 9 10 15 14 12 C18 9 20 15 20 15" />
        <path d="M4 18 C8 15 10 21 14 18 C18 15 20 21 20 21" />
      </svg>
    ),
  },
  {
    title: "Free US shipping",
    subtitle: "On orders over $100",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
        className="footer-pillar-icon"
      >
        <path d="M3 20 L21 4" />
        <path d="M21 4 L14.5 21 L11 13 L3 9.5 Z" />
      </svg>
    ),
  },
  {
    title: "Easy exchanges",
    subtitle: "14-day, hassle-free",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
        className="footer-pillar-icon"
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
    <footer className="site-footer">
      <div className="container">
        {/* Upper Waitlist & Nav Grid */}
        <div className="footer-top-grid">
          <div className="footer-waitlist-col">
            <p className="label text-ember">The waitlist</p>
            <h2 className="font-display footer-waitlist-title">
              First access to new drops, <em>before anyone else.</em>
            </h2>

            <form className="footer-waitlist-form" onSubmit={handleSubmit}>
              {subscribed ? (
                <p className="footer-subscribed-msg">
                  You’re on the list. We’ll be in touch.
                </p>
              ) : (
                <div className="footer-input-row">
                  <label htmlFor="footer-email" className="sr-only">
                    Email address
                  </label>
                  <input
                    id="footer-email"
                    type="email"
                    required
                    placeholder="Your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="footer-input-field"
                  />
                  <button type="submit" className="footer-submit-btn">
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

          <div className="footer-nav-grid">
            <div className="footer-nav-col">
              <p className="label text-muted">Shop</p>
              <ul>
                <li>
                  <Link href="/shop">All Swim</Link>
                </li>
                <li>
                  <Link href="/shop?filter=tops">Tops</Link>
                </li>
                <li>
                  <Link href="/shop?filter=bottoms">Bottoms</Link>
                </li>
                <li>
                  <Link href="/size-guide">Size Guide</Link>
                </li>
              </ul>
            </div>

            <div className="footer-nav-col">
              <p className="label text-muted">House</p>
              <ul>
                <li>
                  <Link href="/story">Our Story</Link>
                </li>
                <li>
                  <Link href="/contact">Contact</Link>
                </li>
                <li>
                  <Link
                    href="https://www.instagram.com/piuraswim"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Instagram
                  </Link>
                </li>
              </ul>
            </div>

            <div className="footer-nav-col">
              <p className="label text-muted">Legal</p>
              <ul>
                <li>
                  <Link href="/privacy">Privacy</Link>
                </li>
                <li>
                  <Link href="/terms">Terms</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* 4 Brand Pillars */}
        <div className="footer-pillars-grid">
          {pillars.map((item) => (
            <div key={item.title} className="footer-pillar-card">
              {item.icon}
              <div>
                <p className="label text-ink">{item.title}</p>
                <p className="footer-pillar-sub">{item.subtitle}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Sign-off Row */}
        <div className="footer-bottom-row">
          <span className="footer-brand-lockup">
            <svg
              viewBox="0 0 100 100"
              className="h-4 w-4 text-ember"
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
          </span>

          <p className="label footer-origin-note">
            Designed in Miami. Crafted in Peru, the city of eternal heat.
          </p>

          <p className="footer-copyright">
            © {new Date().getFullYear()} Piura Swim. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
