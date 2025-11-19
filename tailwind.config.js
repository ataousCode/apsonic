/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        // Primary brand colors (using new token system)
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
        
        // Borders
        'apsonic-border': 'var(--color-border)',
        'apsonic-border-strong': 'var(--color-border-strong)',
        
        // Status colors
        'status-success': 'var(--color-success)',
        'status-warning': 'var(--color-warning)',
        'status-error': 'var(--color-error)',
        'status-info': 'var(--color-info)',
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
      letterSpacing: {
        tighter: 'var(--tracking-tighter)',
        tight: 'var(--tracking-tight)',
        normal: 'var(--tracking-normal)',
        wide: 'var(--tracking-wide)',
        wider: 'var(--tracking-wider)',
        widest: 'var(--tracking-widest)',
        ultra: 'var(--tracking-ultra)',
      },
      lineHeight: {
        none: 'var(--leading-none)',
        tight: 'var(--leading-tight)',
        snug: 'var(--leading-snug)',
        normal: 'var(--leading-normal)',
        relaxed: 'var(--leading-relaxed)',
        loose: 'var(--leading-loose)',
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
        '5xl': 'var(--radius-5xl)',
      },
      backdropBlur: {
        xs: '2px',
      },
      boxShadow: {
        'glow': 'var(--shadow-glow)',
        'glow-strong': 'var(--shadow-glow-strong)',
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
      transitionTimingFunction: {
        'bounce': 'var(--ease-bounce)',
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
        'scale-out': {
          'from': { transform: 'scale(1)', opacity: '1' },
          'to': { transform: 'scale(0.95)', opacity: '0' },
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
        'scale-out': 'scale-out 0.2s ease-in',
      },
    },
  },
  plugins: [],
};