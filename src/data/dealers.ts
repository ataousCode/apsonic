export type DealerCategory = "sales" | "service" | "training" | "spares";

export type DealerEntry = {
  id: string;
  country: string;
  city: string;
  name: string;
  address: string;
  contacts: {
    phone: string;
    whatsapp?: string;
    email?: string;
  };
  languages: string[];
  categories: DealerCategory[];
  badge?: string;
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
    contacts: { phone: "+233 30 267 1122", whatsapp: "+233 55 123 9900" },
    languages: ["EN"],
    categories: ["sales", "service", "spares"],
    badge: "West Africa HQ",
  },
  {
    id: "bf-ouaga-north",
    country: "Burkina Faso",
    city: "Ouagadougou",
    name: "Ouaga Northern Corridor",
    address: "Avenue de l’Amitié, Secteur 19",
    contacts: { phone: "+226 25 360 112" },
    languages: ["FR"],
    categories: ["sales", "service"],
  },
  {
    id: "tg-lome-harbour",
    country: "Togo",
    city: "Lomé",
    name: "Lomé Harbour Distribution",
    address: "Boulevard du Mono, Zone Portuaire",
    contacts: { phone: "+228 22 213 990", whatsapp: "+228 93 556 002" },
    languages: ["FR"],
    categories: ["sales", "spares"],
  },
  {
    id: "ci-abidjan-yop",
    country: "Côte d’Ivoire",
    city: "Abidjan",
    name: "Yopougon Distributor Lab",
    address: "Zone Industrielle, Rue des Ateliers",
    contacts: { phone: "+225 27 215 4433", whatsapp: "+225 05 656 8899" },
    languages: ["FR"],
    categories: ["sales", "service", "training"],
  },
  {
    id: "ng-lagos-apapa",
    country: "Nigeria",
    city: "Lagos",
    name: "Apapa Service Command",
    address: "Warehouse 08, Creek Road, Apapa",
    contacts: { phone: "+234 1 700 8822", email: "lagos.ops@apsonic.africa" },
    languages: ["EN"],
    categories: ["service", "spares"],
    badge: "Port Logistics",
  },
  {
    id: "ml-bamako-tech",
    country: "Mali",
    city: "Bamako",
    name: "Bamako Tech Campus",
    address: "Route de Koulikoro, Zone Industrielle",
    contacts: { phone: "+223 20 29 8855", whatsapp: "+223 60 12 3456" },
    languages: ["FR"],
    categories: ["training", "service"],
    badge: "OEM Academy",
  },
  {
    id: "ne-niamey-sahara",
    country: "Niger",
    city: "Niamey",
    name: "Sahara Logistics Pod",
    address: "Plateau, Boulevard Mali Béro",
    contacts: { phone: "+227 20 735 550" },
    languages: ["FR"],
    categories: ["service", "spares"],
  },
  {
    id: "bj-cotonou-axis",
    country: "Benin",
    city: "Cotonou",
    name: "Coastal Axis Hub",
    address: "Rue 2100, Ganhi Business District",
    contacts: { phone: "+229 21 317 200" },
    languages: ["FR"],
    categories: ["sales", "service"],
  },
  {
    id: "sl-freetown-ridge",
    country: "Sierra Leone",
    city: "Freetown",
    name: "Freetown Spur Road Center",
    address: "Spur Road, Hill Station",
    contacts: { phone: "+232 22 222 190", whatsapp: "+232 76 441 990" },
    languages: ["EN"],
    categories: ["sales", "service", "spares"],
  },
  {
    id: "lr-monrovia-bridge",
    country: "Liberia",
    city: "Monrovia",
    name: "Monrovia Bridge Service",
    address: "Bushrod Island, Somalia Drive",
    contacts: { phone: "+231 77 600 123" },
    languages: ["EN"],
    categories: ["service", "spares"],
  },
];

