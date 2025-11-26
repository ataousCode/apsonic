'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import CloudImage from '@/components/CloudImage';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';
import { afconHeroContent } from '@/data/afcon';
import { prefersReducedMotion, ANIMATION_TIMINGS, EASINGS } from '@/lib/animations';
import AnimatedBackground from '@/components/ui/AnimatedBackground';

type AfconHeroProps = {
    className?: string;
};

export default function AfconHero({ className }: AfconHeroProps) {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!containerRef.current || prefersReducedMotion()) return;

        const ctx = gsap.context(() => {
            // Eyebrow animation
            gsap.fromTo(
                '.afcon-eyebrow',
                { opacity: 0, y: -20 },
                { opacity: 1, y: 0, duration: ANIMATION_TIMINGS.normal, ease: EASINGS.smooth }
            );

            // Title animation
            gsap.fromTo(
                '.afcon-title',
                { opacity: 0, y: 40 },
                { opacity: 1, y: 0, duration: ANIMATION_TIMINGS.slow, delay: 0.2, ease: EASINGS.smooth }
            );

            // Subtitle animation
            gsap.fromTo(
                '.afcon-subtitle',
                { opacity: 0, scale: 0.9 },
                { opacity: 1, scale: 1, duration: ANIMATION_TIMINGS.normal, delay: 0.4, ease: EASINGS.bounce }
            );

            // Description animation
            gsap.fromTo(
                '.afcon-description',
                { opacity: 0, y: 20 },
                { opacity: 1, y: 0, duration: ANIMATION_TIMINGS.normal, delay: 0.6, ease: EASINGS.smooth }
            );

            // Stats stagger animation
            gsap.fromTo(
                '.afcon-stat',
                { opacity: 0, y: 30, scale: 0.9 },
                {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    duration: ANIMATION_TIMINGS.slow,
                    delay: 0.8,
                    stagger: ANIMATION_TIMINGS.stagger,
                    ease: EASINGS.bounce,
                }
            );

            // CTA buttons animation
            gsap.fromTo(
                '.afcon-cta',
                { opacity: 0, y: 20 },
                {
                    opacity: 1,
                    y: 0,
                    duration: ANIMATION_TIMINGS.normal,
                    delay: 1.2,
                    stagger: 0.1,
                    ease: EASINGS.smooth,
                }
            );
        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={containerRef}
            className={cn(
                'relative overflow-hidden bg-gradient-to-br from-apsonic-ink/40 via-black/30 to-apsonic-ink/40 py-20 md:py-32',
                className
            )}
        >
            <AnimatedBackground variant="bright" />

            <Container className="relative z-10">
                <div className="mx-auto max-w-5xl text-center">
                    <div className="afcon-eyebrow inline-flex items-center gap-2 rounded-full border border-yellow-500/30 bg-yellow-500/10 px-6 py-2 backdrop-blur-sm">
                        <span className="text-2xl">🏆</span>
                        <span className="text-sm font-bold uppercase tracking-[0.3em] text-yellow-400">
                            {afconHeroContent.eyebrow}
                        </span>
                    </div>

                    {/* Title */}
                    <h1 className="afcon-title mt-8 text-5xl font-bold leading-tight text-white md:text-6xl lg:text-7xl">
                        {afconHeroContent.title}
                    </h1>

                    {/* Subtitle with AFCON Branding */}
                    <div className="afcon-subtitle mt-6 inline-flex items-center gap-4">
                        <div className="h-px w-12 bg-gradient-to-r from-transparent to-apsonic-green" />
                        <h2 className="bg-gradient-to-r from-apsonic-green via-yellow-400 to-apsonic-green bg-clip-text text-3xl font-bold text-transparent md:text-4xl drop-shadow-[0_0_20px_rgba(28,160,73,0.5)]">
                            {afconHeroContent.subtitle}
                        </h2>
                        <div className="h-px w-12 bg-gradient-to-l from-transparent to-apsonic-green" />
                    </div>

                    {/* Description */}
                    <p className="afcon-description mt-8 text-lg text-white/90 md:text-xl leading-relaxed max-w-3xl mx-auto">
                        {afconHeroContent.description}
                    </p>

                    {/* Stats Grid */}
                    <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
                        {afconHeroContent.stats.map((stat, index) => (
                            <div
                                key={index}
                                className="afcon-stat group relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 to-transparent p-6 backdrop-blur-sm transition-all hover:border-apsonic-green/50 hover:from-apsonic-green/10"
                            >
                                <div className="text-4xl mb-2">{stat.icon}</div>
                                <div className="text-3xl font-bold text-apsonic-green md:text-4xl drop-shadow-[0_0_10px_rgba(28,160,73,0.5)]">
                                    {stat.value}
                                </div>
                                <div className="mt-1 text-xs text-white/70 font-medium uppercase tracking-wider">
                                    {stat.label}
                                </div>

                                {/* Hover glow */}
                                <div className="absolute inset-0 bg-gradient-to-br from-apsonic-green/0 to-apsonic-green/0 group-hover:from-apsonic-green/10 group-hover:to-transparent transition-all duration-300" />
                            </div>
                        ))}
                    </div>

                    {/* CTA Buttons */}
                    <div className="mt-12 flex flex-col gap-4 sm:flex-row sm:justify-center">
                        <Button
                            asChild
                            className="afcon-cta rounded-full bg-white px-8 py-4 text-base font-semibold text-black hover:bg-white/90 transition-all shadow-lg shadow-white/20"
                        >
                            <Link href={afconHeroContent.cta.primary.href}>
                                {afconHeroContent.cta.primary.text}
                                <svg className="ml-2 inline h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                </svg>
                            </Link>
                        </Button>
                        <Button
                            asChild
                            variant="outline"
                            className="afcon-cta rounded-full border-white/40 bg-white/10 px-8 py-4 text-base font-semibold text-white hover:bg-white/20 hover:border-white/60 transition-all backdrop-blur-sm"
                        >
                            <Link href={afconHeroContent.cta.secondary.href}>
                                {afconHeroContent.cta.secondary.text}
                            </Link>
                        </Button>
                    </div>

                    {/* Tournament Logos */}
                    <div className="mt-16 flex items-center justify-center gap-8 opacity-60">
                        <div className="text-center">
                            <div className="text-4xl mb-2">🇨🇮</div>
                            <p className="text-xs text-white/70 font-medium">AFCON 2024</p>
                            <p className="text-xs text-white/50">Côte d'Ivoire</p>
                        </div>
                        <div className="h-12 w-px bg-white/20" />
                        <div className="text-center">
                            <div className="text-4xl mb-2">🇲🇦</div>
                            <p className="text-xs text-white/70 font-medium">AFCON 2025</p>
                            <p className="text-xs text-white/50">Morocco</p>
                        </div>
                    </div>
                </div>
            </Container>

            {/* Scroll Indicator */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
                <svg className="h-6 w-6 text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
            </div>
        </section>
    );
}
