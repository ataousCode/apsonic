/**
 * AFCON Benefits Component
 * Showcase partnership benefits and strategic alignment
 */

'use client';

import React from 'react';
import { Container } from '@/components/ui/Container';
import { PageSection } from '@/components/ui/PageSection';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { cn } from '@/lib/utils';
import { afconBenefits } from '@/data/afcon';
import { useStaggerOnScroll } from '@/hooks/useScrollAnimation';

type AfconBenefitsProps = {
    className?: string;
};

export default function AfconBenefits({ className }: AfconBenefitsProps) {
    const gridRef = useStaggerOnScroll<HTMLDivElement>(0.1, true);

    return (
        <PageSection className={cn('bg-[var(--apsonic-ink)] py-20', className)}>
            <Container>
                <SectionHeader
                    eyebrow="Strategic Partnership"
                    title="Why AFCON?"
                    description="Our sponsorship of Africa's premier football tournament aligns perfectly with APSONIC's mission to connect and empower African communities."
                    align="center"
                />

                <div
                    ref={gridRef}
                    className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
                >
                    {afconBenefits.map((benefit) => (
                        <div
                            key={benefit.id}
                            className="group relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 to-transparent p-8 backdrop-blur-sm transition-all hover:border-apsonic-green/50 hover:from-apsonic-green/10"
                        >
                            {/* Icon */}
                            <div className="text-6xl mb-6">{benefit.icon}</div>

                            {/* Title */}
                            <h3 className="text-2xl font-bold text-white mb-4">
                                {benefit.title}
                            </h3>

                            {/* Description */}
                            <p className="text-white/70 leading-relaxed">
                                {benefit.description}
                            </p>

                            {/* Hover glow effect */}
                            <div className="absolute inset-0 bg-gradient-to-br from-apsonic-green/0 to-apsonic-green/0 group-hover:from-apsonic-green/10 group-hover:to-transparent transition-all duration-300" />
                        </div>
                    ))}
                </div>

                {/* Call to Action */}
                <div className="mt-16 text-center">
                    <div className="inline-flex items-center gap-4 rounded-full border border-apsonic-green/30 bg-apsonic-green/10 px-8 py-4 backdrop-blur-sm">
                        <span className="text-3xl">🤝</span>
                        <div className="text-left">
                            <p className="text-sm font-semibold uppercase tracking-wider text-apsonic-green">
                                Partnership Inquiries
                            </p>
                            <p className="text-white/70 text-sm">
                                Interested in partnering with APSONIC? Get in touch.
                            </p>
                        </div>
                    </div>
                </div>
            </Container>
        </PageSection>
    );
}
