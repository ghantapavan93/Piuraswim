import Link from 'next/link';
import styles from './AnnouncementBar.module.css';

/** The three service lines Piura runs above the header. Phones see only the drop notice. */
export function AnnouncementBar() {
  return (
    <div className={styles.bar}>
      <p className={`${styles.inner} label`}>
        <span className={styles.wide}>Free US shipping over $100</span>
        <span className={styles.dot} aria-hidden="true">
          ·
        </span>
        <Link href="/waitlist" className={styles.link}>
          The next drop: waitlist gets 24-hr early access
        </Link>
        <span className={styles.dot} aria-hidden="true">
          ·
        </span>
        <span className={styles.wide}>Crafted in Peru</span>
      </p>
    </div>
  );
}
