'use client';

import { useState } from "react";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import CloudImage from "./CloudImage";
import { cn } from "@/lib/utils";

export type FeatureCard = {
  id: string;
  category: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  expandedContent?: string;
};

type FeatureCardsProps = {
  title: string;
  cards: FeatureCard[];
};

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
          <ScrollReveal key={card.id} direction="up" delay={index * 0.1}>
            <div
              className={cn(
                "group relative overflow-hidden rounded-3xl transition-all duration-500",
                expandedCard === card.id
                  ? "sm:col-span-2 lg:col-span-2"
                  : "sm:col-span-1 lg:col-span-1"
              )}
            >
              {/* Card */}
              <div className="relative flex h-[600px] flex-col justify-between overflow-hidden bg-black p-8 lg:h-[700px]">
                {/* Background Image */}
                <div className="absolute inset-0 transition-transform duration-700 group-hover:scale-105">
                  <CloudImage
                    src={card.image}
                    alt={card.imageAlt}
                    width={600}
                    height={700}
                    className="h-full w-full object-cover opacity-60"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
                </div>

                {/* Content */}
                <div className="relative z-10">
                  <p className="text-xs font-semibold uppercase tracking-[0.5em] text-emerald-200">
                    {card.category}
                  </p>
                </div>

                <div className="relative z-10 space-y-4">
                  <h3 className="text-3xl font-bold leading-tight text-white lg:text-4xl">
                    {card.title}
                  </h3>
                  <p className="text-base text-white/80 lg:text-lg">
                    {card.description}
                  </p>

                  {/* Expanded Content */}
                  {expandedCard === card.id && card.expandedContent && (
                    <div className="animate-fade-in pt-4">
                      <p className="text-sm leading-relaxed text-white/70">
                        {card.expandedContent}
                      </p>
                    </div>
                  )}

                  {/* Expand Button */}
                  {card.expandedContent && (
                    <button
                      onClick={() =>
                        setExpandedCard(
                          expandedCard === card.id ? null : card.id
                        )
                      }
                      className="mt-4 flex h-10 w-10 items-center justify-center rounded-full border-2 border-white/40 bg-white/10 text-white transition-all hover:border-white hover:bg-white/20"
                      aria-label={
                        expandedCard === card.id
                          ? "Collapse"
                          : "Learn more"
                      }
                    >
                      <svg
                        className={cn(
                          "h-5 w-5 transition-transform duration-300",
                          expandedCard === card.id && "rotate-45"
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
        ))}
      </div>
    </div>
  );
}

