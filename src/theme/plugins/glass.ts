import plugin from 'tailwindcss/plugin';

export const glassPlugin = plugin(
  function({ addUtilities }) {
    addUtilities({
      '.glass': {
        '@apply backdrop-blur-[var(--theme-glass-blur)] relative overflow-hidden': {},
        'background': 'var(--theme-glass-background)',
        'border': 'var(--theme-glass-border)',
      },
    });
  }
);