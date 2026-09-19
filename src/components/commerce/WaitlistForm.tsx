'use client';

import { useId, useState, type FormEvent } from 'react';
import { Icon } from '@/components/ui/Icon';
import './WaitlistForm.css';
import { cx } from '@/lib/utils';

type WaitlistFormProps = {
  /** `inline` puts the button beside the field; `stacked` is for full forms. */
  layout?: 'inline' | 'stacked';
  onDark?: boolean;
  /** Offer the optional phone field, as the live waitlist page does. */
  withPhone?: boolean;
  submitLabel?: string;
};

/**
 * Email capture for the Coastlines waitlist. This concept has no backend, so a
 * valid submission shows the confirmation state; production would post to the
 * store's customer list.
 */
export function WaitlistForm({
  layout = 'inline',
  onDark = false,
  withPhone = false,
  submitLabel = 'Join the waitlist',
}: WaitlistFormProps) {
  const id = useId();
  const [sent, setSent] = useState(false);

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!event.currentTarget.reportValidity()) return;
    setSent(true);
  }

  if (sent) {
    return (
      <p className="waitlist-form__confirmation" role="status">
        <span className="label accent">You&rsquo;re on the list.</span>
        <span>Waitlist members receive private access one day before the collection goes live.</span>
      </p>
    );
  }

  return (
    <form
      className={cx('waitlist-form', `waitlist-form--${layout}`, onDark && 'waitlist-form--on-dark')}
      onSubmit={submit}
      noValidate
    >
      <div className="waitlist-form__field">
        <label htmlFor={`${id}-email`} className="visually-hidden">
          Email address
        </label>
        <input
          id={`${id}-email`}
          name="email"
          type="email"
          inputMode="email"
          autoComplete="email"
          placeholder="Email address"
          required
          className="waitlist-form__input"
        />
      </div>

      {withPhone ? (
        <div className="waitlist-form__field">
          <label htmlFor={`${id}-phone`} className="visually-hidden">
            Phone number (optional)
          </label>
          <input
            id={`${id}-phone`}
            name="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            placeholder="Phone number (optional)"
            className="waitlist-form__input"
          />
        </div>
      ) : null}

      {layout === 'inline' ? (
        <button type="submit" className="waitlist-form__inline-submit">
          Join
          <Icon name="arrow" size={14} />
        </button>
      ) : (
        <button type="submit" className={`button ${onDark ? 'button-light' : ''}`}>
          {submitLabel}
          <Icon name="arrow" size={14} />
        </button>
      )}
    </form>
  );
}
