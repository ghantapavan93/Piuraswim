import Image from "next/image";
import Link from "next/link";
import { HERO, BRAND } from "@/data/site";
import { image } from "@/lib/image";
import { Icon } from "@/components/ui/Icon";
import { Waterline } from "@/components/ui/Waterline";

export function CampaignHero() {
  const desktop = image("stills/shoreline-wide-poster.jpg");
  const mobile = image("stills/shoreline-portrait-poster.jpg");
  return <section className="campaign-hero"><div className="campaign-hero-media"><Image className="hero-image hero-desktop" src={desktop.src} alt="Woman in Piura swimwear at the shoreline" width={desktop.width} height={desktop.height} priority sizes="100vw" /><Image className="hero-image hero-mobile" src={mobile.src} alt="Woman in Piura swimwear by the water" width={mobile.width} height={mobile.height} priority sizes="100vw" /></div><div className="hero-scrim" /><div className="campaign-hero-top container"><p className="label">Miami / Piura</p><p className="label">{BRAND.coordinates}</p></div><div className="campaign-hero-content container"><h1 className="display display-xl">{HERO.title[0]}<br /><em>{HERO.title[1]}</em></h1><div><p>{HERO.body}</p><div className="hero-actions"><Link href={HERO.primary.href} className="button button-light">{HERO.primary.label}<Icon name="arrow" size={16} /></Link><Link href={HERO.secondary.href} className="text-link text-link-light">{HERO.secondary.label}<Icon name="arrow" size={15} /></Link></div></div></div><Waterline className="waterline-hero"><span>High noon</span></Waterline></section>;
}
