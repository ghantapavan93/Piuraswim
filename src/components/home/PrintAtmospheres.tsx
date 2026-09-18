import Link from "next/link";
import { Waterline } from "@/components/ui/Waterline";
import { Reveal } from "@/components/ui/Reveal";

const atmospheres = [
  {
    name: "Sunchild",
    href: "/shop?filter=sunchild",
    index: "01",
  },
  {
    name: "Moonchild",
    href: "/shop?filter=moonchild",
    index: "02",
  },
] as const;

export function PrintAtmospheres() {
  return <section className="print-atmospheres" aria-labelledby="print-atmospheres-title">
    <div className="container print-atmospheres-inner">
      <Reveal className="print-intro">
        <p className="label accent">02 · The new Triangle</p>
        <h2 id="print-atmospheres-title" className="display display-lg">Two prints.<br /><em>One cut.</em></h2>
        <p>Sunchild and Moonchild, made for the Signature Triangle.</p>
      </Reveal>
      <nav className="print-index" aria-label="Shop Triangle prints">
        {atmospheres.map((atmosphere, index) => <Reveal delay={index * 100} key={atmosphere.name}><Link className={`print-atmosphere print-atmosphere-${index + 1}`} href={atmosphere.href}><span>{atmosphere.index}</span><strong className="display display-md">{atmosphere.name}.</strong><small>Explore the print <b aria-hidden="true">→</b></small></Link></Reveal>)}
      </nav>
    </div>
    <Waterline className="waterline-print" />
  </section>;
}
