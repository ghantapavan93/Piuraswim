import { Photo } from '@/components/ui/Photo';
import { WaitlistForm } from '@/components/commerce/WaitlistForm';
import { COASTLINES } from '@/data/site';
import { image } from '@/lib/image';
import './CoastlinesWaitlist.css';

type CoastlinesWaitlistProps = {
  /** The dedicated waitlist page asks for an optional phone number too. */
  withPhone?: boolean;
};

/** The next drop. The name of the collection runs across the seam between copy and photograph. */
export function CoastlinesWaitlist({ withPhone = false }: CoastlinesWaitlistProps) {
  const finale = image('stills/runway-finale-wide.jpg');

  return (
    <section className="coastlines on-dark" aria-labelledby="coastlines-title">
      <div className="coastlines__copy" data-reveal="fade">
        <p className="coastlines__index">
          <span className="label accent-soft">{COASTLINES.index}</span>
          <span className="label">{COASTLINES.eyebrow}</span>
        </p>
        <h2 id="coastlines-title" className="coastlines__title display display-xl">
          <em>{COASTLINES.name}</em>
        </h2>
        <p className="coastlines__body">{COASTLINES.body}</p>
        <div className="coastlines__form">
          <WaitlistForm layout="stacked" onDark withPhone={withPhone} />
        </div>
        <p className="coastlines__note">{withPhone ? COASTLINES.formNote : COASTLINES.access}</p>
      </div>

      <div className="coastlines__media">
        <Photo
          src={finale.src}
          alt="The Coastlines runway finale at Miami Swim Week 2026"
          width={finale.width}
          height={finale.height}
          sizes="(max-width: 899px) 100vw, 50vw"
          quality={85}
          className="coastlines__image"
        />
      </div>
    </section>
  );
}
