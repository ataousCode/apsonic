'use client';

import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { SectionHeader } from "@/components/ui/SectionHeader";

const requirements = [
  {
    category: "Legal & Documentation",
    items: [
      "Valid business license or registration certificate",
      "Tax identification number (TIN)",
      "Company registration documents",
      "Bank references and financial statements"
    ]
  },
  {
    category: "Infrastructure",
    items: [
      "Warehouse or storage facility (minimum 500 m²)",
      "Showroom or display area for motorcycles",
      "Secure location with proper access roads",
      "Loading/unloading equipment capability"
    ]
  },
  {
    category: "Financial Capacity",
    items: [
      "Minimum initial order commitment (50-100 units)",
      "Working capital for inventory management",
      "Ability to offer customer financing options",
      "Credit facility or payment guarantee"
    ]
  },
  {
    category: "Operational Team",
    items: [
      "Experienced sales and marketing staff",
      "Technical service personnel (certified preferred)",
      "Administrative and logistics team",
      "Management with motorcycle industry experience"
    ]
  }
];

export default function DistributorRequirements() {
  return (
    <section
      id="requirements"
      className="relative w-full bg-apsonic-surface py-12 sm:py-16 lg:py-24 overflow-hidden"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeader
          eyebrow="Prerequisites"
          title="Distributor Requirements"
          description="Essential criteria for APSONIC distribution partnership"
          align="center"
        />

        <div className="mt-12 sm:mt-16 lg:mt-20 grid gap-6 sm:gap-8 lg:grid-cols-2">
          {requirements.map((section, index) => (
            <ScrollReveal key={section.category} direction="up" delay={index * 0.15}>
              <div className="glass-panel rounded-3xl p-6 sm:p-8 h-full">
                {/* Category Title */}
                <div className="mb-6 flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-apsonic-green text-black font-bold text-lg">
                    {index + 1}
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white">
                    {section.category}
                  </h3>
                </div>

                {/* Checklist */}
                <ul className="space-y-4">
                  {section.items.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-start gap-3">
                      {/* Checkmark Icon */}
                      <svg
                        className="mt-0.5 h-6 w-6 flex-shrink-0 text-apsonic-green"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      
                      {/* Item Text */}
                      <span className="text-sm sm:text-base leading-relaxed text-apsonic-muted">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Additional Note */}
        <ScrollReveal direction="up" delay={0.6}>
          <div className="mt-8 sm:mt-12 glass-panel rounded-2xl p-6 sm:p-8 border-l-4 border-apsonic-green">
            <p className="text-sm sm:text-base leading-relaxed text-apsonic-text">
              <span className="font-semibold text-apsonic-green">Note:</span> Requirements may vary by country and region. Our team will work with you to understand local regulations and customize partnership terms to ensure mutual success.
            </p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

