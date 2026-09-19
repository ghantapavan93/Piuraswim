import { SunMark } from '@/components/ui/SunMark';
import { BRAND, MANIFESTO } from '@/data/site';
import './Manifesto.css';

export function Manifesto() {
  return (
    <section className="manifesto on-sand" aria-labelledby="manifesto-title">
      <div className="manifesto__inner container" data-reveal="fade">
        <SunMark size={44} className="manifesto__mark" />
        <h2 id="manifesto-title" className="display display-lg">
          {MANIFESTO.title[0]} <em>{MANIFESTO.title[1]}</em>
        </h2>
        <p className="manifesto__body">{MANIFESTO.body}</p>
        <p className="manifesto__origin label">{BRAND.origin}</p>
      </div>
    </section>
  );
}
