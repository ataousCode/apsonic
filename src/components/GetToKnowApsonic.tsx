'use client';

import { useState, useEffect, useRef } from 'react';
import CloudImage from './CloudImage';
import { cn } from '@/lib/utils';

export type ApsonicCarouselSlide = {
  id: string;
  image: string;
  imageAlt: string;
  title: string;
  description: string;
};

type GetToKnowApsonicProps = {
  title?: string;
  slides: ApsonicCarouselSlide[];
};

export default function GetToKnowApsonic({
  title = 'Get to know APSONIC.',
  slides,
}: GetToKnowApsonicProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const prefersReducedMotion = useRef(false);

  // Check for reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    prefersReducedMotion.current = mediaQuery.matches;

    const handleChange = (e: MediaQueryListEvent) => {
      prefersReducedMotion.current = e.matches;
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const goToSlide = (index: number) => {
    if (isTransitioning || index === currentIndex) return;

    setIsTransitioning(true);
    setCurrentIndex(index);

    setTimeout(() => setIsTransitioning(false), 600);
  };

  const goToNext = () => {
    const nextIndex = (currentIndex + 1) % slides.length;
    goToSlide(nextIndex);
  };

  // Auto-advance slides every 3 seconds
  useEffect(() => {
    if (prefersReducedMotion.current) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [slides.length]);

  const currentSlide = slides[currentIndex];

  return (
    <section
      className="relative w-full section-gradient py-12 sm:py-16 lg:py-24 overflow-hidden"
      role="region"
      aria-label="Discover APSONIC Hero Carousel"
    >
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6">
        {/* Title */}
        <h2 className="mb-8 text-3xl font-bold text-white sm:text-4xl sm:mb-12 lg:text-5xl lg:mb-16 xl:text-6xl">
          {title}
        </h2>

        {/* Carousel Content - No container, seamless integration */}
        <div className="grid gap-8 sm:gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left: Product Image */}
          <div className="relative flex items-center justify-center min-h-[300px] sm:min-h-[400px]">
            <div className="relative h-[300px] w-full sm:h-[400px] lg:h-[500px] xl:h-[600px]">
              {slides.map((slide, index) => (
                <div
                  key={slide.id}
                  className={cn(
                    'absolute inset-0 flex items-center justify-center transition-all duration-700 ease-in-out',
                    index === currentIndex
                      ? 'opacity-100 scale-100 z-10'
                      : 'opacity-0 scale-95 z-0'
                  )}
                  style={{
                    visibility: index === currentIndex ? 'visible' : 'hidden',
                  }}
                >
                  <CloudImage
                    src={slide.image}
                    alt={slide.imageAlt}
                    width={800}
                    height={800}
                    className="h-full w-full object-contain drop-shadow-2xl"
                    priority={index === 0}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Right: Text Content */}
          <div className="flex flex-col justify-center">
            <div className="relative min-h-[200px] sm:min-h-[240px]">
              {slides.map((slide, index) => (
                <div
                  key={`text-${slide.id}`}
                  className={cn(
                    'transition-all duration-700 ease-in-out',
                    index === currentIndex
                      ? 'relative opacity-100 translate-x-0'
                      : 'absolute opacity-0 translate-x-8 pointer-events-none'
                  )}
                >
                  <h3 className="text-2xl font-bold leading-tight text-white sm:text-3xl lg:text-4xl xl:text-5xl">
                    {slide.title}
                  </h3>
                  <p className="mt-3 text-base leading-relaxed text-apsonic-muted sm:mt-4 sm:text-lg lg:text-xl">
                    {slide.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>

      {/* Screen reader announcements */}
      <div className="sr-only" role="status" aria-live="polite" aria-atomic="true">
        Slide {currentIndex + 1} of {slides.length}: {currentSlide.title}
      </div>
    </section>
  );
}

