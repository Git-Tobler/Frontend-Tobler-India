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
      /* ==========================================================================
         COLOR SYSTEM
         ========================================================================== */
      colors: {
        tobler: {
          /* ----------------------------------------------------------------------
             BRAND COLORS — anchored to the logo mark (tobler-logo.svg):
             navy #1B4E90 field, yellow #F7E500 square, near-black T.
             ---------------------------------------------------------------------- */
          blue: '#1B4E90',          // Primary Brand — exact logo navy
          'blue-dark': '#123A6F',   // Hover / pressed, scrims, rich bands
          'blue-light': '#4472A8',  // Hover / Secondary (AA on white)

          /* ----------------------------------------------------------------------
             PREMIUM ACCENT — the logo yellow. Dose it: small chips, rules,
             highlights and the accent button. Never body text on white.
             ---------------------------------------------------------------------- */
          gold: '#F7E500',          // Exact logo yellow
          'gold-dark': '#D9C500',   // Hover / pressed for yellow fills
          'gold-light': '#FBF3A3',  // Pale wash for chips and tints
          'gold-deep': '#6E6300',   // Only readable-yellow for small text on light

          /* ----------------------------------------------------------------------
             TYPOGRAPHY
             ---------------------------------------------------------------------- */
          heading: '#14181A',
          body: '#4A4F55',
          muted: '#6B7280',

          /* ----------------------------------------------------------------------
             BACKGROUNDS — neutrals lean cool so light sections sit in the
             same temperature as the navy, instead of drifting green-grey.
             ---------------------------------------------------------------------- */
          bg: '#FFFFFF',
          surface: '#F8FAFC',
          'bg-light': '#F1F5F9',
          'bg-dark': '#0A2240',     // Hero / Footer deep navy — hue of #1B4E90

          /* ----------------------------------------------------------------------
             BORDERS
             ---------------------------------------------------------------------- */
          border: '#DFE5EC',
          'border-light': '#EBF0F5',
          'border-dark': 'rgba(255,255,255,0.12)',

          /* ----------------------------------------------------------------------
             STATUS
             ---------------------------------------------------------------------- */
          success: '#2E7D32',
          warning: '#C28A00',
          error: '#C62828',
          info: '#1A73E8',
        },

        /* ----------------------------------------------------------------------
           HOMEPAGE PALETTE (light SaaS layout, brand colors)

           Additive on purpose. The `tobler.*` scale above still drives every
           inner page; only the home route reaches for these. The token keys
           kept their original `green-*` names from the Shopify restyle, but
           on 2026-08-07 the VALUES were re-pointed to the logo navy — the
           green clashed with the #1B4E90 / #F7E500 brand mark. Layout stays
           light/airy; the accent is now the brand itself.
           ---------------------------------------------------------------------- */
        shopify: {
          green: '#1B4E90',        // Primary CTA fill — brand navy
          'green-dark': '#123A6F', // Hover / pressed
          'green-deep': '#0A2240', // Dark bands
          'green-tint': '#EEF3FA', // Section wash
          'green-line': '#C9D8EC', // Tint borders

          ink: '#14181A',
          body: '#4A4F55',
          muted: '#6B7177',

          surface: '#F5F7FA',
          'surface-warm': '#FBFBFA',
          border: '#E1E5EB',
        },
      },

      /* ==========================================================================
         TYPOGRAPHY
         ========================================================================== */

      fontFamily: {
        sans: ['Avenir LT W01_45 Book1475508', 'Arial', 'sans-serif'],
        display: ['Avenir LT W01_45 Book1475508', 'Arial', 'sans-serif'],
        mono: [
          'Avenir LT W01_45 Book1475508',
          'Arial',
          'sans-serif',
        ],
      },

      fontSize: {
        h1: [
          'clamp(2.75rem, 6vw, 5.5rem)',
          {
            lineHeight: '1',
            letterSpacing: '-0.02em',
          },
        ],

        h2: [
          'clamp(2.1rem, 4.4vw, 3.5rem)',
          {
            lineHeight: '1.05',
            letterSpacing: '-0.02em',
          },
        ],

        h3: [
          'clamp(1.6rem, 3vw, 2.4rem)',
          {
            lineHeight: '1.1',
          },
        ],

        h4: [
          '1.85rem',
          {
            lineHeight: '1.15',
          },
        ],

        h5: [
          '1.375rem',
          {
            lineHeight: '1.3',
          },
        ],

        h6: [
          '1.125rem',
          {
            lineHeight: '1.35',
          },
        ],

        /* Homepage display sizes — larger and tighter than the h1/h2 pair,
           which stay as they are for the inner pages. */
        'display-xl': [
          'clamp(2.75rem, 6.4vw, 5.75rem)',
          {
            lineHeight: '0.96',
            letterSpacing: '-0.04em',
          },
        ],

        'display-lg': [
          'clamp(2rem, 4.2vw, 3.5rem)',
          {
            lineHeight: '1.04',
            letterSpacing: '-0.035em',
          },
        ],
      },

         /*LAYOUT*/
         
      maxWidth: {
        content: '1440px',
        reading: '780px',
      },

      spacing: {
        18: '4.5rem',
        30: '7.5rem',
      },

      borderRadius: {
        btn: '5px',
        card: '8px',
        form: '5px',
        img: '8px',

        /* Homepage geometry — opt-in, so inner pages keep their 4–6px edges. */
        pill: '999px',
        'card-lg': '27px',
        'card-xl': '37px',
        'img-lg': '21px',
      },
      
         /*SHADOWS*/
      

      boxShadow: {
        soft: '0 4px 18px rgba(20,24,26,.06)',

        card: '0 10px 30px rgba(20,24,26,.08)',

        elevated: '0 18px 50px rgba(20,24,26,.12)',

        stamp: '0 8px 24px rgba(217,197,0,.22)',

        inset: 'inset 0 0 0 1px rgba(20,24,26,.08)',

        /* Homepage card elevation — flatter and wider than `card`/`elevated`,
           which read too heavy against the light Shopify-style surfaces.
           Named `raised`, not `soft`: `soft` is already taken above and is
           what the site header uses. */
        raised: '0 1px 2px rgba(0,0,0,.04), 0 8px 24px rgba(0,0,0,.06)',
        lift: '0 12px 40px rgba(0,0,0,.10)',
      },

      /* ==========================================================================
         TRANSITIONS
         ========================================================================== */

      transitionTimingFunction: {
        premium: 'cubic-bezier(0.4,0,0.2,1)',
      },

      /* ==========================================================================
         KEYFRAMES
         ========================================================================== */

      keyframes: {
        fadeInUp: {
          '0%': {
            opacity: '0',
            transform: 'translateY(24px)',
          },

          '100%': {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },

        fadeIn: {
          '0%': {
            opacity: '0',
          },

          '100%': {
            opacity: '1',
          },
        },

        drawLine: {
          '0%': {
            transform: 'scaleX(0)',
          },

          '100%': {
            transform: 'scaleX(1)',
          },
        },

        ticker: {
          '0%': {
            transform: 'translateX(0)',
          },

          '100%': {
            transform: 'translateX(-50%)',
          },
        },

        /* Swap-in for the rotating hero word. Rises and settles rather than
           cross-fading, so the headline reads as one continuous line. */
        wordIn: {
          '0%': {
            opacity: '0',
            transform: 'translateY(0.42em)',
          },

          '100%': {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },

        scaleIn: {
          '0%': {
            opacity: '0',
            transform: 'scale(0.95)',
          },

          '100%': {
            opacity: '1',
            transform: 'scale(1)',
          },
        },
      },

      /* ==========================================================================
         ANIMATIONS
         ========================================================================== */

      animation: {
        fadeInUp:
          'fadeInUp .36s cubic-bezier(.4,0,.2,1) both',

        fadeIn:
          'fadeIn .28s ease both',

        drawLine:
          'drawLine .38s cubic-bezier(.4,0,.2,1) .1s both',

        ticker:
          'ticker 28s linear infinite',

        wordIn:
          'wordIn .5s cubic-bezier(.22,1,.36,1) both',

        /* Slower than `ticker` — the logo strip is meant to be readable, not
           to draw the eye away from the hero above it. */
        logoScroll:
          'ticker 42s linear infinite',

        'fade-in':
          'fadeIn .2s ease both',

        'scale-in':
          'scaleIn .3s cubic-bezier(.4,0,.2,1) both',
      },
    },
  },

  plugins: [],
}