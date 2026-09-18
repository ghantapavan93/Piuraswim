import Image from "next/image";
import { RUNWAY } from "@/data/site";
import { image } from "@/lib/image";
import { Reveal } from "@/components/ui/Reveal";

const frames = [
  ["stills/runway-poster.jpg", "Miami Swim Week opening frame"],
  ["stills/runway-walk-01.jpg", "Piura on the Miami Swim Week runway"],
  ["stills/runway-walk-02.jpg", "Piura runway look in motion"],
  ["stills/runway-walk-03.jpg", "Piura Miami Swim Week detail"],
] as const;

export function RunwayEditorial() {
  return <section className="runway after-dark" aria-labelledby="runway-title"><div className="container runway-grid"><Reveal className="runway-intro"><p className="label accent">After dark · {RUNWAY.eyebrow}</p><h2 id="runway-title" className="display display-lg">{RUNWAY.title[0]}<br /><em>{RUNWAY.title[1]}</em></h2><p>{RUNWAY.caption}</p></Reveal><Reveal className="runway-montage" delay={100}><div className="runway-film" aria-label="Four frames from Piura at Miami Swim Week">{frames.map(([key, alt], index) => { const frame = image(key); return <figure key={key} className={`runway-frame runway-frame-${index + 1}`}><Image src={frame.src} alt={alt} width={frame.width} height={frame.height} sizes="(max-width: 700px) 45vw, 22vw" /><figcaption>Frame 0{index + 1}</figcaption></figure>; })}</div><p className="runway-film-note">Four frames from Miami Swim Week.</p></Reveal></div></section>;
}
