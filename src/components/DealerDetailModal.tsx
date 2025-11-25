'use client';

import React from 'react';
import { type DealerEntry } from '@/data/dealers';
import CloudImage from './CloudImage';
import { Button } from './ui/Button';
import { cn } from '@/lib/utils';
import {
  openDirections,
  isOpenNow,
  formatHoursRange,
  getCurrentDay,
  getWhatsAppNumber,
  getWhatsAppMessage,
  formatDistance,
} from '@/lib/dealerUtils';

type DealerDetailModalProps = {
  dealer: DealerEntry | null;
  onClose: () => void;
  distance?: number;
};

export default function DealerDetailModal({ dealer, onClose, distance }: DealerDetailModalProps) {
  const [activeTab, setActiveTab] = React.useState<'info' | 'hours' | 'services' | 'photos'>('info');

  if (!dealer) return null;

  const isOpen = dealer.hours ? isOpenNow(dealer.hours, dealer.timezone) : undefined;

  const handleCall = () => window.open(`tel:${dealer.contacts.phone}`, '_self');

  const handleWhatsApp = () => {
    if (!dealer.contacts.whatsapp) return;
    const phone = getWhatsAppNumber(dealer.contacts.whatsapp);
    const message = getWhatsAppMessage(dealer.name);
    window.open(`https://wa.me/${phone}?text=${message}`, '_blank');
  };

  const handleEmail = () => {
    if (!dealer.contacts.email) return;
    window.open(`mailto:${dealer.contacts.email}`, '_self');
  };

  const handleDirections = () => openDirections(dealer);

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/60 backdrop-blur-sm sm:items-center"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-3xl rounded-t-3xl bg-[var(--apsonic-ink)] sm:rounded-3xl max-h-[90vh] overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header with Image */}
        <div className="relative">
          {dealer.photos?.featured || dealer.photos?.storefront ? (
            <div className="relative aspect-video w-full overflow-hidden">
              <CloudImage
                src={dealer.photos.featured || dealer.photos.storefront}
                alt={dealer.name}
                width={800}
                height={450}
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--apsonic-ink)] via-black/40 to-transparent" />

              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute right-4 top-4 rounded-full border border-white/20 bg-black/40 p-2 backdrop-blur-sm transition-colors hover:bg-black/60"
              >
                <svg className="h-5 w-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {/* Badges on Image */}
              <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
                <div className="flex flex-col gap-2">
                  {dealer.badge && (
                    <span className="inline-flex rounded-full border border-white/20 bg-black/40 backdrop-blur-sm px-3 py-1 text-xs font-semibold uppercase tracking-wider text-white">
                      {dealer.badge}
                    </span>
                  )}
                  {dealer.verifiedDealer && (
                    <span className="inline-flex rounded-full border border-green-500/30 bg-green-500/20 backdrop-blur-sm px-3 py-1 text-xs font-semibold uppercase tracking-wider text-green-300">
                      ✓ Verified Dealer
                    </span>
                  )}
                </div>
                {distance !== undefined && (
                  <div className="flex items-center gap-1.5 rounded-full border border-apsonic-green/30 bg-apsonic-green/20 backdrop-blur-sm px-3 py-1.5">
                    <svg className="h-4 w-4 text-apsonic-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    </svg>
                    <span className="text-sm font-semibold text-apsonic-green">
                      {formatDistance(distance)}
                    </span>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="relative border-b border-white/10 px-6 py-4">
              <button
                onClick={onClose}
                className="absolute right-4 top-4 rounded-full border border-white/20 bg-black/40 p-2 backdrop-blur-sm transition-colors hover:bg-black/60"
              >
                <svg className="h-5 w-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-6">
            {/* Title and Info */}
            <div className="mb-4">
              <p className="text-xs uppercase tracking-[0.3em] text-white/50">{dealer.region}</p>
              <h2 className="mt-1 text-3xl font-bold text-white">{dealer.name}</h2>
              <p className="mt-1 text-sm text-white/70">
                {dealer.city}, {dealer.country}
              </p>
            </div>

            {/* Rating and Awards */}
            {(dealer.rating || dealer.awards) && (
              <div className="mb-6 flex flex-wrap items-center gap-3">
                {dealer.rating && (
                  <div className="flex items-center gap-2 rounded-full border border-yellow-500/30 bg-yellow-500/10 px-3 py-1.5">
                    <span className="text-yellow-400">★</span>
                    <span className="text-sm font-semibold text-white">{dealer.rating.toFixed(1)}</span>
                    <span className="text-xs text-white/60">({dealer.reviewCount} reviews)</span>
                  </div>
                )}
                {dealer.awards?.map((award) => (
                  <span
                    key={award}
                    className="rounded-full border border-apsonic-green/30 bg-apsonic-green/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-apsonic-green"
                  >
                    🏆 {award}
                  </span>
                ))}
              </div>
            )}

            {/* Tabs */}
            <div className="mb-6 flex gap-2 border-b border-white/10">
              {['info', 'hours', 'services', 'photos'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab as typeof activeTab)}
                  className={cn(
                    "px-4 py-2 text-sm font-semibold uppercase tracking-wider transition-colors",
                    activeTab === tab
                      ? "border-b-2 border-apsonic-green text-apsonic-green"
                      : "text-white/50 hover:text-white/70"
                  )}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <div className="mb-6">
              {activeTab === 'info' && (
                <div className="space-y-4">
                  <div>
                    <h3 className="mb-2 text-xs font-semibold uppercase tracking-wider text-white/50">Address</h3>
                    <p className="text-white">{dealer.address}</p>
                    <p className="mt-1 text-sm text-white/70">{dealer.city}, {dealer.country}</p>
                  </div>

                  <div>
                    <h3 className="mb-2 text-xs font-semibold uppercase tracking-wider text-white/50">Contact Information</h3>
                    <div className="space-y-2">
                      <p className="flex items-center gap-2 text-white">
                        <svg className="h-4 w-4 text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                        {dealer.contacts.phone}
                      </p>
                      {dealer.contacts.whatsapp && (
                        <p className="flex items-center gap-2 text-white">
                          <svg className="h-4 w-4 text-white/50" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                          </svg>
                          {dealer.contacts.whatsapp}
                        </p>
                      )}
                      {dealer.contacts.email && (
                        <p className="flex items-center gap-2 text-white">
                          <svg className="h-4 w-4 text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                          </svg>
                          {dealer.contacts.email}
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <h3 className="mb-2 text-xs font-semibold uppercase tracking-wider text-white/50">Categories</h3>
                    <div className="flex flex-wrap gap-2">
                      {dealer.categories.map((category) => (
                        <span
                          key={category}
                          className="rounded-full border border-white/20 bg-white/5 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-white/80"
                        >
                          {category}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="mb-2 text-xs font-semibold uppercase tracking-wider text-white/50">Languages</h3>
                    <p className="text-white">{dealer.languages.join(', ')}</p>
                  </div>

                  {dealer.responseTime && (
                    <div>
                      <h3 className="mb-2 text-xs font-semibold uppercase tracking-wider text-white/50">Response Time</h3>
                      <p className="flex items-center gap-2 text-white">
                        <svg className="h-4 w-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                        {dealer.responseTime}
                      </p>
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'hours' && (
                <div className="space-y-4">
                  {dealer.hours ? (
                    <>
                      {isOpen !== undefined && (
                        <div className={cn(
                          "rounded-2xl border p-4 text-center",
                          isOpen
                            ? "border-green-500/30 bg-green-500/10"
                            : "border-white/10 bg-white/5"
                        )}>
                          <p className="text-lg font-semibold text-white">
                            {isOpen ? "🟢 Currently Open" : "⚫ Currently Closed"}
                          </p>
                        </div>
                      )}
                      <div className="space-y-2">
                        {(Object.keys(dealer.hours) as Array<keyof typeof dealer.hours>).map((day) => {
                          const dayHours = dealer.hours![day];
                          const isToday = day === getCurrentDay();
                          return (
                            <div
                              key={day}
                              className={cn(
                                "flex justify-between rounded-xl border p-3",
                                isToday
                                  ? "border-apsonic-green/30 bg-apsonic-green/10 font-semibold text-white"
                                  : "border-white/10 bg-white/5 text-white/70"
                              )}
                            >
                              <span className="capitalize">{day}</span>
                              <span>{formatHoursRange(dayHours)}</span>
                            </div>
                          );
                        })}
                      </div>
                    </>
                  ) : (
                    <p className="text-center text-white/50">Operating hours not available</p>
                  )}
                </div>
              )}

              {activeTab === 'services' && (
                <div className="space-y-4">
                  {dealer.servicesOffered && (
                    <div>
                      <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-white/50">Services Offered</h3>
                      <div className="grid gap-2">
                        {dealer.servicesOffered.map((service) => (
                          <div
                            key={service}
                            className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 p-3"
                          >
                            <svg className="h-4 w-4 text-apsonic-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            <span className="text-white">{service}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {dealer.paymentMethods && (
                    <div>
                      <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-white/50">Payment Methods</h3>
                      <div className="flex flex-wrap gap-2">
                        {dealer.paymentMethods.map((method) => (
                          <span
                            key={method}
                            className="rounded-full border border-white/20 bg-white/5 px-3 py-1.5 text-xs text-white"
                          >
                            {method}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {dealer.certifications && (
                    <div>
                      <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-white/50">Certifications</h3>
                      <div className="grid gap-2">
                        {dealer.certifications.map((cert) => (
                          <div
                            key={cert}
                            className="flex items-center gap-2 rounded-xl border border-apsonic-green/20 bg-apsonic-green/5 p-3"
                          >
                            <svg className="h-4 w-4 text-apsonic-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                            </svg>
                            <span className="text-white">{cert}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'photos' && (
                <div className="space-y-4">
                  {dealer.photos ? (
                    <div className="grid grid-cols-2 gap-3">
                      {dealer.photos.storefront && (
                        <div className="relative aspect-video overflow-hidden rounded-2xl">
                          <CloudImage
                            src={dealer.photos.storefront}
                            alt="Storefront"
                            width={400}
                            height={225}
                            className="h-full w-full object-cover"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                          <p className="absolute bottom-2 left-2 text-xs font-semibold text-white">Storefront</p>
                        </div>
                      )}
                      {dealer.photos.interior?.map((photo, idx) => (
                        <div key={idx} className="relative aspect-video overflow-hidden rounded-2xl">
                          <CloudImage
                            src={photo}
                            alt={`Interior ${idx + 1}`}
                            width={400}
                            height={225}
                            className="h-full w-full object-cover"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                          <p className="absolute bottom-2 left-2 text-xs font-semibold text-white">Interior</p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-center text-white/50">No photos available</p>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Sticky Footer with Actions */}
        <div className="border-t border-white/10 bg-[var(--apsonic-surface-alt)] p-4">
          <div className="grid grid-cols-2 gap-2">
            <Button
              onClick={handleCall}
              className="rounded-full bg-white px-6 py-3 font-semibold text-black hover:bg-white/90"
            >
              <svg className="mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              Call
            </Button>
            <Button
              onClick={handleDirections}
              variant="outline"
              className="rounded-full border-apsonic-green/40 bg-apsonic-green/10 px-6 py-3 font-semibold text-apsonic-green hover:bg-apsonic-green hover:text-black"
            >
              <svg className="mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
              </svg>
              Directions
            </Button>
            {dealer.contacts.whatsapp && (
              <Button
                onClick={handleWhatsApp}
                variant="outline"
                className="rounded-full border-white/20 bg-white/5 text-white hover:bg-white/10"
              >
                <svg className="mr-2 h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                WhatsApp
              </Button>
            )}
            {dealer.contacts.email && (
              <Button
                onClick={handleEmail}
                variant="outline"
                className="rounded-full border-white/20 bg-white/5 text-white hover:bg-white/10"
              >
                <svg className="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Email
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

