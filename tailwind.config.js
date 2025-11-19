/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        // Primary brand colors
        'apsonic-green': 'var(--apsonic-green)',
        'apsonic-green-dark': 'var(--apsonic-green-dark)',
        'apsonic-accent': 'var(--apsonic-accent)',
        
        // Surface colors
        'apsonic-ink': 'var(--apsonic-ink)',
        'apsonic-surface': 'var(--apsonic-surface)',
        'apsonic-surface-alt': 'var(--apsonic-surface-alt)',
        
        // Text colors
        'apsonic-text': 'var(--apsonic-text)',
        'apsonic-muted': 'var(--apsonic-muted)',
        
        // Border
        'apsonic-border': 'var(--apsonic-border)',
      },
      fontFamily: {
        sans: ['var(--font-geist-sans)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-geist-mono)', 'monospace'],
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
      },
      minHeight: {
        'hero': '70vh',
        'hero-lg': '80vh',
        'hero-md': '60vh',
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
};