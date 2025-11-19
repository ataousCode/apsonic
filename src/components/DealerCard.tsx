'use client';

import { type DealerEntry } from '@/data/dealers';
import CloudImage from './CloudImage';
import { Button } from './ui/Button';
import { cn } from '@/lib/utils';

type DealerCardProps = {
  dealer: DealerEntry;
  onViewDetails?: (dealer: DealerEntry) => void;
  className?: string;
};

export default function DealerCard({ dealer, onViewDetails, className }: DealerCardProps) {
  const handleCall = () => {
    window.open(`tel:${dealer.contacts.phone}`, '_self');
  };

  const handleWhatsApp = () => {
    if (!dealer.contacts.whatsapp) return;
    const phone = dealer.contacts.whatsapp.replace(/\D/g, '');
    const message = encodeURIComponent(
      `Hi ${dealer.name}, I found you on the APSONIC website. I'm interested in learning more about your services.`
    );
    window.open(`https://wa.me/${phone}?text=${message}`, '_blank');
  };

  const handleEmail = () => {
    if (!dealer.contacts.email) return;
    window.open(`mailto:${dealer.contacts.email}`, '_self');
  };

  return (
    <article
      className={cn(
        'group relative overflow-hidden rounded-3xl border border-white/10 bg-black/20 transition-all duration-300 hover:border-apsonic-green/50 hover:shadow-lg hover:shadow-apsonic-green/10',
        className
      )}
    >
      {/* Dealer Photo Header */}
      {dealer.photos?.storefront && (
        <div className="relative aspect-video overflow-hidden">
          <CloudImage
            src={dealer.photos.storefront}
            alt={`${dealer.name} storefront`}
            width={600}
            height={337}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          
          {/* Badge on photo */}
          {dealer.badge && (
            <div className="absolute top-4 left-4">
              <span className="rounded-full border border-white/20 bg-black/40 backdrop-blur-sm px-3 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-white">
                {dealer.badge}
              </span>
            </div>
          )}

          {/* Rating on photo */}
          {dealer.rating && (
            <div className="absolute top-4 right-4 flex items-center gap-2 rounded-full border border-white/20 bg-black/40 backdrop-blur-sm px-3 py-1">
              <span className="text-yellow-400 text-sm">★</span>
              <span className="text-sm font-semibold text-white">{dealer.rating.toFixed(1)}</span>
              <span className="text-xs text-white/60">({dealer.reviewCount})</span>
            </div>
          )}
        </div>
      )}

      {/* Content */}
      <div className="p-6 text-sm text-white/80">
        {/* Header */}
        <div className="mb-4">
          <p className="text-xs uppercase tracking-[0.4em] text-white/50">
            {dealer.country} • {dealer.city}
          </p>
          <h3 className="mt-1 text-2xl font-semibold text-white transition-colors group-hover:text-apsonic-green">
            {dealer.name}
          </h3>
          {!dealer.photos?.storefront && dealer.badge && (
            <span className="mt-2 inline-block rounded-full border border-white/20 px-3 py-1 text-xs uppercase tracking-[0.3em] text-white/70">
              {dealer.badge}
            </span>
          )}
        </div>

        {/* Address */}
        <p className="mb-4 text-white/65">{dealer.address}</p>

        {/* Categories & Languages */}
        <div className="mb-4 flex flex-wrap gap-2 text-xs text-white/60">
          {dealer.categories.map((category) => (
            <span
              key={category}
              className="rounded-full border border-white/10 px-3 py-1 uppercase tracking-[0.2em] transition-colors hover:border-apsonic-green/50 hover:text-apsonic-green"
            >
              {category}
            </span>
          ))}
          <span className="rounded-full border border-white/10 px-3 py-1 uppercase tracking-[0.2em]">
            {dealer.languages.join(' / ')}
          </span>
        </div>

        {/* Contact Information */}
        <div className="mb-4 grid gap-3 text-sm sm:grid-cols-3">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-white/50">Phone</p>
            <p className="mt-1 text-white">{dealer.contacts.phone}</p>
          </div>
          {dealer.contacts.whatsapp && (
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-white/50">WhatsApp</p>
              <p className="mt-1 text-white">{dealer.contacts.whatsapp}</p>
            </div>
          )}
          {dealer.contacts.email && (
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-white/50">Email</p>
              <p className="mt-1 text-white truncate">{dealer.contacts.email}</p>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
          <Button
            onClick={handleCall}
            size="sm"
            className="rounded-full bg-apsonic-green px-4 text-black hover:bg-apsonic-green-dark transition-all"
          >
            <svg className="mr-1.5 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            Call
          </Button>

          {dealer.contacts.whatsapp && (
            <Button
              onClick={handleWhatsApp}
              size="sm"
              variant="outline"
              className="rounded-full border-white/20 bg-white/5 text-white hover:bg-white/10"
            >
              <svg className="mr-1.5 h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              Chat
            </Button>
          )}

          {dealer.contacts.email && (
            <Button
              onClick={handleEmail}
              size="sm"
              variant="outline"
              className="rounded-full border-white/20 bg-white/5 text-white hover:bg-white/10"
            >
              <svg className="mr-1.5 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Email
            </Button>
          )}
        </div>

        {/* View Details Button (Optional) */}
        {onViewDetails && (
          <Button
            onClick={() => onViewDetails(dealer)}
            variant="outline"
            size="sm"
            className="mt-3 w-full rounded-full border-apsonic-green/30 bg-apsonic-green/5 text-apsonic-green hover:bg-apsonic-green hover:text-black transition-all"
          >
            View Full Details →
          </Button>
        )}
      </div>
    </article>
  );
}

