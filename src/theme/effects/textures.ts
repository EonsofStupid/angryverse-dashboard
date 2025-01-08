import { Config } from "tailwindcss";

export const textureEffects: Partial<Config> = {
  theme: {
    extend: {
      backgroundImage: {
        'noise': 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.65\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")',
        'grid': 'linear-gradient(to right, var(--grid-color) 1px, transparent 1px), linear-gradient(to bottom, var(--grid-color) 1px, transparent 1px)',
        'dots': 'radial-gradient(var(--dot-color) 1px, transparent 1px)',
        'lines': 'repeating-linear-gradient(-45deg, var(--line-color), var(--line-color) 1px, transparent 1px, transparent 6px)',
      },
    },
  },
  plugins: [
    function({ addUtilities }) {
      addUtilities({
        '.texture-noise': {
          '@apply relative': {},
          '&::before': {
            content: '""',
            'position': 'absolute',
            'inset': '0',
            'background-image': 'var(--noise)',
            'opacity': '0.4',
            'mix-blend-mode': 'overlay',
          },
        },
        '.texture-grid': {
          'background-size': '20px 20px',
          '--grid-color': 'rgba(255, 255, 255, 0.1)',
        },
        '.texture-dots': {
          'background-size': '20px 20px',
          '--dot-color': 'rgba(255, 255, 255, 0.2)',
        },
        '.texture-lines': {
          '--line-color': 'rgba(255, 255, 255, 0.1)',
        },
      });
    },
  ],
};