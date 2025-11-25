export type NavLink = {
  href: string;
  label: string;
};

export type SocialLink = {
  platform: string;
  url: string;
  icon: string;
};

export const primaryNavLinks: NavLink[] = [
  { href: "/products", label: "Products" },
  { href: "/dealers", label: "Dealers" },
  { href: "/afcon", label: "AFCON" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export const distributorCta = {
  href: "/distributor",
  label: "Become a Distributor",
};

export const legalNavLinks: NavLink[] = [
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/terms", label: "Terms of Service" },
];

export const socialLinks: SocialLink[] = [
  { platform: "Facebook", url: "https://facebook.com/ApsonicmotorsKenya", icon: "facebook" },
  { platform: "Twitter", url: "https://twitter.com/ApsonicKenya", icon: "twitter" },
  { platform: "Instagram", url: "https://instagram.com/apsonicmotorkenya", icon: "instagram" },
  { platform: "TikTok", url: "https://tiktok.com/@apsonic1akenya", icon: "tiktok" },
  { platform: "LinkedIn", url: "https://linkedin.com/in/apsonic-moto-kenya-10613125a", icon: "linkedin" },
];

export const companyInfo = {
  email: "info@apsonic.com",
  tagline: "Driving Africa forward with quality motorcycles.",
  headquarters: "Based in Kenya, serving across Africa",
};

