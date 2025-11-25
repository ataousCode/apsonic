import Hero from "@/components/Hero";
import Interactive360Viewer from "@/components/Interactive360Viewer";
import GetToKnowApsonic from "@/components/GetToKnowApsonic";
import FeatureShowcase from "@/components/FeatureShowcase";

import ModelsCarousel from "@/components/ModelsCarousel";
import BikeViewer from "@/components/BikeViewer";
import ServiceAdvantages from "@/components/ServiceAdvantages";
import PromoVideo from "@/components/PromoVideo";
import DistributorCTA from "@/components/DistributorCTA";
import ImpactHighlights from "@/components/ImpactHighlights";
import AFCONSponsorship from "@/components/AFCONSponsorship";
import { latest360Bike, getToKnowApsonicSlides, featureShowcase, modelsCarouselItems, viewerFrames } from "@/data/home";
import { PageSection } from "@/components/ui/PageSection";



export default function Home() {
  return (
    <main className="flex flex-col gap-0 bg-[var(--apsonic-ink)] pt-20 overflow-x-hidden">
      <Hero />
      <PageSection className="bg-[var(--apsonic-surface)]">
        <Interactive360Viewer
          title={latest360Bike.title}
          subtitle={latest360Bike.subtitle}
          description={latest360Bike.description}
          images={latest360Bike.images}
          specs={latest360Bike.specs}
        />
      </PageSection>
      <GetToKnowApsonic title="Discover APSONIC." slides={getToKnowApsonicSlides} />

      <FeatureShowcase features={featureShowcase} />
      <PageSection id="products" className="section-gradient">

        <ModelsCarousel items={modelsCarouselItems} />
      </PageSection>
      <PageSection id="impact" className="bg-[var(--apsonic-surface)]">
        <ImpactHighlights />
      </PageSection>
      <PageSection id="viewer" className="bg-[var(--apsonic-surface-alt)]">
        <BikeViewer frames={viewerFrames} />
      </PageSection>
      <PageSection className="section-gradient">
        <ServiceAdvantages />
      </PageSection>
      <PageSection className="bg-[var(--apsonic-surface)]">
        <AFCONSponsorship />
      </PageSection>
      <PageSection className="bg-[var(--apsonic-surface-alt)]">
        <PromoVideo />
      </PageSection>
      <DistributorCTA />
    </main>
  );
}
