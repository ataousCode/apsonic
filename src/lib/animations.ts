/**
 * Animation Utilities and Presets
 * Centralized GSAP animation configurations for consistent animations across the site
 */

import gsap from 'gsap';

// ==================== TIMING CONSTANTS ====================

export const ANIMATION_TIMINGS = {
    fast: 0.2,      // Micro-interactions (hover, focus)
    normal: 0.4,    // Standard transitions
    slow: 0.6,      // Hero animations, page transitions
    verySlow: 0.8,  // Complex animations
    stagger: 0.1,   // Stagger delay between items
    staggerFast: 0.05, // Fast stagger
} as const;

export const EASINGS = {
    smooth: 'power2.out',
    smoothIn: 'power2.in',
    smoothInOut: 'power2.inOut',
    bounce: 'back.out(1.4)',
    elastic: 'elastic.out(1, 0.5)',
    expo: 'expo.out',
} as const;

// ==================== ANIMATION PRESETS ====================

/**
 * Fade in from bottom
 */
export const fadeInUp = (distance = 30) => ({
    from: {
        opacity: 0,
        y: distance,
    },
    to: {
        opacity: 1,
        y: 0,
        duration: ANIMATION_TIMINGS.normal,
        ease: EASINGS.smooth,
    },
});

/**
 * Fade in from top
 */
export const fadeInDown = (distance = 30) => ({
    from: {
        opacity: 0,
        y: -distance,
    },
    to: {
        opacity: 1,
        y: 0,
        duration: ANIMATION_TIMINGS.normal,
        ease: EASINGS.smooth,
    },
});

/**
 * Fade in from left
 */
export const fadeInLeft = (distance = 30) => ({
    from: {
        opacity: 0,
        x: -distance,
    },
    to: {
        opacity: 1,
        x: 0,
        duration: ANIMATION_TIMINGS.normal,
        ease: EASINGS.smooth,
    },
});

/**
 * Fade in from right
 */
export const fadeInRight = (distance = 30) => ({
    from: {
        opacity: 0,
        x: distance,
    },
    to: {
        opacity: 1,
        x: 0,
        duration: ANIMATION_TIMINGS.normal,
        ease: EASINGS.smooth,
    },
});

/**
 * Simple fade in
 */
export const fadeIn = () => ({
    from: {
        opacity: 0,
    },
    to: {
        opacity: 1,
        duration: ANIMATION_TIMINGS.normal,
        ease: EASINGS.smooth,
    },
});

/**
 * Scale up animation
 */
export const scaleIn = () => ({
    from: {
        opacity: 0,
        scale: 0.9,
    },
    to: {
        opacity: 1,
        scale: 1,
        duration: ANIMATION_TIMINGS.normal,
        ease: EASINGS.bounce,
    },
});

/**
 * Slide in from bottom
 */
export const slideInUp = (distance = 50) => ({
    from: {
        y: distance,
        opacity: 0,
    },
    to: {
        y: 0,
        opacity: 1,
        duration: ANIMATION_TIMINGS.slow,
        ease: EASINGS.expo,
    },
});

/**
 * Stagger animation configuration
 */
export const staggerConfig = (delay = ANIMATION_TIMINGS.stagger) => ({
    stagger: {
        amount: delay,
        from: 'start',
    },
});

/**
 * Stagger from center
 */
export const staggerFromCenter = (delay = ANIMATION_TIMINGS.stagger) => ({
    stagger: {
        amount: delay,
        from: 'center',
    },
});

// ==================== SCROLL TRIGGER CONFIGS ====================

export const SCROLL_TRIGGER_DEFAULTS = {
    start: 'top 80%',
    end: 'bottom 20%',
    toggleActions: 'play none none reverse',
    markers: false, // Set to true for debugging
} as const;

export const SCROLL_TRIGGER_ONCE = {
    start: 'top 80%',
    toggleActions: 'play none none none',
    markers: false,
} as const;

// ==================== HELPER FUNCTIONS ====================

/**
 * Check if user prefers reduced motion
 */
export const prefersReducedMotion = (): boolean => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

/**
 * Create a GSAP context with reduced motion support
 */
export const createAnimationContext = (
    callback: () => void,
    container?: React.RefObject<HTMLElement>
) => {
    if (prefersReducedMotion()) {
        // Skip animations if user prefers reduced motion
        return { revert: () => { } };
    }

    return gsap.context(callback, container?.current);
};

/**
 * Animate element with fade in up
 */
export const animateFadeInUp = (
    element: string | Element,
    options?: {
        delay?: number;
        distance?: number;
        duration?: number;
    }
) => {
    const { delay = 0, distance = 30, duration = ANIMATION_TIMINGS.normal } = options || {};
    const preset = fadeInUp(distance);

    return gsap.fromTo(
        element,
        preset.from,
        {
            ...preset.to,
            delay,
            duration,
        }
    );
};

/**
 * Animate elements with stagger
 */
export const animateStagger = (
    elements: string | Element[],
    preset: ReturnType<typeof fadeInUp>,
    options?: {
        delay?: number;
        stagger?: number;
    }
) => {
    const { delay = 0, stagger = ANIMATION_TIMINGS.stagger } = options || {};

    return gsap.fromTo(
        elements,
        preset.from,
        {
            ...preset.to,
            delay,
            stagger,
        }
    );
};

/**
 * Create hover animation
 */
export const createHoverAnimation = (
    element: Element,
    scale = 1.05,
    duration = ANIMATION_TIMINGS.fast
) => {
    const onEnter = () => {
        gsap.to(element, {
            scale,
            duration,
            ease: EASINGS.smooth,
        });
    };

    const onLeave = () => {
        gsap.to(element, {
            scale: 1,
            duration,
            ease: EASINGS.smooth,
        });
    };

    return { onEnter, onLeave };
};

/**
 * Animate number counter
 */
export const animateCounter = (
    element: Element,
    endValue: number,
    options?: {
        duration?: number;
        decimals?: number;
        onUpdate?: (value: number) => void;
    }
) => {
    const { duration = 2, decimals = 0, onUpdate } = options || {};
    const obj = { value: 0 };

    return gsap.to(obj, {
        value: endValue,
        duration,
        ease: EASINGS.expo,
        onUpdate: () => {
            const currentValue = decimals > 0
                ? obj.value.toFixed(decimals)
                : Math.round(obj.value);

            if (onUpdate) {
                onUpdate(Number(currentValue));
            } else {
                element.textContent = currentValue.toString();
            }
        },
    });
};
