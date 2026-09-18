"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { getProduct, SIZES } from "@/data/catalog";
import { SIGNATURE_SET } from "@/data/site";
import { image } from "@/lib/image";
import { money } from "@/lib/utils";
import { useCart } from "@/components/commerce/CartProvider";
import { Icon } from "@/components/ui/Icon";

const families = ["sunchild", "moonchild"] as const;

export function SignatureSet() {
  const [family, setFamily] = useState<(typeof families)[number]>("sunchild");
  const [topSize, setTopSize] = useState<(typeof SIZES)[number]>("S");
  const [bottomSize, setBottomSize] = useState<(typeof SIZES)[number]>("S");
  const { add } = useCart();
  const top = getProduct(SIGNATURE_SET.topHandles[family])!;
  const bottom = getProduct(SIGNATURE_SET.bottomHandles[family])!;
  const hero = image(top.images[0]);
  const label = family === "sunchild" ? "Sunchild" : "Moonchild";
  const total = money(top.price + bottom.price);
  return <section className="signature-set"><div className="signature-image"><Image src={hero.src} alt={`${label} Triangle set`} width={hero.width} height={hero.height} sizes="(max-width: 900px) 100vw, 54vw" /><span className="signature-caption label">Designed as one</span></div><div className="signature-panel"><p className="label accent">{SIGNATURE_SET.eyebrow}</p><h2 className="display display-lg">{SIGNATURE_SET.title[0]}<br /><em>{SIGNATURE_SET.title[1]}</em></h2><p className="signature-body">The set that started it all. Top and bottom are designed as one, with a flattering, cheeky fit.</p><div className="print-switcher" aria-label="Choose print">{families.map((item) => <button key={item} type="button" className={family === item ? "is-selected" : ""} onClick={() => setFamily(item)}><span className={`print-dot print-dot-${item}`} />The {item === "sunchild" ? "Sunchild" : "Moonchild"} print</button>)}</div><fieldset className="set-string"><legend>Build your Signature Triangle</legend><div className="set-string-controls"><SizeSelect label="Top size" value={topSize} setValue={setTopSize} /><div className="string-thread" aria-hidden="true"><span /><i /><span /></div><SizeSelect label="Bottom size" value={bottomSize} setValue={setBottomSize} /></div><div className="set-assembly"><output aria-live="polite"><span className="label">Your set</span><strong>{total}</strong><small>Top {topSize} · Bottom {bottomSize}</small></output><button type="button" className="button button-dark signature-add" onClick={() => { add(top, topSize); add(bottom, bottomSize); }}>{`Add the set · ${total}`}<Icon name="arrow" size={16} /></button></div></fieldset><div className="set-fit"><span>Classic triangle</span><i /> <span>Adjustable ties</span><i /> <span>Minimal / cheeky</span></div><div className="signature-links"><Link href={`/product/${top.handle}`}>Shop top</Link><Link href={`/product/${bottom.handle}`}>Shop bottom</Link><Link href="/size-guide">Find your Piura fit</Link></div></div></section>;
}

function SizeSelect({ label, value, setValue }: { label: string; value: string; setValue: (value: "S" | "M" | "L" | "XL") => void }) { return <div className="size-select"><div><span className="label">{label}</span><Link href="/size-guide">Size guide</Link></div><div role="group" aria-label={label}>{SIZES.map((size) => <button key={size} type="button" aria-pressed={value === size} className={value === size ? "is-selected" : ""} onClick={() => setValue(size)}>{size}</button>)}</div></div>; }
