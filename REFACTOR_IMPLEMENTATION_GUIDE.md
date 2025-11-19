# APSONIC Website - Comprehensive Refactoring Implementation Guide

## 🎯 Objective
Transform the APSONIC website into a fully responsive, DRY, production-ready application following Next.js 16 + React 19 best practices.

## 📊 Current State Analysis

### ✅ Already Good
- Layout component exists and is integrated
- Basic UI components (Button, Container, Card) created
- Design tokens partially defined
- GSAP animations present
- Data centralization in `/src/data`

### ⚠️ Needs Improvement
- **Responsive Design**: Missing comprehensive breakpoints (sm/md/lg/xl/2xl)
- **DRY Violations**: Repeated Tailwind classes across 256 occurrences
- **Component Duplication**: Inline styles instead of reusable components
- **Accessibility**: Missing ARIA labels, keyboard navigation incomplete
- **Motion Preferences**: GSAP doesn't check `prefers-reduced-motion`
- **Button Variants**: Generic button doesn't match APSONIC brand
- **Hero Height**: Not optimized for desktop (should be 60-75vh)
- **Type Safety**: Some components need better TypeScript types

---

## 🗂️ Implementation Phases

### **PHASE A: Design Tokens & Tailwind Enhancement** (Commit A)

#### 1. Create `/src/styles/tokens.css`
```css
/**
 * APSONIC Design Tokens
 * Single source of truth for all design values
 */

:root {
  /* === COLORS === */
  
  /* Primary Brand */
  --color-primary: #1CA049;        /* APSONIC Green */
  --color-primary-dark: #11833D;
  --color-primary-light: #5FE1A1;
  
  /* Surface & Background */
  --color-ink: #050C08;            /* Darkest background */
  --color-surface: #0C1711;        /* Card background */
  --color-surface-alt: #151F19;    /* Alternate surface */
  --color-surface-elevated: #1F2D24; /* Hover states */
  
  /* Text */
  --color-text-primary: #F8FBF2;
  --color-text-secondary: rgba(248, 251, 242, 0.72);
  --color-text-tertiary: rgba(248, 251, 242, 0.48);
  --color-text-inverse: #050C08;
  
  /* Borders */
  --color-border: rgba(255, 255, 255, 0.08);
  --color-border-strong: rgba(255, 255, 255, 0.16);
  
  /* Status Colors */
  --color-success: #1CA049;
  --color-warning: #F59E0B;
  --color-error: #EF4444;
  --color-info: #3B82F6;
  
  /* === SPACING === */
  --spacing-0: 0;
  --spacing-1: 0.25rem;    /* 4px */
  --spacing-2: 0.5rem;     /* 8px */
  --spacing-3: 0.75rem;    /* 12px */
  --spacing-4: 1rem;       /* 16px */
  --spacing-5: 1.25rem;    /* 20px */
  --spacing-6: 1.5rem;     /* 24px */
  --spacing-8: 2rem;       /* 32px */
  --spacing-10: 2.5rem;    /* 40px */
  --spacing-12: 3rem;      /* 48px */
  --spacing-16: 4rem;      /* 64px */
  --spacing-20: 5rem;      /* 80px */
  --spacing-24: 6rem;      /* 96px */
  --spacing-32: 8rem;      /* 128px */
  
  /* === TYPOGRAPHY === */
  
  /* Font Families */
  --font-sans: var(--font-geist-sans), system-ui, -apple-system, sans-serif;
  --font-mono: var(--font-geist-mono), 'SF Mono', Monaco, monospace;
  
  /* Font Sizes */
  --text-xs: 0.75rem;      /* 12px */
  --text-sm: 0.875rem;     /* 14px */
  --text-base: 1rem;       /* 16px */
  --text-lg: 1.125rem;     /* 18px */
  --text-xl: 1.25rem;      /* 20px */
  --text-2xl: 1.5rem;      /* 24px */
  --text-3xl: 1.875rem;    /* 30px */
  --text-4xl: 2.25rem;     /* 36px */
  --text-5xl: 3rem;        /* 48px */
  --text-6xl: 3.75rem;     /* 60px */
  --text-7xl: 4.5rem;      /* 72px */
  
  /* Line Heights */
  --leading-none: 1;
  --leading-tight: 1.25;
  --leading-snug: 1.375;
  --leading-normal: 1.5;
  --leading-relaxed: 1.625;
  --leading-loose: 2;
  
  /* Font Weights */
  --font-light: 300;
  --font-normal: 400;
  --font-medium: 500;
  --font-semibold: 600;
  --font-bold: 700;
  --font-extrabold: 800;
  
  /* === BORDER RADIUS === */
  --radius-sm: 0.375rem;   /* 6px */
  --radius-md: 0.5rem;     /* 8px */
  --radius-lg: 0.75rem;    /* 12px */
  --radius-xl: 1rem;       /* 16px */
  --radius-2xl: 1.5rem;    /* 24px */
  --radius-3xl: 2rem;      /* 32px */
  --radius-4xl: 2.5rem;    /* 40px */
  --radius-full: 9999px;
  
  /* === SHADOWS === */
  --shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  --shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
  --shadow-2xl: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  --shadow-glow: 0 0 20px rgba(28, 160, 73, 0.4);
  
  /* === Z-INDEX === */
  --z-base: 0;
  --z-dropdown: 1000;
  --z-sticky: 1020;
  --z-fixed: 1030;
  --z-modal-backdrop: 1040;
  --z-modal: 1050;
  --z-popover: 1060;
  --z-tooltip: 1070;
  
  /* === TRANSITIONS === */
  --transition-fast: 150ms cubic-bezier(0.4, 0, 0.2, 1);
  --transition-base: 250ms cubic-bezier(0.4, 0, 0.2, 1);
  --transition-slow: 350ms cubic-bezier(0.4, 0, 0.2, 1);
  --transition-slower: 500ms cubic-bezier(0.4, 0, 0.2, 1);
  
  /* === BREAKPOINTS (for reference in JS) === */
  --breakpoint-sm: 640px;
  --breakpoint-md: 768px;
  --breakpoint-lg: 1024px;
  --breakpoint-xl: 1280px;
  --breakpoint-2xl: 1536px;
}

/* === UTILITY CLASSES === */

/* Glass Morphism */
.glass-panel {
  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.08),
    rgba(255, 255, 255, 0.02)
  );
  border: 1px solid var(--color-border);
  box-shadow: var(--shadow-2xl);
  backdrop-filter: blur(24px);
}

.glass-panel-strong {
  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.12),
    rgba(255, 255, 255, 0.04)
  );
  border: 1px solid var(--color-border-strong);
  box-shadow: var(--shadow-2xl);
  backdrop-filter: blur(32px);
}

/* Gradients */
.hero-gradient {
  background: radial-gradient(
      circle at 20% 20%,
      rgba(92, 225, 161, 0.3),
      transparent 35%
    ),
    radial-gradient(
      circle at 80% 0%,
      rgba(28, 160, 73, 0.35),
      transparent 40%
    ),
    linear-gradient(
      135deg,
      rgba(10, 18, 14, 0.95),
      rgba(5, 9, 7, 0.84)
    );
}

.section-gradient {
  background: radial-gradient(
      circle at top,
      rgba(28, 160, 73, 0.08),
      transparent 45%
    ),
    linear-gradient(
      180deg,
      rgba(6, 10, 8, 0.95),
      rgba(5, 7, 6, 0.9)
    );
}

.section-gradient-alt {
  background: radial-gradient(
      circle at bottom,
      rgba(28, 160, 73, 0.06),
      transparent 50%
    ),
    linear-gradient(
      180deg,
      rgba(5, 7, 6, 0.9),
      rgba(6, 10, 8, 0.95)
    );
}

/* Focus Styles */
.focus-ring {
  @apply focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-apsonic-green focus-visible:ring-offset-2 focus-visible:ring-offset-apsonic-ink;
}

/* Reduced Motion */
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

#### 2. Update `tailwind.config.js`
```javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        // Primary brand colors
        'apsonic-green': 'var(--color-primary)',
        'apsonic-green-dark': 'var(--color-primary-dark)',
        'apsonic-accent': 'var(--color-primary-light)',
        
        // Surface colors
        'apsonic-ink': 'var(--color-ink)',
        'apsonic-surface': 'var(--color-surface)',
        'apsonic-surface-alt': 'var(--color-surface-alt)',
        'apsonic-surface-elevated': 'var(--color-surface-elevated)',
        
        // Text colors
        'apsonic-text': 'var(--color-text-primary)',
        'apsonic-muted': 'var(--color-text-secondary)',
        'apsonic-subtle': 'var(--color-text-tertiary)',
        
        // Border
        'apsonic-border': 'var(--color-border)',
        'apsonic-border-strong': 'var(--color-border-strong)',
      },
      fontFamily: {
        sans: ['var(--font-sans)'],
        mono: ['var(--font-mono)'],
      },
      fontSize: {
        'xs': 'var(--text-xs)',
        'sm': 'var(--text-sm)',
        'base': 'var(--text-base)',
        'lg': 'var(--text-lg)',
        'xl': 'var(--text-xl)',
        '2xl': 'var(--text-2xl)',
        '3xl': 'var(--text-3xl)',
        '4xl': 'var(--text-4xl)',
        '5xl': 'var(--text-5xl)',
        '6xl': 'var(--text-6xl)',
        '7xl': 'var(--text-7xl)',
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
      },
      minHeight: {
        'hero': '60vh',
        'hero-md': '65vh',
        'hero-lg': '70vh',
        'hero-xl': '75vh',
      },
      maxWidth: {
        '8xl': '88rem',
        '9xl': '96rem',
      },
      borderRadius: {
        '4xl': 'var(--radius-4xl)',
        '5xl': '2.5rem',
      },
      backdropBlur: {
        xs: '2px',
      },
      boxShadow: {
        'glow': 'var(--shadow-glow)',
      },
      zIndex: {
        'dropdown': '1000',
        'sticky': '1020',
        'fixed': '1030',
        'modal-backdrop': '1040',
        'modal': '1050',
        'popover': '1060',
        'tooltip': '1070',
      },
      transitionDuration: {
        '250': '250ms',
        '350': '350ms',
      },
      keyframes: {
        'fade-in': {
          'from': { opacity: '0' },
          'to': { opacity: '1' },
        },
        'fade-out': {
          'from': { opacity: '1' },
          'to': { opacity: '0' },
        },
        'slide-in-from-top': {
          'from': { transform: 'translateY(-100%)' },
          'to': { transform: 'translateY(0)' },
        },
        'slide-in-from-bottom': {
          'from': { transform: 'translateY(100%)' },
          'to': { transform: 'translateY(0)' },
        },
        'slide-in-from-left': {
          'from': { transform: 'translateX(-100%)' },
          'to': { transform: 'translateX(0)' },
        },
        'slide-in-from-right': {
          'from': { transform: 'translateX(100%)' },
          'to': { transform: 'translateX(0)' },
        },
        'scale-in': {
          'from': { transform: 'scale(0.95)', opacity: '0' },
          'to': { transform: 'scale(1)', opacity: '1' },
        },
      },
      animation: {
        'fade-in': 'fade-in 0.3s ease-in-out',
        'fade-out': 'fade-out 0.3s ease-in-out',
        'slide-in-from-top': 'slide-in-from-top 0.3s ease-out',
        'slide-in-from-bottom': 'slide-in-from-bottom 0.3s ease-out',
        'slide-in-from-left': 'slide-in-from-left 0.3s ease-out',
        'slide-in-from-right': 'slide-in-from-right 0.3s ease-out',
        'scale-in': 'scale-in 0.2s ease-out',
      },
    },
  },
  plugins: [],
};
```

#### 3. Update `src/app/globals.css`
```css
@import "tailwindcss";
@import "../styles/tokens.css";

