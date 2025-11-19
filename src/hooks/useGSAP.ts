import { useEffect, useRef, MutableRefObject } from "react";
import gsap from "gsap";

type GSAPCallback = (context: gsap.Context) => void | (() => void);

/**
 * Custom hook for GSAP animations with automatic cleanup
 * @param callback - Function containing GSAP animations
 * @param dependencies - Dependencies array for useEffect
 * @returns ref to attach to the container element
 */
export function useGSAP<T extends HTMLElement = HTMLDivElement>(
  callback: GSAPCallback,
  dependencies: React.DependencyList = []
): MutableRefObject<T | null> {
  const containerRef = useRef<T | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      callback(ctx);
    }, containerRef);

    return () => {
      ctx.revert();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencies);

  return containerRef;
}

