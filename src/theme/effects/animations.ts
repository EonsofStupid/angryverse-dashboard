import type { Config } from 'tailwindcss';
import { keyframes } from './keyframes';

export const animationEffects: Partial<Config> = {
  theme: {
    extend: {
      keyframes: {
        ...keyframes,
      },
      animation: {
        'fade-in': 'fade-in var(--animation-duration-normal) var(--animation-timing-ease-out)',
        'scale-in': 'scale-in var(--animation-duration-normal) var(--animation-timing-ease-out)',
        'slide-in': 'slide-in var(--animation-duration-normal) var(--animation-timing-ease-out)',
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  plugins: [
    function({ addUtilities }) {
      addUtilities({
        '.animate-on-scroll': {
          'opacity': '0',
          'transform': 'translateY(var(--reveal-distance))',
          'transition': 'opacity var(--reveal-duration) var(--scroll-easing), transform var(--reveal-duration) var(--scroll-easing)',
          '&.visible': {
            'opacity': '1',
            'transform': 'translateY(0)',
          },
        },
        '.parallax': {
          'transform-style': 'preserve-3d',
          'perspective': '1000px',
          'will-change': 'transform',
        },
      });
    },
  ],
};