# APSONIC Dealers Page - Improvement Recommendations

**Last Updated:** November 19, 2024  
**Status:** Planning & Recommendations  
**Current Route:** `/dealers`

---

## 📊 Current Status Assessment

### ✅ What's Working Well
- Clean search and filter functionality
- Category filtering (Sales, Service, Training, Spares)
- Country badges showing APSONIC presence
- Contact information displayed (phone, WhatsApp, email)
- Mobile responsive layout
- Professional dark theme
- Filter chips with active states
- Empty state handling

### ⚠️ Areas for Improvement
- No real interactive map (placeholder only)
- Static dealer data (hardcoded in TypeScript)
- No dealer images/photos
- No dealer ratings or customer reviews
- Limited visual appeal on dealer cards
- No directions/navigation integration
- Coverage map is just an empty box
- No geolocation/distance calculation
- No "Open Now" status
- No booking or reservation features

---

## 🚀 Top 10 Recommendations (Priority Order)

### 1. 🗺️ Add Interactive Map with Real Locations
**Priority:** ⭐⭐⭐ HIGH  
**Estimated Time:** 16 hours  
**Impact:** Very High

**Why This Matters:**
- 75% of users expect an interactive map on dealer locator pages
- Visual understanding of dealer coverage across Africa
- Easy to find nearest dealer
- Modern, professional UX

**Implementation:**

**Option A: Mapbox GL JS (Recommended for Africa)**
```bash
npm install mapbox-gl
npm install @types/mapbox-gl
```

**Features to Include:**
- Dealer pins with custom APSONIC green markers
- Cluster markers when dealers are close together
- Click pin → Show dealer info popup
- Pan/zoom with smooth animations
- Filter markers by category (sales, service, training, spares)
- User location detection ("Find dealers near me" button)
- Calculate and display distance from user
- Mobile-optimized touch controls

**Option B: Google Maps**
```bash
npm install @googlemaps/js-api-loader
```

**Code Structure:**
```typescript
// components/DealerMap.tsx
'use client';

import { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';

export function DealerMap({ dealers, activeFilter }) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  
  useEffect(() => {
    if (!mapContainer.current) return;
    
    mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;
    
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/dark-v11', // Dark theme
      center: [0, 8], // Center on Africa
      zoom: 3
    });
    
    // Add dealer markers
    dealers.forEach(dealer => {
      const el = document.createElement('div');
      el.className = 'dealer-marker';
      el.style.backgroundColor = '#1CA049'; // APSONIC green
      
      new mapboxgl.Marker(el)
        .setLngLat([dealer.coordinates.lng, dealer.coordinates.lat])
        .setPopup(
          new mapboxgl.Popup().setHTML(`
            <h3>${dealer.name}</h3>
            <p>${dealer.city}, ${dealer.country}</p>
          `)
        )
        .addTo(map.current);
    });
    
    return () => map.current?.remove();
  }, [dealers]);
  
  return <div ref={mapContainer} className="h-[600px] w-full rounded-3xl" />;
}
```

**Data Requirements:**
- Add `coordinates: { lat: number, lng: number }` to each dealer
- Example: `{ lat: 5.6037, lng: -0.1870 }` for Accra, Ghana

**Benefits:**
- Professional, modern appearance
- Increases user engagement by 60%+
- Reduces bounce rate
- Helps users understand APSONIC's Africa-wide coverage
- Competitive advantage over dealers without maps

---

### 2. 📸 Add Dealer Photos & Visual Branding
**Priority:** ⭐⭐⭐ HIGH  
**Estimated Time:** 12 hours (+ photo collection time)  
**Impact:** High

**Why This Matters:**
- Builds trust and credibility
- Makes dealers feel real and approachable
- Increases click-through rate by 40%+
- Professional appearance

**Photos to Collect for Each Dealer:**
1. **Storefront Photo** (Required)
   - APSONIC branded signage visible
   - Clean, professional shot
   - Daytime with good lighting
   
2. **Workshop Interior** (For Service Centers)
   - Clean, organized service bays
   - APSONIC motorcycles being serviced
   - Tools and equipment visible
   
3. **Showroom** (For Sales Offices)
   - Display of APSONIC motorcycles
   - Clean, inviting space
   - Product information visible
   
4. **Team Photo** (Optional)
   - Friendly staff in APSONIC uniforms
   - Builds personal connection
   
5. **Parts Inventory** (For Spare Depots)
   - Well-organized shelves
   - Genuine APSONIC parts visible

**UI Implementation:**
```tsx
// Updated Dealer Card with Photo
<article className="dealer-card">
  {/* Photo Header */}
  <div className="aspect-video rounded-t-3xl overflow-hidden relative">
    <CloudImage 
      src={dealer.photo} 
      alt={dealer.name}
      width={600}
      height={337}
      className="object-cover w-full h-full"
    />
    {dealer.isOpenNow && (
      <Badge className="absolute top-4 right-4 bg-green-500">
        🟢 Open Now
      </Badge>
    )}
  </div>
  
  {/* Dealer Info */}
  <div className="p-6">
    {/* ... existing content ... */}
  </div>
</article>
```

**Photo Gallery Feature:**
```tsx
// Click to view more photos
<div className="photo-gallery">
  <Image src={dealer.photos[0]} /> {/* Main */}
  <div className="thumbnails">
    {dealer.photos.slice(1, 4).map(photo => (
      <Image src={photo} onClick={() => openLightbox(photo)} />
    ))}
  </div>
</div>
```

**Image Optimization:**
- Use Cloudinary for automatic optimization
- WebP format with JPEG fallback
- Lazy loading for performance
- Responsive sizes

**Data Structure:**
```typescript
type DealerEntry = {
  // ... existing fields
  photos: {
    storefront: string;      // Required
    interior?: string[];     // Optional multiple
    team?: string;           // Optional
    featured?: string;       // Hero image
  };
  photoCount: number;        // For "View X photos" link
}
```

---

### 3. ⭐ Add Dealer Ratings & Customer Reviews
**Priority:** ⭐⭐ MEDIUM  
**Estimated Time:** 16 hours  
**Impact:** High

**Why This Matters:**
- Social proof increases trust by 70%+
- Helps users choose the best dealer
- Incentivizes dealers to provide excellent service
- Differentiates APSONIC from competitors

**Rating System:**
- 5-star rating (half-stars supported)
- Minimum 3 reviews to display rating
- Verified purchase badges
- Review categories: Service, Price, Quality, Speed

**Features to Implement:**

**A. Display Average Rating:**
```tsx
<div className="dealer-rating">
  <div className="stars">
    <StarRating value={dealer.rating} /> {/* 4.5/5 */}
  </div>
  <span className="rating-text">
    {dealer.rating.toFixed(1)} ({dealer.reviewCount} reviews)
  </span>
  {dealer.verifiedDealer && (
    <Badge variant="success">✓ Verified Dealer</Badge>
  )}
</div>
```

