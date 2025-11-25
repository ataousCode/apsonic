/**
 * APSONIC Products Data
 * Comprehensive product catalog with motorcycles across all categories
 */

// ==================== TYPES ====================

export type ProductCategory = 'cubs' | 'street' | 'tricycles';

export type ProductSpecification = {
    label: string;
    value: string;
};

export type ProductFeature = {
    icon: string;
    title: string;
    description: string;
};

export type Product = {
    id: string;
    slug: string;
    name: string;
    tagline: string;
    category: ProductCategory;
    featured: boolean;
    price: {
        amount: number;
        currency: string;
        note?: string;
    };
    images: {
        hero: string;
        gallery: string[];
        thumbnail: string;
    };
    description: {
        short: string;
        long: string;
    };
    specifications: ProductSpecification[];
    features: ProductFeature[];
    targetUse: string[];
    availability: 'in-stock' | 'pre-order' | 'coming-soon';
    badge?: string;
};

// ==================== PRODUCT CATEGORIES ====================

export const productCategories = [
    {
        id: 'all',
        name: 'All Products',
        slug: 'all',
        description: 'Browse our complete range of motorcycles',
    },
    {
        id: 'cubs',
        name: 'Cubs',
        slug: 'cubs',
        description: 'Reliable commuter motorcycles for daily transportation',
    },
    {
        id: 'street',
        name: 'Street Bikes',
        slug: 'street',
        description: 'Performance motorcycles for urban and highway riding',
    },
    {
        id: 'tricycles',
        name: 'Tricycles',
        slug: 'tricycles',
        description: 'Heavy-duty cargo solutions for commercial operations',
    },
] as const;

// ==================== PRODUCTS CATALOG ====================

