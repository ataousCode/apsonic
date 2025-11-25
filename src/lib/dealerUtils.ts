/**
 * Dealer Utility Functions
 * Centralized logic for dealer operations following DRY principles
 */

import { type DealerEntry } from '@/data/dealers';

// ==================== COORDINATES & DISTANCE ====================

export type Coordinates = {
  lat: number;
  lng: number;
};

/**
 * Calculate distance between two points using Haversine formula
 * @returns Distance in kilometers
 */
export function calculateDistance(
  lat1: number,
  lng1: number,
  lat2: number,
  lng2: number
): number {
  const R = 6371; // Earth's radius in km
  const dLat = toRadians(lat2 - lat1);
  const dLng = toRadians(lng2 - lng1);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRadians(lat1)) *
      Math.cos(toRadians(lat2)) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

function toRadians(degrees: number): number {
  return degrees * (Math.PI / 180);
}

/**
 * Format distance for display
 */
export function formatDistance(km: number): string {
  if (km < 1) {
    return `${Math.round(km * 1000)}m`;
  }
  if (km < 10) {
    return `${km.toFixed(1)}km`;
  }
  return `${Math.round(km)}km`;
}

// ==================== DIRECTIONS ====================

export type NavigationApp = 'google' | 'apple' | 'waze';

/**
 * Generate URL for navigation apps
 */
export function getDirectionsUrl(
  dealer: DealerEntry,
  app: NavigationApp = 'google'
): string {
  const { lat, lng } = dealer.coordinates;
  const address = encodeURIComponent(`${dealer.address}, ${dealer.city}, ${dealer.country}`);

  const urls: Record<NavigationApp, string> = {
    google: `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`,
    apple: `http://maps.apple.com/?daddr=${lat},${lng}`,
    waze: `https://waze.com/ul?ll=${lat},${lng}&navigate=yes`,
  };

  return urls[app];
}

/**
 * Open directions in appropriate app based on device
 */
export function openDirections(dealer: DealerEntry, app?: NavigationApp): void {
  const userAgent = typeof navigator !== 'undefined' ? navigator.userAgent : '';
  const isIOS = /iPad|iPhone|iPod/.test(userAgent);
  const isAndroid = /Android/.test(userAgent);

  // Smart app selection
  let selectedApp: NavigationApp = app || 'google';
  if (!app) {
    if (isIOS) {
      selectedApp = 'apple';
    } else if (isAndroid) {
      selectedApp = 'google';
    }
  }

  const url = getDirectionsUrl(dealer, selectedApp);
  window.open(url, '_blank');
}

// ==================== OPERATING HOURS ====================

export type DayOfWeek = 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday';

export type OperatingHours = {
  [K in DayOfWeek]: string | 'Closed';
};

export type SpecialHours = {
  date: string;
  hours: string;
  reason: string;
};

/**
 * Check if dealer is currently open
 */
export function isOpenNow(hours: OperatingHours, timezone: string = 'Africa/Accra'): boolean {
  try {
    const now = new Date();
    
    // Convert to dealer's timezone
    const dealerTime = new Date(
      now.toLocaleString('en-US', { timeZone: timezone })
    );
    
    const dayName = dealerTime
      .toLocaleDateString('en-US', { weekday: 'long' })
      .toLowerCase() as DayOfWeek;
    
    const currentMinutes = dealerTime.getHours() * 60 + dealerTime.getMinutes();
    
    const dayHours = hours[dayName];
    if (!dayHours || dayHours === 'Closed') return false;
    
    // Parse hours (e.g., "08:00-18:00")
    const [openTime, closeTime] = dayHours.split('-');
    const openMinutes = parseTimeToMinutes(openTime);
    const closeMinutes = parseTimeToMinutes(closeTime);
    
    return currentMinutes >= openMinutes && currentMinutes <= closeMinutes;
  } catch {
    return false;
  }
}

/**
 * Parse time string to minutes since midnight
 */
function parseTimeToMinutes(time: string): number {
  const [hours, minutes] = time.split(':').map(Number);
  return hours * 60 + minutes;
}

/**
 * Get next opening time for a dealer
 */
export function getNextOpenTime(hours: OperatingHours, timezone: string = 'Africa/Accra'): string {
  try {
    const now = new Date();
    const dealerTime = new Date(now.toLocaleString('en-US', { timeZone: timezone }));
    
    const days: DayOfWeek[] = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
    const today = dealerTime.getDay();
    const currentMinutes = dealerTime.getHours() * 60 + dealerTime.getMinutes();
    
    // Check if opening later today
    const todayName = days[today];
    const todayHours = hours[todayName];
    
    if (todayHours && todayHours !== 'Closed') {
      const [openTime] = todayHours.split('-');
      const openMinutes = parseTimeToMinutes(openTime);
      
      if (openMinutes > currentMinutes) {
        return `${format12Hour(openTime)} today`;
      }
    }
    
    // Check next 7 days
    for (let i = 1; i <= 7; i++) {
      const nextDayIndex = (today + i) % 7;
      const nextDayName = days[nextDayIndex];
      const nextDayHours = hours[nextDayName];
      
      if (nextDayHours && nextDayHours !== 'Closed') {
        const [openTime] = nextDayHours.split('-');
        const dayLabel = i === 1 ? 'tomorrow' : nextDayName.charAt(0).toUpperCase() + nextDayName.slice(1);
        return `${dayLabel} at ${format12Hour(openTime)}`;
      }
    }
    
    return 'Hours not available';
  } catch {
    return 'Hours not available';
  }
}

