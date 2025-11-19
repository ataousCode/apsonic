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


