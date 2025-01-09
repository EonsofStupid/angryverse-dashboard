import { Config } from 'tailwindcss';
import { MagneticEffectState } from './types/magnetic';

const defaultMagneticState: MagneticEffectState = {
  enabled: true,
  priority: 'database',
  source: 'database',
  strength: 0.5,
  radius: '100px',
  smoothing: 0.15,
  
  animation: {
    duration: '300ms',
    easing: 'cubic-bezier(0.33, 1, 0.68, 1)',
    reset_duration: '200ms',
  },
  
  transform: {
    scale: 1.1,
    rotation: 5,
    perspective: '1000px',
    origin: 'center',
  },
  
  boundaries: {
    min_distance: '10px',
    max_distance: '200px',
    threshold: 0.1,
  },
  
  interaction: {
    hover_scale: 1.05,
    click_effect: true,
    momentum: true,
    resistance: 0.2,
  },
};

export const magneticEffects: Partial<Config> = {
  theme: {
    extend: {
      animation: {
        magnetic: 'magnetic var(--magnetic-duration) var(--magnetic-easing)',
      },
    },
  },
  plugins: [
    function({ addUtilities, theme }) {
      const utilities = {
        '.magnetic': {
          '--magnetic-strength': 'var(--theme-magnetic-strength)',
          '--magnetic-radius': 'var(--theme-magnetic-radius)',
          '--magnetic-duration': 'var(--theme-magnetic-duration)',
          '--magnetic-easing': 'var(--theme-magnetic-easing)',
          transform: 'translate(0, 0) scale(1) rotate(0deg)',
          transition: 'transform var(--magnetic-duration) var(--magnetic-easing)',
          '&:hover': {
            transform: 'scale(var(--magnetic-hover-scale))',
          },
        },
      };
      
      addUtilities(utilities);
    },
  ],
};