'use client';

import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { Button } from "@/components/ui/Button";

const contactMethods = [
  {
    icon: (
      <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    title: "Email",
    value: "distributors@apsonic.africa",
    link: "mailto:distributors@apsonic.africa",
    description: "Send us a detailed inquiry"
  },
  {
    icon: (
      <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
      </svg>
    ),
    title: "Phone",
    value: "+254 20 123 4567",
    link: "tel:+254201234567",
    description: "Mon-Fri, 9AM-6PM EAT"
  },
  {
    icon: (
      <svg className="h-8 w-8" fill="currentColor" viewBox="0 0 24 24">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
      </svg>
    ),
    title: "WhatsApp",
    value: "+254 712 345 678",
    link: "https://wa.me/254712345678",
    description: "Quick response during business hours"
  }
];

export default function DistributorContact() {
  return (
    <section className="relative w-full section-gradient py-12 sm:py-16 lg:py-24 overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <ScrollReveal direction="up">
          <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
            <p className="text-xs sm:text-sm font-semibold uppercase tracking-[0.3em] sm:tracking-[0.5em] text-apsonic-green mb-4">
              Need Help?
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
              Contact Our Partnership Team
            </h2>
            <p className="text-base sm:text-lg text-apsonic-muted leading-relaxed">
              Have questions about becoming a distributor? Our team is here to help you every step of the way.
            </p>
          </div>
        </ScrollReveal>

        {/* Contact Methods */}
        <div className="grid gap-6 sm:gap-8 sm:grid-cols-3 mb-12 sm:mb-16">
          {contactMethods.map((method, index) => (
            <ScrollReveal key={method.title} direction="up" delay={index * 0.1}>
              <a
                href={method.link}
                className="glass-panel rounded-3xl p-6 sm:p-8 text-center transition-all duration-300 hover:scale-105 hover:border-apsonic-green/50 block"
              >
                {/* Icon */}
                <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-apsonic-green/10 text-apsonic-green">
                  {method.icon}
                </div>

                {/* Title */}
                <h3 className="mb-2 text-lg font-bold text-white">
                  {method.title}
                </h3>

                {/* Value */}
                <p className="mb-2 text-base font-semibold text-apsonic-green">
                  {method.value}
                </p>

                {/* Description */}
                <p className="text-sm text-apsonic-subtle">
                  {method.description}
                </p>
              </a>
            </ScrollReveal>
          ))}
        </div>

        {/* Additional Resources */}
        <ScrollReveal direction="up" delay={0.4}>
          <div className="glass-panel rounded-3xl p-6 sm:p-8 lg:p-12">
            <div className="grid gap-8 lg:grid-cols-2 lg:gap-12 items-center">
              <div>
                <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4">
                  Find Our Existing Dealers
                </h3>
                <p className="text-base sm:text-lg text-apsonic-muted leading-relaxed mb-6">
                  Explore our current distribution network across Africa. See where APSONIC is making an impact and discover potential collaboration opportunities.
                </p>
                <Button
                  asChild
                  size="lg"
                  className="rounded-full bg-apsonic-green px-8 font-semibold text-black hover:bg-apsonic-green-dark hover:text-white transition-all duration-300"
                >
                  <a href="/dealers">View Dealer Locations</a>
                </Button>
              </div>

              <div className="glass-panel rounded-2xl p-6 space-y-4">
                <h4 className="text-lg font-bold text-white">
                  Frequently Asked Questions
                </h4>
                <ul className="space-y-3 text-sm text-apsonic-muted">
                  <li className="flex items-start gap-2">
                    <span className="text-apsonic-green mt-1">•</span>
                    <span>What is the minimum order quantity for new distributors?</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-apsonic-green mt-1">•</span>
                    <span>How long does the approval process typically take?</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-apsonic-green mt-1">•</span>
                    <span>What training and support does APSONIC provide?</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-apsonic-green mt-1">•</span>
                    <span>Can I distribute in multiple countries?</span>
                  </li>
                </ul>
                <Button
                  asChild
                  variant="outline"
                  size="sm"
                  className="w-full rounded-full"
                >
                  <a href="/contact">View All FAQs</a>
                </Button>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

