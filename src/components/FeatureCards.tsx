'use client';

import { useState, useEffect, useRef } from "react";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import CloudImage from "./CloudImage";
import { cn } from "@/lib/utils";

export type FeatureCard = {
  id: string;
  category: string;
  title: string;
  description: string;
  images: string[]; // Changed to array for rotation
  imageAlt: string;
  expandedContent?: string;
};

type FeatureCardsProps = {
  title: string;
  cards: FeatureCard[];
};

// Individual card with auto-rotating images
function FeatureCardItem({ 
  card, 
  index, 
  isExpanded, 
  onToggle 
}: { 
  card: FeatureCard; 
  index: number; 
  isExpanded: boolean;
  onToggle: () => void;
}) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isAutoRotating, setIsAutoRotating] = useState(true);
  const autoRotateTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Auto-rotation effect - change image every 3 seconds
  useEffect(() => {
    if (!isAutoRotating || !card.images || card.images.length <= 1) return;

    const startAutoRotation = () => {
      autoRotateTimerRef.current = setInterval(() => {
        setCurrentImageIndex((prev) => (prev + 1) % card.images.length);
      }, 3000); // 3 seconds
    };

    startAutoRotation();

    return () => {
      if (autoRotateTimerRef.current) {
        clearInterval(autoRotateTimerRef.current);
      }
    };
  }, [isAutoRotating, card.images]);

  // Pause auto-rotation on hover
  const handleMouseEnter = () => {
    setIsAutoRotating(false);
  };

  const handleMouseLeave = () => {
    setIsAutoRotating(true);
  };

  return (
    <ScrollReveal direction="up" delay={index * 0.1}>
      <div
        className={cn(
          "group relative overflow-hidden rounded-3xl transition-all duration-500",
          isExpanded
            ? "sm:col-span-2 lg:col-span-2"
            : "sm:col-span-1 lg:col-span-1"
        )}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* Card */}
        <div className="relative flex h-[600px] flex-col justify-between overflow-hidden bg-black p-8 lg:h-[700px]">
          {/* Background Images - Auto-rotating */}
          {card.images && card.images.length > 0 ? (
            <>
              {card.images.map((img, imgIndex) => (
                <div
                  key={`${card.id}-img-${imgIndex}`}
                  className={cn(
                    "absolute inset-0 transition-all duration-1000 ease-in-out",
                    imgIndex === currentImageIndex 
                      ? "opacity-60 scale-100 z-10" 
                      : "opacity-0 scale-105 z-0"
                  )}
                  style={{
                    visibility: imgIndex === currentImageIndex ? 'visible' : 'hidden',
                  }}
                >
                  <CloudImage
                    src={img}
                    alt={`${card.imageAlt} - View ${imgIndex + 1}`}
                    width={600}
                    height={700}
                    className="h-full w-full object-cover"
                    priority={imgIndex === 0 && index === 0}
                  />
                </div>
              ))}
              <div className="absolute inset-0 z-20 bg-gradient-to-t from-black via-black/50 to-transparent" />
            </>
          ) : null}

          {/* Image Indicators */}
          {card.images && card.images.length > 1 && (
            <div className="absolute top-6 right-6 z-30 flex gap-1.5">
              {card.images.map((_, imgIndex) => (
                <button
                  key={`indicator-${imgIndex}`}
                  onClick={() => {
                    setCurrentImageIndex(imgIndex);
                    setIsAutoRotating(false);
                    setTimeout(() => setIsAutoRotating(true), 5000);
                  }}
                  className={cn(
                    "h-1.5 w-1.5 rounded-full transition-all duration-300",
                    imgIndex === currentImageIndex
                      ? "w-6 bg-apsonic-green"
                      : "bg-white/30 hover:bg-white/50"
                  )}
                  aria-label={`View image ${imgIndex + 1}`}
                />
              ))}
            </div>
          )}

          {/* Content */}
          <div className="relative z-30">
            <p className="text-xs font-semibold uppercase tracking-[0.5em] text-emerald-200">
              {card.category}
            </p>
          </div>

          <div className="relative z-30 space-y-4">
            <h3 className="text-3xl font-bold leading-tight text-white lg:text-4xl">
              {card.title}
            </h3>
            <p className="text-base text-white/80 lg:text-lg">
              {card.description}
            </p>

            {/* Expanded Content */}
            {isExpanded && card.expandedContent && (
              <div className="animate-fade-in pt-4">
                <p className="text-sm leading-relaxed text-white/70">
                  {card.expandedContent}
                </p>
              </div>
            )}

            {/* Expand Button */}
            {card.expandedContent && (
              <button
                onClick={onToggle}
                className="mt-4 flex h-10 w-10 items-center justify-center rounded-full border-2 border-white/40 bg-white/10 text-white transition-all hover:border-white hover:bg-white/20"
                aria-label={isExpanded ? "Collapse" : "Learn more"}
              >
                <svg
                  className={cn(
                    "h-5 w-5 transition-transform duration-300",
                    isExpanded && "rotate-45"
                  )}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4v16m8-8H4"
                  />
                </svg>
              </button>
            )}
          </div>
        </div>
      </div>
    </ScrollReveal>
  );
}

export default function FeatureCards({ title, cards }: FeatureCardsProps) {
  const [expandedCard, setExpandedCard] = useState<string | null>(null);

  return (
    <div className="mx-auto max-w-[1400px] space-y-12 px-6 py-20 lg:py-32">
      {/* Section Title */}
      <ScrollReveal direction="up">
        <h2 className="text-4xl font-bold text-white sm:text-5xl lg:text-6xl">
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
            isExpanded={expandedCard === card.id}
            onToggle={() => setExpandedCard(expandedCard === card.id ? null : card.id)}
          />
        ))}
      </div>
    </div>
  );
}

