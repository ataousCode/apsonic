/**
 * AFCON Sponsorship Data
 * Content for APSONIC's role as Official Top Sponsor of AFCON 2024 & 2025
 */

export type AfconTournament = {
    year: number;
    country: string;
    countryCode: string;
    dates: string;
    status: 'completed' | 'upcoming';
    logo?: string;
    highlights: string[];
    statistics: {
        label: string;
        value: string;
        icon: string;
    }[];
};

export type AfconTestimonial = {
    id: string;
    quote: string;
    author: string;
    role: string;
    organization: string;
    image?: string;
};

export type AfconBenefit = {
    id: string;
    title: string;
    description: string;
    icon: string;
};

export type AfconGalleryImage = {
    id: string;
    src: string;
    alt: string;
    category: 'tournament' | 'community' | 'branding' | 'celebration';
    tournament: 2024 | 2025;
    caption?: string;
};

// Tournament Data
export const afconTournaments: AfconTournament[] = [
    {
        year: 2024,
        country: "Côte d'Ivoire",
        countryCode: 'CI',
        dates: 'January 13 - February 11, 2024',
        status: 'completed',
        highlights: [
            'Historic tournament with record-breaking attendance',
            'APSONIC fleet deployed across 6 host cities',
            'Official transportation partner for teams and officials',
            'Community engagement programs in 12 cities',
            'Over 500 million viewers across Africa',
        ],
        statistics: [
            { label: 'Viewers Across Africa', value: '500M+', icon: '📺' },
            { label: 'Host Cities Supported', value: '6', icon: '🏙️' },
            { label: 'Vehicles Deployed', value: '200+', icon: '🏍️' },
            { label: 'Countries Represented', value: '24', icon: '🌍' },
            { label: 'Community Programs', value: '12', icon: '🤝' },
            { label: 'Jobs Created', value: '1,500+', icon: '💼' },
        ],
    },
    {
        year: 2025,
        country: 'Morocco',
        countryCode: 'MA',
        dates: 'December 2025 - January 2026',
        status: 'upcoming',
        highlights: [
            'Expanded partnership with enhanced visibility',
            'Largest fleet deployment in APSONIC history',
            'Pan-African mobility initiative launch',
            'Youth development programs across 15 countries',
            'Expected reach of 600 million viewers',
        ],
        statistics: [
            { label: 'Expected Viewers', value: '600M+', icon: '📺' },
            { label: 'Host Cities', value: '9', icon: '🏙️' },
            { label: 'Planned Vehicle Fleet', value: '300+', icon: '🏍️' },
            { label: 'Participating Nations', value: '24', icon: '🌍' },
            { label: 'Youth Programs', value: '15', icon: '⚽' },
            { label: 'Infrastructure Projects', value: '20+', icon: '🏗️' },
        ],
    },
];

// Partnership Benefits
export const afconBenefits: AfconBenefit[] = [
    {
        id: 'continental-reach',
        title: 'Continental Reach',
        description: 'Unparalleled visibility across all 54 African nations through Africa\'s most-watched sporting event.',
        icon: '🌍',
    },
    {
        id: 'brand-alignment',
        title: 'Perfect Brand Alignment',
        description: 'Football and mobility unite communities, embodying APSONIC\'s mission of connecting Africa.',
        icon: '⚽',
    },
    {
        id: 'community-impact',
        title: 'Community Impact',
        description: 'Grassroots programs empowering local communities through sport and sustainable transportation.',
        icon: '🤝',
    },
    {
        id: 'media-exposure',
        title: 'Massive Media Exposure',
        description: 'Broadcast to over 500 million viewers with extensive digital and social media coverage.',
        icon: '📺',
    },
    {
        id: 'legacy-building',
        title: 'Legacy Building',
        description: 'Long-term infrastructure development and youth programs creating lasting positive change.',
        icon: '🏆',
    },
    {
        id: 'pan-african-unity',
        title: 'Pan-African Unity',
        description: 'Celebrating African excellence and fostering unity through the continent\'s greatest sporting celebration.',
        icon: '🎉',
    },
];

