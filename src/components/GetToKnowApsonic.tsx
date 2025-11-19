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
  const [isPaused, setIsPaused] = useState(false);
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

  // Auto-advance slides
  useEffect(() => {
    if (isPaused || prefersReducedMotion.current) return;

    const interval = setInterval(() => {
      goToNext();
    }, 5000);

    return () => clearInterval(interval);
  }, [currentIndex, isPaused]);

  const currentSlide = slides[currentIndex];

  return (
    <section
      className="relative w-full section-gradient py-16 lg:py-24"
      role="region"
      aria-label="Discover APSONIC Hero Carousel"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="mx-auto max-w-[1400px] px-6">
        {/* Title */}
        <h2 className="mb-12 text-4xl font-bold text-white sm:text-5xl lg:mb-16 lg:text-6xl">
          {title}
        </h2>

        {/* Carousel Content - No container, seamless integration */}
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left: Product Image */}
          <div className="relative flex items-center justify-center">
            <div className="relative h-[400px] w-full lg:h-[600px]">
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
            <div className="space-y-4">
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
                  <h3 className="text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl">
                    {slide.title}
                  </h3>
                  <p className="mt-4 text-lg leading-relaxed text-apsonic-muted lg:text-xl">
                    {slide.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Navigation Dots & Controls */}
        <div className="mt-12 flex items-center justify-center gap-2">
          {slides.map((slide, index) => (
            <button
              key={`dot-${slide.id}`}
              onClick={() => goToSlide(index)}
              className={cn(
                'h-2 rounded-full transition-all duration-300',
                index === currentIndex
                  ? 'w-8 bg-apsonic-green'
                  : 'w-2 bg-white/30 hover:bg-white/50'
              )}
              aria-label={`Go to slide ${index + 1}: ${slide.title}`}
              aria-current={index === currentIndex}
            />
          ))}

          {/* Play/Pause button */}
          <button
            onClick={() => setIsPaused(!isPaused)}
            className="ml-2 flex h-6 w-6 items-center justify-center rounded-full bg-apsonic-green text-white transition-all hover:bg-apsonic-green-dark"
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

        {/* Screen reader announcements */}
        <div className="sr-only" role="status" aria-live="polite" aria-atomic="true">
          Slide {currentIndex + 1} of {slides.length}: {currentSlide.title}
        </div>
      </div>
    </section>
  );
}

