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
        '.hover-magnetic': {
          '@apply transition-transform duration-300 ease-magnetic': {},
          '&:hover': {
            '@apply scale-105 -translate-y-1': {},
          },
        },
        '.hover-glow': {
          '@apply transition-all duration-300': {},
          '&:hover': {
            '@apply shadow-lg': {},
            'box-shadow': '0 0 20px hsl(var(--admin-primary) / 0.3)',
          },
        },
        '.particle-effect': {
          'position': 'relative',
          'overflow': 'hidden',
          '&::before': {
            content: '""',
            'position': 'absolute',
            'top': '50%',
            'left': '50%',
            'width': '300%',
            'height': '300%',
            'background': 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 50%)',
            'transform': 'translate(-50%, -50%)',
            'opacity': '0',
            'transition': 'opacity 0.3s',
          },
          '&:hover::before': {
            'opacity': '1',
          },
        },
      });
    },
  ],
};