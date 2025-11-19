'use client';

import { useMemo, useState } from "react";
import { PageSection } from "@/components/ui/PageSection";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Button } from "@/components/ui/Button";
import {
  dealerEntries,
  dealerFilters,
  dealerInsights,
  dealerPresenceCountries,
  type DealerCategory,
  type DealerEntry,
} from "@/data/dealers";
import { cn } from "@/lib/utils";
import DistributorCTA from "@/components/DistributorCTA";
import DealerMap from "@/components/DealerMap";
import DealerCard from "@/components/DealerCard";
import MapboxDiagnostic from "@/components/MapboxDiagnostic";

type FilterValue = DealerCategory | "all";

export default function DealersPage() {
  const [query, setQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<FilterValue>("all");
  const [selectedDealer, setSelectedDealer] = useState<DealerEntry | null>(null);

  const filteredDealers = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return dealerEntries.filter((dealer) => {
      const matchesQuery =
        !normalized ||
        dealer.name.toLowerCase().includes(normalized) ||
        dealer.city.toLowerCase().includes(normalized) ||
        dealer.country.toLowerCase().includes(normalized) ||
        dealer.address.toLowerCase().includes(normalized);

      const matchesFilter = activeFilter === "all" || dealer.categories.includes(activeFilter);
      return matchesQuery && matchesFilter;
    });
  }, [query, activeFilter]);

  return (
    <main className="bg-[var(--apsonic-ink)] text-white pt-20">
      <section className="hero-gradient relative overflow-hidden pb-24 pt-12">
        <div className="absolute inset-0 opacity-40">
          <div className="h-full w-full bg-[radial-gradient(circle_at_20%_20%,rgba(92,225,161,.25),transparent_45%)]" />
        </div>
        <div className="relative z-10 mx-auto flex max-w-5xl flex-col gap-8 px-6 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.6em] text-emerald-200">Dealers & Distributors</p>
          <h1 className="text-4xl font-semibold leading-tight sm:text-5xl">
            African coverage woven with local expertise
          </h1>
          <p className="text-base text-white/80">
            APSONIC anchors fleets across Ghana, Burkina Faso, Togo, Nigeria, Côte d’Ivoire, Mali, Niger, Benin, Sierra
            Leone, Liberia, and beyond. Every corridor blends OEM engineering with real African road wisdom.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {dealerPresenceCountries.map((country) => (
              <span
                key={country}
                className="rounded-full border border-white/20 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-white/70"
              >
                {country}
              </span>
            ))}
          </div>
          <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Button
              asChild
              className="rounded-full border border-white/20 bg-white/10 px-8 text-white hover:bg-white/20"
            >
              <a href="#network">Explore network</a>
            </Button>
            <Button
              asChild
              className="rounded-full border border-white/10 bg-[var(--apsonic-green)] px-8 text-black hover:bg-[var(--apsonic-green-dark)] hover:text-white"
            >
              <a href="/contact">Engage regional ops</a>
            </Button>
          </div>
        </div>
      </section>

      <PageSection id="network" className="bg-[var(--apsonic-surface-alt)]">
        <SectionHeader
          eyebrow="Network intelligence"
          title="Search, filter, and connect with APSONIC partners"
          description="Use corridor filters to find sales offices, service hubs, OEM academies, or spare depots that match your deployment."
        />

        <div className="mt-10 space-y-6">
          <div className="flex flex-col gap-4 lg:flex-row">
            <input
              type="text"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search by city, country, or dealer name..."
              className="h-12 flex-1 rounded-full border border-white/15 bg-black/20 px-5 text-white placeholder:text-white/40 focus:border-[var(--apsonic-green)] focus:outline-none"
            />
            <div className="flex items-center gap-2 text-sm text-white/60">
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              {filteredDealers.length} dealer{filteredDealers.length !== 1 ? 's' : ''} found
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <FilterChip label="All" active={activeFilter === "all"} onClick={() => setActiveFilter("all")} />
            {dealerFilters.map((filter) => (
              <FilterChip
                key={filter.slug}
                label={filter.label}
                active={activeFilter === filter.slug}
                onClick={() => setActiveFilter(filter.slug)}
              />
            ))}
          </div>
        </div>

        <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_1fr]">
          {/* Dealer Cards */}
          <div className="space-y-5 lg:order-2">
            {filteredDealers.length === 0 ? (
              <div className="rounded-3xl border border-white/10 bg-black/20 p-8 text-center">
                <svg className="mx-auto mb-4 h-16 w-16 text-white/20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <p className="text-lg font-semibold text-white/70">No dealers found</p>
                <p className="mt-2 text-sm text-white/50">Try adjusting your search or filters</p>
                <Button 
                  onClick={() => {
                    setQuery("");
                    setActiveFilter("all");
                  }}
                  variant="outline"
                  className="mt-4 rounded-full border-white/20 bg-white/5 text-white hover:bg-white/10"
                >
                  Reset Filters
                </Button>
              </div>
            ) : (
              filteredDealers.map((dealer) => (
                <DealerCard 
                  key={dealer.id} 
                  dealer={dealer}
                  onViewDetails={setSelectedDealer}
                />
              ))
            )}
          </div>

          {/* Interactive Map */}
          <aside className="space-y-5 lg:order-1 lg:sticky lg:top-24 lg:h-[calc(100vh-8rem)]">
            <div className="rounded-[28px] border border-white/10 bg-black/25 p-6 h-full flex flex-col">
              <div className="text-center mb-4">
                <p className="text-xs uppercase tracking-[0.4em] text-white/50">Interactive Map</p>
                <p className="text-sm text-white/70 mt-1">Click markers to view dealer details</p>
              </div>
              
              <div className="flex-1 min-h-[400px] lg:min-h-0">
                <DealerMap 
                  dealers={filteredDealers}
                  activeFilter={activeFilter === 'all' ? 'all' : activeFilter}
                  onDealerSelect={setSelectedDealer}
                />
              </div>

              <div className="mt-5 grid gap-4 text-sm text-white/70">
                {dealerInsights.map((insight) => (
                  <div key={insight.label} className="rounded-2xl border border-white/15 bg-black/30 p-4">
                    <p className="text-xs uppercase tracking-[0.3em] text-white/50">{insight.label}</p>
                    <p className="mt-2 text-3xl font-semibold text-white">{insight.value}</p>
                    <p>{insight.detail}</p>
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </PageSection>

      <DistributorCTA />
      
      {/* Temporary diagnostic panel */}
      <MapboxDiagnostic />
    </main>
  );
}

function FilterChip({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] transition",
        active
          ? "border-[var(--apsonic-green)] bg-[var(--apsonic-green)] text-black"
          : "border-white/20 text-white/70 hover:border-white/40 hover:text-white"
      )}
    >
      {label}
    </button>
  );
}