// Testimonials
export const afconTestimonials: AfconTestimonial[] = [
    {
        id: 'caf-president',
        quote: 'APSONIC\'s commitment to African football goes beyond sponsorship. They are true partners in our mission to develop the beautiful game across the continent.',
        author: 'Dr. Patrice Motsepe',
        role: 'President',
        organization: 'Confederation of African Football (CAF)',
    },
    {
        id: 'tournament-director',
        quote: 'The partnership with APSONIC has been transformative. Their mobility solutions ensured seamless operations across all host cities.',
        author: 'Veron Mosengo-Omba',
        role: 'Secretary General',
        organization: 'CAF',
    },
    {
        id: 'host-country',
        quote: 'APSONIC\'s presence elevated the tournament experience. Their commitment to excellence mirrors the spirit of African football.',
        author: 'Idriss Diallo',
        role: 'Tournament Director',
        organization: 'AFCON 2024 Organizing Committee',
    },
    {
        id: 'community-leader',
        quote: 'Through AFCON, APSONIC brought more than motorcycles to our communities. They brought opportunity, hope, and connection.',
        author: 'Amina Koné',
        role: 'Community Development Director',
        organization: 'Abidjan Youth Sports Foundation',
    },
];

// Gallery Images
export const afconGalleryImages: AfconGalleryImage[] = [
    {
        id: 'afcon-1',
        src: '/assets/images/afcon/img1.jpg',
        alt: 'APSONIC branding at AFCON 2024 stadium',
        category: 'branding',
        tournament: 2024,
        caption: 'APSONIC presence at iconic AFCON 2024 venues',
    },
    {
        id: 'afcon-2',
        src: '/assets/images/afcon/img2.jpg',
        alt: 'AFCON 2024 tournament celebration',
        category: 'tournament',
        tournament: 2024,
        caption: 'Historic moments from AFCON 2024 in Côte d\'Ivoire',
    },
    {
        id: 'afcon-3',
        src: '/assets/images/afcon/img3.jpg',
        alt: 'Community engagement during AFCON',
        category: 'community',
        tournament: 2024,
        caption: 'Empowering communities through sport and mobility',
    },
    {
        id: 'afcon-4',
        src: '/assets/images/afcon/img4.jpg',
        alt: 'APSONIC fleet at AFCON event',
        category: 'branding',
        tournament: 2024,
        caption: 'APSONIC fleet supporting tournament operations',
    },
    {
        id: 'afcon-5',
        src: '/assets/images/afcon/img5.jpg',
        alt: 'AFCON celebration with fans',
        category: 'celebration',
        tournament: 2024,
        caption: 'Celebrating African football excellence',
    },
    {
        id: 'afcon-6',
        src: '/assets/images/afcon/img6.jpg',
        alt: 'AFCON 2025 Morocco preparation',
        category: 'tournament',
        tournament: 2025,
        caption: 'Preparing for AFCON 2025 in Morocco',
    },
];

// Hero Content
export const afconHeroContent = {
    eyebrow: 'Official Top Sponsor',
    title: 'Driving Africa\'s Football Dreams',
    subtitle: 'AFCON 2024 & 2025',
    description: 'APSONIC proudly stands as the Official Top Sponsor of the Africa Cup of Nations, uniting the continent through the beautiful game and sustainable mobility solutions.',
    stats: [
        { label: 'Million Viewers', value: '500+', icon: '📺' },
        { label: 'African Nations', value: '54', icon: '🌍' },
        { label: 'Tournaments', value: '2', icon: '🏆' },
        { label: 'Communities Impacted', value: '1000+', icon: '🤝' },
    ],
    cta: {
        primary: { text: 'Explore Our Impact', href: '#impact' },
        secondary: { text: 'View Gallery', href: '#gallery' },
    },
};

// Impact Statistics (Overall)
export const afconImpactStats = [
    {
        category: 'Reach & Visibility',
        stats: [
            { label: 'Total Viewers', value: '1.1B+', description: 'Across both tournaments' },
            { label: 'Countries Reached', value: '54', description: 'All African nations' },
            { label: 'Social Media Impressions', value: '2.5B+', description: 'Digital engagement' },
            { label: 'Broadcast Hours', value: '500+', description: 'Live coverage' },
        ],
    },
    {
        category: 'Operational Excellence',
        stats: [
            { label: 'Vehicles Deployed', value: '500+', description: 'Across both tournaments' },
            { label: 'Host Cities Supported', value: '15', description: 'Transportation hubs' },
            { label: 'Teams Served', value: '48', description: 'Official team transport' },
            { label: 'Officials Transported', value: '1,000+', description: 'Seamless logistics' },
        ],
    },
    {
        category: 'Community Impact',
        stats: [
            { label: 'Jobs Created', value: '3,000+', description: 'Direct employment' },
            { label: 'Youth Programs', value: '27', description: 'Across 15 countries' },
            { label: 'Communities Engaged', value: '1,000+', description: 'Grassroots initiatives' },
            { label: 'Infrastructure Projects', value: '35+', description: 'Lasting legacy' },
        ],
    },
];
