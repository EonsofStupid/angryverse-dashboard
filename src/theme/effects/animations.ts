import { Config } from "tailwindcss";

export const animationEffects: Partial<Config> = {
  theme: {
    extend: {
      keyframes: {
        'float': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        'pulse-glow': {
          '0%, 100%': { 
            boxShadow: '0 0 5px var(--glow-color, rgba(255,255,255,0.5)), 0 0 10px var(--glow-color, rgba(255,255,255,0.5))',
          },
          '50%': { 
            boxShadow: '0 0 20px var(--glow-color, rgba(255,255,255,0.5)), 0 0 30px var(--glow-color, rgba(255,255,255,0.5))',
          },
        },
        'glitch': {
          '0%': { transform: 'translate(0)' },
          '20%': { transform: 'translate(-2px, 2px)' },
          '40%': { transform: 'translate(-2px, -2px)' },
          '60%': { transform: 'translate(2px, 2px)' },
          '80%': { transform: 'translate(2px, -2px)' },
          '100%': { transform: 'translate(0)' },
        },
        'matrix': {
          '0%': { transform: 'translateY(0)', opacity: '1' },
          '100%': { transform: 'translateY(100vh)', opacity: '0' },
        },
        'hologram': {
          '0%, 100%': { opacity: '1', filter: 'hue-rotate(0deg)' },
          '50%': { opacity: '0.8', filter: 'hue-rotate(180deg)' },
        },
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
        'glitch': 'glitch 0.3s ease-in-out infinite',
        'matrix': 'matrix 10s linear infinite',
        'hologram': 'hologram 3s ease-in-out infinite',
      },
    },
  },
  plugins: [
    function({ addUtilities }) {
      addUtilities({
        '.hover-lift': {
          '@apply transition-transform duration-300': {},
          '&:hover': {
            '@apply -translate-y-2': {},
          },
        },
        '.hover-glow': {
          '@apply transition-all duration-300': {},
          '&:hover': {
            '@apply shadow-lg': {},
            '--glow-color': 'var(--primary)',
          },
        },
        '.parallax': {
          'transform-style': 'preserve-3d',
          'perspective': '1000px',
        },
      });
    },
  ],
};