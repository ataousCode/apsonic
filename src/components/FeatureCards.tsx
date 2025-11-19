'use client';

import { useState, useEffect, useRef } from "react";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import CloudImage from "./CloudImage";
import { cn } from "@/lib/utils";

export type FeatureCard = {
  id: string;
  category: string;
  title: string;
  subtitle?: string;
  images: string[];
  imageAlt: string;
};

type FeatureCardsProps = {
  title: string;
  cards: FeatureCard[];
};

// Individual card with auto-rotating large images (Apple style)
function FeatureCardItem({ 
  card, 
  index 
}: { 
  card: FeatureCard; 
  index: number;
}) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const autoRotateTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Auto-rotation effect - change image every 3 seconds
  useEffect(() => {
    if (!card.images || card.images.length <= 1) return;

    autoRotateTimerRef.current = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % card.images.length);
    }, 3000);

    return () => {
      if (autoRotateTimerRef.current) {
        clearInterval(autoRotateTimerRef.current);
      }
    };
  }, [card.images]);

  return (
    <ScrollReveal direction="up" delay={index * 0.1}>
      <div className="group relative overflow-hidden rounded-3xl sm:rounded-[2.5rem] glass-panel">
        {/* Card Content */}
        <div className="relative flex min-h-[500px] sm:min-h-[600px] lg:min-h-[700px] flex-col">
          {/* Decorative Glow */}
          <div className="absolute -top-20 left-1/2 h-40 w-40 sm:-top-24 sm:h-48 sm:w-48 -translate-x-1/2 rounded-full bg-apsonic-green/20 blur-3xl" />

          {/* Text Content - Top */}
          <div className="relative z-10 p-6 sm:p-8 lg:p-10 xl:p-12">
            <p className="text-[0.625rem] sm:text-xs font-semibold uppercase tracking-[0.25em] sm:tracking-[0.3em] text-apsonic-accent">
              {card.category}
            </p>
            <h3 className="mt-2 sm:mt-3 max-w-xs text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight text-white">
              {card.title}
            </h3>
            {card.subtitle && (
              <p className="mt-1 text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight text-white">
                {card.subtitle}
              </p>
            )}
          </div>

          {/* Large Product Images - Center/Bottom */}
          <div className="relative flex flex-1 items-end justify-center px-4 pb-6 sm:px-8 sm:pb-8 lg:px-12 lg:pb-12">
            {card.images.map((img, imgIndex) => (
              <div
                key={`${card.id}-img-${imgIndex}`}
                className={cn(
                  "absolute inset-x-0 bottom-0 flex items-end justify-center transition-all duration-1000 ease-in-out",
                  imgIndex === currentImageIndex 
                    ? "opacity-100 scale-100 z-10" 
                    : "opacity-0 scale-95 z-0"
                )}
                style={{
                  visibility: imgIndex === currentImageIndex ? 'visible' : 'hidden',
                }}
              >
                <CloudImage
                  src={img}
                  alt={`${card.imageAlt} - View ${imgIndex + 1}`}
                  width={800}
                  height={800}
                  className="h-auto w-full max-w-md object-contain drop-shadow-2xl lg:max-w-lg"
                  priority={imgIndex === 0 && index === 0}
                />
              </div>
            ))}
          </div>

          {/* Navigation Dots - Bottom Center */}
          {card.images && card.images.length > 1 && (
            <div className="absolute bottom-6 left-1/2 z-20 flex -translate-x-1/2 gap-2">
              {card.images.map((_, imgIndex) => (
                <button
                  key={`dot-${imgIndex}`}
                  onClick={() => setCurrentImageIndex(imgIndex)}
                  className={cn(
                    "h-2 rounded-full transition-all duration-300",
                    imgIndex === currentImageIndex
                      ? "w-8 bg-apsonic-green"
                      : "w-2 bg-white/30 hover:bg-white/50"
                  )}
                  aria-label={`View image ${imgIndex + 1}`}
                />
              ))}
              {/* Play button */}
              <button
                className="ml-2 flex h-6 w-6 items-center justify-center rounded-full bg-apsonic-green text-white transition-all hover:bg-apsonic-green-dark"
                aria-label="Play"
              >
                <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </button>
            </div>
          )}
        </div>
      </div>
    </ScrollReveal>
  );
}

export default function FeatureCards({ title, cards }: FeatureCardsProps) {
  return (
    <div className="section-gradient py-12 sm:py-16 lg:py-24 xl:py-32 overflow-hidden">
      <div className="mx-auto max-w-[1400px] space-y-8 sm:space-y-12 px-4 sm:px-6">
        {/* Section Title */}
        <ScrollReveal direction="up">
          <h2 className="text-3xl font-bold text-white sm:text-4xl lg:text-5xl xl:text-6xl">
            {title}
          </h2>
        </ScrollReveal>

        {/* Cards Grid */}
        <div className="grid gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {cards.map((card, index) => (
            <FeatureCardItem
              key={card.id}
              card={card}
              index={index}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