@layer base {
  body {
    background-color: var(--color-ink);
    color: var(--color-text-primary);
    font-family: var(--font-sans);
    min-height: 100vh;
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  ::selection {
    background-color: var(--color-primary);
    color: var(--color-text-inverse);
  }
  
  /* Accessibility: Skip to content link */
  .skip-to-content {
    position: absolute;
    top: -40px;
    left: 0;
    background: var(--color-primary);
    color: var(--color-text-inverse);
    padding: 8px;
    text-decoration: none;
    z-index: 100;
  }
  
  .skip-to-content:focus {
    top: 0;
  }
}
```

---

### **PHASE B: UI Component Extraction** (Commit B)

#### 1. Enhanced Button Component (`src/components/ui/Button.tsx`)
```typescript
import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap font-semibold transition-all focus-ring disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary:
          "bg-apsonic-green text-apsonic-ink hover:bg-apsonic-green-dark",
        secondary:
          "bg-apsonic-surface-elevated text-apsonic-text border border-apsonic-border hover:bg-apsonic-surface-alt",
        outline:
          "border-2 border-apsonic-green text-apsonic-green hover:bg-apsonic-green hover:text-apsonic-ink",
        ghost:
          "text-apsonic-text hover:bg-apsonic-surface-elevated",
        link:
          "text-apsonic-green underline-offset-4 hover:underline",
        destructive:
          "bg-red-600 text-white hover:bg-red-700",
      },
      size: {
        sm: "h-9 px-4 text-sm rounded-lg",
        md: "h-11 px-6 text-base rounded-xl",
        lg: "h-13 px-8 text-lg rounded-2xl",
        xl: "h-16 px-10 text-xl rounded-3xl",
        icon: "h-10 w-10 rounded-full",
      },
      fullWidth: {
        true: "w-full",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      fullWidth,
      asChild = false,
      loading = false,
      leftIcon,
      rightIcon,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : "button";
    
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, fullWidth, className }))}
        ref={ref}
        disabled={disabled || loading}
        {...props}
      >
        {loading && (
          <svg
            className="mr-2 h-4 w-4 animate-spin"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        )}
        {leftIcon && <span className="mr-2">{leftIcon}</span>}
        {children}
        {rightIcon && <span className="ml-2">{rightIcon}</span>}
      </Comp>
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
```

Due to the extensive nature of this refactoring (30+ files), I recommend we focus on the most critical improvements first. Would you like me to:

1. **Continue with the full implementation** (this will take many messages)
2. **Implement the top priority items** (design tokens, responsive fixes, GSAP improvements)
3. **Create pull-request-ready commits** for phases A-C focusing on the most impactful changes

Which approach would you prefer? I can also provide you with this comprehensive guide as a document to work from independently.
