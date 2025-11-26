'use client';

import { useMemo, useState, useCallback } from "react";
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
import DealerDetailModal from "@/components/DealerDetailModal";
import FeaturedDealers from "@/components/FeaturedDealers";
import CoverageMap from "@/components/CoverageMap";

import {
  requestGeolocation,
  calculateDistance,
  sortByDistance,
  type Coordinates,
} from "@/lib/dealerUtils";

type FilterValue = DealerCategory | "all";
type SortOption = "default" | "distance" | "rating" | "name";

export default function DealersPage() {
  const [query, setQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<FilterValue>("all");
  const [selectedDealer, setSelectedDealer] = useState<DealerEntry | null>(null);
  const [detailModalDealer, setDetailModalDealer] = useState<DealerEntry | null>(null);
  const [userLocation, setUserLocation] = useState<Coordinates | null>(null);
  const [sortBy, setSortBy] = useState<SortOption>("default");
  const [loadingLocation, setLoadingLocation] = useState(false);
  const [locationError, setLocationError] = useState<string | null>(null);

  // Handle dealer selection from map (scroll to card)
  const handleDealerSelect = (dealer: DealerEntry) => {
    setSelectedDealer(dealer);
    const cardElement = document.getElementById(`dealer-${dealer.id}`);
    if (cardElement) {
      cardElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
      cardElement.classList.add('ring-2', 'ring-apsonic-green');
      setTimeout(() => {
        cardElement.classList.remove('ring-2', 'ring-apsonic-green');
      }, 2000);
    }
  };

  // Handle view details (open modal)
  const handleViewDetails = (dealer: DealerEntry) => {
    setDetailModalDealer(dealer);
  };

  // Request user geolocation
  const handleFindNearMe = useCallback(async () => {
    setLoadingLocation(true);
    setLocationError(null);

    try {
      const location = await requestGeolocation();
      setUserLocation(location);
      setSortBy("distance");
    } catch (error) {
      setLocationError(
        error instanceof Error
          ? error.message
          : "Unable to access your location. Please enable location services."
      );
    } finally {
      setLoadingLocation(false);
    }
  }, []);

  // Filter and sort dealers
  const filteredDealers = useMemo(() => {
    const normalized = query.trim().toLowerCase();

    // Filter by search query and category
    let dealers = dealerEntries.filter((dealer) => {
      const matchesQuery =
        !normalized ||
        dealer.name.toLowerCase().includes(normalized) ||
        dealer.city.toLowerCase().includes(normalized) ||
        dealer.country.toLowerCase().includes(normalized) ||
        dealer.address.toLowerCase().includes(normalized);

      const matchesFilter = activeFilter === "all" || dealer.categories.includes(activeFilter);
      return matchesQuery && matchesFilter;
    });

    // Sort dealers
    if (sortBy === "distance" && userLocation) {
      dealers = sortByDistance(dealers, userLocation);
    } else if (sortBy === "rating") {
      dealers = [...dealers].sort((a, b) => (b.rating || 0) - (a.rating || 0));
    } else if (sortBy === "name") {
      dealers = [...dealers].sort((a, b) => a.name.localeCompare(b.name));
    }

    return dealers;
  }, [query, activeFilter, sortBy, userLocation]);

  // Calculate distance for each dealer
  const dealersWithDistance = useMemo(() => {
    if (!userLocation) return filteredDealers.map(d => ({ dealer: d, distance: undefined }));

    return filteredDealers.map(dealer => ({
      dealer,
      distance: calculateDistance(
        userLocation.lat,
        userLocation.lng,
        dealer.coordinates.lat,
        dealer.coordinates.lng
      ),
    }));
  }, [filteredDealers, userLocation]);

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

      {/* Featured Dealers Section */}
      <FeaturedDealers dealers={dealerEntries} onDealerClick={handleViewDetails} />

      <PageSection id="network" className="bg-[var(--apsonic-surface-alt)]">
        <SectionHeader
          eyebrow="Dealer Network"
          title="Find Your Nearest APSONIC Partner"
          description="Connect with authorized dealers across Africa for sales, service, and support."
        />

        <div className="mt-10 space-y-6">
          {/* Search and Location */}
          <div className="flex flex-col gap-4 lg:flex-row">
            <input
              type="text"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search by city, country, or dealer name..."
              className="h-12 flex-1 rounded-full border border-white/15 bg-black/20 px-5 text-white placeholder:text-white/40 focus:border-[var(--apsonic-green)] focus:outline-none"
            />
            <Button
              onClick={handleFindNearMe}
              disabled={loadingLocation}
              className={cn(
                "rounded-full border px-6 transition-all",
                userLocation
                  ? "border-apsonic-green/40 bg-apsonic-green/20 text-apsonic-green hover:bg-apsonic-green hover:text-black"
                  : "border-white/20 bg-white/10 text-white hover:bg-white/20"
              )}
            >
              {loadingLocation ? (
                <>
                  <svg className="mr-2 h-4 w-4 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  Finding...
                </>
              ) : (
                <>
                  <svg className="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  {userLocation ? 'Location Enabled' : 'Find Near Me'}
                </>
              )}
            </Button>
          </div>

          {/* Location Error */}
          {locationError && (
            <div className="rounded-2xl border border-red-500/30 bg-red-500/10 p-4">
              <p className="text-sm text-red-300">⚠️ {locationError}</p>
            </div>
          )}

          {/* Filters and Sort */}
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
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

            {/* Sort Dropdown */}
            <div className="flex items-center gap-3">
              <span className="text-xs uppercase tracking-wider text-white/50">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                className="rounded-full border border-white/20 bg-black/20 px-4 py-2 text-sm text-white focus:border-apsonic-green focus:outline-none"
              >
                <option value="default">Default</option>
                <option value="distance" disabled={!userLocation}>Distance {!userLocation && '(Enable location)'}</option>
                <option value="rating">Highest Rated</option>
                <option value="name">Name (A-Z)</option>
              </select>
            </div>
          </div>

          {/* Results Count */}
          <div className="flex items-center gap-2 text-sm text-white/60">
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <span>
              {filteredDealers.length} dealer{filteredDealers.length !== 1 ? 's' : ''} found
              {userLocation && sortBy === "distance" && " • Sorted by distance"}
            </span>
          </div>
        </div>

        <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_1fr]">
          {/* Dealer Cards - Scrollable Container */}
          <div className="lg:order-2 lg:max-h-[800px] lg:overflow-y-auto lg:pr-2 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent hover:scrollbar-thumb-white/20">
            <div className="space-y-5">
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
                      setSortBy("default");
                    }}
                    variant="outline"
                    className="mt-4 rounded-full border-white/20 bg-white/5 text-white hover:bg-white/10"
                  >
                    Reset Filters
                  </Button>
                </div>
              ) : (
                dealersWithDistance.map(({ dealer, distance }) => (
                  <DealerCard
                    key={dealer.id}
                    dealer={dealer}
                    onViewDetails={handleViewDetails}
                    userLocation={userLocation || undefined}
                    distance={distance}
                  />
                ))
              )}
            </div>
          </div>

          {/* Interactive Map */}
          <aside className="space-y-5 lg:order-1 lg:sticky lg:top-24 lg:h-[800px]">
            <div className="rounded-[28px] border border-white/10 bg-black/25 p-6 h-full flex flex-col">
              <div className="text-center mb-4">
                <p className="text-xs uppercase tracking-[0.4em] text-white/50">Interactive Map</p>
                <p className="text-sm text-white/70 mt-1">Click markers to view dealer details</p>
              </div>

              <div className="flex-1 min-h-[400px] lg:min-h-0 relative">
                <DealerMap
                  dealers={filteredDealers}
                  activeFilter={activeFilter === 'all' ? 'all' : activeFilter}
                  onDealerSelect={handleDealerSelect}
                  className="w-full h-full"
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

      {/* Coverage Map */}
      <CoverageMap dealers={dealerEntries} />

      {/* Dealer Detail Modal */}
      {detailModalDealer && (
        <DealerDetailModal
          dealer={detailModalDealer}
          onClose={() => setDetailModalDealer(null)}
          distance={
            userLocation
              ? calculateDistance(
                userLocation.lat,
                userLocation.lng,
                detailModalDealer.coordinates.lat,
                detailModalDealer.coordinates.lng
              )
              : undefined
          }
        />
      )}
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