export type ModelCarouselItem = {
  id: string;
  name: string;
  imageSrc: string;
  specs: string;
  slug: string;
};

export const heroImages = [
  "/assets/images/home/img1.png",
  "/assets/images/home/img2.jpeg",
  "/assets/images/home/img3.png",
];

export const latest360Bike = {
  title: "APSONIC ADV 250X",
  subtitle: "Latest Model",
  description: "Our most advanced adventure motorcycle yet. Built for African terrain with enhanced suspension, powerful EFI engine, and premium components. Experience the future of mobility.",
  images: [
    "/assets/images/home/img1.png", // Front view
    "/assets/images/home/img2.jpeg", // Side view
    "/assets/images/home/img3.png", // Rear view
    "/assets/images/home/img4.png", // Other side view
  ],
  specs: [
    { label: "Engine", value: "250cc EFI" },
    { label: "Power", value: "18.5 HP" },
    { label: "Transmission", value: "6-Speed" },
    { label: "Range", value: "450 km" },
  ],
};

export const modelsCarouselItems: ModelCarouselItem[] = [
  {
    id: "adv-200",
    name: "Apsonic ADV 200",
    imageSrc: "/assets/images/home/img1.png",
    specs: "200cc • 6-speed",
    slug: "adv-200",
  },
  {
    id: "street-150",
    name: "Apsonic Street 150",
    imageSrc: "/assets/images/home/img2.jpeg",
    specs: "150cc • EFI",
    slug: "street-150",
  },
  {
    id: "cargo-125",
    name: "Apsonic Cargo 125",
    imageSrc: "/assets/images/home/img3.png",
    specs: "125cc • Cargo Rack",
    slug: "cargo-125",
  },
];

export const viewerFrames = [
  "/assets/images/home/img1.png",
  "/assets/images/home/img2.jpeg",
  "/assets/images/home/img3.png",
  "/assets/images/home/img4.png",
];

export const heroStats = [
  { label: "Active riders", value: "500K+" },
  { label: "African markets", value: "26" },
  { label: "Certified workshops", value: "1,200+" },
  { label: "Official AFCON Sponsor", value: "2024 • 2026" },
];

export const serviceAdvantages = [
  { title: "After-sales Command Centers", desc: "24/7 bilingual support routes with rapid dispatch." },
  { title: "Predictive Maintenance", desc: "Telematics-ready kits keep fleets on the road longer." },
  { title: "Authentic Spare Grid", desc: "Nationwide depots stocked with OEM-grade components." },
  { title: "Pan-African Dealer Mesh", desc: "1,200+ certified partners spanning urban & rural corridors." },
];

export const impactHighlights = [
  {
    title: "Localized durability",
    description: "Frames engineered for corrugated roads, desert heat, and heavy payloads.",
  },
  {
    title: "Low operating cost",
    description: "Fuel-efficient powertrains and modular parts keep ownership cost predictable.",
  },
  {
    title: "Inclusive financing",
    description: "Distributor tooling and embedded partners unlock SME fleet expansion.",
  },
];

export const dealerInsights = [
  { label: "Countries onboarded", value: "26", detail: "From Ghana to Niger" },
  { label: "Regional training hubs", value: "14", detail: "Run by OEM engineers" },
  { label: "Average service radius", value: "< 60 km", detail: "Maintains uptime" },
];

