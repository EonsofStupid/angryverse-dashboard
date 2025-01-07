import plugin from 'tailwindcss/plugin';

export const glassPlugin = plugin(
  function({ addUtilities }) {
    addUtilities({
      '.glass': {
        '@apply backdrop-blur-[var(--glass-blur)] relative overflow-hidden': {},
        'background': 'var(--glass-bg)',
        'border': 'var(--glass-border)',
        '&::before': {
          content: '""',
          '@apply absolute inset-0 pointer-events-none': {},
          background: 'var(--glass-gradient)',
        },
        '&::after': {
          content: '""',
          '@apply absolute inset-0 pointer-events-none': {},
          background: 'var(--glass-shine)',
          animation: 'shine 3s ease-in-out infinite',
        },
      },
      '.glass-card': {
        '@apply glass rounded-lg p-6 transition-all duration-300': {},
        'box-shadow': '0 8px 32px rgba(0, 0, 0, 0.1)',
      },
    });
  }
);