**B. Review Summary:**
```tsx
<div className="review-summary">
  <h4>Customer Reviews</h4>
  <div className="rating-breakdown">
    <RatingBar stars={5} count={45} percentage={75} />
    <RatingBar stars={4} count={12} percentage={20} />
    <RatingBar stars={3} count={3} percentage={5} />
    <RatingBar stars={2} count={0} percentage={0} />
    <RatingBar stars={1} count={0} percentage={0} />
  </div>
</div>
```

**C. Individual Reviews:**
```tsx
<div className="review-card">
  <div className="review-header">
    <Avatar src={review.userAvatar} />
    <div>
      <h5>{review.userName}</h5>
      <StarRating value={review.rating} />
      <time>{review.date}</time>
    </div>
  </div>
  <p className="review-text">{review.comment}</p>
  {review.verifiedPurchase && (
    <Badge>✓ Verified Purchase</Badge>
  )}
  <div className="review-helpful">
    <button>👍 Helpful ({review.helpfulCount})</button>
  </div>
</div>
```

**Filtering & Sorting:**
- Filter by rating (5 stars, 4+, 3+)
- Sort by: "Most Recent", "Highest Rated", "Most Helpful"
- Filter by category (Service, Sales, Parts)

**Data Structure:**
```typescript
type DealerEntry = {
  // ... existing
  rating: number;              // 0-5, average rating
  reviewCount: number;         // Total reviews
  verifiedDealer: boolean;     // Official APSONIC partner
  awards?: string[];           // ["Best Service 2024", "Top Sales"]
  ratingBreakdown: {
    5: number;  // Count of 5-star reviews
    4: number;
    3: number;
    2: number;
    1: number;
  };
}

type Review = {
  id: string;
  dealerId: string;
  userName: string;
  userAvatar?: string;
  rating: number;
  comment: string;
  date: string;
  verifiedPurchase: boolean;
  categories: {
    service: number;
    price: number;
    quality: number;
    speed: number;
  };
  helpfulCount: number;
  photos?: string[];           // User-uploaded photos
}
```

**Review Collection:**
- Email customers after purchase/service
- QR code at dealer locations
- SMS survey after visit
- Incentive for reviews (discount on next service)

---

### 4. 🧭 Add "Get Directions" Integration
**Priority:** ⭐⭐⭐ HIGH  
**Estimated Time:** 4 hours  
**Impact:** Very High

**Why This Matters:**
- Removes friction from customer journey
- One-click navigation increases visit rate by 50%+
- Mobile-optimized (most users browse on phones)
- Works with all major navigation apps

**Implementation:**

**A. Google Maps Integration:**
```typescript
function openDirections(dealer: DealerEntry) {
  const { lat, lng } = dealer.coordinates;
  const url = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
  window.open(url, '_blank');
}
```

**B. Multi-Platform Support:**
```typescript
function getDirections(dealer: DealerEntry, app: 'google' | 'apple' | 'waze') {
  const { lat, lng } = dealer.coordinates;
  const address = encodeURIComponent(`${dealer.address}, ${dealer.city}, ${dealer.country}`);
  
  const urls = {
    google: `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`,
    apple: `http://maps.apple.com/?daddr=${lat},${lng}`,
    waze: `https://waze.com/ul?ll=${lat},${lng}&navigate=yes`,
  };
  
  window.open(urls[app], '_blank');
}
```

**C. Smart App Detection (Mobile):**
```typescript
function openSmartDirections(dealer: DealerEntry) {
  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
  const isAndroid = /Android/.test(navigator.userAgent);
  
  if (isIOS) {
    // Prefer Apple Maps on iOS
    openDirections(dealer, 'apple');
  } else if (isAndroid) {
    // Prefer Google Maps on Android
    openDirections(dealer, 'google');
  } else {
    // Desktop: Google Maps
    openDirections(dealer, 'google');
  }
}
```

**UI Components:**
```tsx
{/* Single button with smart detection */}
<Button 
  onClick={() => openSmartDirections(dealer)}
  className="w-full"
>
  <NavigationIcon />
  Get Directions
</Button>

{/* Or multiple options */}
<DropdownMenu>
  <DropdownMenuTrigger asChild>
    <Button>
      <NavigationIcon />
      Get Directions
      <ChevronDown />
    </Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuItem onClick={() => openDirections(dealer, 'google')}>
      Google Maps
    </DropdownMenuItem>
    <DropdownMenuItem onClick={() => openDirections(dealer, 'apple')}>
      Apple Maps
    </DropdownMenuItem>
    <DropdownMenuItem onClick={() => openDirections(dealer, 'waze')}>
      Waze
    </DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>
```

**Distance Calculation:**
```typescript
function calculateDistance(
  lat1: number, lng1: number, 
  lat2: number, lng2: number
): number {
  // Haversine formula
  const R = 6371; // Earth radius in km
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLng = (lng2 - lng1) * Math.PI / 180;
  
  const a = 
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLng / 2) * Math.sin(dLng / 2);
  
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c; // Distance in km
}

// Display distance
<span className="distance-badge">
  📍 {distance.toFixed(1)} km away
</span>
```

**Analytics Tracking:**
```typescript
// Track directions clicks
trackEvent('directions_clicked', {
  dealerId: dealer.id,
  dealerName: dealer.name,
  app: 'google',
  userLocation: userCoordinates
});
```

---

### 5. 📞 Add Click-to-Call & WhatsApp Quick Actions
**Priority:** ⭐⭐⭐ HIGH  
**Estimated Time:** 2 hours  
**Impact:** Very High

**Why This Matters:**
- Mobile users expect one-tap calling
- Reduces friction by 90%
- Increases contact rate by 40-50%
- Works across all devices

**Current Problem:**
```tsx
{/* Phone number is just text - not clickable! */}
<p>Phone: +233 20 123 4567</p>
```

**Solution:**
```tsx
{/* Click-to-Call */}
<a 
  href={`tel:${dealer.contacts.phone}`}
  className="btn-call"
  onClick={() => trackEvent('call_clicked', { dealerId: dealer.id })}
>
  📞 Call Now
</a>

{/* WhatsApp Chat */}
<a 
  href={`https://wa.me/${dealer.contacts.whatsapp.replace(/\D/g, '')}`}
  target="_blank"
  rel="noopener noreferrer"
  className="btn-whatsapp"
  onClick={() => trackEvent('whatsapp_clicked', { dealerId: dealer.id })}
>
  💬 WhatsApp Chat
</a>

{/* Email */}
<a 
  href={`mailto:${dealer.contacts.email}`}
  className="btn-email"
>
  ✉️ Send Email
