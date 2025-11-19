'use client';

import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { cn } from "@/lib/utils";

const steps = [
  {
    number: "01",
    title: "Submit Application",
    description: "Complete our comprehensive distributor application form with your company details, facilities, and business plan.",
    icon: (
      <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    )
  },
  {
    number: "02",
    title: "Initial Review",
    description: "Our partnership team evaluates your application, verifies documentation, and assesses market potential in your region.",
    icon: (
      <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
      </svg>
    )
  },
  {
    number: "03",
    title: "Interview & Site Visit",
    description: "Meet with our regional managers to discuss partnership details. We may conduct a facility inspection to ensure readiness.",
    icon: (
      <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    )
  },
  {
    number: "04",
    title: "Contract Signing",
    description: "Finalize distribution agreement, define territories, set pricing structures, and establish payment terms and targets.",
    icon: (
      <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    )
  },
  {
    number: "05",
    title: "Training & First Shipment",
    description: "Receive product training, marketing materials, and operational support. Your first motorcycle shipment arrives and sales begin.",
    icon: (
      <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
      </svg>
    )
  }
];

export default function DistributorProcess() {
  return (
    <section className="relative w-full section-gradient py-12 sm:py-16 lg:py-24 overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeader
          eyebrow="Application Process"
          title="How the Process Works"
          description="Five steps from application to becoming an official APSONIC distributor"
          align="center"
        />

        {/* Desktop: Horizontal Stepper */}
        <div className="mt-12 sm:mt-16 lg:mt-20 hidden lg:block">
          <ScrollReveal direction="up">
            <div className="relative">
              {/* Connection Line */}
              <div className="absolute top-20 left-0 right-0 h-0.5 bg-apsonic-border">
                <div className="h-full w-4/5 bg-apsonic-green transition-all duration-1000" />
              </div>

              {/* Steps */}
              <div className="relative grid grid-cols-5 gap-4">
                {steps.map((step, index) => (
                  <div key={step.number} className="flex flex-col items-center text-center">
                    {/* Icon Circle */}
                    <div className={cn(
                      "relative z-10 flex h-20 w-20 items-center justify-center rounded-full border-4 transition-all duration-300",
                      index < 4 
                        ? "border-apsonic-green bg-apsonic-green text-black" 
                        : "border-apsonic-green bg-apsonic-green text-black"
                    )}>
                      {step.icon}
                    </div>

                    {/* Number */}
                    <div className="mt-4 text-base font-bold text-apsonic-green">
                      {step.number}
                    </div>

                    {/* Title */}
                    <h3 className="mt-2 text-lg font-bold text-white">
                      {step.title}
                    </h3>

                    {/* Description */}
                    <p className="mt-3 text-sm leading-relaxed text-apsonic-muted">
                      {step.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>

        {/* Mobile/Tablet: Vertical Stepper */}
        <div className="mt-12 sm:mt-16 space-y-6 lg:hidden">
          {steps.map((step, index) => (
            <ScrollReveal key={step.number} direction="up" delay={index * 0.1}>
              <div className="glass-panel rounded-3xl p-6 sm:p-8 flex gap-6">
                {/* Left: Icon */}
                <div className="flex flex-col items-center flex-shrink-0">
                  <div className={cn(
                    "flex h-16 w-16 sm:h-20 sm:w-20 items-center justify-center rounded-full border-4 transition-all duration-300",
                    index < 4 
                      ? "border-apsonic-green bg-apsonic-green text-black" 
                      : "border-apsonic-green bg-apsonic-green text-black"
                  )}>
                    {step.icon}
                  </div>
                  
                  {/* Vertical Line */}
                  {index < steps.length - 1 && (
                    <div className="mt-4 h-full w-0.5 bg-apsonic-border" />
                  )}
                </div>

                {/* Right: Content */}
                <div className="flex-1 pt-2">
                  <div className="text-xs font-bold text-apsonic-green mb-2">
                    STEP {step.number}
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white mb-3">
                    {step.title}
                  </h3>
                  <p className="text-sm sm:text-base leading-relaxed text-apsonic-muted">
                    {step.description}
                  </p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Timeline Duration */}
        <ScrollReveal direction="up" delay={0.5}>
          <div className="mt-12 sm:mt-16 glass-panel rounded-2xl p-6 sm:p-8 text-center">
            <p className="text-base sm:text-lg text-apsonic-text">
              <span className="font-semibold text-apsonic-green">Average Timeline:</span> 4-8 weeks from application to first shipment
            </p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

