import { CampaignHero } from '@/components/home/CampaignHero';
import { CoastlinesWaitlist } from '@/components/home/CoastlinesWaitlist';
import { CollectionStory } from '@/components/home/CollectionStory';
import { FitConfidence } from '@/components/home/FitConfidence';
import { HeritageChapter } from '@/components/home/HeritageChapter';
import { Manifesto } from '@/components/home/Manifesto';
import { NewArrivals } from '@/components/home/NewArrivals';
import { RealWomen } from '@/components/home/RealWomen';
import { RunwayEditorial } from '@/components/home/RunwayEditorial';
import { SignatureSet } from '@/components/home/SignatureSet';
import { SiteFooter } from '@/components/layout/SiteFooter';
import { SiteHeader } from '@/components/layout/SiteHeader';

export default function HomePage() {
  return (
    <>
      <SiteHeader overlay />
      <main id="main">
        <CampaignHero />
        <NewArrivals />
        <SignatureSet />
        <FitConfidence />
        <CollectionStory />
        <HeritageChapter />
        <RealWomen />
        <RunwayEditorial />
        <Manifesto />
        <CoastlinesWaitlist />
      </main>
      <SiteFooter />
    </>
  );
}
