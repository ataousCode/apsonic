'use client';

import { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { type DealerEntry, type DealerCategory, type AfricanRegion } from '@/data/dealers';
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
  const [mapError, setMapError] = useState<string | null>(null);

  // Initialize map
  useEffect(() => {
    console.log('🗺️ DealerMap useEffect triggered');
    console.log('  mapContainer.current:', !!mapContainer.current);
    console.log('  map.current:', !!map.current);
    
    if (!mapContainer.current) {
      console.error('❌ Map container ref is null!');
      return;
    }
    
    if (map.current) {
      console.log('⚠️ Map already initialized, skipping');
      return;
    }

    // Set Mapbox token
    const token = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || '';
    console.log('🔑 Token check:', token ? `${token.substring(0, 20)}...` : 'NOT SET');
    
    // Check if token exists
    if (!token || token === 'pk.eyJ1IjoiYXBzb25pYyIsImEiOiJjbHh4eHh4eHh4In0.xxxxxxxxxxxxxxxxxxxxxx') {
      setMapError('Mapbox token not configured. Please add NEXT_PUBLIC_MAPBOX_TOKEN to .env.local');
      console.error('❌ Mapbox token missing! Please add it to .env.local');
      return;
    }

    console.log('✅ Token valid, setting mapboxgl.accessToken...');
    mapboxgl.accessToken = token;

    try {
      console.log('🏗️ Creating map instance...');
      // Create map
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/dark-v11',
        center: [0, 8], // Center on Africa
        zoom: 3,
        minZoom: 2,
        maxZoom: 18,
      });
      console.log('✅ Map instance created successfully');
    } catch (error) {
      console.error('❌ Error creating map:', error);
      setMapError(`Failed to initialize map: ${error instanceof Error ? error.message : 'Unknown error'}`);
      return;
    }

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
      console.log('✅ Map loaded successfully!');
      console.log('  Map center:', map.current?.getCenter());
      console.log('  Map zoom:', map.current?.getZoom());
      console.log('  Map style:', map.current?.getStyle()?.name);
      setMapLoaded(true);
    });

    map.current.on('error', (e) => {
      console.error('❌ Map error:', e.error);
      setMapError(`Map error: ${e.error?.message || 'Unknown error'}`);
    });

    map.current.on('styledata', () => {
      console.log('🎨 Map style loaded');
    });

    map.current.on('sourcedata', (e) => {
      if (e.isSourceLoaded) {
        console.log('📦 Map source loaded:', e.sourceId);
      }
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

    console.log(`📍 Adding ${dealers.length} dealers to map (filter: ${activeFilter})`);

    // Remove existing markers
    markers.current.forEach(marker => marker.remove());
    markers.current = [];

    // Filter dealers
    const filteredDealers = activeFilter === 'all' 
      ? dealers 
      : dealers.filter(d => d.categories.includes(activeFilter));

    console.log(`✅ Filtered to ${filteredDealers.length} dealers`);

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
      }      ).setHTML(`
        <div class="p-3 min-w-[220px]">
          <div class="flex items-start justify-between gap-2 mb-2">
            <div>
              <h3 class="font-semibold text-white text-sm">${dealer.name}</h3>
              <p class="text-[10px] text-white/50 uppercase tracking-wider mt-1">${dealer.region}</p>
            </div>
            ${dealer.badge ? `<span class="text-[10px] px-2 py-0.5 rounded-full bg-apsonic-green text-black font-semibold uppercase tracking-wider whitespace-nowrap">${dealer.badge}</span>` : ''}
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
    <div className={cn('relative w-full h-full min-h-[400px]', className)}>
      <div ref={mapContainer} className="absolute inset-0 rounded-3xl overflow-hidden bg-black" style={{ minHeight: '400px' }} />
      
      {/* Error State */}
      {mapError && (
        <div className="absolute inset-0 flex items-center justify-center bg-red-900/20 backdrop-blur-sm rounded-3xl border-2 border-red-500/30">
          <div className="text-center max-w-md p-6">
            <svg className="h-16 w-16 mx-auto mb-4 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <p className="text-sm font-semibold text-red-200 mb-2">Map Error</p>
            <p className="text-xs text-red-300/80 mb-4">{mapError}</p>
            <div className="glass-panel rounded-xl p-4 text-left text-xs text-white/70 space-y-2">
              <p className="font-semibold text-white">Quick Fix:</p>
              <ol className="list-decimal list-inside space-y-1">
                <li>Get token from: <a href="https://account.mapbox.com/access-tokens/" target="_blank" className="text-apsonic-green hover:underline">Mapbox</a></li>
                <li>Add to <code className="bg-black/30 px-1 rounded">.env.local</code></li>
                <li>Restart dev server</li>
              </ol>
            </div>
          </div>
        </div>
      )}
      
      {/* Loading State */}
      {!mapLoaded && !mapError && (
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

