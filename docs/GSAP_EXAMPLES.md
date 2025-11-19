# 🎬 GSAP Animation Examples for APSONIC

Practical examples showing how to add animations to existing APSONIC components.

---

## 🎯 Example 1: Animate Service Advantages Section

### Before (No Animation)

```tsx
// src/components/ServiceAdvantages.tsx
export default function ServiceAdvantages() {
  return (
    <div className="space-y-8">
      <SectionHeader
        eyebrow="Service Network"
        title="Engineered for Africa"
        description="End-to-end support designed for local realities."
        align="center"
      />
      <div className="grid gap-6 sm:grid-cols-2">
        {serviceAdvantages.map((item) => (
          <div key={item.title} className="glass-panel rounded-3xl p-8">
            <h3 className="text-xl font-semibold text-white">{item.title}</h3>
            <p className="mt-2 text-white/70">{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
```

### After (With ScrollReveal)

```tsx
'use client';

import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { serviceAdvantages } from "@/data/home";

export default function ServiceAdvantages() {
  return (
    <div className="space-y-8">
      <ScrollReveal direction="up">
        <SectionHeader
          eyebrow="Service Network"
          title="Engineered for Africa"
          description="End-to-end support designed for local realities."
          align="center"
        />
      </ScrollReveal>
      
      <div className="grid gap-6 sm:grid-cols-2">
        {serviceAdvantages.map((item, index) => (
          <ScrollReveal 
            key={item.title} 
            direction="up" 
            delay={index * 0.1}
          >
            <div className="glass-panel rounded-3xl p-8">
              <h3 className="text-xl font-semibold text-white">{item.title}</h3>
              <p className="mt-2 text-white/70">{item.desc}</p>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </div>
  );
}
```

**Result:** Header fades in first, then cards stagger up as you scroll!

---

## 🎯 Example 2: Animate Dealer Cards

### Before

```tsx
// src/app/dealers/page.tsx (excerpt)
{filteredDealers.map((dealer) => (
  <div key={dealer.id} className="glass-panel rounded-3xl p-8">
    <h3>{dealer.name}</h3>
    {/* ... */}
  </div>
))}
```

### After (Custom Animation)

```tsx
'use client';

import { useGSAP } from "@/hooks/useGSAP";
import gsap from "gsap";

export default function DealersPage() {
  const gridRef = useGSAP(() => {
    gsap.fromTo(
      ".dealer-card",
      { opacity: 0, y: 40, scale: 0.95 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.6,
        stagger: 0.08,
        ease: "power3.out",
      }
    );
  }, [filteredDealers]); // Re-animate when dealers filter changes

  return (
    <div ref={gridRef} className="grid grid-cols-1 gap-6 sm:grid-cols-2">
      {filteredDealers.map((dealer) => (
        <div 
          key={dealer.id} 
          className="dealer-card glass-panel rounded-3xl p-8"
        >
          <h3>{dealer.name}</h3>
          {/* ... */}
        </div>
      ))}
    </div>
  );
}
```

**Result:** Cards animate in with stagger effect, and re-animate when filtering!

---

## 🎯 Example 3: Animated Stats Counter

Add to About page or Home page stats:

```tsx
'use client';

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function StatCounter({ 
  end, 
  label, 
  suffix = "" 
}: { 
  end: number; 
  label: string; 
  suffix?: string;
}) {
  const counterRef = useRef<HTMLSpanElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!counterRef.current || !containerRef.current) return;

    const counter = counterRef.current;
    const obj = { val: 0 };

    const animation = gsap.to(obj, {
      val: end,
      duration: 2,
      ease: "power2.out",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 80%",
        once: true,
      },
      onUpdate: () => {
        counter.textContent = Math.floor(obj.val).toLocaleString() + suffix;
      },
    });

    return () => {
      animation.kill();
    };
  }, [end, suffix]);

  return (
    <div ref={containerRef} className="text-center">
      <span ref={counterRef} className="text-4xl font-bold text-white">
        0{suffix}
      </span>
      <p className="mt-2 text-sm uppercase tracking-wider text-white/60">
        {label}
      </p>
    </div>
  );
}

// Usage in home page
<div className="grid grid-cols-4 gap-6">
  <StatCounter end={500} suffix="K+" label="Active Riders" />
  <StatCounter end={26} label="African Markets" />
  <StatCounter end={1200} suffix="+" label="Certified Workshops" />
</div>
```

---

## 🎯 Example 4: Parallax Hero Background

Update the Hero component for parallax effect:

```tsx
'use client';

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const imageRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!imageRef.current) return;
    
    gsap.to(imageRef.current, {
      y: 200,
      ease: "none",
      scrollTrigger: {
        trigger: imageRef.current,
        start: "top top",
        end: "bottom top",
        scrub: 1,
      },
    });
  }, []);

  return (
    <section className="relative min-h-hero overflow-hidden">
      <div ref={imageRef} className="absolute inset-0 scale-110">
        {/* Your hero images */}
      </div>
      {/* Rest of hero content */}
    </section>
  );
}
```

---

## 🎯 Example 5: Hover Card Animation

Enhance any card with smooth hover effects:

