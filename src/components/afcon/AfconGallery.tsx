/**
 * AFCON Gallery Component
 * Photo gallery showcasing AFCON partnership moments
 */

'use client';

import React, { useState } from 'react';
import CloudImage from '@/components/CloudImage';
import { Container } from '@/components/ui/Container';
import { PageSection } from '@/components/ui/PageSection';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { cn } from '@/lib/utils';
import { afconGalleryImages, type AfconGalleryImage } from '@/data/afcon';
import { useStaggerOnScroll } from '@/hooks/useScrollAnimation';

type AfconGalleryProps = {
    className?: string;
};

export default function AfconGallery({ className }: AfconGalleryProps) {
    const [selectedImage, setSelectedImage] = useState<AfconGalleryImage | null>(null);
    const [filter, setFilter] = useState<'all' | 2024 | 2025>('all');

    const filteredImages = filter === 'all'
        ? afconGalleryImages
        : afconGalleryImages.filter(img => img.tournament === filter);

    const gridRef = useStaggerOnScroll<HTMLDivElement>(0.08, true);

    return (
        <PageSection id="gallery" className={cn('bg-[var(--apsonic-surface-alt)] py-20', className)}>
            <Container>
                <SectionHeader
                    eyebrow="Moments of Glory"
                    title="Capturing the Spirit of AFCON"
                    description="From stadium celebrations to community impact, explore the visual journey of APSONIC's AFCON partnership."
                    align="center"
                />

                {/* Filter Buttons */}
                <div className="mt-12 flex justify-center gap-4">
                    <FilterButton
                        active={filter === 'all'}
                        onClick={() => setFilter('all')}
                    >
                        All Images
                    </FilterButton>
                    <FilterButton
                        active={filter === 2024}
                        onClick={() => setFilter(2024)}
                    >
                        🇨🇮 AFCON 2024
                    </FilterButton>
                    <FilterButton
                        active={filter === 2025}
                        onClick={() => setFilter(2025)}
                    >
                        🇲🇦 AFCON 2025
                    </FilterButton>
                </div>

                {/* Gallery Grid */}
                <div
                    ref={gridRef}
                    className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
                >
                    {filteredImages.map((image) => (
                        <button
                            key={image.id}
                            onClick={() => setSelectedImage(image)}
                            className="group relative aspect-[4/3] overflow-hidden rounded-2xl border border-white/10 bg-black/20 transition-all hover:border-apsonic-green/50 hover:scale-[1.02]"
                        >
                            <CloudImage
                                src={image.src}
                                alt={image.alt}
                                width={800}
                                height={600}
                                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                            />

                            {/* Gradient Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                            {/* Caption */}
                            {image.caption && (
                                <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                                    <p className="text-sm font-semibold text-white">{image.caption}</p>
                                </div>
                            )}

                            {/* Category Badge */}
                            <div className="absolute top-4 right-4">
                                <span className="rounded-full border border-apsonic-green/30 bg-apsonic-green/20 backdrop-blur-sm px-3 py-1 text-xs font-semibold uppercase tracking-wider text-apsonic-green">
                                    {image.tournament}
                                </span>
                            </div>
                        </button>
                    ))}
                </div>

                {/* Lightbox */}
                {selectedImage && (
                    <Lightbox
                        image={selectedImage}
                        onClose={() => setSelectedImage(null)}
                    />
                )}
            </Container>
        </PageSection >
    );
}

function FilterButton({
    active,
    onClick,
    children,
}: {
    active: boolean;
    onClick: () => void;
    children: React.ReactNode;
}) {
    return (
        <button
            onClick={onClick}
            className={cn(
                'rounded-full px-6 py-2 text-sm font-semibold uppercase tracking-wider transition-all',
                active
                    ? 'bg-apsonic-green text-black'
                    : 'border border-white/20 bg-white/5 text-white hover:bg-white/10'
            )}
        >
            {children}
        </button>
    );
}

function Lightbox({
    image,
    onClose,
}: {
    image: AfconGalleryImage;
    onClose: () => void;
}) {
    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4"
            onClick={onClose}
        >
            <button
                onClick={onClose}
                className="absolute top-4 right-4 rounded-full border border-white/20 bg-black/40 p-3 backdrop-blur-sm transition-colors hover:bg-black/60"
            >
                <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>

            <div className="max-w-5xl w-full" onClick={(e) => e.stopPropagation()}>
                <CloudImage
                    src={image.src}
                    alt={image.alt}
                    width={1600}
                    height={1200}
                    className="w-full h-auto rounded-2xl"
                />
                {image.caption && (
                    <p className="mt-4 text-center text-lg text-white">{image.caption}</p>
                )}
            </div>
        </div>
    );
}
