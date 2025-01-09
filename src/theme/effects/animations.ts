import type { Config } from 'tailwindcss';
import { keyframes } from './keyframes';

export const animationEffects: Partial<Config> = {
  theme: {
    extend: {
      keyframes: {
        ...keyframes,
        'fade-in': {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'scale-in': {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        'slide-in': {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(0)' },
        },
      },
      animation: {
        'fade-in': 'fade-in var(--animation-duration-normal) var(--animation-timing-ease-out)',
        'scale-in': 'scale-in var(--animation-duration-normal) var(--animation-timing-ease-out)',
        'slide-in': 'slide-in var(--animation-duration-normal) var(--animation-timing-ease-out)',
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