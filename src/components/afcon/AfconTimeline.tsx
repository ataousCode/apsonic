/**
 * AFCON Timeline Component
 * Interactive timeline showcasing AFCON 2024 & 2025 tournaments
 */

'use client';

import React from 'react';
import { Container } from '@/components/ui/Container';
import { PageSection } from '@/components/ui/PageSection';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { cn } from '@/lib/utils';
import { afconTournaments } from '@/data/afcon';
import { useFadeInOnScroll } from '@/hooks/useScrollAnimation';

type AfconTimelineProps = {
    className?: string;
};

export default function AfconTimeline({ className }: AfconTimelineProps) {
    return (
        <PageSection className={cn('bg-[var(--apsonic-ink)] py-20', className)}>
            <Container>
                <SectionHeader
                    eyebrow="Our Journey"
                    title="A Partnership Across Continents"
                    description="From the vibrant stadiums of Côte d'Ivoire to the historic venues of Morocco, APSONIC's AFCON journey continues to unite Africa."
                    align="center"
                />

                <div className="mt-16 relative">
                    {/* Timeline Line */}
                    <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-apsonic-green via-yellow-500 to-apsonic-green hidden lg:block" />

                    {/* Timeline Items */}
                    <div className="space-y-16">
                        {afconTournaments.map((tournament, index) => (
                            <TimelineItem
                                key={tournament.year}
                                tournament={tournament}
                                index={index}
                            />
                        ))}
                    </div>
                </div>
            </Container>
        </PageSection>
    );
}

function TimelineItem({
    tournament,
    index,
}: {
    tournament: typeof afconTournaments[0];
    index: number;
}) {
    const isLeft = index % 2 === 0;
    const itemRef = useFadeInOnScroll(30, true);

    return (
        <div
            ref={itemRef}
            className={cn(
                'relative grid grid-cols-1 gap-8 lg:grid-cols-2',
                isLeft ? 'lg:text-right' : 'lg:text-left'
            )}
        >
            {/* Content */}
            <div className={cn('space-y-6', isLeft ? 'lg:order-1' : 'lg:order-2')}>
                {/* Year Badge */}
                <div className={cn('inline-flex items-center gap-3', isLeft ? 'lg:flex-row-reverse' : '')}>
                    <div className="flex items-center gap-2 rounded-full border border-apsonic-green/30 bg-apsonic-green/10 px-6 py-2 backdrop-blur-sm">
                        <span className="text-3xl">{tournament.status === 'completed' ? '✅' : '🔜'}</span>
                        <span className="text-2xl font-bold text-apsonic-green">{tournament.year}</span>
                    </div>
                    <div className={cn(
                        'h-px flex-1 bg-gradient-to-r from-apsonic-green/50 to-transparent',
                        isLeft ? 'lg:bg-gradient-to-l' : ''
                    )} />
                </div>

                {/* Country & Dates */}
                <div>
                    <h3 className="text-4xl font-bold text-white flex items-center gap-3">
                        <span className="text-5xl">{tournament.countryCode === 'CI' ? '🇨🇮' : '🇲🇦'}</span>
                        {tournament.country}
                    </h3>
                    <p className="mt-2 text-lg text-white/70">{tournament.dates}</p>
                    <div className={cn(
                        'mt-2 inline-flex items-center gap-2 rounded-full px-4 py-1 text-sm font-semibold uppercase tracking-wider',
                        tournament.status === 'completed'
                            ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                            : 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30'
                    )}>
                        {tournament.status === 'completed' ? 'Completed' : 'Upcoming'}
                    </div>
                </div>

                {/* Highlights */}
                <div className="space-y-3">
                    {tournament.highlights.map((highlight, idx) => (
                        <div
                            key={idx}
                            className={cn(
                                'flex items-start gap-3',
                                isLeft ? 'lg:flex-row-reverse lg:text-right' : ''
                            )}
                        >
                            <div className="flex-shrink-0 mt-1">
                                <svg className="h-5 w-5 text-apsonic-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                            <p className="text-white/80">{highlight}</p>
                        </div>
                    ))}
                </div>

                {/* Statistics Grid */}
                <div className="grid grid-cols-2 gap-4 mt-6">
                    {tournament.statistics.slice(0, 4).map((stat, idx) => (
                        <div
                            key={idx}
                            className="rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm"
                        >
                            <div className="text-2xl mb-1">{stat.icon}</div>
                            <div className="text-2xl font-bold text-apsonic-green">{stat.value}</div>
                            <div className="text-xs text-white/60 mt-1">{stat.label}</div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Timeline Dot (Desktop) */}
            <div className="hidden lg:block absolute left-1/2 top-8 -translate-x-1/2">
                <div className="relative">
                    <div className="h-6 w-6 rounded-full border-4 border-apsonic-green bg-black" />
                    <div className="absolute inset-0 h-6 w-6 rounded-full bg-apsonic-green animate-ping opacity-20" />
                </div>
            </div>

            {/* Visual Element / Placeholder */}
            <div className={cn('', isLeft ? 'lg:order-2' : 'lg:order-1')}>
                <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-apsonic-green/10 to-transparent p-8 backdrop-blur-sm h-full flex items-center justify-center min-h-[300px]">
                    <div className="text-center">
                        <div className="text-8xl mb-4">{tournament.status === 'completed' ? '🏆' : '⚽'}</div>
                        <p className="text-2xl font-bold text-white">AFCON {tournament.year}</p>
                        <p className="text-white/60 mt-2">{tournament.country}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
