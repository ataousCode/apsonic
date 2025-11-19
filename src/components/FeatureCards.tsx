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
      <div className="group relative overflow-hidden rounded-[2.5rem] bg-white">
        {/* Card Content */}
        <div className="relative flex min-h-[650px] flex-col lg:min-h-[700px]">
          {/* Text Content - Top */}
          <div className="relative z-10 p-10 lg:p-12">
            <p className="text-xs font-semibold uppercase tracking-wider text-gray-600">
              {card.category}
            </p>
            <h3 className="mt-3 max-w-xs text-3xl font-bold leading-tight text-black lg:text-4xl">
              {card.title}
            </h3>
            {card.subtitle && (
              <p className="mt-1 text-3xl font-bold leading-tight text-black lg:text-4xl">
                {card.subtitle}
              </p>
            )}
          </div>

          {/* Large Product Images - Center/Bottom */}
          <div className="relative flex flex-1 items-end justify-center px-8 pb-8 lg:px-12 lg:pb-12">
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
                  className="h-auto w-full max-w-md object-contain lg:max-w-lg"
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
                      ? "w-8 bg-gray-800"
                      : "w-2 bg-gray-300 hover:bg-gray-400"
                  )}
                  aria-label={`View image ${imgIndex + 1}`}
                />
              ))}
              {/* Play button */}
              <button
                className="ml-2 flex h-6 w-6 items-center justify-center rounded-full bg-gray-800 text-white transition-all hover:bg-black"
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
    <div className="bg-white py-20 lg:py-32">
      <div className="mx-auto max-w-[1400px] space-y-12 px-6">
        {/* Section Title */}
        <ScrollReveal direction="up">
          <h2 className="text-4xl font-bold text-black sm:text-5xl lg:text-6xl">
            {title}
          </h2>
        </ScrollReveal>

        {/* Cards Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
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

