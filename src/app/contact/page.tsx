"use client";

import { FormEvent, useState } from "react";
import { CartDrawer } from "@/components/commerce/CartDrawer";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SERVICE } from "@/data/site";
import { Reveal } from "@/components/ui/Reveal";

const faqList = [
  {
    q: "How do 14-day exchanges work?",
    a: "If the size isn't 100% perfect, send us a note within 14 days of delivery. We'll send you a prepaid exchange label immediately so you get your ideal size with zero hassle.",
  },
  {
    q: "Can I order different sizes for Top & Bottom?",
    a: "Yes! Every Piura bikini top and bottom can be purchased separately so you can select the exact fit for your body.",
  },
  {
    q: "What are your shipping timelines?",
    a: "Orders ship from Miami within 24–48 hours via USPS Priority Mail. Standard US delivery is 2–4 business days, free on orders over $100.",
  },
];

export function ContactPageContent() {
  const [sent, setSent] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [topic, setTopic] = useState("Fit Consultation");
  const [message, setMessage] = useState("");

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!email || !message) return;
    setSent(true);
  }

  return (
    <div className="contact-container container">
      <div className="contact-grid-layout">
        {/* Left Info & Concierge FAQ */}
        <div className="contact-left-col">
          <Reveal>
            <p className="label text-ember">Client Concierge</p>
            <h1 className="display-xl contact-heading">
              A real person<br />
              <em>will write back.</em>
            </h1>
            <p className="contact-intro">
              Have a question about fit, exchanging a size, or an upcoming collection drop? Our Miami client team responds within 24 hours.
            </p>

            <div className="contact-faq-section">
              <h3 className="label text-ink contact-faq-heading">Frequently Asked Questions</h3>
              <div className="contact-faq-list">
                {faqList.map((faq) => (
                  <details key={faq.q} className="contact-faq-item">
                    <summary className="contact-faq-summary">
                      <span>{faq.q}</span>
                      <span className="faq-toggle-icon">+</span>
                    </summary>
                    <p className="contact-faq-answer">{faq.a}</p>
                  </details>
                ))}
              </div>
            </div>

            <div className="contact-assurances">
              <div className="contact-assurance-item">
                <span className="label text-ember">Fit Guarantee</span>
                <p>Personalized size recommendations before you buy.</p>
              </div>
              <div className="contact-assurance-item">
                <span className="label text-ember">Direct Care</span>
                <p>{SERVICE.exchangesLong}</p>
              </div>
            </div>
          </Reveal>
        </div>

        {/* Right Form Card */}
        <div className="contact-right-col">
          <Reveal delay={100}>
            <div className="contact-form-card">
              <p className="label text-ember">Send a Message</p>
              <h2 className="font-display contact-form-title">
                How can we help?
              </h2>

              <form onSubmit={submit} className="concierge-form">
                {sent ? (
                  <div className="contact-success-state">
                    <span className="label text-ember">✓ Message Received</span>
                    <h3 className="font-display">Thank you, {name || "there"}.</h3>
                    <p>Your note has been routed directly to our Miami client concierge. We will reply to <strong>{email}</strong> shortly.</p>
                  </div>
                ) : (
                  <>
                    <div className="form-field-group">
                      <label htmlFor="contact-name" className="label text-muted">Your Name</label>
                      <input
                        id="contact-name"
                        type="text"
                        required
                        placeholder="e.g. Sofia"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="concierge-input"
                      />
                    </div>

                    <div className="form-field-group">
                      <label htmlFor="contact-email" className="label text-muted">Email Address</label>
                      <input
                        id="contact-email"
                        type="email"
                        required
                        placeholder="you@email.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="concierge-input"
                      />
                    </div>

                    <div className="form-field-group">
                      <label htmlFor="contact-topic" className="label text-muted">Inquiry Type</label>
                      <select
                        id="contact-topic"
                        value={topic}
                        onChange={(e) => setTopic(e.target.value)}
                        className="concierge-select"
                      >
                        <option value="Fit Consultation">Fit Consultation / Sizing Advice</option>
                        <option value="Exchange or Return">14-Day Exchange or Return</option>
                        <option value="Order Status">Order Status & Tracking</option>
                        <option value="General Inquiry">General / Press Inquiry</option>
                      </select>
                    </div>

                    <div className="form-field-group">
                      <label htmlFor="contact-msg" className="label text-muted">Message</label>
                      <textarea
                        id="contact-msg"
                        required
                        rows={4}
                        placeholder="Tell us about the style, your measurements, or what you need..."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        className="concierge-textarea"
                      />
                    </div>

                    <button type="submit" className="button button-dark concierge-submit">
                      Send to Client Concierge →
                    </button>
                  </>
                )}
              </form>
            </div>
          </Reveal>
        </div>
      </div>
    </div>
  );
}

export default function ContactPage() {
  return (
    <>
      <SiteHeader />
      <main className="contact-page-wrapper">
        <ContactPageContent />
      </main>
      <SiteFooter />
      <CartDrawer />
    </>
  );
}
