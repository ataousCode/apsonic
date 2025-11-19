'use client';

import { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { type DealerEntry, type DealerCategory } from '@/data/dealers';
import { cn } from '@/lib/utils';

type DealerMapProps = {
  dealers: DealerEntry[];
  activeFilter?: DealerCategory | 'all';
  onDealerSelect?: (dealer: DealerEntry) => void;
  className?: string;
};

// Category color mapping
const CATEGORY_COLORS: Record<DealerCategory | 'all', string> = {
  all: '#1CA049',
  sales: '#1CA049',
  service: '#3B82F6',
  training: '#F59E0B',
  spares: '#8B5CF6',
};

export default function DealerMap({ 
  dealers, 
  activeFilter = 'all',
  onDealerSelect,
  className 
}: DealerMapProps) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const markers = useRef<mapboxgl.Marker[]>([]);
  const [mapLoaded, setMapLoaded] = useState(false);

  // Initialize map
  useEffect(() => {
    if (!mapContainer.current || map.current) return;

    // Set Mapbox token
    mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || '';

    // Create map
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/dark-v11',
      center: [0, 8], // Center on Africa
      zoom: 3,
      minZoom: 2,
      maxZoom: 18,
    });

    // Add navigation controls
    map.current.addControl(
      new mapboxgl.NavigationControl({
        showCompass: true,
        showZoom: true,
      }),
      'top-right'
    );

    // Add fullscreen control
    map.current.addControl(
      new mapboxgl.FullscreenControl(),
      'top-right'
    );

    map.current.on('load', () => {
      setMapLoaded(true);
    });

    return () => {
      markers.current.forEach(marker => marker.remove());
      map.current?.remove();
      map.current = null;
    };
  }, []);

  // Update markers when dealers or filter changes
  useEffect(() => {
    if (!map.current || !mapLoaded) return;

    // Remove existing markers
    markers.current.forEach(marker => marker.remove());
    markers.current = [];

    // Filter dealers
    const filteredDealers = activeFilter === 'all' 
      ? dealers 
      : dealers.filter(d => d.categories.includes(activeFilter));

    // Add markers for filtered dealers
    filteredDealers.forEach(dealer => {
      // Create custom marker element
      const el = document.createElement('div');
      el.className = 'dealer-map-marker';
      el.style.width = '32px';
      el.style.height = '32px';
      el.style.borderRadius = '50%';
      el.style.cursor = 'pointer';
      el.style.border = '3px solid white';
      el.style.boxShadow = '0 2px 8px rgba(0,0,0,0.3)';
      el.style.transition = 'all 0.2s ease';
      
      // Get color based on primary category
      const primaryCategory = dealer.categories[0];
      el.style.backgroundColor = CATEGORY_COLORS[primaryCategory] || CATEGORY_COLORS.all;

      // Hover effect
      el.addEventListener('mouseenter', () => {
        el.style.transform = 'scale(1.2)';
        el.style.zIndex = '1000';
      });
      
      el.addEventListener('mouseleave', () => {
        el.style.transform = 'scale(1)';
        el.style.zIndex = 'auto';
      });

      // Create popup
      const popup = new mapboxgl.Popup({
        offset: 25,
        closeButton: false,
        closeOnClick: false,
        className: 'dealer-map-popup',
      }).setHTML(`
        <div class="p-3 min-w-[200px]">
          <div class="flex items-start justify-between gap-2 mb-2">
            <h3 class="font-semibold text-white text-sm">${dealer.name}</h3>
            ${dealer.badge ? `<span class="text-[10px] px-2 py-0.5 rounded-full bg-apsonic-green text-black font-semibold uppercase tracking-wider">${dealer.badge}</span>` : ''}
          </div>
          <p class="text-xs text-white/70 mb-2">${dealer.city}, ${dealer.country}</p>
          ${dealer.rating ? `
            <div class="flex items-center gap-2 mb-2">
              <div class="flex items-center">
                ${generateStars(dealer.rating)}
              </div>
              <span class="text-xs text-white/60">${dealer.rating} (${dealer.reviewCount || 0})</span>
            </div>
          ` : ''}
          <div class="flex flex-wrap gap-1 mb-3">
            ${dealer.categories.map(cat => `
              <span class="text-[10px] px-2 py-0.5 rounded-full bg-white/10 text-white/70 uppercase tracking-wider">${cat}</span>
            `).join('')}
          </div>
          <button 
            class="w-full px-3 py-1.5 rounded-lg bg-apsonic-green text-black text-xs font-semibold hover:bg-apsonic-green-dark transition-colors"
            onclick="window.dealerMapSelectHandler && window.dealerMapSelectHandler('${dealer.id}')"
          >
            View Details
          </button>
        </div>
      `);

      // Create marker
      const marker = new mapboxgl.Marker(el)
        .setLngLat([dealer.coordinates.lng, dealer.coordinates.lat])
        .setPopup(popup)
        .addTo(map.current!);

      // Show popup on hover
      el.addEventListener('mouseenter', () => {
        popup.addTo(map.current!);
      });

      el.addEventListener('mouseleave', () => {
        popup.remove();
      });

      // Handle click
      el.addEventListener('click', () => {
        onDealerSelect?.(dealer);
      });

      markers.current.push(marker);
    });

    // Fit map to show all markers
    if (filteredDealers.length > 0) {
      const bounds = new mapboxgl.LngLatBounds();
      
      filteredDealers.forEach(dealer => {
        bounds.extend([dealer.coordinates.lng, dealer.coordinates.lat]);
      });

      map.current.fitBounds(bounds, {
        padding: { top: 50, bottom: 50, left: 50, right: 50 },
        maxZoom: 12,
        duration: 1000,
      });
    }
  }, [dealers, activeFilter, mapLoaded, onDealerSelect]);

  // Set up global handler for popup buttons
  useEffect(() => {
    (window as any).dealerMapSelectHandler = (dealerId: string) => {
      const dealer = dealers.find(d => d.id === dealerId);
      if (dealer) {
        onDealerSelect?.(dealer);
      }
    };

    return () => {
      delete (window as any).dealerMapSelectHandler;
    };
  }, [dealers, onDealerSelect]);

  return (
    <div className={cn('relative w-full h-full', className)}>
      <div ref={mapContainer} className="absolute inset-0 rounded-3xl overflow-hidden" />
      
      {!mapLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/20 backdrop-blur-sm rounded-3xl">
          <div className="text-center">
            <div className="h-12 w-12 mx-auto mb-4 rounded-full border-4 border-apsonic-green border-t-transparent animate-spin" />
            <p className="text-sm text-white/70">Loading map...</p>
          </div>
        </div>
      )}

      {/* Legend */}
      <div className="absolute bottom-4 left-4 glass-panel rounded-xl p-3 text-xs">
        <h4 className="font-semibold text-white mb-2">Dealer Types</h4>
        <div className="space-y-1.5">
          {Object.entries(CATEGORY_COLORS).filter(([key]) => key !== 'all').map(([category, color]) => (
            <div key={category} className="flex items-center gap-2">
              <div 
                className="w-3 h-3 rounded-full border-2 border-white"
                style={{ backgroundColor: color }}
              />
              <span className="text-white/70 capitalize">{category}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Helper function to generate star ratings HTML
function generateStars(rating: number): string {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  let stars = '';
  
  // Full stars
  for (let i = 0; i < fullStars; i++) {
    stars += '<span class="text-yellow-400">★</span>';
  }
  
  // Half star
  if (hasHalfStar) {
    stars += '<span class="text-yellow-400">⯪</span>';
  }
  
  // Empty stars
  for (let i = 0; i < emptyStars; i++) {
    stars += '<span class="text-white/20">★</span>';
  }
  
  return stars;
}

