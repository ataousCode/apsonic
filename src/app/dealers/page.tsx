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
} from "@/data/dealers";
import { cn } from "@/lib/utils";
import DistributorCTA from "@/components/DistributorCTA";

type FilterValue = DealerCategory | "all";

export default function DealersPage() {
  const [query, setQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<FilterValue>("all");

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
              placeholder="Accra, Abidjan, Lagos, Niamey..."
              className="h-12 flex-1 rounded-full border border-white/15 bg-black/20 px-5 text-white placeholder:text-white/40 focus:border-[var(--apsonic-green)] focus:outline-none"
            />
            <Button
              asChild
              className="h-12 rounded-full border border-white/10 bg-[var(--apsonic-green)] px-6 text-black hover:bg-[var(--apsonic-green-dark)] hover:text-white"
            >
              <a href="/dealers/map">Open interactive map</a>
            </Button>
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

        <div className="mt-10 grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-5">
            {filteredDealers.length === 0 ? (
              <div className="rounded-3xl border border-white/10 bg-black/20 p-6 text-center text-white/70">
                No partner matches that search yet. Try another city, corridor, or filter.
              </div>
            ) : (
              filteredDealers.map((dealer) => (
                <article
                  key={dealer.id}
                  className="rounded-3xl border border-white/10 bg-black/20 p-6 text-sm text-white/80"
                >
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <p className="text-xs uppercase tracking-[0.4em] text-white/50">
                        {dealer.country} • {dealer.city}
                      </p>
                      <h3 className="text-2xl font-semibold text-white">{dealer.name}</h3>
                    </div>
                    {dealer.badge ? (
                      <span className="rounded-full border border-white/20 px-3 py-1 text-xs uppercase tracking-[0.3em] text-white/70">
                        {dealer.badge}
                      </span>
                    ) : null}
                  </div>
                  <p className="mt-2 text-white/65">{dealer.address}</p>
                  <div className="mt-3 flex flex-wrap gap-3 text-xs text-white/60">
                    {dealer.categories.map((category) => (
                      <span key={category} className="rounded-full border border-white/10 px-3 py-1 uppercase tracking-[0.2em]">
                        {category}
                      </span>
                    ))}
                    <span className="rounded-full border border-white/10 px-3 py-1 uppercase tracking-[0.2em]">
                      {dealer.languages.join(" / ")}
                    </span>
                  </div>
                  <div className="mt-4 grid gap-3 text-sm sm:grid-cols-3">
                    <div>
                      <p className="text-xs uppercase tracking-[0.3em] text-white/50">Phone</p>
                      <p>{dealer.contacts.phone}</p>
                    </div>
                    {dealer.contacts.whatsapp ? (
                      <div>
                        <p className="text-xs uppercase tracking-[0.3em] text-white/50">WhatsApp</p>
                        <p>{dealer.contacts.whatsapp}</p>
                      </div>
                    ) : null}
                    {dealer.contacts.email ? (
                      <div>
                        <p className="text-xs uppercase tracking-[0.3em] text-white/50">Email</p>
                        <p>{dealer.contacts.email}</p>
                      </div>
                    ) : null}
                  </div>
                </article>
              ))
            )}
          </div>
          <aside className="space-y-5 rounded-[28px] border border-white/10 bg-black/25 p-6">
            <div className="text-center">
              <p className="text-xs uppercase tracking-[0.4em] text-white/50">Coverage map</p>
              <p className="text-sm text-white/70">Overlay indicates active APSONIC markets.</p>
            </div>
            <div className="h-60 rounded-3xl border border-dashed border-white/10 bg-gradient-to-br from-black/40 to-black/10" />
            <div className="grid gap-4 text-sm text-white/70">
              {dealerInsights.map((insight) => (
                <div key={insight.label} className="rounded-2xl border border-white/15 bg-black/30 p-4">
                  <p className="text-xs uppercase tracking-[0.3em] text-white/50">{insight.label}</p>
                  <p className="mt-2 text-3xl font-semibold text-white">{insight.value}</p>
                  <p>{insight.detail}</p>
                </div>
              ))}
            </div>
          </aside>
        </div>
      </PageSection>

      <DistributorCTA />
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