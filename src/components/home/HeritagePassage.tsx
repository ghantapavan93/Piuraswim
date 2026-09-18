import Image from "next/image";
import Link from "next/link";
import { image } from "@/lib/image";
import { Reveal } from "@/components/ui/Reveal";
import { Waterline } from "@/components/ui/Waterline";

export function HeritagePassage() {
  const miami = image("lifestyle/life-01.jpg");
  const piura = image("lifestyle/life-37.jpg");
  return <section className="heritage-passage" aria-labelledby="heritage-passage-title">
    <div className="container heritage-compact">
      <Reveal className="heritage-compact-intro">
        <p className="label accent">Our heritage</p>
        <h2 id="heritage-passage-title" className="display display-lg">From Miami to<br /><em>Piura, Perú.</em></h2>
        <p>Her favorite bikinis came from Peru. They were flattering, unique, and unlike anything she could find in the U.S.</p>
      </Reveal>
      <div className="heritage-compact-images">
        <figure><Image src={miami.src} alt="Piura’s Miami coast" width={miami.width} height={miami.height} sizes="(max-width: 900px) 65vw, 42vw" /><figcaption>Miami</figcaption></figure>
        <figure><Image src={piura.src} alt="Piura swimwear by the coast" width={piura.width} height={piura.height} sizes="(max-width: 900px) 40vw, 21vw" /><figcaption>Piura, Perú</figcaption></figure>
      </div>
      <Reveal className="heritage-compact-close" delay={100}>
        <Waterline><span>Miami</span><i /><span>Piura, Perú</span></Waterline>
        <p>Piura is a coastal city in northern Peru known as the City of Eternal Heat.</p>
        <Link href="/story" className="text-link text-link-light">Read the full story <span aria-hidden="true">→</span></Link>
      </Reveal>
    </div>
  </section>;
}