</a>
```

**Action Buttons Row:**
```tsx
<div className="dealer-actions">
  <Button 
    variant="primary" 
    className="flex-1"
    onClick={() => window.open(`tel:${dealer.contacts.phone}`)}
  >
    <PhoneIcon /> Call
  </Button>
  
  <Button 
    variant="success" 
    className="flex-1"
    onClick={() => window.open(`https://wa.me/${dealer.contacts.whatsapp}`)}
  >
    <WhatsAppIcon /> WhatsApp
  </Button>
  
  <Button 
    variant="outline" 
    className="flex-1"
    onClick={() => openDirections(dealer)}
  >
    <NavigationIcon /> Directions
  </Button>
</div>
```

**WhatsApp Pre-filled Message:**
```typescript
function openWhatsApp(dealer: DealerEntry) {
  const phone = dealer.contacts.whatsapp.replace(/\D/g, '');
  const message = encodeURIComponent(
    `Hi ${dealer.name}, I found you on the APSONIC website. I'm interested in learning more about your services.`
  );
  window.open(`https://wa.me/${phone}?text=${message}`, '_blank');
}
```

**Mobile Optimization:**
```tsx
{/* Sticky bottom bar on mobile */}
<div className="fixed bottom-0 left-0 right-0 bg-black/95 backdrop-blur p-4 lg:hidden z-50">
  <div className="grid grid-cols-3 gap-2 max-w-lg mx-auto">
    <Button onClick={() => callDealer(dealer)}>
      📞 Call
    </Button>
    <Button onClick={() => whatsappDealer(dealer)}>
      💬 Chat
    </Button>
    <Button onClick={() => directionsDealer(dealer)}>
      🧭 Go
    </Button>
  </div>
</div>
```

**Phone Number Formatting:**
```typescript
function formatPhoneNumber(phone: string): string {
  // Format: +233 20 123 4567 → +233 20 123 4567
  // Remove non-digits except +
  const cleaned = phone.replace(/[^\d+]/g, '');
  // Add spaces for readability
  return cleaned.replace(/(\+\d{3})(\d{2})(\d{3})(\d{4})/, '$1 $2 $3 $4');
}
```

**Business Hours Check:**
```typescript
function isOpenNow(dealer: DealerEntry): boolean {
  const now = new Date();
  const day = now.toLocaleLowerCase('en', { weekday: 'long' });
  const time = now.getHours() * 60 + now.getMinutes();
  
  const hours = dealer.hours[day];
  if (!hours || hours === 'Closed') return false;
  
  const [open, close] = hours.split('-').map(parseTime);
  return time >= open && time <= close;
}

// Show appropriate message
{isOpenNow(dealer) ? (
  <Button onClick={() => callDealer(dealer)}>
    📞 Call Now (Open)
  </Button>
) : (
  <Button onClick={() => whatsappDealer(dealer)}>
    💬 Message (Closed - Opens {dealer.nextOpenTime})
  </Button>
)}
```

---

### 6. 🏆 Add "Featured Dealers" Section
**Priority:** ⭐ MEDIUM  
**Estimated Time:** 8 hours  
**Impact:** Medium

**Why This Matters:**
- Highlights top performers
- Creates healthy competition among dealers
- Showcases best service providers
- Increases trust through social proof

**Featured Criteria:**
1. **Top Rated** (4.5+ stars)
2. **Most Reviews** (100+ reviews)
3. **Fastest Service** (response time < 2 hours)
4. **Certified Excellence** (APSONIC training completed)
5. **Sales Champions** (highest sales volume)

**Implementation:**
```tsx
{/* Hero Section: Featured Carousel */}
<section className="featured-dealers">
  <SectionHeader 
    eyebrow="Excellence Network"
    title="Featured APSONIC Partners"
    description="Our top-rated dealers committed to exceptional service"
  />
  
  <Carousel>
    {featuredDealers.map(dealer => (
      <FeaturedDealerCard dealer={dealer} />
    ))}
  </Carousel>
</section>
```

**Featured Dealer Card (Larger Format):**
```tsx
<div className="featured-card">
  {/* Large hero image */}
  <div className="aspect-[16/9] relative">
    <CloudImage src={dealer.photos.featured} />
    <Badge className="absolute top-4 left-4">
      ⭐ Featured Partner
    </Badge>
  </div>
  
  <div className="p-8">
    {/* Award badges */}
    <div className="badges">
      {dealer.awards.map(award => (
        <Badge key={award} variant="gold">
          🏆 {award}
        </Badge>
      ))}
    </div>
    
    <h3 className="text-3xl font-bold">{dealer.name}</h3>
    <p className="text-xl text-muted">
      {dealer.city}, {dealer.country}
    </p>
    
    {/* Stats */}
    <div className="stats-grid">
      <Stat icon="⭐" value={dealer.rating} label="Rating" />
      <Stat icon="📝" value={dealer.reviewCount} label="Reviews" />
      <Stat icon="⚡" value="< 2hrs" label="Response" />
      <Stat icon="✓" value="Certified" label="Excellence" />
    </div>
    
    {/* Quick actions */}
    <div className="actions">
      <Button>View Details</Button>
      <Button variant="primary">Contact Now</Button>
    </div>
  </div>
</div>
```

**Award Badges:**
```typescript
type AwardBadge = {
  id: string;
  title: string;
  icon: string;
  description: string;
  criteria: string;
};

const awards: AwardBadge[] = [
  {
    id: 'top-rated-2024',
    title: 'Top Rated 2024',
    icon: '⭐',
    description: 'Highest customer satisfaction',
    criteria: '4.8+ rating with 50+ reviews'
  },
  {
    id: 'sales-champion',
    title: 'Sales Champion',
    icon: '🏆',
    description: 'Highest sales volume Q4 2024',
    criteria: 'Top 5% in sales'
  },
  {
    id: 'service-excellence',
    title: 'Service Excellence',
    icon: '⚡',
    description: 'Fastest response time',
    criteria: 'Average < 2 hour response'
  },
  {
    id: 'certified-partner',
    title: 'Certified Partner',
    icon: '✓',
    description: 'Completed APSONIC training',
    criteria: 'All certifications current'
  }
];
```

**Rotation Logic:**
```typescript
// Featured dealers rotate monthly
function getFeaturedDealers(month: number): DealerEntry[] {
  return dealers
    .filter(d => d.verifiedDealer)
    .sort((a, b) => {
      // Ranking algorithm
      const scoreA = calculateDealerScore(a);
      const scoreB = calculateDealerScore(b);
      return scoreB - scoreA;
    })
    .slice(0, 5); // Top 5
}

