import plugin from 'tailwindcss/plugin';

export const glassPlugin = plugin(
  function({ addUtilities }) {
    addUtilities({
      '.glass': {
        '@apply backdrop-blur-[var(--glass-blur)] bg-white/[var(--glass-opacity)] border-[var(--glass-border)] shadow-lg relative overflow-hidden': {},
        '&::before': {
          content: '""',
          '@apply absolute inset-0 pointer-events-none': {},
          background: 'linear-gradient(to right bottom, var(--glass-gradient-start), var(--glass-gradient-end))',
        },
        '&::after': {
          content: '""',
          '@apply absolute inset-0 pointer-events-none': {},
          background: 'linear-gradient(45deg, transparent 45%, var(--glass-shine) 50%, transparent 55%)',
          animation: 'shine 3s ease-in-out infinite',
        },
      },
      '.glass-card': {
        '@apply glass rounded-lg p-6 transition-all duration-300 hover:shadow-lg': {},
      },
    });
  },
  {
    theme: {
      extend: {
        keyframes: {
          shine: {
            '0%': { transform: 'translateX(-100%)' },
            '100%': { transform: 'translateX(100%)' },
          },
        },
      },
    },
  }
);