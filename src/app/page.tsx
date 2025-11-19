import Hero from "@/components/Hero";
import Interactive360Viewer from "@/components/Interactive360Viewer";
import ModelsCarousel from "@/components/ModelsCarousel";
import BikeViewer from "@/components/BikeViewer";
import ServiceAdvantages from "@/components/ServiceAdvantages";
import PromoVideo from "@/components/PromoVideo";
import DistributorCTA from "@/components/DistributorCTA";
import ImpactHighlights from "@/components/ImpactHighlights";
import AFCONSponsorship from "@/components/AFCONSponsorship";
import { PageSection } from "@/components/ui/PageSection";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { modelsCarouselItems, viewerFrames, latest360Bike } from "@/data/home";

export default function Home() {
  return (
    <main className="flex flex-col gap-0 bg-[var(--apsonic-ink)] pt-20">
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
      <PageSection id="products" className="section-gradient">
        <SectionHeader
          eyebrow="Platforms"
          title="Recommended APSONIC platforms"
          description="Adaptable motorcycles optimized for last-mile logistics, commercial fleets, and national programs."
          align="center"
        />
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
