/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '1.25rem',
        sm: '1.5rem',
        lg: '2.5rem',
        xl: '3rem',
      },
    },
    extend: {
      colors: {
        tobler: {
          // Brand blue — deep engineering navy, the site's primary structural color
          blue: '#1A4B7A',
          'blue-dark': '#0F3255',
          'blue-light': '#4A80B3',
          // Signature accent — brushed brass/gold, used sparingly as the one bold move
          gold: '#BBB15A',
          'gold-dark': '#9C9349',
          'gold-light': '#D6D09B',
          heading: '#14181A',
          body: '#484E54',
          bg: '#FFFFFF',
          'bg-light': '#F4F6F7',
          'bg-dark': '#0B2038',
          border: '#E1E4E7',
          'border-dark': 'rgba(255,255,255,0.12)',
          success: '#1E8E5A',
          warning: '#B87500',
          error: '#B4291A',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Sora', 'system-ui', 'sans-serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      fontSize: {
        h1: ['clamp(2.75rem, 6vw, 5.5rem)', { lineHeight: '1', letterSpacing: '-0.01em' }],
        h2: ['clamp(2.1rem, 4.4vw, 3.5rem)', { lineHeight: '1.05', letterSpacing: '-0.01em' }],
        h3: ['clamp(1.6rem, 3vw, 2.4rem)', { lineHeight: '1.1' }],
        h4: ['1.85rem', { lineHeight: '1.15' }],
        h5: ['1.375rem', { lineHeight: '1.3' }],
        h6: ['1.125rem', { lineHeight: '1.35' }],
      },
      maxWidth: {
        content: '1440px',
        reading: '780px',
      },
      spacing: {
        18: '4.5rem',
        30: '7.5rem',
      },
      borderRadius: {
        btn: '2px',
        card: '3px',
        form: '2px',
        img: '3px',
      },
      boxShadow: {
        soft: '3px 3px 0 rgba(20,24,26,0.05)',
        card: '5px 5px 0 rgba(20,24,26,0.07)',
        elevated: '9px 9px 0 rgba(20,24,26,0.10)',
        stamp: '5px 5px 0 rgba(187,177,90,0.22)',
        inset: 'inset 0 0 0 1px rgba(20,24,26,0.08)',
      },
      transitionTimingFunction: {
        premium: 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
      keyframes: {
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        drawLine: {
          '0%': { transform: 'scaleX(0)' },
          '100%': { transform: 'scaleX(1)' },
        },
        ticker: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      animation: {
        fadeInUp: 'fadeInUp 0.7s cubic-bezier(0.4,0,0.2,1) both',
        fadeIn: 'fadeIn 0.6s ease both',
        drawLine: 'drawLine 0.9s cubic-bezier(0.4,0,0.2,1) 0.2s both',
        ticker: 'ticker 28s linear infinite',
      },
    },
  },
  plugins: [],
}
