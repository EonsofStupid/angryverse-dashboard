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
        'glass-gradient': 'linear-gradient(to right bottom, rgba(255, 255, 255, var(--glass-opacity)), rgba(255, 255, 255, calc(var(--glass-opacity) + 0.05)))',
        'glass-shine': 'linear-gradient(45deg, rgba(255,255,255,0) 45%, rgba(255,255,255,calc(var(--glass-opacity) + 0.1)) 50%, rgba(255,255,255,0) 55%)',
        'glass-border': 'var(--glass-border)',
      },
    },
  },
  plugins: [
    function({ addUtilities }) {
      addUtilities({
        '.glass-morphism': {
          '@apply backdrop-blur-[var(--glass-blur)] bg-white/[var(--glass-opacity)] border-[var(--glass-border)] shadow-lg relative overflow-hidden': {},
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
          '@apply backdrop-blur-[var(--glass-blur)] bg-white/[var(--glass-opacity)] border-[var(--glass-border)] shadow-xl': {},
          'background': 'linear-gradient(145deg, rgba(255,255,255,var(--glass-opacity)) 0%, rgba(255,255,255,calc(var(--glass-opacity) + 0.05)) 100%)',
        },
        '.glass-border': {
          '@apply border border-transparent': {},
          'border-image': 'var(--glass-border)',
        },
      });
    },
  ],
};