import { Config } from "tailwindcss";

export const interactionEffects: Partial<Config> = {
  theme: {
    extend: {
      transitionTimingFunction: {
        'magnetic': 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
      },
    },
  },
  plugins: [
    function({ addUtilities }) {
      addUtilities({
        '.magnetic': {
          '@apply transition-transform duration-300 ease-magnetic': {},
          'transform-style': 'preserve-3d',
          'perspective': '1000px',
        },
        '.tilt': {
          '@apply transition-transform duration-300': {},
          'transform-style': 'preserve-3d',
          'perspective': '1000px',
        },
        '.scroll-trigger': {
          '@apply opacity-0 transition-all duration-500': {},
          '&.visible': {
            '@apply opacity-100': {},
          },
        },
        '.cursor-effect': {
          'position': 'relative',
          '&::before': {
            content: '""',
            'position': 'absolute',
            'width': '20px',
            'height': '20px',
            'border-radius': '50%',
            'background': 'var(--cursor-color, rgba(255, 255, 255, 0.2))',
            'transform': 'translate(-50%, -50%)',
            'pointer-events': 'none',
            'z-index': '1000',
          },
        },
      });
    },
  ],
};