import { SunMark } from '@/components/ui/SunMark';
import { BRAND, MANIFESTO } from '@/data/site';
import styles from './Manifesto.module.css';

export function Manifesto() {
  return (
    <section className={`${styles.section} on-sand`} aria-labelledby="manifesto-title">
      <div className={`${styles.inner} container`} data-reveal="fade">
        <SunMark size={44} className={styles.mark} />
        <h2 id="manifesto-title" className="display display-lg">
          {MANIFESTO.title[0]} <em>{MANIFESTO.title[1]}</em>
        </h2>
        <p className={styles.body}>{MANIFESTO.body}</p>
        <p className={`${styles.origin} label`}>{BRAND.origin}</p>
      </div>
    </section>
  );
}
