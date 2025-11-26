export type ModelCarouselItem = {
  id: string;
  name: string;
  imageSrc: string;
  specs: string;
  slug: string;
};

export const heroImages = [
  "/assets/images/home/img26.jpg",
  "/assets/images/home/img23.jpg",
  "/assets/images/home/img22.jpg",
  "/assets/images/home/img21.jpg",
];

export const latest360Bike = {
  title: "APSONIC ADV 250X",
  subtitle: "Latest Model",
  description: "Our most advanced adventure motorcycle yet. Built for African terrain with enhanced suspension, powerful EFI engine, and premium components. Experience the future of mobility.",
  images: [
    "/assets/images/home/img26.jpg", // Front view
    "/assets/images/home/img23.jpg", // Side view
    "/assets/images/home/img22.jpg", // Rear view
    "/assets/images/home/img21.jpg", // Other side view
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
    imageSrc: "/assets/images/home/img24.jpg",
    specs: "200cc • 6-speed",
    slug: "adv-200",
  },
  {
    id: "street-150",
    name: "Apsonic Street 150",
    imageSrc: "/assets/images/home/img25.jpg",
    specs: "150cc • EFI",
    slug: "street-150",
  },
  {
    id: "cargo-125",
    name: "Apsonic Cargo 125",
    imageSrc: "/assets/images/home/img20.jpg",
    specs: "125cc • Cargo Rack",
    slug: "cargo-125",
  },
  {
    id: "sport-model",
    name: "Apsonic Sport",
    imageSrc: "/assets/images/home/img5.jpg",
    specs: "150cc • Sport",
    slug: "sport-150",
  },
  {
    id: "urban-model",
    name: "Apsonic Urban",
    imageSrc: "/assets/images/home/img8.jpg",
    specs: "125cc • City",
    slug: "urban-125",
  },
  {
    id: "cargo-pro",
    name: "Apsonic Cargo Pro",
    imageSrc: "/assets/images/home/img11.jpg",
    specs: "150cc • Heavy Duty",
    slug: "cargo-150-pro",
  },
];

export const viewerFrames = [
  "/assets/images/home/img15.jpg",
  "/assets/images/home/img16.jpg",
  "/assets/images/home/img17.jpg",
  "/assets/images/home/img18.jpg",
  "/assets/images/home/img19.jpg",
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
];

// Feature Cards - "Get to know APSONIC" - Apple style with large auto-rotating images
export const featureCards = [
  {
    id: "design",
    category: "Innovation",
    title: "Beautiful and durable,",
    subtitle: "by design.",
    images: [
      "/assets/images/home/img5.jpg",
      "/assets/images/home/img6.jpg",
      "/assets/images/home/img7.jpg",
    ],
    imageAlt: "APSONIC motorcycle design",
  },
  {
    id: "power",
    category: "Performance",
    title: "Power that moves",
    subtitle: "Africa forward.",
    images: [
      "/assets/images/home/img8.jpg",
      "/assets/images/home/img9.jpg",
      "/assets/images/home/img10.jpg",
    ],
    imageAlt: "APSONIC engine power",
  },
  {
    id: "cargo",
    category: "Versatility",
    title: "Built to carry",
    subtitle: "your business.",
    images: [
      "/assets/images/home/img11.jpg",
      "/assets/images/home/img12.jpg",
      "/assets/images/home/img13.jpg",
    ],
    imageAlt: "APSONIC cargo capacity",
  },
  {
    id: "community",
    category: "APSONIC in Africa",
    title: "More than machines.",
    subtitle: "A community.",
    images: [
      "/assets/images/home/img14.jpg",
      "/assets/images/home/img26.jpg",
      "/assets/images/home/img23.jpg",
    ],
    imageAlt: "APSONIC community",
  },
];

// Get to know APSONIC - Hero Carousel (Apple style)
export const getToKnowApsonicSlides = [
  {
    id: "durability",
    image: "/assets/images/home/img26.jpg",
    imageAlt: "APSONIC ADV 250X motorcycle showing durability features",
    title: "Built for African roads. Engineered to last.",
    description:
      "Every APSONIC motorcycle is designed to handle Africa's toughest terrains. From corrugated roads to desert heat, our reinforced frames and corrosion-resistant components ensure reliability where it matters most.",
  },
  {
    id: "power",
    image: "/assets/images/home/img23.jpg",
    imageAlt: "APSONIC motorcycle engine and performance",
    title: "250cc power. Maximum efficiency.",
    description:
      "Advanced EFI engines calibrated for African fuel standards deliver consistent power and superior fuel economy. Perfect for long-distance deliveries and commercial operations.",
  },
  {
    id: "cargo",
    image: "/assets/images/home/img22.jpg",
    imageAlt: "APSONIC cargo motorcycle with heavy load capacity",
    title: "Heavy-duty cargo. Built for business.",
    description:
      "Reinforced cargo racks handle up to 200kg of payload while maintaining stability and control. Designed for entrepreneurs who need reliable transportation for their goods.",
  },
  {
    id: "network",
    image: "/assets/images/home/img21.jpg",
    imageAlt: "APSONIC service network across Africa",
    title: "1,200+ service centers. Always supported.",
    description:
      "With certified workshops across 26 African countries, expert support is never far away. Genuine parts, trained technicians, and multilingual assistance keep you on the road.",
  },
];