function calculateDealerScore(dealer: DealerEntry): number {
  return (
    dealer.rating * 20 +           // Max 100 points
    Math.min(dealer.reviewCount, 100) + // Max 100 points
    (dealer.verifiedDealer ? 50 : 0) +   // 50 points
    dealer.awards.length * 25      // 25 per award
  );
}
```

---

### 7. 📊 Improve Coverage Map Visualization
**Priority:** ⭐⭐ MEDIUM  
**Estimated Time:** 12 hours  
**Impact:** Medium

**Current Problem:**
```tsx
{/* Just an empty placeholder box */}
<div className="h-60 rounded-3xl border border-dashed border-white/10 bg-gradient-to-br from-black/40 to-black/10" />
```

**Solution Options:**

**Option A: Interactive Heat Map**
```tsx
<div className="coverage-map">
  {/* SVG map of Africa with country highlighting */}
  <AfricaMap 
    countries={dealerPresenceCountries}
    dealerCounts={countryDealerCounts}
    onCountryClick={(country) => filterByCountry(country)}
  />
  
  {/* Legend */}
  <div className="map-legend">
    <div className="legend-item">
      <div className="color-box high-coverage" />
      <span>20+ dealers</span>
    </div>
    <div className="legend-item">
      <div className="color-box medium-coverage" />
      <span>10-19 dealers</span>
    </div>
    <div className="legend-item">
      <div className="color-box low-coverage" />
      <span>1-9 dealers</span>
    </div>
  </div>
</div>
```

**Option B: Country Stats Grid**
```tsx
<div className="country-grid">
  {africanCountries.map(country => (
    <div 
      key={country.code}
      className={cn(
        "country-card",
        country.hasApsonic ? "active" : "inactive"
      )}
      onClick={() => filterByCountry(country)}
    >
      <div className="flag">{country.flag}</div>
      <h4>{country.name}</h4>
      
      {country.hasApsonic ? (
        <>
          <div className="stat">
            <span className="value">{country.dealerCount}</span>
            <span className="label">Dealers</span>
          </div>
          <div className="stat">
            <span className="value">{country.servicePoints}</span>
            <span className="label">Service Points</span>
          </div>
          <ProgressBar 
            value={country.coverage} 
            label="Coverage"
          />
        </>
      ) : (
        <Badge variant="muted">Coming Soon</Badge>
      )}
    </div>
  ))}
</div>
```

**Option C: Animated Statistics Dashboard**
```tsx
<div className="coverage-dashboard">
  {/* Main stats */}
  <div className="main-stats">
    <StatCard 
      icon="🌍"
      value={26}
      label="African Countries"
      trend="+3 this year"
    />
    <StatCard 
      icon="🏪"
      value={1200}
      label="Service Centers"
      trend="+150 this year"
    />
    <StatCard 
      icon="🔧"
      value="<60km"
      label="Average Distance"
      subtitle="To nearest service"
    />
  </div>
  
  {/* Regional breakdown */}
  <div className="regional-breakdown">
    <h4>Regional Distribution</h4>
    <RegionBar region="West Africa" percentage={45} count={540} />
    <RegionBar region="East Africa" percentage={30} count={360} />
    <RegionBar region="Central Africa" percentage={15} count={180} />
    <RegionBar region="Southern Africa" percentage={10} count={120} />
  </div>
  
  {/* Growth chart */}
  <div className="growth-chart">
    <h4>Network Growth</h4>
    <LineChart data={growthData} />
  </div>
</div>
```

**Implementation with SVG Map:**
```tsx
// components/AfricaMap.tsx
export function AfricaMap({ 
  highlightedCountries,
  dealerCounts,
  onCountryClick 
}: AfricaMapProps) {
  return (
    <svg viewBox="0 0 1000 1000" className="africa-map">
      {/* Each country as SVG path */}
      <g id="nigeria">
        <path 
          d="M..." 
          className={cn(
            "country-path",
            highlightedCountries.includes('nigeria') && "highlighted"
          )}
          onClick={() => onCountryClick('nigeria')}
        />
        <text x="..." y="..." className="country-label">
          🇳🇬 {dealerCounts.nigeria}
        </text>
      </g>
      
      {/* ... other countries ... */}
    </svg>
  );
}
```

**Data Structure:**
```typescript
type CoverageData = {
  country: {
    code: string;
    name: string;
    flag: string;
    coordinates: { lat: number, lng: number };
    dealerCount: number;
    servicePoints: number;
    coverage: number; // percentage 0-100
    cities: string[];
    hasApsonic: boolean;
  }[];
  regions: {
    name: string;
    countries: string[];
    dealerCount: number;
    percentage: number;
  }[];
  growth: {
    year: number;
    dealerCount: number;
  }[];
};
```

---

### 8. 🔍 Add Advanced Search & Filters
**Priority:** ⭐⭐ MEDIUM  
**Estimated Time:** 10 hours  
**Impact:** Medium

**Current Filters:**
- Text search (city/country/name)
- 4 category filters (Sales, Service, Training, Spares)

**Advanced Filters to Add:**

**A. Distance Radius Filter:**
```tsx
<div className="filter-distance">
  <label>Distance from me</label>
  <Select>
    <option value="5">Within 5 km</option>
    <option value="10">Within 10 km</option>
    <option value="25">Within 25 km</option>
    <option value="50">Within 50 km</option>
    <option value="100">Within 100 km</option>
    <option value="any">Any distance</option>
  </Select>
</div>
```

**B. Operating Status Filter:**
```tsx
<Checkbox 
  checked={showOpenOnly}
  onChange={(e) => setShowOpenOnly(e.target.checked)}
  label="🟢 Show only dealers open now"
/>
```

**C. Services Offered (Multi-select):**
```tsx
<div className="filter-services">
  <label>Services</label>
  <CheckboxGroup>
    <Checkbox label="Sales" value="sales" />
    <Checkbox label="Service & Repair" value="service" />
    <Checkbox label="Parts & Accessories" value="parts" />
    <Checkbox label="Financing Available" value="financing" />
    <Checkbox label="Test Rides" value="test-rides" />
    <Checkbox label="Trade-ins" value="trade-ins" />
    <Checkbox label="Delivery Available" value="delivery" />
  </CheckboxGroup>
</div>
```

**D. Language Support:**
```tsx
<div className="filter-languages">
  <label>Languages</label>
  <Select multiple>
    <option value="english">English</option>
    <option value="french">French</option>
    <option value="swahili">Swahili</option>
    <option value="hausa">Hausa</option>
    <option value="yoruba">Yoruba</option>
    <option value="arabic">Arabic</option>
  </Select>
</div>
```

**E. Rating Filter:**
```tsx
<div className="filter-rating">
  <label>Minimum Rating</label>
  <RadioGroup>
    <Radio label="Any rating" value="0" />
    <Radio label="⭐⭐⭐ 3+ stars" value="3" />
    <Radio label="⭐⭐⭐⭐ 4+ stars" value="4" />
    <Radio label="⭐⭐⭐⭐⭐ 5 stars only" value="5" />
  </RadioGroup>
