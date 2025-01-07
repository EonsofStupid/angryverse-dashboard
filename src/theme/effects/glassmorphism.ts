import { Config } from "tailwindcss";

export const glassmorphismEffects: Partial<Config> = {
  theme: {
    extend: {
      backdropBlur: {
        'xs': '2px',
        '3xl': '48px',
        '4xl': '64px',
      },
      backgroundImage: {
        'glass-gradient': 'linear-gradient(to right bottom, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.1))',
        'glass-shine': 'linear-gradient(45deg, rgba(255,255,255,0) 45%, rgba(255,255,255,0.1) 50%, rgba(255,255,255,0) 55%)',
        'glass-border': 'linear-gradient(90deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.2) 100%)',
      },
    },
  },
  plugins: [
    function({ addUtilities }) {
      addUtilities({
        '.glass-morphism': {
          '@apply backdrop-blur-lg bg-white/5 border border-white/10 shadow-lg relative overflow-hidden': {},
          '&::before': {
            content: '""',
            '@apply absolute inset-0 bg-glass-gradient pointer-events-none': {},
          },
          '&::after': {
            content: '""',
            '@apply absolute inset-0 bg-glass-shine animate-shine pointer-events-none': {},
          },
        },
        '.glass-card': {
          '@apply backdrop-blur-xl bg-white/5 border border-white/20 shadow-xl': {},
          'background': 'linear-gradient(145deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.1) 100%)',
        },
        '.glass-border': {
          '@apply border border-transparent': {},
          'border-image': 'linear-gradient(90deg, rgba(255,255,255,0.1), rgba(255,255,255,0.3)) 1',
        },
      });
    },
  ],
};