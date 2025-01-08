import { Config } from "tailwindcss";

export const colorEffects: Partial<Config> = {
  theme: {
    extend: {
      backgroundImage: {
        'duotone': 'var(--duotone-gradient)',
        'gradient-mask': 'var(--gradient-mask)',
      },
    },
  },
  plugins: [
    function({ addUtilities }) {
      addUtilities({
        '.text-gradient': {
          '@apply bg-clip-text text-transparent': {},
          'background-image': 'var(--text-gradient)',
        },
        '.glow': {
          'filter': 'drop-shadow(0 0 5px var(--glow-color))',
        },
        '.color-shift': {
          '@apply transition-colors duration-500': {},
          'animation': 'color-shift 10s infinite',
        },
        '.duotone': {
          'position': 'relative',
          '&::before': {
            content: '""',
            'position': 'absolute',
            'inset': '0',
            'background': 'var(--duotone-gradient)',
            'mix-blend-mode': 'color',
          },
        },
      });
    },
  ],
};