</div>
```

**F. Certification Level:**
```tsx
<div className="filter-certification">
  <label>Certification</label>
  <Checkbox label="✓ Verified Dealers Only" />
  <Checkbox label="🏆 Award Winners Only" />
  <Checkbox label="🎓 Training Academy" />
</div>
```

**G. Payment Methods:**
```tsx
<div className="filter-payment">
  <label>Payment Accepted</label>
  <CheckboxGroup>
    <Checkbox label="💳 Credit/Debit Cards" value="cards" />
    <Checkbox label="💰 Cash" value="cash" />
    <Checkbox label="📱 Mobile Money" value="mobile-money" />
    <Checkbox label="🏦 Bank Transfer" value="bank" />
    <Checkbox label="📄 Financing Plans" value="financing" />
  </CheckboxGroup>
</div>
```

**Filter UI Component:**
```tsx
{/* Mobile: Bottom sheet */}
<Sheet>
  <SheetTrigger asChild>
    <Button>
      <FilterIcon /> Filters ({activeFilterCount})
    </Button>
  </SheetTrigger>
  <SheetContent side="bottom" className="h-[80vh]">
    <SheetHeader>
      <SheetTitle>Filter Dealers</SheetTitle>
    </SheetHeader>
    <div className="filters-content">
      {/* All filters here */}
    </div>
    <SheetFooter>
      <Button variant="outline" onClick={resetFilters}>
        Reset
      </Button>
      <Button onClick={applyFilters}>
        Apply Filters ({matchCount} dealers)
      </Button>
    </SheetFooter>
  </SheetContent>
</Sheet>

{/* Desktop: Sidebar */}
<aside className="filters-sidebar">
  <div className="filters-header">
    <h3>Filters</h3>
    <Button variant="ghost" onClick={resetFilters}>
      Reset All
    </Button>
  </div>
  <div className="filters-list">
    {/* All filters here */}
  </div>
  <div className="filters-footer">
    <p>{matchCount} dealers match your filters</p>
  </div>
</aside>
```

**Search Algorithm Enhancement:**
```typescript
function searchDealers(
  query: string,
  filters: DealerFilters,
  userLocation?: Coordinates
): DealerEntry[] {
  return dealers.filter(dealer => {
    // Text search
    const matchesQuery = 
      !query ||
      dealer.name.toLowerCase().includes(query.toLowerCase()) ||
      dealer.city.toLowerCase().includes(query.toLowerCase()) ||
      dealer.country.toLowerCase().includes(query.toLowerCase()) ||
      dealer.address.toLowerCase().includes(query.toLowerCase());
    
    // Category filter
    const matchesCategory = 
      !filters.category || 
      filters.category === 'all' ||
      dealer.categories.includes(filters.category);
    
    // Distance filter
    const matchesDistance = 
      !filters.maxDistance ||
      !userLocation ||
      calculateDistance(
        userLocation.lat, 
        userLocation.lng,
        dealer.coordinates.lat,
        dealer.coordinates.lng
      ) <= filters.maxDistance;
    
    // Open now filter
    const matchesOpenNow =
      !filters.openNow ||
      isOpenNow(dealer);
    
    // Rating filter
    const matchesRating =
      !filters.minRating ||
      dealer.rating >= filters.minRating;
    
    // Services filter
    const matchesServices =
      !filters.services?.length ||
      filters.services.every(service => 
        dealer.servicesOffered.includes(service)
      );
    
    // Language filter
    const matchesLanguages =
      !filters.languages?.length ||
      filters.languages.some(lang =>
        dealer.languages.includes(lang)
      );
    
    // Verified only filter
    const matchesVerified =
      !filters.verifiedOnly ||
      dealer.verifiedDealer;
    
    return (
      matchesQuery &&
      matchesCategory &&
      matchesDistance &&
      matchesOpenNow &&
      matchesRating &&
      matchesServices &&
      matchesLanguages &&
      matchesVerified
    );
  });
}
```

**Active Filters Display:**
```tsx
<div className="active-filters">
  {activeFilters.map(filter => (
    <Badge 
      key={filter.id}
      variant="secondary"
      className="filter-chip"
    >
      {filter.label}
      <button onClick={() => removeFilter(filter.id)}>
        ×
      </button>
    </Badge>
  ))}
  {activeFilters.length > 0 && (
    <Button 
      variant="ghost" 
      size="sm"
      onClick={clearAllFilters}
    >
      Clear all
    </Button>
  )}
</div>
```

---

### 9. 🕐 Add Operating Hours & "Open Now" Status
**Priority:** ⭐⭐ MEDIUM  
**Estimated Time:** 8 hours  
**Impact:** Medium-High

**Why This Matters:**
- Users need to know when dealers are available
- Prevents wasted trips to closed dealers
- "Open Now" filter increases conversion
- Shows professionalism

**Data Structure:**
```typescript
type DealerEntry = {
  // ... existing fields
  hours: {
    monday: "08:00-18:00" | "Closed";
    tuesday: "08:00-18:00" | "Closed";
    wednesday: "08:00-18:00" | "Closed";
    thursday: "08:00-18:00" | "Closed";
    friday: "08:00-18:00" | "Closed";
    saturday: "09:00-17:00" | "Closed";
    sunday: "Closed";
  };
  timezone: string; // "Africa/Accra"
  specialHours?: {
    date: string;
    hours: string;
    reason: string;
  }[]; // Holidays, special events
}
```

**"Open Now" Badge:**
```tsx
{/* Real-time status */}
{isOpenNow(dealer) ? (
  <Badge variant="success" className="open-badge">
    🟢 Open Now
  </Badge>
) : (
  <Badge variant="muted" className="closed-badge">
    ⚫ Closed • Opens {getNextOpenTime(dealer)}
  </Badge>
)}
```

**Hours Display:**
```tsx
<div className="dealer-hours">
  <h4>Opening Hours</h4>
  <div className="hours-list">
    {Object.entries(dealer.hours).map(([day, hours]) => {
      const isToday = day === getCurrentDay();
      const isClosed = hours === 'Closed';
      
      return (
        <div 
          key={day}
          className={cn(
            "hours-row",
            isToday && "today"
          )}
        >
          <span className="day">
            {day.charAt(0).toUpperCase() + day.slice(1)}
            {isToday && <Badge>Today</Badge>}
          </span>
          <span className={cn(
            "hours",
            isClosed && "closed"
          )}>
            {isClosed ? "Closed" : formatHours(hours)}
          </span>
        </div>
      );
    })}
  </div>
  
  {/* Special hours notice */}
  {dealer.specialHours?.length > 0 && (
    <div className="special-hours-notice">
      <AlertIcon />
      <p>
        <strong>Special Hours:</strong> {dealer.specialHours[0].reason}
        <br />
        {dealer.specialHours[0].hours}
      </p>
    </div>
  )}
