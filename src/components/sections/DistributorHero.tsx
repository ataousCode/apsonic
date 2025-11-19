'use client';

import { useEffect, useRef } from "react";
import gsap from "gsap";
import CloudImage from "../CloudImage";
import { Button } from "@/components/ui/Button";

export default function DistributorHero() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".distributor-hero-heading",
        { y: 32, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "power3.out", delay: 0.2 }
      );
      gsap.fromTo(
        ".distributor-hero-body",
        { y: 16, opacity: 0 },
        { y: 0, opacity: 1, delay: 0.5, duration: 0.8 }
      );
      gsap.fromTo(
        ".distributor-hero-cta",
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, delay: 0.8, duration: 0.8 }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const scrollToForm = () => {
    const formSection = document.getElementById('application-form');
    formSection?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <section
      ref={containerRef}
      className="hero-gradient relative flex min-h-[500px] sm:min-h-hero md:min-h-hero-md lg:min-h-hero-lg flex-col justify-end overflow-hidden"
    >
      {/* Background Image */}
      <div className="absolute inset-0">
        <CloudImage
          src="/assets/images/home/img2.jpeg"
          alt="APSONIC Distribution Center"
          width={1920}
          height={1080}
          className="absolute inset-0 h-full w-full object-cover opacity-70"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-br from-black/90 via-black/75 to-black/85" />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col gap-8 px-4 pb-16 pt-24 sm:gap-10 sm:px-6 sm:pb-24 sm:pt-32 lg:pb-40 lg:pt-48">
        <div className="max-w-4xl">
          <p className="distributor-hero-body text-xs sm:text-sm font-semibold uppercase tracking-[0.3em] sm:tracking-[0.5em] text-emerald-200">
            Partnership Opportunity
          </p>
          <h1 className="distributor-hero-heading mt-4 text-4xl font-bold leading-tight text-white sm:mt-6 sm:text-5xl lg:text-6xl xl:text-7xl">
            Become an APSONIC Distributor
          </h1>
          <p className="distributor-hero-body mt-4 text-lg sm:mt-6 sm:text-xl lg:text-2xl text-white/90 leading-relaxed max-w-3xl">
            Join Africa's fastest-growing motorcycle distribution network. Partner with APSONIC to deliver quality, reliability, and opportunity across the continent.
          </p>
        </div>

        <div className="distributor-hero-cta flex flex-col gap-3 sm:gap-4 sm:flex-row">
          <Button
            onClick={scrollToForm}
            size="lg"
            className="w-full sm:w-auto rounded-full bg-apsonic-green px-6 sm:px-10 text-sm sm:text-base font-semibold text-black hover:bg-apsonic-green-dark hover:text-white transition-all duration-300"
          >
            Apply Now
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="w-full sm:w-auto rounded-full border-white/40 bg-white/5 px-6 sm:px-10 text-sm sm:text-base font-semibold text-white hover:bg-white/10 hover:border-white/60 transition-all duration-300"
          >
            <a href="#requirements">View Requirements</a>
          </Button>
        </div>

        {/* Stats */}
        <div className="glass-panel grid grid-cols-2 gap-3 sm:gap-4 rounded-2xl sm:rounded-3xl p-4 sm:p-6 text-white/80 lg:grid-cols-4">
          <div className="space-y-1 sm:space-y-2 text-left">
            <p className="text-xl sm:text-2xl lg:text-3xl font-semibold text-white">26+</p>
            <p className="text-[0.625rem] sm:text-xs uppercase tracking-[0.2em] sm:tracking-[0.3em] text-white/60 leading-tight">African Markets</p>
          </div>
          <div className="space-y-1 sm:space-y-2 text-left sm:border-l sm:border-white/5 sm:pl-4 lg:pl-6">
            <p className="text-xl sm:text-2xl lg:text-3xl font-semibold text-white">1,200+</p>
            <p className="text-[0.625rem] sm:text-xs uppercase tracking-[0.2em] sm:tracking-[0.3em] text-white/60 leading-tight">Service Centers</p>
          </div>
          <div className="space-y-1 sm:space-y-2 text-left lg:border-l lg:border-white/5 lg:pl-6">
            <p className="text-xl sm:text-2xl lg:text-3xl font-semibold text-white">500+</p>
            <p className="text-[0.625rem] sm:text-xs uppercase tracking-[0.2em] sm:tracking-[0.3em] text-white/60 leading-tight">Active Distributors</p>
          </div>
          <div className="space-y-1 sm:space-y-2 text-left sm:border-l sm:border-white/5 sm:pl-4 lg:pl-6">
            <p className="text-xl sm:text-2xl lg:text-3xl font-semibold text-white">15+</p>
            <p className="text-[0.625rem] sm:text-xs uppercase tracking-[0.2em] sm:tracking-[0.3em] text-white/60 leading-tight">Years Experience</p>
          </div>
        </div>
      </div>
    </section>
  );
}

