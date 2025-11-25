/**
 * AFCON Page
 * Dedicated page showcasing APSONIC's AFCON sponsorship
 */

import React from 'react';
import type { Metadata } from 'next';
import AfconHero from '@/components/afcon/AfconHero';
import AfconTimeline from '@/components/afcon/AfconTimeline';
import AfconStats from '@/components/afcon/AfconStats';
import AfconGallery from '@/components/afcon/AfconGallery';
import AfconBenefits from '@/components/afcon/AfconBenefits';

export const metadata: Metadata = {
    title: 'APSONIC - Official Top Sponsor of AFCON 2024 & 2025',
    description: 'APSONIC proudly sponsors Africa Cup of Nations 2024 in Côte d\'Ivoire and 2025 in Morocco, driving Africa\'s football dreams and connecting communities across the continent.',
    keywords: 'AFCON, Africa Cup of Nations, APSONIC, football sponsorship, African football, Côte d\'Ivoire, Morocco, CAF, African sports',
    openGraph: {
        title: 'APSONIC x AFCON - Driving Africa\'s Football Dreams',
        description: 'Official Top Sponsor of AFCON 2024 & 2025. Uniting Africa through football and sustainable mobility.',
        url: 'https://apsonic.example/afcon',
        images: [
            {
                url: '/assets/images/afcon/img1.jpg',
                width: 1200,
                height: 630,
                alt: 'APSONIC AFCON Sponsorship',
            },
        ],
    },
};

export default function AfconPage() {
    return (
        <main className="flex flex-col gap-0">
            <AfconHero />
            <AfconTimeline />
            <AfconStats />
            <AfconGallery />
            <AfconBenefits />
        </main>
    );
}
