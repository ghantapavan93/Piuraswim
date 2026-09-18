import Image from "next/image";
import { RUNWAY } from "@/data/site";
import { image } from "@/lib/image";
import { Reveal } from "@/components/ui/Reveal";

export function RunwayEditorial() { const runway = image("stills/runway-poster.jpg"); const shore = image("stills/shoreline-wide.jpg"); return <section className="runway after-dark"><div className="container runway-grid"><Reveal className="runway-intro"><p className="label accent">After dark · {RUNWAY.eyebrow}</p><h2 className="display display-lg">{RUNWAY.title[0]}<br /><em>{RUNWAY.title[1]}</em></h2><p>{RUNWAY.caption}</p></Reveal><Reveal className="runway-primary" delay={100}><Image src={runway.src} alt="Piura at Miami Swim Week" width={runway.width} height={runway.height} sizes="(max-width: 900px) 80vw, 36vw" /></Reveal><Reveal className="runway-secondary" delay={240}><Image src={shore.src} alt="Piura by the coastline" width={shore.width} height={shore.height} sizes="(max-width: 900px) 72vw, 28vw" /><p>For the woman who never wants to leave the water.</p></Reveal></div></section>; }
