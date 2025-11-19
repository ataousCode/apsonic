'use client';

import { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import CloudImage from "./CloudImage";
import { cn } from "@/lib/utils";

type Interactive360ViewerProps = {
  images: string[];
  title: string;
  subtitle?: string;
  description?: string;
  specs?: Array<{ label: string; value: string }>;
};

export default function Interactive360Viewer({
  images,
  title,
  subtitle,
  description,
  specs,
}: Interactive360ViewerProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [rotationOffset, setRotationOffset] = useState(0);
  const [isAutoRotating, setIsAutoRotating] = useState(true);

  const containerRef = useRef<HTMLDivElement>(null);
  const viewerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const autoRotateTimerRef = useRef<NodeJS.Timeout | null>(null);

  // GSAP entrance animations
  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      // Animate viewer
      gsap.fromTo(
        viewerRef.current,
        { scale: 0.9, opacity: 0, rotationY: -20 },
        { 
          scale: 1, 
          opacity: 1, 
          rotationY: 0, 
          duration: 1, 
          ease: "power3.out",
          delay: 0.2 
        }
      );

      // Animate content
      gsap.fromTo(
        ".viewer-content",
        { x: -30, opacity: 0 },
        { 
          x: 0, 
          opacity: 1, 
          duration: 0.8, 
          ease: "power3.out",
          delay: 0.4 
        }
      );

      // Animate specs
      gsap.fromTo(
        ".viewer-spec",
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: "power2.out",
          delay: 0.6,
        }
      );

      // Animate instruction
      gsap.fromTo(
        ".viewer-instruction",
        { y: 10, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: "power2.out",
          delay: 1,
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Auto-rotation effect - change image every 3 seconds
  useEffect(() => {
    if (!isAutoRotating) return;

    const startAutoRotation = () => {
      autoRotateTimerRef.current = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % images.length);
      }, 3000); // 3 seconds
    };

    startAutoRotation();

    return () => {
      if (autoRotateTimerRef.current) {
        clearInterval(autoRotateTimerRef.current);
      }
    };
  }, [isAutoRotating, images.length]);

  // Pause auto-rotation when user interacts
  const pauseAutoRotation = () => {
    setIsAutoRotating(false);
    if (autoRotateTimerRef.current) {
      clearInterval(autoRotateTimerRef.current);
    }
  };

  // Resume auto-rotation after user stops interacting
  const resumeAutoRotation = () => {
    setTimeout(() => {
      setIsAutoRotating(true);
    }, 5000); // Resume after 5 seconds of inactivity
  };

  // Handle mouse/touch drag for rotation
  const handleDragStart = (clientX: number) => {
    pauseAutoRotation();
    setIsDragging(true);
    setStartX(clientX);
  };

  const handleDragMove = (clientX: number) => {
    if (!isDragging) return;

    const delta = clientX - startX;
    const sensitivity = 0.3;
    const rotation = delta * sensitivity;
    
    // Lower threshold for more responsive rotation
    if (Math.abs(delta) > 30) {
      const direction = delta > 0 ? -1 : 1;
      const newIndex = (currentIndex + direction + images.length) % images.length;
      
      console.log('Rotating:', { currentIndex, newIndex, delta });
      
      setCurrentIndex(newIndex);
      setStartX(clientX);
      setRotationOffset(rotationOffset + rotation);
    }
  };

  const handleDragEnd = () => {
    setIsDragging(false);
    resumeAutoRotation();
  };

  // Mouse events
  const handleMouseDown = (e: React.MouseEvent) => {
    handleDragStart(e.clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    handleDragMove(e.clientX);
  };

  const handleMouseUp = () => {
    handleDragEnd();
  };

  const handleMouseLeave = () => {
    if (isDragging) {
      handleDragEnd();
    }
  };

  // Touch events
  const handleTouchStart = (e: React.TouchEvent) => {
    handleDragStart(e.touches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    handleDragMove(e.touches[0].clientX);
  };

  const handleTouchEnd = () => {
    handleDragEnd();
  };

  return (
    <div ref={containerRef} className="relative overflow-hidden">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-16 lg:grid-cols-2 lg:items-center lg:py-24">
        
        {/* Content Side */}
        <div ref={contentRef} className="viewer-content space-y-8">
          {subtitle && (
            <p className="text-sm font-semibold uppercase tracking-[0.5em] text-emerald-200">
              {subtitle}
            </p>
          )}
          
          <div className="space-y-4">
            <h2 className="text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl">
              {title}
            </h2>
            
            {description && (
              <p className="text-lg leading-relaxed text-white/80">
                {description}
              </p>
            )}
          </div>

          {/* Specs Grid */}
          {specs && specs.length > 0 && (
            <div className="grid grid-cols-2 gap-4">
              {specs.map((spec, index) => (
                <div
                  key={index}
                  className="viewer-spec glass-panel rounded-2xl p-4"
                >
                  <p className="text-xs uppercase tracking-[0.3em] text-white/60">
                    {spec.label}
                  </p>
                  <p className="mt-1 text-xl font-semibold text-white">
                    {spec.value}
                  </p>
                </div>
              ))}
            </div>
          )}

        </div>

        {/* 360° Viewer Side */}
        <div className="relative">
          <div
            ref={viewerRef}
            className={cn(
              "relative aspect-square overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-apsonic-surface to-black",
              isDragging ? "cursor-grabbing" : "cursor-grab"
            )}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseLeave}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {/* Images - only show current one */}
            {images.map((src, index) => (
              <div
                key={`view-${index}`}
                className={cn(
                  "absolute inset-0 transition-opacity duration-500 pointer-events-none",
                  index === currentIndex ? "opacity-100 z-10" : "opacity-0 z-0"
                )}
                style={{
                  visibility: index === currentIndex ? 'visible' : 'hidden',
                }}
              >
                <CloudImage
                  src={src}
                  alt={`${title} - View ${index + 1}`}
                  width={800}
                  height={800}
                  className="h-full w-full object-contain p-8"
                  priority={index === 0}
                />
              </div>
            ))}

            {/* Rotation Indicator Dots */}
            <div className="absolute bottom-6 left-1/2 flex -translate-x-1/2 gap-2">
              {images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    pauseAutoRotation();
                    setCurrentIndex(index);
                    resumeAutoRotation();
                  }}
                  className={cn(
                    "h-2 w-2 rounded-full transition-all duration-300",
                    index === currentIndex
                      ? "w-8 bg-apsonic-green"
                      : "bg-white/30 hover:bg-white/50"
                  )}
                  aria-label={`View ${index + 1}`}
                />
              ))}
            </div>

          </div>

          {/* Decorative Elements */}
          <div className="absolute -top-20 -right-20 h-40 w-40 rounded-full bg-apsonic-green/20 blur-3xl" />
          <div className="absolute -bottom-20 -left-20 h-40 w-40 rounded-full bg-apsonic-accent/10 blur-3xl" />
        </div>
      </div>
    </div>
  );
}

