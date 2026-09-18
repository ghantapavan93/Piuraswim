"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const announcements = [
  { text: "Free US shipping over $100", href: "/shop", isLink: false },
  { text: "The next drop: waitlist gets 24-hr early access", href: "/waitlist", isLink: true },
  { text: "Crafted in Peru", href: "/story", isLink: false },
];

export function AnnouncementBar() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % announcements.length);
    }, 3500);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="announcement-bar">
      <div className="container announcement-bar-inner">
        {/* Mobile Rotating Ticker with Fade Effect */}
        <div className="announcement-mobile">
          {announcements.map((item, i) => (
            <span
              key={item.text}
              className={`announcement-item ${i === index ? "is-active" : ""}`}
              aria-hidden={i !== index}
            >
              {item.isLink ? (
                <Link href={item.href} className="announcement-link">
                  {item.text}
                </Link>
              ) : (
                <span>{item.text}</span>
              )}
            </span>
          ))}
        </div>

        {/* Desktop Static Spread */}
        <div className="announcement-desktop">
          <span>Free US shipping over $100</span>
          <span className="announcement-dot" aria-hidden="true">·</span>
          <Link href="/waitlist" className="announcement-link">
            The next drop: waitlist gets 24-hr early access
          </Link>
          <span className="announcement-dot" aria-hidden="true">·</span>
          <span>Crafted in Peru</span>
        </div>
      </div>
    </div>
  );
}
