# 🎬 GSAP Animation Guide

Complete guide for adding smooth, professional animations to the APSONIC website using GSAP.

---

## 📦 Installation

GSAP is already installed! Check `package.json`:
```json
"gsap": "^3.13.0"
```

---

## 🎯 Three Ways to Add Animations

### 1. **Custom Hook** - `useGSAP` (Recommended)
For custom, complex animations in components.

### 2. **FadeIn Component** - Simple entrance animations
For elements that animate on mount.

### 3. **ScrollReveal Component** - Scroll-triggered animations
For elements that animate when scrolling into view.

---

## 🚀 Method 1: Using `useGSAP` Hook

### Basic Usage

```tsx
'use client';

import { useGSAP } from "@/hooks/useGSAP";
import gsap from "gsap";

export function MyComponent() {
  const containerRef = useGSAP(() => {
    // Your animations here
    gsap.fromTo(
      ".my-element",
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8 }
    );
  });

  return (
    <div ref={containerRef}>
      <h1 className="my-element">Animated Title</h1>
    </div>
  );
}
```

### Advanced Example with Stagger

```tsx
'use client';

import { useGSAP } from "@/hooks/useGSAP";
import gsap from "gsap";

export function CardGrid() {
  const containerRef = useGSAP(() => {
    gsap.fromTo(
      ".card",
      { opacity: 0, y: 30, scale: 0.9 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.6,
        stagger: 0.1, // Animate each card 0.1s after the previous
        ease: "power3.out",
      }
    );
  });

  return (
    <div ref={containerRef} className="grid grid-cols-3 gap-6">
      <div className="card">Card 1</div>
      <div className="card">Card 2</div>
      <div className="card">Card 3</div>
    </div>
  );
}
```

### With Dependencies (Re-animate on change)

```tsx
const [isVisible, setIsVisible] = useState(false);

const containerRef = useGSAP(() => {
  if (isVisible) {
    gsap.to(".element", { opacity: 1, duration: 0.5 });
  }
}, [isVisible]); // Re-run when isVisible changes
```

---

## 🎨 Method 2: Using `FadeIn` Component

Simple wrapper for fade-in animations on mount.

### Basic Fade In

```tsx
import { FadeIn } from "@/components/ui/FadeIn";

<FadeIn>
  <h1>This fades in on page load</h1>
</FadeIn>
```

### With Direction

```tsx
<FadeIn direction="up" delay={0.2} duration={1}>
  <p>Slides up while fading in</p>
</FadeIn>
```

### Staggered Children

```tsx
<FadeIn direction="left" stagger={0.15}>
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</FadeIn>
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `direction` | `"up" \| "down" \| "left" \| "right" \| "none"` | `"up"` | Animation direction |
| `delay` | `number` | `0` | Delay before animation starts (seconds) |
| `duration` | `number` | `0.8` | Animation duration (seconds) |
| `stagger` | `number` | `0` | Delay between each child (seconds) |

---

## 📜 Method 3: Using `ScrollReveal` Component

Animate elements when they scroll into view.

### Basic Scroll Animation

```tsx
import { ScrollReveal } from "@/components/ui/ScrollReveal";

<ScrollReveal direction="up">
  <h2>This animates when scrolled into view</h2>
</ScrollReveal>
```

### Multiple Elements

```tsx
<div className="space-y-12">
  <ScrollReveal direction="left" delay={0.1}>
    <Card>Card 1</Card>
  </ScrollReveal>
  
  <ScrollReveal direction="right" delay={0.2}>
    <Card>Card 2</Card>
  </ScrollReveal>
  
  <ScrollReveal direction="scale" delay={0.3}>
    <Card>Card 3</Card>
  </ScrollReveal>
</div>
```

### Scrub Animation (Parallax-like)

```tsx
<ScrollReveal direction="up" scrub={true} once={false}>
  <div className="hero-background">
    Moves with scroll
  </div>
