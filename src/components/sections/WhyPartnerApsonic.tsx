'use client';

import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { SectionHeader } from "@/components/ui/SectionHeader";

const benefits = [
  {
    icon: (
      <svg className="h-12 w-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    title: "Strong Brand Presence",
    description: "APSONIC is a recognized leader in African motorcycle markets with 15+ years of proven reliability and customer trust."
  },
  {
    icon: (
      <svg className="h-12 w-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
      </svg>
    ),
    title: "High Market Demand",
    description: "Growing transportation needs across Africa create consistent demand for reliable, affordable motorcycles and tricycles."
  },
  {
    icon: (
      <svg className="h-12 w-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    ),
    title: "After-Sales Support",
    description: "Comprehensive service network with 1,200+ certified centers, genuine spare parts, and multilingual technical support."
  },
  {
    icon: (
      <svg className="h-12 w-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
      </svg>
    ),
    title: "Marketing & Visibility",
    description: "Official AFCON sponsor with continental brand campaigns, co-marketing support, and promotional materials for distributors."
  }
];

export default function WhyPartnerApsonic() {
  return (
    <section className="relative w-full section-gradient py-12 sm:py-16 lg:py-24 overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeader
          eyebrow="Partnership Benefits"
          title="Why Partner With APSONIC"
          description="Join a proven network that supports distributor success across Africa"
          align="center"
        />

        <div className="mt-12 sm:mt-16 lg:mt-20 grid gap-6 sm:gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {benefits.map((benefit, index) => (
            <ScrollReveal key={benefit.title} direction="up" delay={index * 0.1}>
              <div className="glass-panel rounded-3xl p-6 sm:p-8 h-full flex flex-col transition-all duration-300 hover:scale-105 hover:border-apsonic-green/50">
                {/* Icon */}
                <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-apsonic-green/10 text-apsonic-green">
                  {benefit.icon}
                </div>

                {/* Title */}
                <h3 className="mb-3 text-xl sm:text-2xl font-bold text-white">
                  {benefit.title}
                </h3>

                {/* Description */}
                <p className="text-sm sm:text-base leading-relaxed text-apsonic-muted">
                  {benefit.description}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

