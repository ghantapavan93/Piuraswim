"use client";
import { FormEvent, useState } from "react";
import { CartDrawer } from "@/components/commerce/CartDrawer";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SERVICE } from "@/data/site";
export default function ContactPage() { const [sent, setSent] = useState(false); function submit(event: FormEvent<HTMLFormElement>) { event.preventDefault(); setSent(true); } return <><SiteHeader /><main className="contact-page"><div className="container contact-grid"><div><p className="label accent">Contact</p><h1 className="display display-lg">A real person<br /><em>will write back.</em></h1><p>Have a question about fit, a current order, or exchanging a size? Send us a note.</p><dl><div><dt>Fit help</dt><dd>Unsure between two sizes? Tell us the style and the fit you like.</dd></div><div><dt>Easy exchanges</dt><dd>{SERVICE.exchangesLong}</dd></div></dl></div><form onSubmit={submit}>{sent ? <p className="contact-success">Thank you. Your note is ready for the Piura team.</p> : <><label>Name<input required name="name" /></label><label>Email<input required type="email" name="email" /></label><label>What can we help with?<textarea required name="message" rows={5} /></label><button className="button button-dark" type="submit">Send note</button></>}</form></div></main><SiteFooter /><CartDrawer /></>; }