</ScrollReveal>
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `direction` | `"up" \| "down" \| "left" \| "right" \| "scale" \| "fade"` | `"up"` | Animation direction |
| `delay` | `number` | `0` | Delay before animation (seconds) |
| `duration` | `number` | `0.8` | Animation duration (seconds) |
| `start` | `string` | `"top 80%"` | When animation starts (ScrollTrigger format) |
| `end` | `string` | `"bottom 20%"` | When animation ends |
| `scrub` | `boolean` | `false` | Link animation to scroll position |
| `once` | `boolean` | `true` | Only animate once |

---

## 🎯 Real-World Examples

### Example 1: Animated Section Header

```tsx
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { SectionHeader } from "@/components/ui/SectionHeader";

export function MySection() {
  return (
    <section className="py-24">
      <ScrollReveal direction="up">
        <SectionHeader
          eyebrow="Our Services"
          title="What We Offer"
          description="Premium motorcycle solutions across Africa"
          align="center"
        />
      </ScrollReveal>
      
      <div className="mt-12 grid grid-cols-3 gap-6">
        <ScrollReveal direction="up" delay={0.1}>
          <Card>Service 1</Card>
        </ScrollReveal>
        <ScrollReveal direction="up" delay={0.2}>
          <Card>Service 2</Card>
        </ScrollReveal>
        <ScrollReveal direction="up" delay={0.3}>
          <Card>Service 3</Card>
        </ScrollReveal>
      </div>
    </section>
  );
}
```

### Example 2: Image Gallery with Stagger

```tsx
'use client';

import { useGSAP } from "@/hooks/useGSAP";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

export function ImageGallery({ images }: { images: string[] }) {
  const containerRef = useGSAP(() => {
    gsap.fromTo(
      ".gallery-item",
      { 
        opacity: 0, 
        scale: 0.8,
        y: 50 
      },
      {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 75%",
          once: true,
        },
      }
    );
  });

  return (
    <div ref={containerRef} className="grid grid-cols-2 md:grid-cols-4 gap-6">
      {images.map((src, index) => (
        <div key={index} className="gallery-item">
          <Image 
            src={src} 
            alt={`Gallery ${index}`}
            width={400}
            height={300}
            className="rounded-3xl"
          />
        </div>
      ))}
    </div>
  );
}
```

### Example 3: Counter Animation

```tsx
'use client';

import { useGSAP } from "@/hooks/useGSAP";
import gsap from "gsap";
import { useRef } from "react";

export function AnimatedCounter({ 
  value, 
  label 
}: { 
  value: number; 
  label: string;
}) {
  const counterRef = useRef<HTMLSpanElement>(null);
  
  useGSAP(() => {
    if (!counterRef.current) return;
    
    const obj = { val: 0 };
    
    gsap.to(obj, {
      val: value,
      duration: 2,
      ease: "power2.out",
      onUpdate: () => {
        if (counterRef.current) {
          counterRef.current.textContent = Math.floor(obj.val).toLocaleString();
        }
      },
    });
  });

  return (
    <div>
      <span ref={counterRef} className="text-4xl font-bold">
        0
      </span>
      <p className="text-sm text-white/60">{label}</p>
    </div>
  );
}
```

### Example 4: Hover Animations

```tsx
'use client';

import { useRef } from "react";
import gsap from "gsap";

export function InteractiveCard() {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseEnter = () => {
    gsap.to(cardRef.current, {
      scale: 1.05,
      duration: 0.3,
      ease: "power2.out",
    });
  };

  const handleMouseLeave = () => {
    gsap.to(cardRef.current, {
      scale: 1,
      duration: 0.3,
      ease: "power2.out",
    });
  };

  return (
    <div
      ref={cardRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="glass-panel rounded-3xl p-8 cursor-pointer"
    >
      <h3>Hover me!</h3>
    </div>
  );
}
```

---

## 🎭 Animation Best Practices

### 1. **Keep It Subtle**
- Duration: 0.5s - 1s for most animations
- Distance: 20-60px for movement
- Don't overanimate - less is more

