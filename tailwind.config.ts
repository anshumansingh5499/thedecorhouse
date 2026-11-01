import type { Config } from 'tailwindcss'
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: { extend: {
    colors: { ink: '#0E0E0E', bone: '#F4F1EC', stone: '#D8D2C8', clay: '#B08968', moss: '#3B4A3F' },
    fontFamily: { display: ['"Cormorant Garamond"', 'serif'], logo: ['Italiana', 'serif'], script: ['"Pinyon Script"', 'cursive'], sans: ['"Inter"', 'system-ui', 'sans-serif'] },
    fontSize: { hero: 'clamp(3.5rem, 12vw, 13rem)', big: 'clamp(2rem, 5vw, 5rem)' },
    transitionTimingFunction: { expo: 'cubic-bezier(0.16,1,0.3,1)' },
    keyframes: { marquee: { to: { transform: 'translateX(-50%)' } } },
    animation: { marquee: 'marquee 30s linear infinite' },
  } },
  plugins: [],
} satisfies Config
