'use client';

import { ScrollReveal } from "@/components/ui/ScrollReveal";
import CloudImage from "./CloudImage";
import { cn } from "@/lib/utils";

export type Feature = {
  id: string;
  category: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  darkBg?: boolean;
};

type FeatureShowcaseProps = {
  features: Feature[];
};

export default function FeatureShowcase({ features }: FeatureShowcaseProps) {
  return (
    <div className="space-y-0">
      {features.map((feature, index) => (
        <ScrollReveal key={feature.id} direction="up" delay={0.1}>
          <div
            className={cn(
              "relative overflow-hidden py-20 lg:py-32",
              feature.darkBg ? "bg-black" : "bg-apsonic-surface"
            )}
          >
            <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-2 lg:items-center lg:gap-16">
              {/* Text Content */}
              <div
                className={cn(
                  "space-y-6",
                  index % 2 === 0 ? "lg:order-1" : "lg:order-2"
                )}
              >
                <p className="text-xs font-semibold uppercase tracking-[0.5em] text-emerald-200">
                  {feature.category}
                </p>
                <h2 className="text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl">
                  {feature.title}
                </h2>
                <p className="text-lg leading-relaxed text-white/80 lg:text-xl">
                  {feature.description}
                </p>
              </div>

              {/* Image */}
              <div
                className={cn(
                  "relative",
                  index % 2 === 0 ? "lg:order-2" : "lg:order-1"
                )}
              >
                <div className="relative aspect-square overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-apsonic-surface-alt to-black p-8 lg:aspect-auto lg:h-[600px]">
                  <CloudImage
                    src={feature.image}
                    alt={feature.imageAlt}
                    width={800}
                    height={800}
                    className="h-full w-full object-contain"
                  />
                </div>

                {/* Decorative glow */}
                <div
                  className={cn(
                    "absolute -z-10 h-64 w-64 rounded-full blur-3xl",
                    index % 2 === 0
                      ? "bg-apsonic-green/20 -top-20 -right-20"
                      : "bg-apsonic-accent/20 -bottom-20 -left-20"
                  )}
                />
              </div>
            </div>
          </div>
        </ScrollReveal>
      ))}
    </div>
  );
}

