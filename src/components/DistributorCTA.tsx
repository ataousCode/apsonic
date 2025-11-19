import { PageSection } from "./ui/PageSection";

export default function DistributorCTA() {
  return (
    <PageSection className="pt-0">
      <div className="glass-panel mx-auto max-w-5xl rounded-[36px] border border-white/15 bg-gradient-to-r from-[#1CA049] to-[#0e5e2c] p-10 text-white">
        <p className="text-xs uppercase tracking-[0.4em] text-white/70">Distributor Program</p>
        <h2 className="mt-4 text-3xl font-semibold">Scale APSONIC mobility in your country</h2>
        <p className="mt-4 text-sm text-white/85">
          Get onboarding toolkits, training academies, embedded financing, and OEM field engineers to activate
          dealerships within 60 days.
        </p>
        <div className="mt-6 flex flex-col gap-4 sm:flex-row">
          <a
            href="/contact"
            className="rounded-full bg-white px-6 py-3 text-center text-sm font-semibold text-black transition hover:bg-white/90"
          >
            Contact growth team
          </a>
          <a
            href="#dealers"
            className="rounded-full border border-white/40 px-6 py-3 text-center text-sm font-semibold text-white transition hover:bg-white/10"
          >
            Download distributor playbook
          </a>
        </div>
      </div>
    </PageSection>
  );
}
