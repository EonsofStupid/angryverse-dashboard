import plugin from 'tailwindcss/plugin';

export const themePlugin = plugin(
  function({ addUtilities }) {
    addUtilities({
      '.theme-transition': {
        'transition-property': 'background-color, border-color, color, fill, stroke',
        'transition-timing-function': 'cubic-bezier(0.4, 0, 0.2, 1)',
        'transition-duration': '150ms',
      },
    });
  }
);