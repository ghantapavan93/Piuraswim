import Image from "next/image";
import Link from "next/link";
import { REAL_WOMEN } from "@/data/site";
import { image } from "@/lib/image";
import { Reveal } from "@/components/ui/Reveal";

const portraits = [["lifestyle/life-06.jpg", "Piura swimwear in golden light"], ["lifestyle/life-45.jpg", "Piura swimmer by the water"], ["lifestyle/life-64.jpg", "Piura bikini at the beach"]] as const;
export function RealWomen() { return <section className="section real-women golden-hour"><div className="container"><Reveal className="real-women-head"><p className="label accent">Golden hour · Real women</p><blockquote className="display display-lg">{REAL_WOMEN.quote[0]}<br /><em>{REAL_WOMEN.quote[1]}</em><br />{REAL_WOMEN.quote[2]}</blockquote><p>{REAL_WOMEN.note}</p></Reveal><div className="real-women-strip">{portraits.map(([imageKey, alt], index) => { const asset = image(imageKey); return <Reveal key={imageKey} delay={index * 100}><figure><Image src={asset.src} alt={alt} width={asset.width} height={asset.height} sizes="(max-width: 700px) 65vw, 27vw" /><figcaption>{index === 1 ? REAL_WOMEN.caption : index === 0 ? "At home by the water" : "Made for the memory"}</figcaption></figure></Reveal>; })}</div><Reveal><Link href="https://www.instagram.com/piuraswim" target="_blank" rel="noreferrer" className="real-women-tag">{REAL_WOMEN.tag}</Link></Reveal></div></section>; }
