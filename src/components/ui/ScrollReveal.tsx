'use client';

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";

// Register ScrollTrigger plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

type ScrollRevealProps = {
  children: React.ReactNode;
  className?: string;
  direction?: "up" | "down" | "left" | "right" | "scale" | "fade";
  delay?: number;
  duration?: number;
  start?: string;
  end?: string;
  scrub?: boolean;
  once?: boolean;
};

/**
 * ScrollReveal component that animates children when scrolling into view
 * Uses GSAP ScrollTrigger for scroll-based animations
 */
export function ScrollReveal({
  children,
  className,
  direction = "up",
  delay = 0,
  duration = 0.8,
  start = "top 80%",
  end = "bottom 20%",
  scrub = false,
  once = true,
}: ScrollRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const element = containerRef.current;

    const animations = {
      up: { y: 60, opacity: 0 },
      down: { y: -60, opacity: 0 },
      left: { x: 60, opacity: 0 },
      right: { x: -60, opacity: 0 },
      scale: { scale: 0.8, opacity: 0 },
      fade: { opacity: 0 },
    };

    const from = animations[direction];

    const animation = gsap.fromTo(
      element,
      from,
      {
        y: 0,
        x: 0,
        scale: 1,
        opacity: 1,
        duration,
        delay,
        ease: "power3.out",
        scrollTrigger: {
          trigger: element,
          start,
          end,
          scrub: scrub ? 1 : false,
          once,
          toggleActions: once ? "play none none none" : "play reverse play reverse",
        },
      }
    );

    return () => {
      animation.kill();
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.trigger === element) {
          trigger.kill();
        }
      });
    };
  }, [direction, delay, duration, start, end, scrub, once]);

  return (
    <div ref={containerRef} className={cn(className)}>
      {children}
    </div>
  );
}