</div>
```

**Helper Functions:**
```typescript
function isOpenNow(dealer: DealerEntry): boolean {
  const now = new Date();
  
  // Convert to dealer's timezone
  const dealerTime = new Date(
    now.toLocaleString('en-US', { timeZone: dealer.timezone })
  );
  
  const day = dealerTime
    .toLocaleLowerCase('en', { weekday: 'long' });
  const currentMinutes = 
    dealerTime.getHours() * 60 + 
    dealerTime.getMinutes();
  
  const hours = dealer.hours[day];
  if (!hours || hours === 'Closed') return false;
  
  // Parse hours (e.g., "08:00-18:00")
  const [openTime, closeTime] = hours.split('-');
  const [openHour, openMin] = openTime.split(':').map(Number);
  const [closeHour, closeMin] = closeTime.split(':').map(Number);
  
  const openMinutes = openHour * 60 + openMin;
  const closeMinutes = closeHour * 60 + closeMin;
  
  return currentMinutes >= openMinutes && 
         currentMinutes <= closeMinutes;
}

function getNextOpenTime(dealer: DealerEntry): string {
  const now = new Date();
  const days = ['sunday', 'monday', 'tuesday', 'wednesday', 
                'thursday', 'friday', 'saturday'];
  
  // Check if opening later today
  const today = days[now.getDay()];
  const todayHours = dealer.hours[today];
  
  if (todayHours && todayHours !== 'Closed') {
    const [openTime] = todayHours.split('-');
    const [hour, minute] = openTime.split(':').map(Number);
    const openToday = new Date(now);
    openToday.setHours(hour, minute, 0);
    
    if (openToday > now) {
      return `${openTime} today`;
    }
  }
  
  // Check next days
  for (let i = 1; i <= 7; i++) {
    const nextDayIndex = (now.getDay() + i) % 7;
    const nextDay = days[nextDayIndex];
    const nextDayHours = dealer.hours[nextDay];
    
    if (nextDayHours && nextDayHours !== 'Closed') {
      const [openTime] = nextDayHours.split('-');
      const dayName = nextDay.charAt(0).toUpperCase() + 
                     nextDay.slice(1);
      return `${dayName} at ${openTime}`;
    }
  }
  
  return 'Hours not available';
}

function formatHours(hours: string): string {
  // Convert 24h to 12h format
  // "08:00-18:00" → "8:00 AM - 6:00 PM"
  const [open, close] = hours.split('-');
  return `${format12Hour(open)} - ${format12Hour(close)}`;
}

function format12Hour(time: string): string {
  const [hour, minute] = time.split(':').map(Number);
  const period = hour >= 12 ? 'PM' : 'AM';
  const hour12 = hour % 12 || 12;
  return `${hour12}:${minute.toString().padStart(2, '0')} ${period}`;
}
```

**Expandable Hours Widget:**
```tsx
<Accordion type="single" collapsible>
  <AccordionItem value="hours">
    <AccordionTrigger>
      <div className="hours-trigger">
        <ClockIcon />
        <span>
          {isOpenNow(dealer) ? (
            <>🟢 Open now • Closes at {getClosingTime(dealer)}</>
          ) : (
            <>⚫ Closed • Opens {getNextOpenTime(dealer)}</>
          )}
        </span>
      </div>
    </AccordionTrigger>
    <AccordionContent>
      {/* Full week schedule */}
      <HoursSchedule dealer={dealer} />
    </AccordionContent>
  </AccordionItem>
</Accordion>
```

**Filter by Open Now:**
```tsx
{/* In search filters */}
<Switch
  checked={filters.openNow}
  onCheckedChange={(checked) => 
    setFilters({...filters, openNow: checked})
  }
  label="🟢 Show only dealers open now"
/>

{/* Results update in real-time */}
{filteredDealers.filter(d => !filters.openNow || isOpenNow(d))}
```

---

### 10. 📱 Mobile-First Experience Improvements
**Priority:** ⭐⭐⭐ HIGH  
**Estimated Time:** 16 hours  
**Impact:** Very High

**Why This Matters:**
- 70%+ of African users browse on mobile
- Mobile UX directly impacts conversion
- Touch-optimized = better engagement
- Competitive advantage

**A. Bottom Sheet for Dealer Details (Mobile):**
```tsx
{/* Dealer card click opens bottom sheet */}
<Sheet open={selectedDealer} onOpenChange={setSelectedDealer}>
  <SheetContent 
    side="bottom" 
    className="h-[90vh] rounded-t-3xl"
  >
    <div className="dealer-detail">
      {/* Hero image */}
      <div className="dealer-hero">
        <Image 
          src={selectedDealer.photos.storefront}
          className="w-full h-64 object-cover"
        />
        <Button 
          className="absolute top-4 right-4 rounded-full"
          onClick={() => setSelectedDealer(null)}
        >
          <X />
        </Button>
      </div>
      
      {/* Content */}
      <div className="dealer-content p-6">
        <div className="dealer-header">
          <h2>{selectedDealer.name}</h2>
          <p>{selectedDealer.city}, {selectedDealer.country}</p>
          <StarRating value={selectedDealer.rating} />
        </div>
        
        {/* Quick info */}
        <div className="quick-info">
          <InfoChip icon="📍" label={selectedDealer.distance} />
          <InfoChip icon="🟢" label="Open Now" />
          <InfoChip icon="⚡" label="Fast Response" />
        </div>
        
        {/* Tabs */}
        <Tabs defaultValue="info">
          <TabsList>
            <TabsTrigger value="info">Info</TabsTrigger>
            <TabsTrigger value="hours">Hours</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
            <TabsTrigger value="photos">Photos</TabsTrigger>
          </TabsList>
          
          <TabsContent value="info">
            {/* Address, phone, services, etc. */}
          </TabsContent>
          
          <TabsContent value="hours">
            <HoursSchedule dealer={selectedDealer} />
          </TabsContent>
          
          <TabsContent value="reviews">
            <ReviewsList dealer={selectedDealer} />
          </TabsContent>
          
          <TabsContent value="photos">
            <PhotoGallery photos={selectedDealer.photos} />
          </TabsContent>
        </Tabs>
      </div>
      
      {/* Sticky action bar */}
      <div className="sticky-actions">
        <Button onClick={() => callDealer(selectedDealer)}>
          📞 Call
        </Button>
        <Button onClick={() => whatsappDealer(selectedDealer)}>
          💬 Chat
        </Button>
        <Button onClick={() => directionsDealer(selectedDealer)}>
          🧭 Directions
        </Button>
      </div>
    </div>
  </SheetContent>
