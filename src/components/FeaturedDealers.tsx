'use client';

import React from 'react';
import { type DealerEntry } from '@/data/dealers';
import { getTopDealers, openDirections } from '@/lib/dealerUtils';
import CloudImage from './CloudImage';
import { Button } from './ui/Button';
import { SectionHeader } from './ui/SectionHeader';
import { cn } from '@/lib/utils';

type FeaturedDealersProps = {
  dealers: DealerEntry[];
  onDealerClick?: (dealer: DealerEntry) => void;
};

export default function FeaturedDealers({ dealers, onDealerClick }: FeaturedDealersProps) {
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const featuredDealers = React.useMemo(() => getTopDealers(dealers, 5), [dealers]);

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? featuredDealers.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === featuredDealers.length - 1 ? 0 : prev + 1));
  };

  if (featuredDealers.length === 0) return null;

  const currentDealer = featuredDealers[currentIndex];

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[var(--apsonic-surface)] via-[var(--apsonic-ink)] to-[var(--apsonic-surface)] py-20">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="h-full w-full bg-[radial-gradient(circle_at_50%_50%,rgba(92,225,161,.3),transparent_70%)]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <SectionHeader
          eyebrow="Excellence Network"
          title="Featured APSONIC Partners"
          description="Our top-rated dealers committed to exceptional service across Africa"
          align="center"
        />

        <div className="mt-12 relative">
          {/* Main Featured Card */}
          <div className="overflow-hidden rounded-3xl border border-white/10 bg-[var(--apsonic-surface-alt)] shadow-2xl">
            <div className="grid gap-6 lg:grid-cols-[1.5fr_1fr]">
              {/* Image Section */}
              <div className="relative aspect-[16/9] lg:aspect-auto lg:min-h-[500px] overflow-hidden">
                {currentDealer.photos?.featured || currentDealer.photos?.storefront ? (
                  <CloudImage
                    src={currentDealer.photos.featured || currentDealer.photos.storefront}
                    alt={currentDealer.name}
                    width={800}
                    height={600}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="h-full w-full bg-gradient-to-br from-apsonic-green/20 to-black" />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent lg:bg-gradient-to-r" />

                {/* Badges on Image */}
                <div className="absolute top-6 left-6 flex flex-col gap-2">
                  <span className="inline-flex items-center gap-2 rounded-full border border-yellow-500/30 bg-yellow-500/20 backdrop-blur-sm px-4 py-2 text-sm font-bold uppercase tracking-wider text-yellow-300">
                    ⭐ Featured Partner
                  </span>
                  {currentDealer.verifiedDealer && (
                    <span className="inline-flex items-center gap-2 rounded-full border border-green-500/30 bg-green-500/20 backdrop-blur-sm px-4 py-2 text-sm font-semibold uppercase tracking-wider text-green-300">
                      ✓ Verified
                    </span>
                  )}
                </div>

                {/* Navigation Dots */}
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
                  {featuredDealers.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentIndex(idx)}
                      className={cn(
                        "h-2 rounded-full transition-all",
                        idx === currentIndex
                          ? "w-8 bg-apsonic-green"
                          : "w-2 bg-white/30 hover:bg-white/50"
                      )}
                      aria-label={`Go to slide ${idx + 1}`}
                    />
                  ))}
                </div>
              </div>

              {/* Content Section */}
              <div className="flex flex-col justify-between p-8 lg:p-10">
                {/* Header */}
                <div>
                  <p className="text-xs uppercase tracking-[0.3em] text-white/50">
                    {currentDealer.region}
                  </p>
                  <h3 className="mt-2 text-4xl font-bold text-white">
                    {currentDealer.name}
                  </h3>
                  <p className="mt-2 text-lg text-white/70">
                    {currentDealer.city}, {currentDealer.country}
                  </p>

                  {/* Rating */}
                  {currentDealer.rating && (
                    <div className="mt-4 flex items-center gap-3">
                      <div className="flex items-center gap-2 rounded-full border border-yellow-500/30 bg-yellow-500/10 px-4 py-2">
                        <span className="text-2xl text-yellow-400">★</span>
                        <span className="text-2xl font-bold text-white">
                          {currentDealer.rating.toFixed(1)}
                        </span>
                      </div>
                      <span className="text-sm text-white/60">
                        {currentDealer.reviewCount} reviews
                      </span>
                    </div>
                  )}

                  {/* Awards */}
                  {currentDealer.awards && currentDealer.awards.length > 0 && (
                    <div className="mt-6 flex flex-wrap gap-2">
                      {currentDealer.awards.map((award) => (
                        <span
                          key={award}
                          className="inline-flex items-center gap-2 rounded-full border border-apsonic-green/30 bg-apsonic-green/10 px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-apsonic-green"
                        >
                          🏆 {award}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Stats */}
                  <div className="mt-8 grid grid-cols-2 gap-4">
                    {currentDealer.responseTime && (
                      <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
                        <p className="text-xs uppercase tracking-wider text-white/50">
                          Response Time
                        </p>
                        <p className="mt-1 flex items-center gap-2 text-xl font-bold text-apsonic-green">
                          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                          </svg>
                          {currentDealer.responseTime}
                        </p>
                      </div>
                    )}
                    {currentDealer.certifications && currentDealer.certifications.length > 0 && (
                      <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
                        <p className="text-xs uppercase tracking-wider text-white/50">
                          Certifications
                        </p>
                        <p className="mt-1 flex items-center gap-2 text-xl font-bold text-white">
                          <svg className="h-5 w-5 text-apsonic-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                          </svg>
                          {currentDealer.certifications.length}
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Actions */}
                <div className="mt-8 grid grid-cols-2 gap-3">
                  <Button
                    onClick={() => onDealerClick?.(currentDealer)}
                    className="rounded-full bg-white px-6 py-3 font-semibold text-black hover:bg-white/90"
                  >
                    View Details
                  </Button>
                  <Button
                    onClick={() => openDirections(currentDealer)}
                    variant="outline"
                    className="rounded-full border-white/20 bg-white/5 text-white hover:bg-white/10"
                  >
                    <svg className="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                    </svg>
                    Directions
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={handlePrevious}
            className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full border border-white/20 bg-black/40 p-3 backdrop-blur-sm transition-all hover:bg-black/60 focus:outline-none focus:ring-2 focus:ring-apsonic-green lg:-left-6"
            aria-label="Previous dealer"
          >
            <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={handleNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full border border-white/20 bg-black/40 p-3 backdrop-blur-sm transition-all hover:bg-black/60 focus:outline-none focus:ring-2 focus:ring-apsonic-green lg:-right-6"
            aria-label="Next dealer"
          >
            <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Thumbnail Grid (Desktop) */}
        <div className="mt-8 hidden gap-4 lg:grid lg:grid-cols-5">
          {featuredDealers.map((dealer, idx) => (
            <button
              key={dealer.id}
              onClick={() => setCurrentIndex(idx)}
              className={cn(
                "group relative aspect-square overflow-hidden rounded-2xl border-2 transition-all",
                idx === currentIndex
                  ? "border-apsonic-green ring-2 ring-apsonic-green/50"
                  : "border-white/10 hover:border-white/30"
              )}
            >
              {dealer.photos?.storefront ? (
                <CloudImage
                  src={dealer.photos.storefront}
                  alt={dealer.name}
                  width={200}
                  height={200}
                  className="h-full w-full object-cover transition-transform group-hover:scale-110"
                />
              ) : (
                <div className="h-full w-full bg-gradient-to-br from-apsonic-green/20 to-black" />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-2 left-2 right-2">
                <p className="text-xs font-semibold text-white line-clamp-1">
                  {dealer.name}
                </p>
                <p className="text-xs text-white/60 line-clamp-1">
                  {dealer.city}
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

