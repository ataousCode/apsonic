/**
 * useScrollAnimation Hook
 * Custom hook for scroll-based animations with GSAP ScrollTrigger
 */

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { prefersReducedMotion, SCROLL_TRIGGER_DEFAULTS } from '@/lib/animations';

// Register ScrollTrigger plugin
if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

type ScrollAnimationOptions = {
    /**
     * Animation preset from animations.ts
     */
    preset?: {
        from: gsap.TweenVars;
        to: gsap.TweenVars;
    };
    /**
     * Custom from state
     */
    from?: gsap.TweenVars;
    /**
     * Custom to state
     */
    to?: gsap.TweenVars;
    /**
     * ScrollTrigger configuration
     */
    scrollTrigger?: ScrollTrigger.Vars;
    /**
     * Stagger delay for multiple elements
     */
    stagger?: number;
    /**
     * Only animate once
     */
    once?: boolean;
    /**
     * Disable animation (useful for conditional animations)
     */
    disabled?: boolean;
};

/**
 * Hook for scroll-based animations
 * 
 * @example
 * ```tsx
 * const ref = useScrollAnimation({
 *   preset: fadeInUp(),
 *   stagger: 0.1,
 * });
 * 
 * return <div ref={ref} className="cards">
 *   <div className="card">Card 1</div>
 *   <div className="card">Card 2</div>
 * </div>
 * ```
 */
export function useScrollAnimation<T extends HTMLElement = HTMLDivElement>(
    options: ScrollAnimationOptions = {}
) {
    const elementRef = useRef<T>(null);

    useEffect(() => {
        if (!elementRef.current || options.disabled) return;
        if (prefersReducedMotion()) return;

        const {
            preset,
            from: customFrom,
            to: customTo,
            scrollTrigger = {},
            stagger,
            once = false,
        } = options;

        // Use preset or custom from/to
        const fromState = customFrom || preset?.from || { opacity: 0, y: 30 };
        const toState = customTo || preset?.to || { opacity: 1, y: 0 };

        // Merge scroll trigger config
        const scrollConfig = {
            ...SCROLL_TRIGGER_DEFAULTS,
            ...scrollTrigger,
            trigger: elementRef.current,
            toggleActions: once
                ? 'play none none none'
                : (scrollTrigger.toggleActions || SCROLL_TRIGGER_DEFAULTS.toggleActions),
        };

        // Create animation
        const animation = gsap.fromTo(
            elementRef.current.children.length > 0
                ? Array.from(elementRef.current.children)
                : elementRef.current,
            fromState,
            {
                ...toState,
                scrollTrigger: scrollConfig,
                stagger: stagger || (toState as any).stagger,
            }
        );

        // Cleanup
        return () => {
            animation.kill();
            ScrollTrigger.getAll().forEach((trigger) => {
                if (trigger.trigger === elementRef.current) {
                    trigger.kill();
                }
            });
        };
    }, [options.disabled, options.once]);

    return elementRef;
}

/**
 * Hook for simple fade-in on scroll
 */
export function useFadeInOnScroll<T extends HTMLElement = HTMLDivElement>(
    distance = 30,
    once = true
) {
    return useScrollAnimation<T>({
        from: { opacity: 0, y: distance },
        to: { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' },
        once,
    });
}

/**
 * Hook for stagger animation on scroll
 */
export function useStaggerOnScroll<T extends HTMLElement = HTMLDivElement>(
    staggerDelay = 0.1,
    once = true
) {
    return useScrollAnimation<T>({
        from: { opacity: 0, y: 30 },
        to: { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' },
        stagger: staggerDelay,
        once,
    });
}
