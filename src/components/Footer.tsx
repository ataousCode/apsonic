import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { SocialIcon } from "@/components/ui/SocialIcon";
import { legalNavLinks, primaryNavLinks, socialLinks, companyInfo } from "@/data/navigation";

export default function Footer() {
  return (
    <footer className="section-gradient mt-16 border-t border-white/10 py-16">
      <Container className="grid gap-10 md:grid-cols-[1.5fr_1fr_1fr_1fr]">
        <div className="space-y-6">
          <Link href="/" className="inline-block">
            <Image src="/assets/logos/logo.png" alt="APSONIC Logo" width={120} height={34} className="h-10 w-auto" />
          </Link>
          <p className="text-sm text-white/70 leading-relaxed">
            {companyInfo.tagline}
          </p>
          <div className="space-y-2 text-sm text-white/60">
            <p>{companyInfo.headquarters}</p>
            <p>
              <a href={`mailto:${companyInfo.email}`} className="hover:text-[var(--apsonic-green)] transition">
                {companyInfo.email}
              </a>
            </p>
          </div>
          <div className="flex gap-4">
            {socialLinks.map((social) => (
              <a
                key={social.platform}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/5 text-white/70 transition hover:border-[var(--apsonic-green)] hover:bg-[var(--apsonic-green)]/10 hover:text-[var(--apsonic-green)]"
                aria-label={social.platform}
              >
                <SocialIcon icon={social.icon} className="h-5 w-5" />
              </a>
            ))}
          </div>
        </div>
        <FooterColumn title="Navigate" links={primaryNavLinks.map((item) => ({ ...item, external: false }))} />
        <FooterColumn title="Legal" links={legalNavLinks.map((item) => ({ ...item, external: false }))} />
        <div className="space-y-4">
          <p className="text-sm font-semibold uppercase tracking-[0.4em] text-white/50">Coverage</p>
          <ul className="space-y-2 text-sm text-white/70">
            <li>Kenya (HQ)</li>
            <li>Ghana</li>
            <li>Nigeria</li>
            <li>Côte d&apos;Ivoire</li>
            <li>Burkina Faso</li>
            <li>
              <Link href="/dealers" className="text-[var(--apsonic-green)] transition hover:text-white">
                View all markets →
              </Link>
            </li>
          </ul>
        </div>
      </Container>
      <div className="mt-12 text-center text-sm text-white/60">
        © {new Date().getFullYear()} APSONIC. Based in Kenya, serving across Africa.
      </div>
    </footer>
  );
}

type FooterLink = { href: string; label: string; external?: boolean };

function FooterColumn({ title, links }: { title: string; links: FooterLink[] }) {
  return (
    <div className="space-y-4">
      <p className="text-sm font-semibold uppercase tracking-[0.4em] text-white/50">{title}</p>
      <ul className="space-y-3 text-sm text-white/70">
        {links.map((link) => (
          <li key={link.href}>
            {link.external ? (
              <a href={link.href} className="transition hover:text-white" target="_blank" rel="noreferrer">
                {link.label}
              </a>
            ) : (
              <Link href={link.href} className="transition hover:text-white">
                {link.label}
              </Link>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
