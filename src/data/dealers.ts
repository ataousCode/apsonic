export type DealerCategory = "sales" | "service" | "training" | "spares";

export type DayOfWeek = "monday" | "tuesday" | "wednesday" | "thursday" | "friday" | "saturday" | "sunday";

export type DealerCoordinates = {
  lat: number;
  lng: number;
};

export type DealerPhotos = {
  storefront: string;
  interior?: string[];
  featured?: string;
};

export type OperatingHours = {
  [K in DayOfWeek]: string | "Closed";
};

export type SpecialHours = {
  date: string;
  hours: string;
  reason: string;
};

export type AfricanRegion = "West Africa" | "East Africa" | "Central Africa" | "Southern Africa" | "North Africa";

export type DealerEntry = {
  id: string;
  country: string;
  city: string;
  region: AfricanRegion;
  name: string;
  address: string;
  coordinates: DealerCoordinates;
  photos?: DealerPhotos;
  contacts: {
    phone: string;
    whatsapp?: string;
    email?: string;
  };
  languages: string[];
  categories: DealerCategory[];
  badge?: string;
  rating?: number;
  reviewCount?: number;
  // Extended fields
  hours?: OperatingHours;
  timezone?: string;
  specialHours?: SpecialHours[];
  servicesOffered?: string[];
  paymentMethods?: string[];
  certifications?: string[];
  awards?: string[];
  verifiedDealer?: boolean;
  responseTime?: string; // e.g., "< 2 hours"
};

export const dealerPresenceCountries = [
  "Ghana",
  "Burkina Faso",
  "Togo",
  "Côte d’Ivoire",
  "Nigeria",
  "Mali",
  "Niger",
  "Benin",
  "Sierra Leone",
  "Liberia",
];

export const dealerFilters: { label: string; slug: DealerCategory }[] = [
  { label: "Sales Offices", slug: "sales" },
  { label: "Service Hubs", slug: "service" },
  { label: "Training Labs", slug: "training" },
  { label: "Spare Depots", slug: "spares" },
];

export const dealerInsights = [
  { label: "Countries", value: "17", detail: "Across Africa" },
  { label: "Dealers", value: "18", detail: "And growing" },
  { label: "Regions", value: "4", detail: "Continental coverage" },
];

