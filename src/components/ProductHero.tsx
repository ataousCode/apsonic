'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { productCategories } from '@/data/products';
import { Container } from './ui/Container';
import { cn } from '@/lib/utils';
import { prefersReducedMotion, ANIMATION_TIMINGS, EASINGS } from '@/lib/animations';
import AnimatedBackground from './ui/AnimatedBackground';

type ProductHeroProps = {
    className?: string;
};

export default function ProductHero({ className }: ProductHeroProps) {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!containerRef.current || prefersReducedMotion()) return;

        const ctx = gsap.context(() => {
            // Eyebrow animation
            gsap.fromTo(
                '.hero-eyebrow',
                { opacity: 0, y: -20 },
                { opacity: 1, y: 0, duration: ANIMATION_TIMINGS.normal, ease: EASINGS.smooth }
            );

            // Heading animation
            gsap.fromTo(
                '.hero-heading',
                { opacity: 0, y: 30 },
                { opacity: 1, y: 0, duration: ANIMATION_TIMINGS.slow, delay: 0.2, ease: EASINGS.smooth }
            );

            // Description animation
            gsap.fromTo(
                '.hero-description',
                { opacity: 0, y: 20 },
                { opacity: 1, y: 0, duration: ANIMATION_TIMINGS.normal, delay: 0.4, ease: EASINGS.smooth }
            );

            // Stats cards stagger animation
            gsap.fromTo(
                '.hero-stat',
                { opacity: 0, y: 30, scale: 0.9 },
                {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    duration: ANIMATION_TIMINGS.slow,
                    delay: 0.6,
                    stagger: ANIMATION_TIMINGS.stagger,
                    ease: EASINGS.bounce,
                }
            );

            // Category cards stagger animation
            gsap.fromTo(
                '.hero-category',
                { opacity: 0, y: 40 },
                {
                    opacity: 1,
                    y: 0,
                    duration: ANIMATION_TIMINGS.slow,
                    delay: 0.9,
                    stagger: ANIMATION_TIMINGS.stagger,
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
                'relative overflow-hidden bg-gradient-to-br from-apsonic-ink/40 via-black/30 to-apsonic-ink/40 py-20 md:py-28',
                className
            )}
        >
            <AnimatedBackground />

            <Container className="relative">
                <div className="mx-auto max-w-4xl text-center">
                    <p className="hero-eyebrow text-sm font-semibold uppercase tracking-[0.3em] text-apsonic-green drop-shadow-[0_0_10px_rgba(28,160,73,0.5)]">
                        APSONIC Motorcycles
                    </p>

                    <h1 className="hero-heading mt-4 text-4xl font-bold tracking-tight text-white md:text-5xl lg:text-6xl drop-shadow-lg">
                        Built for Africa.
                        <br />
                        <span className="text-apsonic-green drop-shadow-[0_0_20px_rgba(28,160,73,0.8)] [text-shadow:_0_0_30px_rgb(28_160_73_/_50%)]">
                            Engineered to Last.
                        </span>
                    </h1>

                    <p className="hero-description mt-6 text-lg text-white/90 md:text-xl leading-relaxed">
                        Discover our complete range of motorcycles designed for African roads. From daily
                        commuters to heavy-duty cargo solutions, find the perfect ride for your needs.
                    </p>

                    <div className="mt-12 grid grid-cols-3 gap-6 md:gap-12">
                        <div className="hero-stat rounded-2xl border border-apsonic-green/20 bg-gradient-to-br from-apsonic-green/10 to-transparent p-6 backdrop-blur-sm">
                            <div className="text-3xl font-bold text-apsonic-green md:text-4xl drop-shadow-[0_0_10px_rgba(28,160,73,0.5)]">9</div>
                            <div className="mt-1 text-sm text-white/80 font-medium">Models Available</div>
                        </div>
                        <div className="hero-stat rounded-2xl border border-apsonic-green/20 bg-gradient-to-br from-apsonic-green/10 to-transparent p-6 backdrop-blur-sm">
                            <div className="text-3xl font-bold text-apsonic-green md:text-4xl drop-shadow-[0_0_10px_rgba(28,160,73,0.5)]">3</div>
                            <div className="mt-1 text-sm text-white/80 font-medium">Categories</div>
                        </div>
                        <div className="hero-stat rounded-2xl border border-apsonic-green/20 bg-gradient-to-br from-apsonic-green/10 to-transparent p-6 backdrop-blur-sm">
                            <div className="text-3xl font-bold text-apsonic-green md:text-4xl drop-shadow-[0_0_10px_rgba(28,160,73,0.5)]">26</div>
                            <div className="mt-1 text-sm text-white/80 font-medium">Countries</div>
                        </div>
                    </div>
                </div>

                <div className="mt-16">
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                        {productCategories.slice(1).map((category) => (
                            <Link
                                key={category.id}
                                href={`#${category.slug}`}
                                className="hero-category group relative overflow-hidden rounded-2xl border border-white/20 bg-gradient-to-br from-white/10 to-white/5 p-6 backdrop-blur-sm transition-all hover:border-apsonic-green/60 hover:from-apsonic-green/20 hover:to-apsonic-green/5 hover:shadow-xl hover:shadow-apsonic-green/20 hover:scale-[1.02]"
                            >
                                <div className="absolute inset-0 bg-gradient-to-br from-apsonic-green/0 to-apsonic-green/0 group-hover:from-apsonic-green/10 group-hover:to-transparent transition-all duration-300" />

                                <div className="relative flex items-start justify-between">
                                    <div>
                                        <h3 className="text-lg font-semibold text-white transition-colors group-hover:text-apsonic-green">
                                            {category.name}
                                        </h3>
                                        <p className="mt-2 text-sm text-white/70 group-hover:text-white/90 transition-colors">{category.description}</p>
                                    </div>
                                    <svg
                                        className="h-5 w-5 text-white/40 transition-all group-hover:translate-x-1 group-hover:text-apsonic-green group-hover:drop-shadow-[0_0_8px_rgba(28,160,73,0.8)]"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M13 7l5 5m0 0l-5 5m5-5H6"
                                        />
                                    </svg>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </Container>
        </section>
    );
}
