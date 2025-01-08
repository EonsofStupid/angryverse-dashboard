import { Config } from "tailwindcss";

export const specialEffects: Partial<Config> = {
  theme: {
    extend: {
      keyframes: {
        'cyberpunk-glitch': {
          '0%, 100%': { 
            'clip-path': 'inset(50% 0 50% 0)',
            transform: 'skew(0deg)',
          },
          '20%': { 
            'clip-path': 'inset(0% 0 0% 0)',
            transform: 'skew(10deg)',
          },
          '40%': { 
            'clip-path': 'inset(0% 50% 0% 50%)',
            transform: 'skew(-10deg)',
          },
        },
        'neon-flicker': {
          '0%, 100%': { 
            'text-shadow': '0 0 7px #fff, 0 0 10px #fff, 0 0 21px var(--neon-color), 0 0 42px var(--neon-color)',
          },
          '50%': { 
            'text-shadow': '0 0 4px #fff, 0 0 7px #fff, 0 0 13px var(--neon-color), 0 0 28px var(--neon-color)',
          },
        },
        'matrix-rain': {
          '0%': { transform: 'translateY(-100%)', opacity: '1' },
          '100%': { transform: 'translateY(100%)', opacity: '0' },
        },
        'hologram-scan': {
          '0%': { transform: 'translateY(-100%) rotate(45deg)', opacity: '0' },
          '50%': { opacity: '0.5' },
          '100%': { transform: 'translateY(100%) rotate(45deg)', opacity: '0' },
        },
      },
    },
  },
  plugins: [
    function({ addUtilities }) {
      addUtilities({
        '.cyberpunk': {
          'position': 'relative',
          '&::before, &::after': {
            content: 'attr(data-text)',
            'position': 'absolute',
            'left': '0',
            'animation': 'cyberpunk-glitch 3s infinite linear alternate-reverse',
          },
          '&::before': {
            'clip-path': 'polygon(0 0, 100% 0, 100% 45%, 0 45%)',
            'transform': 'translate(-2px)',
            'color': 'var(--glitch-color-1)',
          },
          '&::after': {
            'clip-path': 'polygon(0 55%, 100% 55%, 100% 100%, 0 100%)',
            'transform': 'translate(2px)',
            'color': 'var(--glitch-color-2)',
          },
        },
        '.neon': {
          '--neon-color': 'var(--primary)',
          'animation': 'neon-flicker 1.5s infinite alternate',
        },
        '.matrix': {
          'position': 'relative',
          'overflow': 'hidden',
          '&::before': {
            content: '""',
            'position': 'absolute',
            'top': '0',
            'width': '2px',
            'height': '100%',
            'background': 'var(--matrix-color, #0f0)',
            'animation': 'matrix-rain 2s linear infinite',
          },
        },
        '.hologram': {
          'position': 'relative',
          'overflow': 'hidden',
          '&::before': {
            content: '""',
            'position': 'absolute',
            'inset': '0',
            'background': 'linear-gradient(45deg, transparent 45%, var(--hologram-color, rgba(0, 255, 255, 0.5)) 50%, transparent 55%)',
            'animation': 'hologram-scan 3s linear infinite',
          },
        },
      });
    },
  ],
};