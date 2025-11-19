export type DealerCategory = "sales" | "service" | "training" | "spares";

export type DealerCoordinates = {
  lat: number;
  lng: number;
};

export type DealerPhotos = {
  storefront: string;
  interior?: string[];
  featured?: string;
};

export type DealerEntry = {
  id: string;
  country: string;
  city: string;
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
  { label: "African markets", value: "26", detail: "From Ghana to Niger" },
  { label: "Training academies", value: "14", detail: "Run by OEM engineers" },
  { label: "Average service radius", value: "< 60 km", detail: "Keeps fleets on the road" },
];

export const dealerEntries: DealerEntry[] = [
  {
    id: "gh-accra-central",
    country: "Ghana",
    city: "Accra",
    name: "APSONIC Mobility Accra",
    address: "Ring Road Central, Opp. Opeibea House",
    coordinates: { lat: 5.6037, lng: -0.1870 },
    photos: {
      storefront: "/assets/images/home/img1.png",
      featured: "/assets/images/home/img2.jpeg",
      interior: ["/assets/images/home/img3.png"]
    },
    contacts: { phone: "+233 30 267 1122", whatsapp: "+233 55 123 9900" },
    languages: ["EN"],
    categories: ["sales", "service", "spares"],
    badge: "West Africa HQ",
    rating: 4.8,
    reviewCount: 127,
  },
  {
    id: "bf-ouaga-north",
    country: "Burkina Faso",
    city: "Ouagadougou",
    name: "Ouaga Northern Corridor",
    address: "Avenue de l'Amitié, Secteur 19",
    coordinates: { lat: 12.3714, lng: -1.5197 },
    photos: {
      storefront: "/assets/images/home/img3.png",
    },
    contacts: { phone: "+226 25 360 112" },
    languages: ["FR"],
    categories: ["sales", "service"],
    rating: 4.5,
    reviewCount: 89,
  },
  {
    id: "tg-lome-harbour",
    country: "Togo",
    city: "Lomé",
    name: "Lomé Harbour Distribution",
    address: "Boulevard du Mono, Zone Portuaire",
    coordinates: { lat: 6.1256, lng: 1.2116 },
    photos: {
      storefront: "/assets/images/home/img4.png",
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
    name: "Yopougon Distributor Lab",
    address: "Zone Industrielle, Rue des Ateliers",
    coordinates: { lat: 5.3600, lng: -4.0083 },
    photos: {
      storefront: "/assets/images/home/img2.jpeg",
      featured: "/assets/images/home/img1.png",
    },
    contacts: { phone: "+225 27 215 4433", whatsapp: "+225 05 656 8899" },
    languages: ["FR"],
    categories: ["sales", "service", "training"],
    rating: 4.9,
    reviewCount: 156,
  },
  {
    id: "ng-lagos-apapa",
    country: "Nigeria",
    city: "Lagos",
    name: "Apapa Service Command",
    address: "Warehouse 08, Creek Road, Apapa",
    coordinates: { lat: 6.4500, lng: 3.3833 },
    photos: {
      storefront: "/assets/images/home/img3.png",
    },
    contacts: { phone: "+234 1 700 8822", email: "lagos.ops@apsonic.africa" },
    languages: ["EN"],
    categories: ["service", "spares"],
    badge: "Port Logistics",
    rating: 4.7,
    reviewCount: 203,
  },
  {
    id: "ml-bamako-tech",
    country: "Mali",
    city: "Bamako",
    name: "Bamako Tech Campus",
    address: "Route de Koulikoro, Zone Industrielle",
    coordinates: { lat: 12.6392, lng: -8.0029 },
    photos: {
      storefront: "/assets/images/home/img1.png",
      interior: ["/assets/images/home/img2.jpeg"],
    },
    contacts: { phone: "+223 20 29 8855", whatsapp: "+223 60 12 3456" },
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
    name: "Sahara Logistics Pod",
    address: "Plateau, Boulevard Mali Béro",
    coordinates: { lat: 13.5127, lng: 2.1126 },
    photos: {
      storefront: "/assets/images/home/img4.png",
    },
    contacts: { phone: "+227 20 735 550" },
    languages: ["FR"],
    categories: ["service", "spares"],
    rating: 4.4,
    reviewCount: 58,
  },
  {
    id: "bj-cotonou-axis",
    country: "Benin",
    city: "Cotonou",
    name: "Coastal Axis Hub",
    address: "Rue 2100, Ganhi Business District",
    coordinates: { lat: 6.3654, lng: 2.4183 },
    photos: {
      storefront: "/assets/images/home/img2.jpeg",
    },
    contacts: { phone: "+229 21 317 200" },
    languages: ["FR"],
    categories: ["sales", "service"],
    rating: 4.6,
    reviewCount: 81,
  },
  {
    id: "sl-freetown-ridge",
    country: "Sierra Leone",
    city: "Freetown",
    name: "Freetown Spur Road Center",
    address: "Spur Road, Hill Station",
    coordinates: { lat: 8.4840, lng: -13.2299 },
    photos: {
      storefront: "/assets/images/home/img3.png",
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
    name: "Monrovia Bridge Service",
    address: "Bushrod Island, Somalia Drive",
    coordinates: { lat: 6.3156, lng: -10.8074 },
    photos: {
      storefront: "/assets/images/home/img1.png",
    },
    contacts: { phone: "+231 77 600 123" },
    languages: ["EN"],
    categories: ["service", "spares"],
    rating: 4.3,
    reviewCount: 45,
  },
];

