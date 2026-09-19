import Link from 'next/link';
import './AnnouncementBar.css';

/** The three service lines Piura runs above the header. Phones see only the drop notice. */
export function AnnouncementBar() {
  return (
    <div className="announcement-bar">
      <p className="announcement-bar__inner label">
        <span className="announcement-bar__wide">Free US shipping over $100</span>
        <span className="announcement-bar__dot" aria-hidden="true">
          ·
        </span>
        <Link href="/waitlist" className="announcement-bar__link">
          The next drop: waitlist gets 24-hr early access
        </Link>
        <span className="announcement-bar__dot" aria-hidden="true">
          ·
        </span>
        <span className="announcement-bar__wide">Crafted in Peru</span>
      </p>
    </div>
  );
}