export const dealerEntries: DealerEntry[] = [
  // WEST AFRICA
  {
    id: "gh-accra-central",
    country: "Ghana",
    city: "Accra",
    region: "West Africa",
    name: "APSONIC Mobility Accra",
    address: "Ring Road Central, Opp. Opeibea House",
    coordinates: { lat: 5.6037, lng: -0.1870 },
    photos: {
      storefront: "/assets/images/home/img14.jpg",
      featured: "/assets/images/home/img21.jpg",
      interior: ["/assets/images/home/img15.jpg"]
    },
    contacts: { phone: "+233 30 267 1122", whatsapp: "+233 55 123 9900", email: "accra@apsonic.africa" },
    languages: ["EN"],
    categories: ["sales", "service", "spares"],
    badge: "West Africa HQ",
    rating: 4.8,
    reviewCount: 127,
    hours: {
      monday: "08:00-18:00",
      tuesday: "08:00-18:00",
      wednesday: "08:00-18:00",
      thursday: "08:00-18:00",
      friday: "08:00-18:00",
      saturday: "09:00-17:00",
      sunday: "Closed",
    },
    timezone: "Africa/Accra",
    servicesOffered: ["Sales", "Service & Repair", "Parts & Accessories", "Test Rides", "Financing Available"],
    paymentMethods: ["Cash", "Mobile Money", "Bank Transfer", "Credit/Debit Cards"],
    certifications: ["APSONIC Certified", "Service Excellence"],
    awards: ["Top Rated 2024", "Sales Champion"],
    verifiedDealer: true,
    responseTime: "< 2 hours",
  },
  {
    id: "bf-ouaga-north",
    country: "Burkina Faso",
    city: "Ouagadougou",
    region: "West Africa",
    name: "Ouaga Northern Corridor",
    address: "Avenue de l'Amitié, Secteur 19",
    coordinates: { lat: 12.3714, lng: -1.5197 },
    photos: {
      storefront: "/assets/images/home/img15.jpg",
    },
    contacts: { phone: "+226 25 360 112", email: "ouaga@apsonic.africa" },
    languages: ["FR"],
    categories: ["sales", "service"],
    rating: 4.5,
    reviewCount: 89,
  },
  {
    id: "tg-lome-harbour",
    country: "Togo",
    city: "Lomé",
    region: "West Africa",
    name: "Lomé Harbour Distribution",
    address: "Boulevard du Mono, Zone Portuaire",
    coordinates: { lat: 6.1256, lng: 1.2116 },
    photos: {
      storefront: "/assets/images/home/img16.jpg",
    },
    contacts: { phone: "+228 22 213 990", whatsapp: "+228 93 556 002" },
    languages: ["FR"],
    categories: ["sales", "spares"],
    rating: 4.6,
    reviewCount: 74,
  },
  {
    id: "ci-abidjan-yop",
    country: "Côte d'Ivoire",
    city: "Abidjan",
    region: "West Africa",
    name: "Yopougon Distributor Lab",
    address: "Zone Industrielle, Rue des Ateliers",
    coordinates: { lat: 5.3600, lng: -4.0083 },
    photos: {
      storefront: "/assets/images/home/img21.jpg",
      featured: "/assets/images/home/img26.jpg",
    },
    contacts: { phone: "+225 27 215 4433", whatsapp: "+225 05 656 8899", email: "abidjan@apsonic.africa" },
    languages: ["FR"],
    categories: ["sales", "service", "training"],
    rating: 4.9,
    reviewCount: 156,
  },
  {
    id: "ng-lagos-apapa",
    country: "Nigeria",
    city: "Lagos",
    region: "West Africa",
    name: "Apapa Service Command",
    address: "Warehouse 08, Creek Road, Apapa",
    coordinates: { lat: 6.4500, lng: 3.3833 },
    photos: {
      storefront: "/assets/images/home/img15.jpg",
    },
    contacts: { phone: "+234 1 700 8822", email: "lagos.ops@apsonic.africa", whatsapp: "+234 80 123 4567" },
    languages: ["EN"],
    categories: ["service", "spares"],
    badge: "Port Logistics",
    rating: 4.7,
    reviewCount: 203,
    hours: {
      monday: "07:00-19:00",
      tuesday: "07:00-19:00",
      wednesday: "07:00-19:00",
      thursday: "07:00-19:00",
      friday: "07:00-19:00",
      saturday: "08:00-16:00",
      sunday: "Closed",
    },
    timezone: "Africa/Lagos",
    servicesOffered: ["Service & Repair", "Parts & Accessories", "Warranty Support"],
    paymentMethods: ["Cash", "Bank Transfer", "Credit/Debit Cards"],
    certifications: ["APSONIC Certified"],
    verifiedDealer: true,
    responseTime: "< 3 hours",
  },
  {
    id: "ml-bamako-tech",
    country: "Mali",
    city: "Bamako",
    region: "West Africa",
    name: "Bamako Tech Campus",
    address: "Route de Koulikoro, Zone Industrielle",
    coordinates: { lat: 12.6392, lng: -8.0029 },
    photos: {
      storefront: "/assets/images/home/img14.jpg",
      interior: ["/assets/images/home/img21.jpg"],
    },
    contacts: { phone: "+223 20 29 8855", whatsapp: "+223 60 12 3456", email: "bamako@apsonic.africa" },
    languages: ["FR"],
    categories: ["training", "service"],
    badge: "OEM Academy",
    rating: 4.9,
    reviewCount: 92,
  },
  {
    id: "ne-niamey-sahara",
    country: "Niger",
    city: "Niamey",
    region: "West Africa",
    name: "Sahara Logistics Pod",
    address: "Plateau, Boulevard Mali Béro",
    coordinates: { lat: 13.5127, lng: 2.1126 },
    photos: {
      storefront: "/assets/images/home/img16.jpg",
    },
    contacts: { phone: "+227 20 735 550", whatsapp: "+227 90 123 456" },
    languages: ["FR"],
    categories: ["service", "spares"],
    rating: 4.4,
    reviewCount: 58,
  },
  {
    id: "bj-cotonou-axis",
    country: "Benin",
    city: "Cotonou",
    region: "West Africa",
    name: "Coastal Axis Hub",
    address: "Rue 2100, Ganhi Business District",
    coordinates: { lat: 6.3654, lng: 2.4183 },
    photos: {
      storefront: "/assets/images/home/img21.jpg",
    },
    contacts: { phone: "+229 21 317 200", whatsapp: "+229 97 123 456" },
    languages: ["FR"],
    categories: ["sales", "service"],
    rating: 4.6,
    reviewCount: 81,
  },
  {
    id: "sl-freetown-ridge",
    country: "Sierra Leone",
    city: "Freetown",
    region: "West Africa",
    name: "Freetown Spur Road Center",
    address: "Spur Road, Hill Station",
    coordinates: { lat: 8.4840, lng: -13.2299 },
    photos: {
      storefront: "/assets/images/home/img15.jpg",
    },
    contacts: { phone: "+232 22 222 190", whatsapp: "+232 76 441 990" },
    languages: ["EN"],
    categories: ["sales", "service", "spares"],
    rating: 4.5,
    reviewCount: 67,
  },
  {
    id: "lr-monrovia-bridge",
    country: "Liberia",
    city: "Monrovia",
    region: "West Africa",
    name: "Monrovia Bridge Service",
    address: "Bushrod Island, Somalia Drive",
    coordinates: { lat: 6.3156, lng: -10.8074 },
    photos: {
      storefront: "/assets/images/home/img14.jpg",
    },
    contacts: { phone: "+231 77 600 123", whatsapp: "+231 88 600 123" },
    languages: ["EN"],
    categories: ["service", "spares"],
    rating: 4.3,
    reviewCount: 45,
  },

  // EAST AFRICA
  {
    id: "ke-nairobi-central",
    country: "Kenya",
    city: "Nairobi",
    region: "East Africa",
    name: "APSONIC Nairobi Hub",
    address: "Mombasa Road, Industrial Area",
    coordinates: { lat: -1.2864, lng: 36.8172 },
    photos: {
      storefront: "/assets/images/home/img14.jpg",
    },
    contacts: { phone: "+254 20 123 4567", whatsapp: "+254 712 345 678", email: "nairobi@apsonic.africa" },
    languages: ["EN", "SW"],
    categories: ["sales", "service", "spares"],
    badge: "East Africa HQ",
    rating: 4.8,
    reviewCount: 198,
    hours: {
      monday: "08:00-18:00",
      tuesday: "08:00-18:00",
      wednesday: "08:00-18:00",
      thursday: "08:00-18:00",
      friday: "08:00-18:00",
      saturday: "09:00-15:00",
      sunday: "Closed",
    },
    timezone: "Africa/Nairobi",
    servicesOffered: ["Sales", "Service & Repair", "Parts & Accessories", "Training", "Test Rides"],
    paymentMethods: ["Cash", "Mobile Money", "Bank Transfer", "Credit/Debit Cards"],
    certifications: ["APSONIC Certified", "Service Excellence"],
    awards: ["Top Rated 2024"],
    verifiedDealer: true,
    responseTime: "< 1 hour",
  },
  {
    id: "tz-daressalaam-main",
    country: "Tanzania",
    city: "Dar es Salaam",
    region: "East Africa",
    name: "Dar es Salaam Distribution",
    address: "Nyerere Road, Temeke District",
    coordinates: { lat: -6.7924, lng: 39.2083 },
    photos: {
      storefront: "/assets/images/home/img21.jpg",
    },
    contacts: { phone: "+255 22 211 3344", whatsapp: "+255 754 123 456" },
    languages: ["EN", "SW"],
    categories: ["sales", "service"],
    rating: 4.6,
    reviewCount: 134,
  },
  {
    id: "ug-kampala-central",
    country: "Uganda",
    city: "Kampala",
    region: "East Africa",
    name: "Kampala Service Center",
    address: "Jinja Road, Industrial Zone",
    coordinates: { lat: 0.3136, lng: 32.5811 },
    photos: {
      storefront: "/assets/images/home/img15.jpg",
    },
    contacts: { phone: "+256 41 234 567", whatsapp: "+256 772 123 456", email: "kampala@apsonic.africa" },
    languages: ["EN"],
    categories: ["service", "spares", "training"],
    rating: 4.7,
    reviewCount: 112,
  },
  {
    id: "rw-kigali-main",
    country: "Rwanda",
    city: "Kigali",
    region: "East Africa",
    name: "Kigali Mobility Hub",
    address: "KG 7 Avenue, Kicukiro",
    coordinates: { lat: -1.9441, lng: 30.0619 },
    photos: {
      storefront: "/assets/images/home/img16.jpg",
    },
    contacts: { phone: "+250 788 123 456", whatsapp: "+250 788 123 456" },
    languages: ["EN", "FR"],
    categories: ["sales", "service"],
    rating: 4.8,
    reviewCount: 89,
  },

  // SOUTHERN AFRICA
  {
    id: "za-johannesburg-main",
    country: "South Africa",
    city: "Johannesburg",
    region: "Southern Africa",
    name: "Johannesburg Regional Office",
    address: "Main Reef Road, City Deep",
    coordinates: { lat: -26.2041, lng: 28.0473 },
    photos: {
      storefront: "/assets/images/home/img14.jpg",
    },
    contacts: { phone: "+27 11 234 5678", whatsapp: "+27 82 123 4567", email: "jhb@apsonic.africa" },
    languages: ["EN"],
    categories: ["sales", "service", "spares", "training"],
    badge: "Southern Africa HQ",
    rating: 4.9,
    reviewCount: 245,
  },
  {
    id: "zm-lusaka-main",
    country: "Zambia",
    city: "Lusaka",
    region: "Southern Africa",
    name: "Lusaka Distribution Center",
    address: "Lumumba Road, Industrial Area",
    coordinates: { lat: -15.3875, lng: 28.3228 },
    photos: {
      storefront: "/assets/images/home/img21.jpg",
    },
    contacts: { phone: "+260 211 234 567", whatsapp: "+260 977 123 456" },
    languages: ["EN"],
    categories: ["sales", "service"],
    rating: 4.5,
    reviewCount: 76,
  },

  // CENTRAL AFRICA
  {
    id: "cm-douala-main",
    country: "Cameroon",
    city: "Douala",
    region: "Central Africa",
    name: "Douala Logistics Hub",
    address: "Boulevard de la Liberté, Bonabéri",
    coordinates: { lat: 4.0511, lng: 9.7679 },
    photos: {
      storefront: "/assets/images/home/img15.jpg",
    },
    contacts: { phone: "+237 233 421 234", whatsapp: "+237 677 123 456", email: "douala@apsonic.africa" },
    languages: ["FR", "EN"],
    categories: ["sales", "service", "spares"],
    badge: "Central Africa Hub",
    rating: 4.7,
    reviewCount: 123,
  },
];

