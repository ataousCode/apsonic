'use client';

import React from 'react';
import { type DealerEntry, type AfricanRegion } from '@/data/dealers';
import { SectionHeader } from './ui/SectionHeader';
import { cn } from '@/lib/utils';

type CoverageMapProps = {
  dealers: DealerEntry[];
};

type CountryStats = {
  name: string;
  code: string;
  flag: string;
  dealerCount: number;
  categories: string[];
  region: AfricanRegion;
};

export default function CoverageMap({ dealers }: CoverageMapProps) {
  // Calculate statistics
  const stats = React.useMemo(() => {
    // Countries with dealers
    const countriesMap = new Map<string, CountryStats>();
    
    dealers.forEach((dealer) => {
      if (!countriesMap.has(dealer.country)) {
        countriesMap.set(dealer.country, {
          name: dealer.country,
          code: dealer.country.substring(0, 2).toUpperCase(),
          flag: getFlagEmoji(dealer.country),
          dealerCount: 0,
          categories: [],
          region: dealer.region,
        });
      }
      
      const country = countriesMap.get(dealer.country)!;
      country.dealerCount++;
      dealer.categories.forEach((cat) => {
        if (!country.categories.includes(cat)) {
          country.categories.push(cat);
        }
      });
    });

    const countries = Array.from(countriesMap.values()).sort(
      (a, b) => b.dealerCount - a.dealerCount
    );

    // Regional distribution
    const regions = new Map<AfricanRegion, number>();
    dealers.forEach((dealer) => {
      regions.set(dealer.region, (regions.get(dealer.region) || 0) + 1);
    });

    const regionalData = Array.from(regions.entries())
      .map(([region, count]) => ({
        region,
        count,
        percentage: (count / dealers.length) * 100,
      }))
      .sort((a, b) => b.count - a.count);

    return {
      totalCountries: countries.length,
      totalDealers: dealers.length,
      countries,
      regionalData,
    };
  }, [dealers]);

  return (
    <section className="bg-[var(--apsonic-ink)] py-20">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeader
          eyebrow="Network Coverage"
          title="APSONIC Across Africa"
          description={`Our expanding network of trusted dealers serving customers in ${stats.totalCountries} African countries`}
          align="center"
        />

        {/* Main Stats Grid */}
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-apsonic-green/20 to-black p-8">
            <div className="mb-2 flex items-center justify-between">
              <svg className="h-10 w-10 text-apsonic-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <p className="text-5xl font-bold text-white">{stats.totalCountries}</p>
            <p className="mt-2 text-sm uppercase tracking-wider text-white/60">Countries</p>
            <p className="mt-1 text-xs text-white/40">Active presence</p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-blue-500/20 to-black p-8">
            <div className="mb-2 flex items-center justify-between">
              <svg className="h-10 w-10 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            <p className="text-5xl font-bold text-white">{stats.totalDealers}</p>
            <p className="mt-2 text-sm uppercase tracking-wider text-white/60">Dealers</p>
            <p className="mt-1 text-xs text-white/40">And growing</p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-yellow-500/20 to-black p-8">
            <div className="mb-2 flex items-center justify-between">
              <svg className="h-10 w-10 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
              </svg>
            </div>
            <p className="text-5xl font-bold text-white">{stats.regionalData.length}</p>
            <p className="mt-2 text-sm uppercase tracking-wider text-white/60">Regions</p>
            <p className="mt-1 text-xs text-white/40">Continental coverage</p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-purple-500/20 to-black p-8">
            <div className="mb-2 flex items-center justify-between">
              <svg className="h-10 w-10 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <p className="text-5xl font-bold text-white">&lt;60km</p>
            <p className="mt-2 text-sm uppercase tracking-wider text-white/60">Avg Distance</p>
            <p className="mt-1 text-xs text-white/40">To nearest dealer</p>
          </div>
        </div>

        {/* Regional Distribution */}
        <div className="mt-12">
          <h3 className="mb-6 text-2xl font-bold text-white">Regional Distribution</h3>
          <div className="space-y-4">
            {stats.regionalData.map((data) => (
              <div key={data.region} className="rounded-2xl border border-white/10 bg-black/20 p-6">
                <div className="mb-3 flex items-center justify-between">
                  <h4 className="text-lg font-semibold text-white">{data.region}</h4>
                  <div className="flex items-center gap-3">
                    <span className="text-2xl font-bold text-apsonic-green">{data.count}</span>
                    <span className="text-sm text-white/60">dealers</span>
                  </div>
                </div>
                <div className="relative h-3 overflow-hidden rounded-full bg-white/10">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-apsonic-green to-apsonic-green-dark transition-all duration-500"
                    style={{ width: `${data.percentage}%` }}
                  />
                </div>
                <p className="mt-2 text-right text-xs text-white/50">{data.percentage.toFixed(1)}% of network</p>
              </div>
            ))}
          </div>
        </div>

        {/* Country Grid */}
        <div className="mt-12">
          <h3 className="mb-6 text-2xl font-bold text-white">Country Coverage</h3>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {stats.countries.map((country) => (
              <div
                key={country.name}
                className="group rounded-2xl border border-white/10 bg-black/20 p-5 transition-all hover:border-apsonic-green/30 hover:bg-black/30"
              >
                <div className="mb-3 flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-3xl">{country.flag}</span>
                      <div>
                        <h4 className="font-semibold text-white">{country.name}</h4>
                        <p className="text-xs text-white/50">{country.region}</p>
                      </div>
                    </div>
                  </div>
                  <div className="rounded-full bg-apsonic-green/20 px-3 py-1">
                    <span className="text-sm font-bold text-apsonic-green">{country.dealerCount}</span>
                  </div>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {country.categories.map((category) => (
                    <span
                      key={category}
                      className="rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-xs uppercase tracking-wider text-white/60"
                    >
                      {category}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Growth Indicator */}
        <div className="mt-12 rounded-3xl border border-apsonic-green/20 bg-gradient-to-r from-apsonic-green/10 via-black to-apsonic-green/5 p-8 text-center">
          <p className="text-sm uppercase tracking-[0.3em] text-apsonic-green">Expanding Network</p>
          <h3 className="mt-2 text-3xl font-bold text-white">
            Growing Across Africa
          </h3>
          <p className="mt-3 text-white/70">
            New dealer partnerships being established across Central, Southern, and North Africa
          </p>
          <div className="mt-6 flex items-center justify-center gap-2">
            <div className="flex -space-x-2">
              {['🇰🇪', '🇬🇭', '🇳🇬', '🇿🇦', '🇨🇲'].map((flag, idx) => (
                <div
                  key={idx}
                  className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-[var(--apsonic-ink)] bg-black text-xl"
                >
                  {flag}
                </div>
              ))}
            </div>
            <span className="text-sm text-white/60">+ {stats.totalCountries - 5} more countries</span>
          </div>
        </div>
      </div>
    </section>
  );
}

// Helper function to get flag emoji (simplified)
function getFlagEmoji(country: string): string {
  const flagMap: Record<string, string> = {
    Ghana: '🇬🇭',
    'Burkina Faso': '🇧🇫',
    Togo: '🇹🇬',
    "Côte d'Ivoire": '🇨🇮',
    Nigeria: '🇳🇬',
    Mali: '🇲🇱',
    Niger: '🇳🇪',
    Benin: '🇧🇯',
    'Sierra Leone': '🇸🇱',
    Liberia: '🇱🇷',
    Kenya: '🇰🇪',
    Tanzania: '🇹🇿',
    Uganda: '🇺🇬',
    Rwanda: '🇷🇼',
    'South Africa': '🇿🇦',
    Zambia: '🇿🇲',
    Cameroon: '🇨🇲',
  };
  
  return flagMap[country] || '🌍';
}