### 2. **Timing & Easing**
```tsx
// Recommended easing functions
ease: "power3.out"     // Smooth deceleration (most common)
ease: "power2.inOut"   // Smooth acceleration & deceleration
ease: "elastic.out"    // Bouncy effect (use sparingly)
ease: "back.out"       // Slight overshoot
```

### 3. **Performance**
- Animate `transform` and `opacity` (GPU-accelerated)
- Avoid animating `width`, `height`, `top`, `left` (causes reflow)
- Use `will-change: transform` for complex animations

### 4. **Accessibility**
```tsx
// Respect user's motion preferences
useEffect(() => {
  const prefersReducedMotion = window.matchMedia(
    '(prefers-reduced-motion: reduce)'
  ).matches;
  
  if (prefersReducedMotion) {
    // Disable or simplify animations
    gsap.globalTimeline.timeScale(10); // Speed up dramatically
  }
}, []);
```

---

## 📚 Common Animation Patterns

### Fade In & Scale
```tsx
gsap.fromTo(element, 
  { opacity: 0, scale: 0.9 },
  { opacity: 1, scale: 1, duration: 0.6 }
);
```

### Slide In from Left
```tsx
gsap.fromTo(element,
  { x: -100, opacity: 0 },
  { x: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
);
```

### Staggered Grid
```tsx
gsap.fromTo(".grid-item",
  { opacity: 0, y: 30 },
  { opacity: 1, y: 0, stagger: 0.1, duration: 0.6 }
);
```

### Text Reveal (Split Text)
```tsx
// Requires SplitText plugin (GSAP Club)
const split = new SplitText(".text", { type: "chars" });
gsap.from(split.chars, {
  opacity: 0,
  y: 10,
  stagger: 0.02,
  duration: 0.5
});
```

---

## 🛠️ Debugging GSAP

### Check if animations are running
```tsx
gsap.globalTimeline.getChildren().forEach(tween => {
  console.log(tween);
});
```

### Pause all animations
```tsx
gsap.globalTimeline.pause();
```

### Kill specific animation
```tsx
gsap.killTweensOf(".my-element");
```

---

## 🎬 GSAP Plugins (Available)

GSAP includes several plugins. Most require GSAP Club membership, but some are free:

### Free Plugins
- ✅ **ScrollTrigger** - Scroll-based animations (included in components above)
- ✅ **Draggable** - Make elements draggable
- ✅ **EaselPlugin** - Animate EaselJS/CreateJS objects

### Premium (GSAP Club)
- **SplitText** - Animate text character by character
- **MorphSVG** - Morph between SVG shapes
- **DrawSVG** - Animate SVG strokes
- **MotionPath** - Animate along custom paths

---

## 📝 Summary

### Quick Reference

| Use Case | Component/Hook | Example |
|----------|---------------|---------|
| Simple fade on mount | `<FadeIn>` | `<FadeIn direction="up"><Card /></FadeIn>` |
| Scroll-triggered | `<ScrollReveal>` | `<ScrollReveal><Section /></ScrollReveal>` |
| Custom animation | `useGSAP()` | `useGSAP(() => gsap.to(...))` |
| Hover effects | Direct GSAP | `gsap.to(ref.current, {...})` |

### Files Created
- `/src/hooks/useGSAP.ts` - Custom hook for GSAP context
- `/src/components/ui/FadeIn.tsx` - Simple fade-in wrapper
- `/src/components/ui/ScrollReveal.tsx` - Scroll-triggered animations

### Existing Implementation
- `/src/components/Hero.tsx` - Hero animations (reference example)

---

## 🚀 Getting Started

1. **Import the component/hook**
2. **Wrap your content** or use the hook
3. **Adjust props** (duration, delay, direction)
4. **Test on different devices**

That's it! You now have professional animations across the APSONIC website.

---

**Need help?** Check the [GSAP Documentation](https://greensock.com/docs/) or review the Hero component for a working example.

