import { Config } from 'tailwindcss';
import { CursorEffectState } from './types/cursor';

const defaultCursorState: CursorEffectState = {
  enabled: true,
  priority: 'database',
  source: 'database',
  type: 'follow',
  size: '20px',
  color: 'rgba(255, 255, 255, 0.8)',
  delay: '0ms',
  opacity: 0.8,
  blur: '0px',
  zIndex: 9999,
  
  follow: {
    smoothing: 0.15,
    acceleration: 0.1,
  },
  
  trail: {
    length: 8,
    spacing: '5px',
    fade_duration: '300ms',
    decay: 0.95,
  },
  
  spotlight: {
    radius: '100px',
    intensity: 0.5,
    gradient: true,
    blend_mode: 'overlay',
  },
  
  ripple: {
    scale: 3,
    duration: '600ms',
    spread: '50px',
    initial_opacity: 0.3,
  },
};

export const cursorEffects: Partial<Config> = {
  theme: {
    extend: {
      cursor: {
        none: 'none',
      },
    },
  },
  plugins: [
    function({ addUtilities, theme }) {
      const utilities = {
        '.cursor-follow': {
          cursor: 'none',
          '&::after': {
            content: '""',
            position: 'fixed',
            width: 'var(--cursor-size)',
            height: 'var(--cursor-size)',
            backgroundColor: 'var(--cursor-color)',
            borderRadius: '50%',
            pointerEvents: 'none',
            zIndex: 'var(--cursor-z-index)',
            opacity: 'var(--cursor-opacity)',
            filter: 'blur(var(--cursor-blur))',
            transform: 'translate(-50%, -50%)',
            transition: 'all var(--cursor-delay) var(--animation-timing-ease-out)',
          },
        },
        '.cursor-trail': {
          cursor: 'none',
          '& .trail-dot': {
            position: 'fixed',
            pointerEvents: 'none',
            zIndex: 'var(--cursor-z-index)',
          },
        },
        '.cursor-spotlight': {
          cursor: 'none',
          '&::after': {
            content: '""',
            position: 'fixed',
            width: 'var(--spotlight-radius)',
            height: 'var(--spotlight-radius)',
            background: 'radial-gradient(circle, var(--cursor-color) 0%, transparent 70%)',
            pointerEvents: 'none',
            zIndex: 'var(--cursor-z-index)',
            opacity: 'var(--cursor-opacity)',
            mixBlendMode: 'var(--spotlight-blend)',
            transform: 'translate(-50%, -50%)',
          },
        },
        '.cursor-ripple': {
          cursor: 'none',
          '& .ripple': {
            position: 'fixed',
            borderRadius: '50%',
            pointerEvents: 'none',
            zIndex: 'var(--cursor-z-index)',
            animation: 'ripple var(--ripple-duration) var(--animation-timing-ease-out)',
          },
        },
      };
      
      addUtilities(utilities);
    },
  ],
};