// Feature Showcase - Deep dive into APSONIC quality
export const featureShowcase = [
  {
    id: "durability",
    category: "Built for Africa",
    title: "Engineered for every terrain.",
    description:
      "From the red dust of Sahel to monsoon-soaked Lagos streets, APSONIC motorcycles are designed to thrive where others fail. Reinforced frames, corrosion-resistant components, and superior suspension systems ensure your bike performs reliably across Africa's most demanding environments.",
    image: "/assets/images/home/img1.png",
    imageAlt: "APSONIC motorcycle on African terrain",
    darkBg: false,
  },
  {
    id: "affordability",
    category: "Good Quality • Good Life",
    title: "Premium quality. Accessible pricing.",
    description:
      "We believe quality mobility shouldn't be a luxury. APSONIC delivers professional-grade motorcycles at prices that empower African entrepreneurs, delivery riders, and families. Our fuel-efficient engines reduce daily costs, while durable construction minimizes maintenance expenses.",
    image: "/assets/images/home/img2.jpeg",
    imageAlt: "APSONIC affordable motorcycle",
    darkBg: true,
  },
  {
    id: "service",
    category: "Pan-African Network",
    title: "Never far from expert support.",
    description:
      "With over 1,200 certified service centers across 26 African countries, APSONIC ensures you're never alone on the road. Our technicians receive factory training, genuine spare parts are always in stock, and multilingual support teams understand your local needs.",
    image: "/assets/images/home/img3.png",
    imageAlt: "APSONIC service network",
    darkBg: false,
  },
  {
    id: "innovation",
    category: "Future-Ready",
    title: "Technology that works for Africa.",
    description:
      "APSONIC integrates smart technology designed for real African conditions. Telematics-ready systems for fleet management, fuel-efficient EFI engines adapted for local fuel quality, and modular designs that simplify repairs in remote areas. Innovation that serves your daily reality.",
    image: "/assets/images/home/img4.png",
    imageAlt: "APSONIC technology",
    darkBg: true,
  },
];

// Feature Cards - "Get to know APSONIC" style with auto-rotating images
export const featureCards = [
  {
    id: "design",
    category: "Innovation",
    title: "Beautiful and durable, by design.",
    description:
      "Every APSONIC motorcycle combines African-inspired aesthetics with world-class engineering.",
    images: [
      "/assets/images/home/img1.png",
      "/assets/images/home/img2.jpeg",
      "/assets/images/home/img3.png",
    ],
    imageAlt: "APSONIC design",
    expandedContent:
      "Our design philosophy honors African craftsmanship while leveraging modern manufacturing. Vibrant colors reflect our continent's energy, while reinforced construction ensures longevity on challenging roads.",
  },
  {
    id: "power",
    category: "Performance",
    title: "Power that moves Africa forward.",
    description:
      "From 125cc urban efficiency to 250cc adventure capability, we have the right engine for every journey.",
    images: [
      "/assets/images/home/img2.jpeg",
      "/assets/images/home/img4.png",
      "/assets/images/home/img1.png",
    ],
    imageAlt: "APSONIC engine power",
    expandedContent:
      "Our engines are calibrated for African fuel standards and climate conditions. Advanced cooling systems prevent overheating in Sahel heat, while robust air filters handle dust that would clog lesser bikes.",
  },
  {
    id: "cargo",
    category: "Versatility",
    title: "Built to carry your business.",
    description:
      "Reinforced cargo racks and payload capacity designed for African entrepreneurs.",
    images: [
      "/assets/images/home/img3.png",
      "/assets/images/home/img1.png",
      "/assets/images/home/img2.jpeg",
    ],
    imageAlt: "APSONIC cargo capacity",
    expandedContent:
      "Whether transporting goods to market, delivering packages across cities, or carrying farming supplies to rural communities, APSONIC cargo bikes are engineered to handle heavy loads while maintaining stability and fuel efficiency.",
  },
  {
    id: "community",
    category: "APSONIC in Africa",
    title: "More than machines. A community.",
    description:
      "Join 500,000+ riders across Africa who trust APSONIC for their daily mobility.",
    images: [
      "/assets/images/home/img4.png",
      "/assets/images/home/img3.png",
      "/assets/images/home/img2.jpeg",
    ],
    imageAlt: "APSONIC community",
    expandedContent:
      "APSONIC riders are taxi drivers in Accra, delivery heroes in Lagos, farmers in rural Mali, and entrepreneurs everywhere. We support rider cooperatives, offer flexible financing through local partners, and celebrate the vital role motorcycles play in African development.",
  },
];


