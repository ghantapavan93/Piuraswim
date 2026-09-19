'use client';

import { useId, useState, type FormEvent } from 'react';
import { Icon } from '@/components/ui/Icon';
import { SERVICE } from '@/data/site';
import './ContactForm.css';

const TOPICS = ['Sizing and fit', 'An order', 'Exchanges', 'Collaborations', 'Something else'];

/** The contact form. No backend in this concept: a valid submission shows the confirmation. */
export function ContactForm() {
  const id = useId();
  const [sent, setSent] = useState(false);

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!event.currentTarget.reportValidity()) return;
    setSent(true);
  }

  if (sent) {
    return (
      <div className="contact-form__confirmation" role="status">
        <p className="label accent">Message sent.</p>
        <p>{SERVICE.contactNote}</p>
      </div>
    );
  }

  return (
    <form className="contact-form" onSubmit={submit} noValidate>
      <div className="contact-form__field">
        <label htmlFor={`${id}-email`} className="label">
          Email
        </label>
        <input id={`${id}-email`} name="email" type="email" inputMode="email" autoComplete="email" placeholder="you@example.com" required className="contact-form__input" />
      </div>

      <div className="contact-form__field">
        <label htmlFor={`${id}-topic`} className="label">
          About
        </label>
        <select id={`${id}-topic`} name="topic" className="contact-form__input" defaultValue={TOPICS[0]}>
          {TOPICS.map((topic) => (
            <option key={topic} value={topic}>
              {topic}
            </option>
          ))}
        </select>
      </div>

      <div className="contact-form__field">
        <label htmlFor={`${id}-message`} className="label">
          Your message
        </label>
        <textarea id={`${id}-message`} name="message" rows={5} placeholder="How can we help?" required className="contact-form__input" />
      </div>

      <button type="submit" className="button">
        Send message
        <Icon name="arrow" />
      </button>
      <p className="contact-form__note">{SERVICE.contactNote}</p>
    </form>
  );
}
