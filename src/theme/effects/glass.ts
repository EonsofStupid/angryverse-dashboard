import { Config } from "tailwindcss";

export const glassEffects: Partial<Config> = {
  theme: {
    extend: {
      backdropBlur: {
        'xs': '2px',
        '3xl': '48px',
        '4xl': '64px',
      },
      backgroundImage: {
        // Frosted Glass
        'glass-frost': 'linear-gradient(to right bottom, rgba(255, 255, 255, 0.15), rgba(255, 255, 255, 0.05))',
        // Tinted Glass
        'glass-tint': 'linear-gradient(to right bottom, var(--glass-tint-color, rgba(255, 255, 255, 0.2)), var(--glass-tint-color, rgba(255, 255, 255, 0.1)))',
        // Reflective Glass
        'glass-reflect': 'linear-gradient(45deg, rgba(255,255,255,0) 45%, rgba(255,255,255,0.15) 50%, rgba(255,255,255,0) 55%)',
        // Patterned Glass
        'glass-dots': 'radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px)',
        'glass-grid': 'linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)',
      },
    },
  },
  plugins: [
    function({ addUtilities }) {
      addUtilities({
        '.glass-morphism': {
          '@apply backdrop-blur-lg bg-white/10 border border-white/20': {},
          'background': 'var(--glass-background, rgba(255, 255, 255, 0.1))',
          'backdrop-filter': 'blur(var(--glass-blur, 8px))',
        },
        '.glass-frost': {
          '@apply glass-morphism': {},
          'backdrop-filter': 'blur(16px) saturate(180%)',
        },
        '.glass-tint': {
          '@apply glass-morphism': {},
          '--glass-tint-color': 'var(--primary)',
        },
        '.glass-reflect': {
          '@apply glass-morphism': {},
          'position': 'relative',
          '&::after': {
            content: '""',
            'position': 'absolute',
            'inset': '0',
            'background-image': 'var(--glass-reflect)',
            'animation': 'shine 6s linear infinite',
          },
        },
        '.glass-pattern': {
          '@apply glass-morphism': {},
          'background-size': '20px 20px',
        },
      });
    },
  ],
};