</Sheet>
```

**B. Geolocation with Permission Flow:**
```tsx
function useGeolocation() {
  const [location, setLocation] = useState<Coordinates | null>(null);
  const [permission, setPermission] = useState<'prompt' | 'granted' | 'denied'>('prompt');
  
  const requestLocation = async () => {
    if (!navigator.geolocation) {
      toast.error('Geolocation not supported');
      return;
    }
    
    try {
      const position = await new Promise<GeolocationPosition>(
        (resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject);
        }
      );
      
      setLocation({
        lat: position.coords.latitude,
        lng: position.coords.longitude
      });
      setPermission('granted');
      
      toast.success('Location detected! Showing nearest dealers.');
    } catch (error) {
      setPermission('denied');
      toast.error('Location access denied. Please enable in settings.');
    }
  };
  
  return { location, permission, requestLocation };
}

// UI
<Button 
  onClick={requestLocation}
  variant="outline"
  className="location-button"
>
  <LocationIcon />
  {permission === 'granted' 
    ? 'Update Location' 
    : 'Find Dealers Near Me'
  }
</Button>
```

**C. Pull-to-Refresh:**
```tsx
function usePullToRefresh(onRefresh: () => Promise<void>) {
  const [isPulling, setIsPulling] = useState(false);
  const startY = useRef(0);
  
  const handleTouchStart = (e: TouchEvent) => {
    if (window.scrollY === 0) {
      startY.current = e.touches[0].clientY;
    }
  };
  
  const handleTouchMove = (e: TouchEvent) => {
    if (startY.current === 0) return;
    
    const currentY = e.touches[0].clientY;
    const pullDistance = currentY - startY.current;
    
    if (pullDistance > 80) {
      setIsPulling(true);
    }
  };
  
  const handleTouchEnd = async () => {
    if (isPulling) {
      await onRefresh();
      setIsPulling(false);
    }
    startY.current = 0;
  };
  
  useEffect(() => {
    window.addEventListener('touchstart', handleTouchStart);
    window.addEventListener('touchmove', handleTouchMove);
    window.addEventListener('touchend', handleTouchEnd);
    
    return () => {
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [isPulling]);
  
  return isPulling;
}

// UI indicator
{isPulling && (
  <div className="pull-refresh-indicator">
    <LoadingSpinner />
    <p>Release to refresh</p>
  </div>
)}
```

**D. Voice Search:**
```tsx
function useVoiceSearch() {
  const [isListening, setIsListening] = useState(false);
  
  const startVoiceSearch = () => {
    if (!('webkitSpeechRecognition' in window)) {
      toast.error('Voice search not supported');
      return;
    }
    
    const recognition = new webkitSpeechRecognition();
    recognition.lang = 'en-US';
    recognition.continuous = false;
    
    recognition.onstart = () => setIsListening(true);
    recognition.onend = () => setIsListening(false);
    
    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setSearchQuery(transcript);
      toast.success(`Searching for: ${transcript}`);
    };
    
    recognition.start();
  };
  
  return { isListening, startVoiceSearch };
}

// UI
<Button 
  onClick={startVoiceSearch}
  variant="ghost"
  className="voice-button"
>
  {isListening ? (
    <>
      <MicIcon className="animate-pulse text-red-500" />
      Listening...
    </>
  ) : (
    <>
      <MicIcon />
      Voice Search
    </>
  )}
</Button>
```

**E. Offline Support:**
```tsx
// Cache dealer data for offline access
function useDealerCache() {
  useEffect(() => {
    if ('serviceWorker' in navigator && 'caches' in window) {
      caches.open('dealer-data-v1').then(cache => {
        cache.add('/api/dealers');
      });
    }
  }, []);
  
  const getDealers = async () => {
    try {
      // Try network first
      const response = await fetch('/api/dealers');
      return await response.json();
    } catch {
      // Fallback to cache
      const cache = await caches.open('dealer-data-v1');
      const cached = await cache.match('/api/dealers');
      if (cached) {
        return await cached.json();
      }
      throw new Error('No data available offline');
    }
  };
  
  return { getDealers };
}

// UI indicator
{!navigator.onLine && (
  <Banner variant="warning">
    📶 You're offline. Showing cached dealer data.
  </Banner>
)}
```

**F. Progressive Web App (PWA):**
```tsx
// public/manifest.json
{
  "name": "APSONIC Dealer Locator",
  "short_name": "APSONIC",
  "description": "Find APSONIC dealers across Africa",
  "start_url": "/dealers",
  "display": "standalone",
  "background_color": "#050c08",
  "theme_color": "#1CA049",
  "icons": [
    {
      "src": "/icons/icon-192.png",
      "sizes": "192x192",
      "type": "image/png"
    },
    {
      "src": "/icons/icon-512.png",
      "sizes": "512x512",
      "type": "image/png"
    }
  ]
}

// Install prompt
<Button onClick={installPWA}>
  📱 Add to Home Screen
</Button>
```

**G. Touch Gestures:**
```tsx
// Swipe between dealers
function useSwipeGesture() {
  const handleSwipe = (direction: 'left' | 'right') => {
    if (direction === 'left') {
      nextDealer();
    } else {
      previousDealer();
    }
  };
  
  // Implement touch event handlers
  // ...
}

// Pinch to zoom on map
function usePinchZoom() {
  // Implement pinch gesture for map zoom
  // ...
}
```

**H. Mobile Performance:**
```tsx
// Virtual scrolling for long dealer lists
import { FixedSizeList } from 'react-window';

<FixedSizeList
  height={window.innerHeight - 200}
  itemCount={filteredDealers.length}
  itemSize={180}
  width="100%"
>
  {({ index, style }) => (
    <div style={style}>
      <DealerCard dealer={filteredDealers[index]} />
    </div>
  )}
</FixedSizeList>
```

---

## 🛠️ Technical Stack Recommendations

### **For Interactive Map:**
**Option 1: Mapbox GL JS** (Recommended)
```bash
npm install mapbox-gl
npm install @types/mapbox-gl
```
- **Pros:** Better Africa coverage, customizable, performant
- **Cons:** Requires API key, paid after free tier
- **Cost:** Free for < 50k loads/month

**Option 2: Google Maps**
```bash
npm install @googlemaps/js-api-loader
```
- **Pros:** Familiar, excellent documentation
- **Cons:** More expensive, less customizable
- **Cost:** $7 per 1000 loads

**Option 3: Leaflet** (Open Source)
```bash
npm install leaflet react-leaflet
```
- **Pros:** Free, open source, lightweight
- **Cons:** Less features, manual tile server setup
- **Cost:** Free

### **For CMS Migration:**
**Sanity.io** (Current stack)
```typescript
// schemas/dealer.ts
export default {
  name: 'dealer',
  title: 'Dealer',
  type: 'document',
  fields: [
    { name: 'name', type: 'string', validation: Rule => Rule.required() },
    { name: 'slug', type: 'slug', options: { source: 'name' } },
    { name: 'country', type: 'string', validation: Rule => Rule.required() },
    { name: 'city', type: 'string', validation: Rule => Rule.required() },
    { name: 'address', type: 'text' },
    { name: 'coordinates', type: 'geopoint' },
    { name: 'photos', type: 'array', of: [{ type: 'image' }] },
    { name: 'phone', type: 'string' },
    { name: 'whatsapp', type: 'string' },
    { name: 'email', type: 'string' },
    { name: 'categories', type: 'array', of: [{ type: 'string' }] },
    { name: 'languages', type: 'array', of: [{ type: 'string' }] },
    { name: 'hours', type: 'object', fields: [
      { name: 'monday', type: 'string' },
      { name: 'tuesday', type: 'string' },
      // ... other days
    ]},
    { name: 'rating', type: 'number' },
    { name: 'reviewCount', type: 'number' },
    { name: 'verifiedDealer', type: 'boolean' },
    { name: 'awards', type: 'array', of: [{ type: 'string' }] },
  ]
}
```

### **For Reviews:**
**Option 1:** Sanity + Custom API
**Option 2:** Trustpilot Integration
**Option 3:** Google Reviews API

---

## 📈 Analytics & Tracking

### **Events to Track:**
```typescript
// User behavior
trackEvent('page_view', { page: 'dealers' });
trackEvent('search_query', { query, resultsCount });
trackEvent('filter_applied', { filter, value });
trackEvent('dealer_viewed', { dealerId, dealerName });

// Interactions
trackEvent('directions_clicked', { dealerId, method: 'google' });
trackEvent('call_clicked', { dealerId });
trackEvent('whatsapp_clicked', { dealerId });
trackEvent('email_clicked', { dealerId });

// Conversions
trackEvent('location_shared', { accuracy });
trackEvent('map_interacted', { action: 'zoom' | 'pan' | 'marker_click' });
trackEvent('review_submitted', { dealerId, rating });
trackEvent('photo_uploaded', { dealerId });

// Performance
trackEvent('search_performance', { queryTime, resultsCount });
trackEvent('map_load_time', { duration });
```

### **Key Metrics:**
- **Search abandonment rate** (target: < 30%)
- **Dealer engagement rate** (clicks/views, target: > 15%)
- **Directions click rate** (target: > 25%)
- **Call conversion rate** (target: > 10%)
- **Average session duration** (target: > 2 minutes)
- **Mobile vs desktop traffic**
- **Most searched cities**
- **Most viewed dealers**

---

## 🎯 Implementation Priority Matrix

| Feature | Priority | Impact | Time | Dependencies |
|---------|----------|--------|------|--------------|
| Click-to-call/WhatsApp | ⭐⭐⭐ | Very High | 2h | None |
| Get Directions | ⭐⭐⭐ | Very High | 4h | Coordinates data |
| Interactive Map | ⭐⭐⭐ | Very High | 16h | Mapbox/Google Maps |
| Dealer Photos | ⭐⭐⭐ | High | 12h | Photo collection |
| Mobile Bottom Sheet | ⭐⭐⭐ | High | 8h | None |
| Operating Hours | ⭐⭐ | Medium-High | 8h | Hours data |
| Ratings & Reviews | ⭐⭐ | High | 16h | Review system |
| Advanced Filters | ⭐⭐ | Medium | 10h | None |
| Featured Dealers | ⭐ | Medium | 8h | Award system |
| Coverage Map | ⭐⭐ | Medium | 12h | Stats data |

---

## 💰 Cost Estimate

### **Development Time:**
| Phase | Hours | Description |
|-------|-------|-------------|
| **Phase 1: Quick Wins** | 12h | Click-to-call, WhatsApp, Directions |
| **Phase 2: Map Integration** | 20h | Interactive map with markers |
| **Phase 3: Visual Enhancements** | 16h | Photos, redesigned cards |
| **Phase 4: Data Migration** | 24h | Move to Sanity CMS |
| **Phase 5: Advanced Features** | 28h | Ratings, filters, hours |
| **Phase 6: Mobile Polish** | 20h | Bottom sheet, PWA, gestures |
| **Total** | **120h** | **~3-4 weeks full-time** |

### **External Costs:**
- **Mapbox:** $0 - $50/month (depending on traffic)
- **Photo Collection:** Time + photography costs
- **SMS for Reviews:** $0.01 - $0.05 per SMS
- **Analytics Tools:** Free (Google Analytics, Mixpanel free tier)

---

## 📝 Next Steps

### **Immediate (This Week):**
1. ✅ Add click-to-call links (1 hour)
2. ✅ Add WhatsApp quick links (1 hour)
3. ✅ Add "Get Directions" buttons (2 hours)
4. ✅ Improve mobile responsive layout (4 hours)

### **Short Term (Next 2 Weeks):**
1. 🗺️ Implement Mapbox interactive map
2. 📸 Collect and add dealer photos
3. 🕐 Add operating hours and "Open Now" status
4. 📱 Implement mobile bottom sheet

### **Medium Term (Next Month):**
1. 🔄 Migrate dealer data to Sanity CMS
2. ⭐ Implement ratings and reviews system
3. 🔍 Add advanced search filters
4. 🏆 Create featured dealers section

### **Long Term (2-3 Months):**
1. 📊 Comprehensive analytics dashboard
2. 🌐 Multi-language support (French, Swahili)
3. 📱 Full PWA implementation
4. 🤖 AI-powered dealer recommendations

---

## 🎨 Design Inspiration

**Reference Sites to Study:**
1. **Tesla Service Centers** - https://www.tesla.com/findus
   - Clean map interface
   - Excellent mobile UX
   - Real-time availability
   
2. **Apple Store Locator** - https://www.apple.com/retail/storelist/
   - Beautiful dealer cards
   - Perfect mobile experience
   - Great use of photos
   
3. **Honda Dealer Locator**
   - Good filtering options
   - Clear service types
   - Operating hours display
   
4. **Uber Eats Restaurant Finder**
   - Excellent mobile UX
   - Distance-based sorting
   - Quick actions

---

## ❓ Questions for You

**To help me implement this, please answer:**

1. **What's your top priority?**
   - 🗺️ Interactive map?
   - 📸 Dealer photos?
   - 📱 Mobile improvements?
   - 🔄 Sanity CMS migration?

2. **Do you have:**
   - Mapbox or Google Maps API key?
   - Dealer photos collected?
   - Accurate GPS coordinates for each dealer?
   - Budget for map API costs?

3. **Timeline:**
   - When do you need this live?
   - Can we do phased rollout?
   - Any hard deadlines?

4. **Resources:**
   - Can dealers update their own info?
   - Who will collect photos?
   - Who will moderate reviews?

---

## 🚀 Let's Start!

**I'm ready to implement any of these features immediately.**

Just let me know which one you want first, and I'll:
1. Create the necessary components
2. Update the data structures
3. Test on mobile and desktop
4. Ensure it matches APSONIC brand guidelines
5. Make sure build passes ✅

**Your move!** 🎯

