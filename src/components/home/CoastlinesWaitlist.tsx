"use client";

import { FormEvent, useState } from "react";
import { COASTLINES } from "@/data/site";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";

export function CoastlinesWaitlist() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!email) return;
    setSent(true);
  }

  return (
    <section className="coastlines-split-section" aria-labelledby="coastlines-title">
      <div className="coastlines-split-content">
        <Reveal className="coastlines-split-copy">
          <p className="label text-ember-soft">The next drop</p>
          <h2 id="coastlines-title" className="display-xl coastlines-heading">
            <em>{COASTLINES.name}</em>
          </h2>
          <p className="coastlines-body">{COASTLINES.body}</p>

          <form className="coastlines-form" onSubmit={submit}>
            {sent ? (
              <p className="form-success">
                You’re on the list. We’ll notify you 24 hours before the drop.
              </p>
            ) : (
              <div className="coastlines-input-group">
                <label className="sr-only" htmlFor="waitlist-email">
                  Email address
                </label>
                <input
                  id="waitlist-email"
                  name="email"
                  type="email"
                  required
                  placeholder="Your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="coastlines-input"
                />
                <button
                  type="submit"
                  aria-label="Join waitlist"
                  className="coastlines-submit-btn"
                >
                  <Icon name="arrow" size={16} />
                </button>
              </div>
            )}
          </form>

          <p className="label coastlines-note">{COASTLINES.access}</p>
        </Reveal>
      </div>

      <div className="coastlines-split-media">
        <video
          className="coastlines-video"
          autoPlay
          muted
          loop
          playsInline
          preload="none"
          poster="/video/runway-poster.jpg"
        >
          <source src="/video/runway.mp4" type="video/mp4" />
        </video>
      </div>
    </section>
  );
}
