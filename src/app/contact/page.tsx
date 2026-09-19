import type { Metadata } from 'next';
import { ContactForm } from '@/components/commerce/ContactForm';
import { PageHero } from '@/components/layout/PageHero';
import { SiteFooter } from '@/components/layout/SiteFooter';
import { SiteHeader } from '@/components/layout/SiteHeader';
import { Reveal } from '@/components/ui/Reveal';
import { CONTACT, SERVICE } from '@/data/site';
import { image } from '@/lib/image';
import styles from './page.module.css';

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
    <>
      <SiteHeader overlay />
      <main id="main">
        <PageHero
          image={image('stills/sunset-water-profile.jpg')}
          alt="Golden hour on the water from the deck of a boat"
          eyebrow={CONTACT.eyebrow}
          title={CONTACT.title}
        />

        <div className={`${styles.grid} container`}>
          <Reveal className={styles.copy}>
            <p className="label accent">Contact us</p>
            <h2 className="display display-md">
              {CONTACT.heading[0]} <em>{CONTACT.heading[1]}</em>
            </h2>
            <p className={styles.body}>{CONTACT.body}</p>

            <dl className={styles.answers}>
              {ANSWERS.map((entry) => (
                <div key={entry.question}>
                  <dt>{entry.question}</dt>
                  <dd>{entry.answer}</dd>
                </div>
              ))}
            </dl>
          </Reveal>

          <Reveal delay={120} className={styles.formColumn}>
            <ContactForm />
          </Reveal>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
