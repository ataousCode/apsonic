/**
 * PageTransition Component
 * Smooth page transitions using GSAP
 */

'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import gsap from 'gsap';
import { prefersReducedMotion, ANIMATION_TIMINGS, EASINGS } from '@/lib/animations';

type PageTransitionProps = {
    children: React.ReactNode;
};

export default function PageTransition({ children }: PageTransitionProps) {
    const pathname = usePathname();
    const containerRef = useRef<HTMLDivElement>(null);
    const previousPathname = useRef(pathname);

    useEffect(() => {
        if (!containerRef.current) return;
        if (prefersReducedMotion()) return;

        // Only animate on route change
        if (previousPathname.current !== pathname) {
            // Fade in animation
            gsap.fromTo(
                containerRef.current,
                {
                    opacity: 0,
                    y: 20,
                },
                {
                    opacity: 1,
                    y: 0,
                    duration: ANIMATION_TIMINGS.normal,
                    ease: EASINGS.smooth,
                }
            );

            // Scroll to top smoothly
            window.scrollTo({ top: 0, behavior: 'smooth' });

            previousPathname.current = pathname;
        }
    }, [pathname]);

    return (
        <div ref={containerRef} style={{ willChange: 'opacity, transform' }}>
            {children}
        </div>
    );
}