export const products: Product[] = [
    // CUBS CATEGORY
    {
        id: 'ap-110-cub',
        slug: 'ap-110-cub',
        name: 'APSONIC AP-110 Cub',
        tagline: 'The reliable daily commuter',
        category: 'cubs',
        featured: true,
        price: {
            amount: 1299,
            currency: 'USD',
            note: 'Price varies by region',
        },
        images: {
            hero: '/assets/images/home/img5.jpg',
            gallery: [
                '/assets/images/home/img5.jpg',
                '/assets/images/home/img6.jpg',
                '/assets/images/home/img7.jpg',
            ],
            thumbnail: '/assets/images/home/img1.png',
        },
        description: {
            short: 'Fuel-efficient 110cc cub motorcycle perfect for daily commuting and short-distance transportation.',
            long: 'The APSONIC AP-110 Cub is designed for African roads with exceptional fuel economy, durable construction, and low maintenance costs. Perfect for daily commuters, delivery riders, and small business owners who need reliable transportation.',
        },
        specifications: [
            { label: 'Engine', value: '110cc Air-Cooled' },
            { label: 'Power', value: '7.5 HP @ 7,500 RPM' },
            { label: 'Transmission', value: '4-Speed Manual' },
            { label: 'Fuel Capacity', value: '12 Liters' },
            { label: 'Fuel Economy', value: '65 km/L' },
            { label: 'Max Speed', value: '90 km/h' },
            { label: 'Weight', value: '95 kg' },
            { label: 'Load Capacity', value: '150 kg' },
        ],
        features: [
            {
                icon: '⛽',
                title: 'Exceptional Fuel Economy',
                description: 'Up to 65 km/L for minimal operating costs',
            },
            {
                icon: '🔧',
                title: 'Low Maintenance',
                description: 'Simple air-cooled engine with readily available parts',
            },
            {
                icon: '💪',
                title: 'Durable Frame',
                description: 'Reinforced steel frame built for African roads',
            },
            {
                icon: '🛡️',
                title: 'Corrosion Resistant',
                description: 'Special coating protects against harsh weather',
            },
        ],
        targetUse: ['Daily Commuting', 'Delivery Services', 'Small Business', 'Urban Transport'],
        availability: 'in-stock',
        badge: 'Best Seller',
    },
    {
        id: 'ap-125-cub-plus',
        slug: 'ap-125-cub-plus',
        name: 'APSONIC AP-125 Cub Plus',
        tagline: 'More power for your journey',
        category: 'cubs',
        featured: false,
        price: {
            amount: 1499,
            currency: 'USD',
            note: 'Price varies by region',
        },
        images: {
            hero: '/assets/images/home/img6.jpg',
            gallery: [
                '/assets/images/home/img6.jpg',
                '/assets/images/home/img5.jpg',
                '/assets/images/home/img7.jpg',
            ],
            thumbnail: '/assets/images/home/img6.jpg',
        },
        description: {
            short: 'Enhanced 125cc cub with more power and comfort for longer journeys.',
            long: 'Building on the success of the AP-110, the AP-125 Cub Plus offers increased power and enhanced comfort features. Ideal for riders who need extra performance for highway travel or carrying heavier loads while maintaining excellent fuel efficiency.',
        },
        specifications: [
            { label: 'Engine', value: '125cc Air-Cooled' },
            { label: 'Power', value: '9.5 HP @ 7,500 RPM' },
            { label: 'Transmission', value: '4-Speed Manual' },
            { label: 'Fuel Capacity', value: '13 Liters' },
            { label: 'Fuel Economy', value: '58 km/L' },
            { label: 'Max Speed', value: '100 km/h' },
            { label: 'Weight', value: '102 kg' },
            { label: 'Load Capacity', value: '180 kg' },
        ],
        features: [
            {
                icon: '⚡',
                title: 'Enhanced Power',
                description: '125cc engine for better acceleration and hill climbing',
            },
            {
                icon: '🪑',
                title: 'Comfort Seat',
                description: 'Dual-density foam for long-distance comfort',
            },
            {
                icon: '💡',
                title: 'LED Lighting',
                description: 'Bright LED headlight for safer night riding',
            },
            {
                icon: '📊',
                title: 'Digital Display',
                description: 'Clear digital speedometer and fuel gauge',
            },
        ],
        targetUse: ['Long-Distance Commuting', 'Highway Travel', 'Delivery Services', 'Rural Transport'],
        availability: 'in-stock',
    },

    // STREET BIKES CATEGORY
    {
        id: 'adv-200-street',
        slug: 'adv-200-street',
        name: 'APSONIC ADV 200',
        tagline: 'Adventure meets urban performance',
        category: 'street',
        featured: true,
        price: {
            amount: 2799,
            currency: 'USD',
            note: 'Price varies by region',
        },
        images: {
            hero: '/assets/images/home/img24.jpg',
            gallery: [
                '/assets/images/home/img24.jpg',
                '/assets/images/home/img10.jpg',
                '/assets/images/home/img26.jpg',
            ],
            thumbnail: '/assets/images/home/img24.jpg',
        },
        description: {
            short: 'Versatile 200cc adventure bike designed for both city streets and off-road terrain.',
            long: 'The APSONIC ADV 200 combines street performance with adventure capability. With its powerful 200cc engine, long-travel suspension, and rugged design, it handles everything from city traffic to rural dirt roads with confidence.',
        },
        specifications: [
            { label: 'Engine', value: '200cc Liquid-Cooled' },
            { label: 'Power', value: '17 HP @ 8,500 RPM' },
            { label: 'Transmission', value: '6-Speed Manual' },
            { label: 'Fuel Capacity', value: '16 Liters' },
            { label: 'Fuel Economy', value: '42 km/L' },
            { label: 'Max Speed', value: '130 km/h' },
            { label: 'Weight', value: '145 kg' },
            { label: 'Load Capacity', value: '180 kg' },
            { label: 'Ground Clearance', value: '220 mm' },
        ],
        features: [
            {
                icon: '🏍️',
                title: 'Liquid-Cooled Engine',
                description: 'Consistent performance in extreme temperatures',
            },
            {
                icon: '🌊',
                title: 'Long-Travel Suspension',
                description: 'Superior comfort on rough terrain',
            },
            {
                icon: '🛞',
                title: 'Dual-Purpose Tires',
                description: 'Excellent grip on both paved and unpaved roads',
            },
            {
                icon: '🔒',
                title: 'Disc Brakes',
                description: 'Front and rear disc brakes for reliable stopping power',
            },
        ],
        targetUse: ['Adventure Riding', 'Urban Commuting', 'Weekend Touring', 'Mixed Terrain'],
        availability: 'in-stock',
        badge: 'Popular',
    },
    {
        id: 'street-150-sport',
        slug: 'street-150-sport',
        name: 'APSONIC Street 150 Sport',
        tagline: 'Urban performance redefined',
        category: 'street',
        featured: true,
        price: {
            amount: 2199,
            currency: 'USD',
            note: 'Price varies by region',
        },
        images: {
            hero: '/assets/images/home/img25.jpg',
            gallery: [
                '/assets/images/home/img25.jpg',
                '/assets/images/home/img8.jpg',
                '/assets/images/home/img9.jpg',
            ],
            thumbnail: '/assets/images/home/img25.jpg',
        },
        description: {
            short: 'Sporty 150cc street bike with EFI technology for efficient urban performance.',
            long: 'The Street 150 Sport brings modern fuel injection technology to the African market. With its sporty design, responsive handling, and efficient EFI engine, it\'s perfect for riders who want performance and style without compromising on fuel economy.',
        },
        specifications: [
            { label: 'Engine', value: '150cc EFI Liquid-Cooled' },
            { label: 'Power', value: '14 HP @ 8,000 RPM' },
            { label: 'Transmission', value: '5-Speed Manual' },
            { label: 'Fuel Capacity', value: '14 Liters' },
            { label: 'Fuel Economy', value: '48 km/L' },
            { label: 'Max Speed', value: '120 km/h' },
            { label: 'Weight', value: '125 kg' },
            { label: 'Load Capacity', value: '160 kg' },
        ],
        features: [
            {
                icon: '💉',
                title: 'EFI Technology',
                description: 'Electronic fuel injection for optimal performance',
            },
            {
                icon: '🎨',
                title: 'Sporty Design',
                description: 'Aggressive styling with aerodynamic fairings',
            },
            {
                icon: '📱',
                title: 'Digital Dashboard',
                description: 'Full LCD display with trip computer',
            },
            {
                icon: '🔊',
                title: 'Sport Exhaust',
                description: 'Tuned exhaust for enhanced performance sound',
            },
        ],
        targetUse: ['Urban Commuting', 'Sport Riding', 'Daily Transport', 'Weekend Rides'],
        availability: 'in-stock',
    },
    {
        id: 'adv-250x-premium',
        slug: 'adv-250x-premium',
        name: 'APSONIC ADV 250X',
        tagline: 'Premium adventure performance',
        category: 'street',
        featured: true,
        price: {
            amount: 3499,
            currency: 'USD',
            note: 'Price varies by region',
        },
        images: {
            hero: '/assets/images/home/img24.jpg',
            gallery: [
                '/assets/images/home/img24.jpg',
                '/assets/images/home/img10.jpg',
                '/assets/images/home/img26.jpg',
            ],
            thumbnail: '/assets/images/home/img4.png',
        },
        description: {
            short: 'Our flagship 250cc adventure motorcycle with premium features and advanced technology.',
            long: 'The ADV 250X represents the pinnacle of APSONIC engineering. With its powerful 250cc EFI engine, advanced suspension, and premium components, it\'s designed for serious riders who demand the best performance across all terrains.',
        },
        specifications: [
            { label: 'Engine', value: '250cc EFI Liquid-Cooled' },
            { label: 'Power', value: '18.5 HP @ 8,500 RPM' },
            { label: 'Transmission', value: '6-Speed Manual' },
            { label: 'Fuel Capacity', value: '18 Liters' },
            { label: 'Fuel Economy', value: '38 km/L' },
            { label: 'Max Speed', value: '140 km/h' },
            { label: 'Weight', value: '158 kg' },
            { label: 'Load Capacity', value: '200 kg' },
            { label: 'Ground Clearance', value: '240 mm' },
        ],
        features: [
            {
                icon: '🚀',
                title: 'Premium EFI Engine',
                description: 'Advanced fuel injection for maximum power and efficiency',
            },
            {
                icon: '⚙️',
                title: 'Adjustable Suspension',
                description: 'Preload-adjustable front and rear suspension',
            },
            {
                icon: '🛡️',
                title: 'ABS Braking',
                description: 'Anti-lock braking system for enhanced safety',
            },
            {
                icon: '🌟',
                title: 'Premium Features',
                description: 'LED lighting, TFT display, and USB charging port',
            },
        ],
        targetUse: ['Long-Distance Touring', 'Adventure Riding', 'Off-Road', 'Professional Use'],
        availability: 'in-stock',
        badge: 'Premium',
    },

    // TRICYCLES CATEGORY
    {
        id: 'cargo-200-standard',
        slug: 'cargo-200-standard',
        name: 'APSONIC Cargo 200',
        tagline: 'Built for business',
        category: 'tricycles',
        featured: true,
        price: {
            amount: 3299,
            currency: 'USD',
            note: 'Price varies by region',
        },
        images: {
            hero: '/assets/images/home/img25.jpg',
            gallery: [
                '/assets/images/home/img25.jpg',
                '/assets/images/home/img8.jpg',
                '/assets/images/home/img9.jpg',
            ],
            thumbnail: '/assets/images/home/img3.png',
        },
        description: {
            short: 'Heavy-duty cargo tricycle with 200cc engine for commercial transportation.',
            long: 'The APSONIC Cargo 200 is engineered for African businesses. With its robust 200cc engine, reinforced cargo bed, and commercial-grade components, it handles heavy loads day after day. Perfect for delivery services, market vendors, and logistics operations.',
        },
        specifications: [
            { label: 'Engine', value: '200cc Air-Cooled' },
            { label: 'Power', value: '12 HP @ 6,500 RPM' },
            { label: 'Transmission', value: '5-Speed with Reverse' },
            { label: 'Fuel Capacity', value: '18 Liters' },
            { label: 'Fuel Economy', value: '32 km/L' },
            { label: 'Max Speed', value: '70 km/h' },
            { label: 'Weight', value: '280 kg' },
            { label: 'Cargo Capacity', value: '500 kg' },
            { label: 'Cargo Bed Size', value: '1.8m x 1.2m' },
        ],
        features: [
            {
                icon: '📦',
                title: 'Large Cargo Bed',
                description: '500kg capacity with reinforced steel construction',
            },
            {
                icon: '🔄',
                title: 'Reverse Gear',
                description: 'Easy maneuvering in tight spaces',
            },
            {
                icon: '🛞',
                title: 'Heavy-Duty Tires',
                description: 'Commercial-grade tires for maximum durability',
            },
            {
                icon: '🔧',
                title: 'Easy Maintenance',
                description: 'Simple air-cooled engine with accessible components',
            },
        ],
        targetUse: ['Delivery Services', 'Market Transport', 'Logistics', 'Commercial Operations'],
        availability: 'in-stock',
        badge: 'Commercial',
    },
    {
        id: 'cargo-250-heavy',
        slug: 'cargo-250-heavy',
        name: 'APSONIC Cargo 250 Heavy',
        tagline: 'Maximum capacity, maximum reliability',
        category: 'tricycles',
        featured: false,
        price: {
            amount: 3899,
            currency: 'USD',
            note: 'Price varies by region',
        },
        images: {
            hero: '/assets/images/home/img1.png',
            gallery: [
                '/assets/images/home/img1.png',
                '/assets/images/home/img3.png',
                '/assets/images/home/img4.png',
            ],
            thumbnail: '/assets/images/home/img1.png',
        },
        description: {
            short: 'Premium heavy-duty tricycle with 250cc engine for maximum cargo capacity.',
            long: 'The Cargo 250 Heavy is our most powerful tricycle, designed for the most demanding commercial applications. With its 250cc engine, extra-large cargo bed, and reinforced chassis, it can handle the heaviest loads while maintaining reliability and efficiency.',
        },
        specifications: [
            { label: 'Engine', value: '250cc Liquid-Cooled' },
            { label: 'Power', value: '15 HP @ 6,500 RPM' },
            { label: 'Transmission', value: '5-Speed with Reverse' },
            { label: 'Fuel Capacity', value: '20 Liters' },
            { label: 'Fuel Economy', value: '28 km/L' },
            { label: 'Max Speed', value: '75 km/h' },
            { label: 'Weight', value: '320 kg' },
            { label: 'Cargo Capacity', value: '750 kg' },
            { label: 'Cargo Bed Size', value: '2.0m x 1.4m' },
        ],
        features: [
            {
                icon: '💪',
                title: 'Extra Heavy-Duty',
                description: '750kg cargo capacity with reinforced chassis',
            },
            {
                icon: '❄️',
                title: 'Liquid Cooling',
                description: 'Reliable performance even under heavy loads',
            },
            {
                icon: '🔒',
                title: 'Hydraulic Brakes',
                description: 'Enhanced braking power for heavy loads',
            },
            {
                icon: '⚡',
                title: 'Electric Start',
                description: 'Convenient electric starter with backup kick start',
            },
        ],
        targetUse: ['Heavy Logistics', 'Construction', 'Bulk Transport', 'Industrial Use'],
        availability: 'in-stock',
    },
    {
        id: 'passenger-150-taxi',
        slug: 'passenger-150-taxi',
        name: 'APSONIC Passenger 150',
        tagline: 'Comfortable passenger transport',
        category: 'tricycles',
        featured: false,
        price: {
            amount: 2999,
            currency: 'USD',
            note: 'Price varies by region',
        },
        images: {
            hero: '/assets/images/home/img20.jpg',
            gallery: [
                '/assets/images/home/img20.jpg',
                '/assets/images/home/img11.jpg',
                '/assets/images/home/img12.jpg',
            ],
            thumbnail: '/assets/images/home/img2.jpeg',
        },
        description: {
            short: 'Passenger tricycle designed for comfortable and safe public transportation.',
            long: 'The Passenger 150 is purpose-built for passenger transport services. With comfortable seating for up to 4 passengers, weather protection, and safety features, it\'s ideal for taxi services, school runs, and community transport.',
        },
        specifications: [
            { label: 'Engine', value: '150cc Air-Cooled' },
            { label: 'Power', value: '10 HP @ 7,000 RPM' },
            { label: 'Transmission', value: '4-Speed with Reverse' },
            { label: 'Fuel Capacity', value: '15 Liters' },
            { label: 'Fuel Economy', value: '35 km/L' },
            { label: 'Max Speed', value: '65 km/h' },
            { label: 'Weight', value: '250 kg' },
            { label: 'Passenger Capacity', value: '4 Adults' },
            { label: 'Cabin Type', value: 'Enclosed with Roof' },
        ],
        features: [
            {
                icon: '👥',
                title: 'Comfortable Seating',
                description: 'Padded bench seats for up to 4 passengers',
            },
            {
                icon: '☔',
                title: 'Weather Protection',
                description: 'Enclosed cabin with roof and side panels',
            },
            {
                icon: '🚪',
                title: 'Easy Access',
                description: 'Wide doors for convenient passenger entry/exit',
            },
            {
                icon: '🛡️',
                title: 'Safety Features',
                description: 'Seat belts, grab handles, and safety glass',
            },
        ],
        targetUse: ['Taxi Services', 'School Transport', 'Community Transit', 'Tour Services'],
        availability: 'in-stock',
    },
];

// ==================== HELPER FUNCTIONS ====================

/**
 * Get all products in a specific category
 */
export function getProductsByCategory(category: ProductCategory | 'all'): Product[] {
    if (category === 'all') return products;
    return products.filter(product => product.category === category);
}

/**
 * Get featured products
 */
export function getFeaturedProducts(): Product[] {
    return products.filter(product => product.featured);
}

/**
 * Get product by slug
 */
export function getProductBySlug(slug: string): Product | undefined {
    return products.find(product => product.slug === slug);
}

/**
 * Get all unique categories
 */
export function getCategories() {
    return productCategories;
}
