import type { Metadata } from 'next';
import { ContactForm } from '@/components/commerce/ContactForm';
import { PageHero } from '@/components/layout/PageHero';
import { CONTACT, SERVICE } from '@/data/site';
import { image } from '@/lib/image';
import './page.css';

export const metadata: Metadata = {
  title: 'Contact',
  description: `${CONTACT.body} ${CONTACT.note}`,
};

const ANSWERS = [
  {
    question: 'Can I choose different sizes for the top and the bottom?',
    answer: 'Yes. Every top and bottom is sold separately, so each can be your size. The set price is simply the two pieces added together.',
  },
  {
    question: 'How do exchanges work?',
    answer: `${SERVICE.exchanges} ${SERVICE.exchangesLong}`,
  },
  {
    question: 'What does shipping cost?',
    answer: `${SERVICE.shipping} Shipping and taxes are calculated at checkout.`,
  },
] as const;

export default function ContactPage() {
  return (
    <main id="main">
      <PageHero
        image={image('stills/sunset-water-profile.jpg')}
        alt="Golden hour on the water from the deck of a boat"
        eyebrow={CONTACT.eyebrow}
        title={CONTACT.title}
      />

      <div className="contact-page container">
        <div className="contact-page__copy" data-reveal="fade">
          <p className="label accent">Contact us</p>
          <h2 className="display display-md">
            {CONTACT.heading[0]} <em>{CONTACT.heading[1]}</em>
          </h2>
          <p className="contact-page__body">{CONTACT.body}</p>

          <dl className="contact-page__answers">
            {ANSWERS.map((entry) => (
              <div key={entry.question}>
                <dt>{entry.question}</dt>
                <dd>{entry.answer}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="contact-page__form-column" data-reveal="fade" data-reveal-delay="1">
          <ContactForm />
        </div>
      </div>
    </main>
  );
}