/**
 * Format time from 24h to 12h format
 */
export function format12Hour(time: string): string {
  const [hours, minutes] = time.split(':').map(Number);
  const period = hours >= 12 ? 'PM' : 'AM';
  const hour12 = hours % 12 || 12;
  return `${hour12}:${minutes.toString().padStart(2, '0')} ${period}`;
}

/**
 * Format hours range for display
 */
export function formatHoursRange(hours: string): string {
  if (hours === 'Closed') return 'Closed';
  const [open, close] = hours.split('-');
  return `${format12Hour(open)} - ${format12Hour(close)}`;
}

/**
 * Get current day name
 */
export function getCurrentDay(): DayOfWeek {
  const days: DayOfWeek[] = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
  return days[new Date().getDay()];
}

/**
 * Get closing time for today
 */
export function getClosingTime(hours: OperatingHours): string | null {
  const today = getCurrentDay();
  const todayHours = hours[today];
  
  if (!todayHours || todayHours === 'Closed') return null;
  
  const [, closeTime] = todayHours.split('-');
  return format12Hour(closeTime);
}

// ==================== PHONE FORMATTING ====================

/**
 * Format phone number for display
 */
export function formatPhoneNumber(phone: string): string {
  // Remove all non-digit characters except +
  const cleaned = phone.replace(/[^\d+]/g, '');
  
  // Format: +233 20 123 4567 (example)
  const match = cleaned.match(/(\+\d{1,3})(\d{2})(\d{3})(\d{4})/);
  if (match) {
    return `${match[1]} ${match[2]} ${match[3]} ${match[4]}`;
  }
  
  return cleaned;
}

/**
 * Get phone number for WhatsApp (digits only)
 */
export function getWhatsAppNumber(phone: string): string {
  return phone.replace(/\D/g, '');
}

/**
 * Generate WhatsApp message
 */
export function getWhatsAppMessage(dealerName: string): string {
  return encodeURIComponent(
    `Hi ${dealerName}, I found you on the APSONIC website. I'm interested in learning more about your services.`
  );
}

// ==================== RATING & REVIEWS ====================

/**
 * Generate star rating HTML string
 */
export function generateStarRating(rating: number): string {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  let stars = '';
  
  for (let i = 0; i < fullStars; i++) {
    stars += '★';
  }
  
  if (hasHalfStar) {
    stars += '⯪';
  }
  
  for (let i = 0; i < emptyStars; i++) {
    stars += '☆';
  }
  
  return stars;
}

/**
 * Get rating color based on score
 */
export function getRatingColor(rating: number): string {
  if (rating >= 4.5) return 'text-green-400';
  if (rating >= 4.0) return 'text-green-500';
  if (rating >= 3.5) return 'text-yellow-400';
  if (rating >= 3.0) return 'text-yellow-500';
  return 'text-orange-500';
}

// ==================== FILTERING & SORTING ====================

/**
 * Sort dealers by distance from user location
 */
export function sortByDistance(
  dealers: DealerEntry[],
  userLocation: Coordinates
): DealerEntry[] {
  return [...dealers].sort((a, b) => {
    const distanceA = calculateDistance(
      userLocation.lat,
      userLocation.lng,
      a.coordinates.lat,
      a.coordinates.lng
    );
    const distanceB = calculateDistance(
      userLocation.lat,
      userLocation.lng,
      b.coordinates.lat,
      b.coordinates.lng
    );
    return distanceA - distanceB;
  });
}

/**
 * Sort dealers by rating
 */
export function sortByRating(dealers: DealerEntry[]): DealerEntry[] {
  return [...dealers].sort((a, b) => {
    const ratingA = a.rating || 0;
    const ratingB = b.rating || 0;
    return ratingB - ratingA;
  });
}

/**
 * Sort dealers by review count
 */
export function sortByReviews(dealers: DealerEntry[]): DealerEntry[] {
  return [...dealers].sort((a, b) => {
    const reviewsA = a.reviewCount || 0;
    const reviewsB = b.reviewCount || 0;
    return reviewsB - reviewsA;
  });
}

// ==================== GEOLOCATION ====================

/**
 * Request user's geolocation
 */
export async function requestGeolocation(): Promise<Coordinates> {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('Geolocation not supported'));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      },
      (error) => {
        reject(error);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    );
  });
}

// ==================== DEALER SCORING ====================

/**
 * Calculate dealer score for ranking/featuring
 */
export function calculateDealerScore(dealer: DealerEntry): number {
  const ratingScore = (dealer.rating || 0) * 20; // Max 100 points
  const reviewScore = Math.min(dealer.reviewCount || 0, 100); // Max 100 points
  const badgeScore = dealer.badge ? 50 : 0; // 50 points for having a badge
  
  return ratingScore + reviewScore + badgeScore;
}

/**
 * Get top dealers by score
 */
export function getTopDealers(dealers: DealerEntry[], count: number = 5): DealerEntry[] {
  return [...dealers]
    .sort((a, b) => calculateDealerScore(b) - calculateDealerScore(a))
    .slice(0, count);
}

