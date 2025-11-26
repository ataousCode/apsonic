import { useState, useEffect, useRef } from 'react';

/**
 * Custom hook for auto-rotating carousel functionality
 * @param itemCount - Number of items in the carousel
 * @param intervalMs - Interval in milliseconds between rotations (default: 3000)
 * @returns Current index and setter function
 */
export function useAutoRotate(itemCount: number, intervalMs: number = 3000) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const timerRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        if (itemCount <= 1) return;

        timerRef.current = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % itemCount);
        }, intervalMs);

        return () => {
            if (timerRef.current) {
                clearInterval(timerRef.current);
            }
        };
    }, [itemCount, intervalMs]);

    return [currentIndex, setCurrentIndex] as const;
}
