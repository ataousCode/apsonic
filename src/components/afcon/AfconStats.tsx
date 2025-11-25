/**
 * AFCON Stats Component
 * Display impact statistics from APSONIC's AFCON sponsorship
 */

'use client';

import React from 'react';
import { Container } from '@/components/ui/Container';
import { PageSection } from '@/components/ui/PageSection';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { cn } from '@/lib/utils';
import { afconImpactStats } from '@/data/afcon';
import { useStaggerOnScroll } from '@/hooks/useScrollAnimation';

type AfconStatsProps = {
    className?: string;
};

export default function AfconStats({ className }: AfconStatsProps) {
    return (
        <PageSection id="impact" className={cn('bg-[var(--apsonic-surface)] py-20', className)}>
            <Container>
                <SectionHeader
                    eyebrow="Measurable Impact"
                    title="Powering Africa's Passion"
                    description="Our partnership with AFCON extends far beyond the pitch, creating lasting positive change across the continent."
                    align="center"
                />

                <div className="mt-16 space-y-16">
                    {afconImpactStats.map((category, categoryIndex) => (
                        <StatsCategory key={categoryIndex} category={category} />
                    ))}
                </div>

                {/* Overall Impact Summary */}
                <div className="mt-20 rounded-3xl border border-apsonic-green/20 bg-gradient-to-br from-apsonic-green/10 to-transparent p-8 md:p-12 text-center">
                    <h3 className="text-2xl font-bold text-white md:text-3xl">
                        A Partnership That Transcends Sport
                    </h3>
                    <p className="mt-4 text-lg text-white/80 max-w-3xl mx-auto">
                        Through AFCON, APSONIC is not just sponsoring a tournament—we're investing in Africa's future,
                        connecting communities, creating opportunities, and celebrating the continent's vibrant spirit.
                    </p>
                </div>
            </Container>
        </PageSection>
    );
}

function StatsCategory({ category }: { category: typeof afconImpactStats[0] }) {
    const gridRef = useStaggerOnScroll<HTMLDivElement>(0.1, true);

    return (
        <div>
            <h3 className="text-2xl font-bold text-apsonic-green mb-8">{category.category}</h3>
            <div
                ref={gridRef}
                className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4"
            >
                {category.stats.map((stat, index) => (
                    <div
                        key={index}
                        className="group relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 to-transparent p-6 backdrop-blur-sm transition-all hover:border-apsonic-green/50 hover:from-apsonic-green/10"
                    >
                        {/* Stat Value */}
                        <div className="text-4xl font-bold text-apsonic-green md:text-5xl drop-shadow-[0_0_10px_rgba(28,160,73,0.5)]">
                            {stat.value}
                        </div>

                        {/* Stat Label */}
                        <div className="mt-3 text-lg font-semibold text-white">
                            {stat.label}
                        </div>

                        {/* Stat Description */}
                        <div className="mt-2 text-sm text-white/60">
                            {stat.description}
                        </div>

                        {/* Hover glow effect */}
                        <div className="absolute inset-0 bg-gradient-to-br from-apsonic-green/0 to-apsonic-green/0 group-hover:from-apsonic-green/10 group-hover:to-transparent transition-all duration-300" />
                    </div>
                ))}
            </div>
        </div>
    );
}
