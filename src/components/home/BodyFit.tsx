import Image from "next/image";
import Link from "next/link";
import { image } from "@/lib/image";

const FIT_FACTS = [
  { label: "Coverage", value: "Minimal / cheeky" },
  { label: "Support", value: "Sculpt and support" },
  { label: "Adjustability", value: "Adjustable ties" },
  { label: "Fit", value: "True to size" },
] as const;

export function BodyFit() {
  const visual = image("lifestyle/life-68.jpg");
  return <section className="body-fit">
    <Image className="body-fit-image" src={visual.src} alt="Piura swimwear by the sea" width={visual.width} height={visual.height} sizes="100vw" />
    <div className="body-fit-shade" />
    <div className="body-fit-content container">
      <p className="label">Fit at a glance</p>
      <h2 className="display display-lg">Fit should feel like<br /><em>confidence.</em></h2>
      <dl className="fit-at-a-glance">{FIT_FACTS.map((fact) => <div key={fact.label}><dt>{fact.label}</dt><dd>{fact.value}</dd></div>)}</dl>
      <p className="fit-preference-note">Choose top and bottom sizes separately. Every Piura piece runs true to size, Small through X-Large.</p>
      <Link href="/size-guide" className="text-link text-link-light">Find your Piura fit <span aria-hidden="true">→</span></Link>
    </div>
  </section>;
}
