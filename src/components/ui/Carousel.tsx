'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { cn } from '@/lib/utils';

export type CarouselSlide = {
  id: string;
  image: string;
  imageAlt: string;
  title: string;
  description: string;
};

export type CarouselOptions = {
  autoplay?: boolean;
  autoplayDelay?: number;
  loop?: boolean;
  pauseOnHover?: boolean;
};

type CarouselProps = {
  slides: CarouselSlide[];
  options?: CarouselOptions;
  onChange?: (index: number) => void;
  className?: string;
};

export function Carousel({
  slides,
  options = {},
  onChange,
  className,
}: CarouselProps) {
  const {
    autoplay = true,
    autoplayDelay = 5000,
    loop = true,
    pauseOnHover = true,
  } = options;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const autoplayTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Respect prefers-reduced-motion
  const prefersReducedMotion = useRef(false);
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    prefersReducedMotion.current = mediaQuery.matches;
    
    const handleChange = (e: MediaQueryListEvent) => {
      prefersReducedMotion.current = e.matches;
    };
    
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const goToSlide = useCallback((index: number) => {
    if (isTransitioning) return;
    
    const newIndex = loop
      ? (index + slides.length) % slides.length
      : Math.max(0, Math.min(index, slides.length - 1));
    
    if (newIndex === currentIndex) return;
    
    setIsTransitioning(true);
    setCurrentIndex(newIndex);
    onChange?.(newIndex);
    
    setTimeout(() => setIsTransitioning(false), 600);
  }, [currentIndex, slides.length, loop, onChange, isTransitioning]);

  const goToNext = useCallback(() => {
    goToSlide(currentIndex + 1);
  }, [currentIndex, goToSlide]);

  const goToPrevious = useCallback(() => {
    goToSlide(currentIndex - 1);
  }, [currentIndex, goToSlide]);

  // Autoplay
  useEffect(() => {
    if (!autoplay || isPaused || prefersReducedMotion.current) return;

    autoplayTimerRef.current = setTimeout(() => {
      goToNext();
    }, autoplayDelay);

    return () => {
      if (autoplayTimerRef.current) {
        clearTimeout(autoplayTimerRef.current);
      }
    };
  }, [autoplay, autoplayDelay, isPaused, currentIndex, goToNext]);

  // Touch handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      goToNext();
    } else if (isRightSwipe) {
      goToPrevious();
    }
  };

  // Mouse drag handlers
  const [mouseStart, setMouseStart] = useState<number | null>(null);
  const [mouseEnd, setMouseEnd] = useState<number | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setMouseEnd(null);
    setMouseStart(e.clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    setMouseEnd(e.clientX);
  };

  const handleMouseUp = () => {
    if (!isDragging) return;
    setIsDragging(false);

    if (!mouseStart || !mouseEnd) return;
    
    const distance = mouseStart - mouseEnd;
    const isLeftDrag = distance > 50;
    const isRightDrag = distance < -50;

    if (isLeftDrag) {
      goToNext();
    } else if (isRightDrag) {
      goToPrevious();
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        goToPrevious();
      } else if (e.key === 'ArrowRight') {
        goToNext();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [goToNext, goToPrevious]);

  const currentSlide = slides[currentIndex];

  return (
    <div
      className={cn('relative w-full', className)}
      role="region"
      aria-roledescription="carousel"
      aria-label="Get to know APSONIC carousel"
      onMouseEnter={() => pauseOnHover && setIsPaused(true)}
      onMouseLeave={() => pauseOnHover && setIsPaused(false)}
    >
      {/* Slide content */}
      <div
        className="relative overflow-hidden"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
      >
        <div className="relative">
          {slides.map((slide, index) => (
            <div
              key={slide.id}
              className={cn(
                'transition-all duration-600 ease-in-out',
                index === currentIndex
                  ? 'relative opacity-100'
                  : 'absolute inset-0 opacity-0 pointer-events-none'
              )}
              aria-hidden={index !== currentIndex}
            >
              {/* This will be customized by parent */}
              <div className="w-full">{/* Slot for custom content */}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation dots */}
      <div className="mt-8 flex items-center justify-center gap-2">
        {slides.map((slide, index) => (
          <button
            key={`dot-${slide.id}`}
            onClick={() => goToSlide(index)}
            className={cn(
              'h-2 rounded-full transition-all duration-300',
              index === currentIndex
                ? 'w-8 bg-[#111111]'
                : 'w-2 bg-[#d1d1d6] hover:bg-[#86868b]'
            )}
            aria-label={`Go to slide ${index + 1}`}
            aria-current={index === currentIndex}
          />
        ))}

        {/* Play/Pause button */}
        <button
          onClick={() => setIsPaused(!isPaused)}
          className="ml-2 flex h-6 w-6 items-center justify-center rounded-full bg-[#111111] text-white transition-all hover:bg-[#424245]"
          aria-label={isPaused ? 'Play carousel' : 'Pause carousel'}
        >
          {isPaused ? (
            <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          ) : (
            <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 24 24">
              <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
            </svg>
          )}
        </button>
      </div>

      {/* Screen reader live region */}
      <div className="sr-only" role="status" aria-live="polite" aria-atomic="true">
        Slide {currentIndex + 1} of {slides.length}: {currentSlide.title}
      </div>
    </div>
  );
}