```tsx
'use client';

import { useRef } from "react";
import gsap from "gsap";

export function InteractiveCard({ children }: { children: React.ReactNode }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  const handleMouseEnter = () => {
    gsap.to(cardRef.current, {
      scale: 1.02,
      y: -8,
      duration: 0.3,
      ease: "power2.out",
    });
    
    gsap.to(glowRef.current, {
      opacity: 0.3,
      duration: 0.3,
    });
  };

  const handleMouseLeave = () => {
    gsap.to(cardRef.current, {
      scale: 1,
      y: 0,
      duration: 0.3,
      ease: "power2.out",
    });
    
    gsap.to(glowRef.current, {
      opacity: 0,
      duration: 0.3,
    });
  };

  return (
    <div className="relative">
      <div
        ref={glowRef}
        className="absolute -inset-2 bg-apsonic-green/20 blur-xl rounded-3xl opacity-0"
      />
      <div
        ref={cardRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="relative glass-panel rounded-3xl p-8 cursor-pointer"
      >
        {children}
      </div>
    </div>
  );
}

// Usage
<InteractiveCard>
  <h3>Hover me for smooth animation!</h3>
  <p>Card content here</p>
</InteractiveCard>
```

---

## 🎯 Example 6: Animated Page Transitions

Add smooth transitions between pages:

```tsx
// src/app/template.tsx (create this file)
'use client';

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { usePathname } from "next/navigation";

export default function Template({ children }: { children: React.ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    if (!containerRef.current) return;

    // Fade in animation on page load
    gsap.fromTo(
      containerRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" }
    );
  }, [pathname]);

  return <div ref={containerRef}>{children}</div>;
}
```

---

## 🎯 Example 7: Staggered Navigation Links

Animate navbar links on page load:

```tsx
// Update src/components/NavBar.tsx
'use client';

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function NavBar() {
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!navRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".nav-link",
        { opacity: 0, y: -10 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.05,
          ease: "power2.out",
        }
      );
    }, navRef);

    return () => ctx.revert();
  }, []);

  return (
    <header ref={navRef}>
      {primaryNavLinks.map((link) => (
        <Link key={link.href} href={link.href} className="nav-link">
          {link.label}
        </Link>
      ))}
    </header>
  );
}
```

---

## 🎯 Example 8: Image Gallery Reveal

Animate the AFCON sponsorship gallery:

```tsx
// Update src/components/AFCONSponsorship.tsx
'use client';

import { useGSAP } from "@/hooks/useGSAP";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function AFCONSponsorship() {
  const galleryRef = useGSAP(() => {
    gsap.fromTo(
      ".gallery-image",
      {
        opacity: 0,
        scale: 0.8,
        rotationY: -20,
      },
      {
        opacity: 1,
        scale: 1,
        rotationY: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: galleryRef.current,
          start: "top 70%",
          once: true,
        },
      }
    );
  });

  return (
    <div ref={galleryRef} className="grid grid-cols-3 gap-6">
      {images.map((img, i) => (
        <div key={i} className="gallery-image">
          <Image src={img.src} alt={img.alt} />
        </div>
      ))}
    </div>
  );
}
```

---

## 📝 Quick Implementation Checklist

For any component you want to animate:

1. **Add `'use client'`** at the top
2. **Import animation tool:**
   - Simple: `import { ScrollReveal } from "@/components/ui/ScrollReveal"`
   - Custom: `import { useGSAP } from "@/hooks/useGSAP"`
3. **Wrap or use hook**
4. **Test on mobile** (animations should be subtle)
5. **Consider motion preferences** (accessibility)

---

## 🎬 Animation Priority List

Suggested order for adding animations to APSONIC:

### High Priority (Most Impact)
1. ✅ **Hero** - Already animated!
2. **Service Advantages** - ScrollReveal cards
3. **Stats/Numbers** - Counter animations
4. **Product Cards** - Stagger effect
5. **Section Headers** - Fade in from bottom

### Medium Priority
6. **Dealer Cards** - Filter animations
7. **Footer Links** - Subtle fade in
8. **About Timeline** - Reveal milestones
9. **Contact Form** - Smooth transitions

### Low Priority (Polish)
10. **Navigation Links** - Subtle entrance
11. **Social Icons** - Hover effects
12. **Image Galleries** - Stagger reveals
13. **Page Transitions** - Smooth routing

---

## ✅ Testing Checklist

After adding animations:

- [ ] Animations run smoothly on desktop
- [ ] Animations work on mobile/tablet
- [ ] No performance lag (60fps)
- [ ] Respects reduced motion preference
- [ ] No layout shift (CLS)
- [ ] Animations feel natural (not too fast/slow)
- [ ] Scroll-triggered animations fire at correct point
- [ ] No conflicting animations

---

## 🚀 Quick Start

Want to add animations NOW? Start here:

### 1. Animate ModelsCarousel

```bash
# Open the file
code src/components/ModelsCarousel.tsx
```

Add at the top:
```tsx
'use client';
import { ScrollReveal } from "@/components/ui/ScrollReveal";
```

Wrap carousel items:
```tsx
<ScrollReveal direction="up" delay={index * 0.1}>
  {/* existing card code */}
</ScrollReveal>
```

### 2. Test it!
```bash
npm run dev
```

Open `http://localhost:3000` and scroll to see the magic! ✨

---

**That's it!** You now have everything you need to add professional animations to any APSONIC component.

