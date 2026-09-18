import { CartDrawer } from "@/components/commerce/CartDrawer";
import { CampaignHero } from "@/components/home/CampaignHero";
import { CoastlinesWaitlist } from "@/components/home/CoastlinesWaitlist";
import { BodyFit } from "@/components/home/BodyFit";
import { HeritagePassage } from "@/components/home/HeritagePassage";
import { PrintAtmospheres } from "@/components/home/PrintAtmospheres";
import { RealWomen } from "@/components/home/RealWomen";
import { RunwayEditorial } from "@/components/home/RunwayEditorial";
import { SignatureSet } from "@/components/home/SignatureSet";
import { Manifesto } from "@/components/home/Manifesto";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";

export default function Home() {
  return (
    <>
      <SiteHeader overlay />
      <main>
        <CampaignHero />
        <PrintAtmospheres />
        <SignatureSet />
        <BodyFit />
        <HeritagePassage />
        <RealWomen />
        <RunwayEditorial />
        <Manifesto />
        <CoastlinesWaitlist />
      </main>
      <SiteFooter />
      <CartDrawer />
    </>
  );
}
