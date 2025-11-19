import { Metadata } from "next";
import DistributorHero from "@/components/sections/DistributorHero";
import WhyPartnerApsonic from "@/components/sections/WhyPartnerApsonic";
import DistributorRequirements from "@/components/sections/DistributorRequirements";
import DistributorProcess from "@/components/sections/DistributorProcess";
import DistributorApplicationForm from "@/components/sections/DistributorApplicationForm";
import DistributorContact from "@/components/sections/DistributorContact";

export const metadata: Metadata = {
  title: "Become a Distributor | APSONIC Africa",
  description: "Join APSONIC's continental distribution network. Partner with Africa's leading motorcycle brand and grow your business across 26+ markets.",
  keywords: "APSONIC distributor, motorcycle distribution Africa, business partnership, APSONIC dealer",
  openGraph: {
    title: "Become an APSONIC Distributor",
    description: "Join Africa's fastest-growing motorcycle distribution network",
    type: "website",
  },
};

export default function BecomeDistributorPage() {
  return (
    <main className="flex flex-col gap-0 bg-apsonic-ink overflow-x-hidden">
      <DistributorHero />
      <WhyPartnerApsonic />
      <DistributorRequirements />
      <DistributorProcess />
      <DistributorApplicationForm />
      <DistributorContact />
    </main>
  );
}

