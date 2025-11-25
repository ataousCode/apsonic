'use client';

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import CloudImage from "./CloudImage";
import { Button } from "@/components/ui/Button";
import { heroImages, heroStats } from "@/data/home";
import { cn } from "@/lib/utils";

export default function Hero() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    if (!containerRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".hero-heading",
        { y: 32, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "power3.out" }
      );
      gsap.fromTo(
        ".hero-body",
        { y: 16, opacity: 0 },
        { y: 0, opacity: 0.92, delay: 0.3, duration: 0.8 }
      );
      gsap.fromTo(
        ".hero-cta",
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, delay: 0.6, duration: 0.8 }
      );
      gsap.fromTo(
        ".hero-stat",
        { opacity: 0, y: 12 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.08,
          delay: 0.8,
          ease: "power2.out",
        }
      );
    }, containerRef);

    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % heroImages.length);
    }, 5000);

    return () => {
      ctx.revert();
      clearInterval(interval);
    };
  }, []);

  return (
    <section
      ref={containerRef}
      className="hero-gradient relative flex min-h-[500px] sm:min-h-hero md:min-h-hero-md lg:min-h-hero-lg flex-col justify-end overflow-hidden"
    >
      <div className="absolute inset-0">
        {heroImages.map((src, index) => (
          <CloudImage
            key={src}
            src={src}
            alt={`APSONIC Hero Image ${index + 1}`}
            width={1920}
            height={1080}
            className={`absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-[2500ms] ease-out ${index === currentImageIndex ? "opacity-80" : ""
              }`}
            priority={index === 0}
          />
        ))}
        <div className="absolute inset-0 bg-gradient-to-br from-black/85 via-black/70 to-black/80" />
      </div>
      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col gap-8 px-4 pb-16 pt-24 sm:gap-12 sm:px-6 sm:pb-24 sm:pt-32 lg:pb-40 lg:pt-48">
        <div className="max-w-3xl">
          <p className="text-xs sm:text-sm font-semibold uppercase tracking-[0.3em] sm:tracking-[0.5em] text-emerald-200 hero-body">
            Good Quality • Good Life
          </p>
          <h1 className="hero-heading mt-4 text-3xl font-bold leading-tight text-white sm:mt-6 sm:text-5xl lg:text-6xl xl:text-7xl">
            Durable mobility ecosystems for the African backbone.
          </h1>
          <p className="hero-body mt-4 text-base sm:mt-8 sm:text-lg lg:text-xl text-white/90 leading-relaxed">
            APSONIC partners with governments, cooperatives, and distributors to deploy resilient
            motorcycles, predictive service, and financing infrastructure across 26 African markets.
          </p>
        </div>
        <div className="hero-cta flex flex-col gap-3 sm:gap-4 sm:flex-row">
          <Button
            asChild
            size="lg"
            className="w-full sm:w-auto rounded-full bg-white px-6 sm:px-10 text-sm sm:text-base font-semibold text-black hover:bg-white/90 transition-all duration-300"
          >
            <a href="#products">Explore Vehicle Line-up</a>
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="w-full sm:w-auto rounded-full border-white/40 bg-white/5 px-6 sm:px-10 text-sm sm:text-base font-semibold text-white hover:bg-white/10 hover:border-white/60 transition-all duration-300"
          >
            <a href="#viewer">360° experience</a>
          </Button>
        </div>
        <div className="glass-panel grid grid-cols-2 gap-3 sm:gap-4 rounded-2xl sm:rounded-3xl p-4 sm:p-6 text-white/80 lg:grid-cols-4">
          {heroStats.map((stat, index) => (
            <div
              key={stat.label}
              className={cn(
                "hero-stat space-y-1 sm:space-y-2 text-left",
                index > 1 ? "lg:border-l lg:border-white/5 lg:pl-6" : "",
                index === 1 ? "sm:border-l sm:border-white/5 sm:pl-4 lg:pl-6" : "",
                index === 0 ? "" : ""
              )}
            >
              <p className="text-lg sm:text-xl lg:text-2xl font-semibold text-white">{stat.value}</p>
              <p className="text-[0.625rem] sm:text-xs uppercase tracking-[0.2em] sm:tracking-[0.3em] text-white/60 leading-tight">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}