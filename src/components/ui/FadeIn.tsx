'use client';

import { useGSAP } from "@/hooks/useGSAP";
import gsap from "gsap";
import { cn } from "@/lib/utils";
import React from "react";

type FadeInProps = {
  children: React.ReactNode;
  className?: string;
  direction?: "up" | "down" | "left" | "right" | "none";
  delay?: number;
  duration?: number;
  stagger?: number;
};

/**
 * FadeIn component that animates children on mount
 * Wraps children with GSAP fade-in animation
 */
export function FadeIn({
  children,
  className,
  direction = "up",
  delay = 0,
  duration = 0.8,
  stagger = 0,
}: FadeInProps) {
  const containerRef = useGSAP(() => {
    const directions = {
      up: { y: 24, x: 0 },
      down: { y: -24, x: 0 },
      left: { y: 0, x: 24 },
      right: { y: 0, x: -24 },
      none: { y: 0, x: 0 },
    };

    const from = directions[direction];

    gsap.fromTo(
      ".fade-in-item",
      { opacity: 0, ...from },
      {
        opacity: 1,
        y: 0,
        x: 0,
        duration,
        delay,
        stagger,
        ease: "power3.out",
      }
    );
  }, [direction, delay, duration, stagger]);

  return (
    <div ref={containerRef} className={cn(className)}>
      {React.Children.map(children, (child) => (
        <div className="fade-in-item">{child}</div>
      ))}
    </div>
  );
}

