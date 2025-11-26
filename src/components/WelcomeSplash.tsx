'use client';

import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import AnimatedBackground from './ui/AnimatedBackground';

export default function WelcomeSplash() {
    const [isVisible, setIsVisible] = useState(false);
    const [isAnimatingOut, setIsAnimatingOut] = useState(false);

    useEffect(() => {
        const hasSeenWelcome = sessionStorage.getItem('hasSeenWelcome');

        if (!hasSeenWelcome) {
            setIsVisible(true);

            const timer = setTimeout(() => {
                setIsAnimatingOut(true);
                setTimeout(() => {
                    setIsVisible(false);
                    sessionStorage.setItem('hasSeenWelcome', 'true');
                    window.dispatchEvent(new Event('welcome-splash-complete'));
                }, 800);
            }, 3000);

            return () => clearTimeout(timer);
        }
    }, []);

    if (!isVisible) return null;

    return (
        <div
            className={cn(
                'fixed inset-0 z-[100] flex items-center justify-center',
                'bg-gradient-to-br from-apsonic-ink via-black to-apsonic-ink',
                'transition-opacity duration-800',
                isAnimatingOut ? 'opacity-0' : 'opacity-100'
            )}
        >
            <AnimatedBackground variant="bright" />

            <div className="relative z-10 w-full max-w-4xl mx-auto px-4">
                <div className={cn(
                    'text-center space-y-8',
                    'transition-all duration-1000',
                    isAnimatingOut ? 'scale-110 opacity-0' : 'scale-100 opacity-100'
                )}>
                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 drop-shadow-2xl leading-tight">
                        Welcome to
                        <br />
                        <span className="text-apsonic-green drop-shadow-[0_0_30px_rgba(28,160,73,0.8)]">
                            APSONIC Africa
                        </span>
                    </h1>

                    <div className="flex items-center justify-center gap-4 md:gap-6 text-2xl md:text-3xl lg:text-4xl text-white/90">
                        <span className="font-semibold">Good Quality</span>
                        <span className="text-apsonic-green text-4xl md:text-5xl">•</span>
                        <span className="font-semibold">Good Life</span>
                    </div>

                    <div className="flex justify-center pt-4">
                        <div className="h-1 w-32 bg-gradient-to-r from-transparent via-apsonic-green to-transparent animate-pulse" />
                    </div>
                </div>
            </div>
        </div>
    );
}
