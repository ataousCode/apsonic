'use client';

import { cn } from '@/lib/utils';

type AppStore = 'apple' | 'google';

interface AppStoreButtonProps {
    store: AppStore;
    href: string;
    className?: string;
}

const storeConfig = {
    apple: {
        alt: 'Download on the App Store',
        image: 'https://tools.applemediaservices.com/api/badges/download-on-the-app-store/black/en-us?size=250x83&releaseDate=1280376000',
    },
    google: {
        alt: 'Get it on Google Play',
        image: 'https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png',
    },
};

/**
 * Reusable App Store Button Component
 * Displays official badge images for App Store or Google Play
 */
export default function AppStoreButton({ store, href, className }: AppStoreButtonProps) {
    const config = storeConfig[store];

    return (
        <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
                'inline-block transition-transform hover:scale-105 active:scale-95',
                className
            )}
            aria-label={config.alt}
        >
            <img
                src={config.image}
                alt={config.alt}
                className={cn(
                    'h-auto',
                    store === 'apple' ? 'w-[140px]' : 'w-[160px]'
                )}
            />
        </a>
    );
}
