import { HoverEffect, HoverEffectName, HoverEffectConfig } from './types';

const defaultEffects: Record<HoverEffectName, HoverEffect> = {
  glow: {
    name: 'glow',
    className: 'hover-effect hover-glow',
    style: {
      position: 'relative',
      transition: 'all 0.3s ease',
    },
    hoverStyle: {
      filter: 'drop-shadow(0 0 10px var(--theme-colors-cyber-pink))',
    },
  },
  pulse: {
    name: 'pulse',
    className: 'hover-effect hover-pulse',
    style: {
      position: 'relative',
      transition: 'all 0.3s ease',
    },
    hoverStyle: {
      transform: 'scale(1.05)',
    },
  },
  neonTrace: {
    name: 'neonTrace',
    className: 'hover-effect hover-neon-trace',
    style: {
      position: 'relative',
      overflow: 'hidden',
    },
    hoverStyle: {},
  },
  glitch: {
    name: 'glitch',
    className: 'hover-effect hover-glitch',
    style: {
      position: 'relative',
    },
    hoverStyle: {},
  },
};

export const getHoverEffect = (name: HoverEffectName, config?: HoverEffectConfig): HoverEffect => {
  const effect = { ...defaultEffects[name] };
  
  if (config) {
    if (config.color) {
      effect.style = {
        ...effect.style,
        '--glow-color': config.color,
      } as React.CSSProperties;
    }
    
    if (config.duration) {
      effect.style.transition = `all ${config.duration}ms ease`;
    }
  }
  
  return effect;
};

export const getRandomHoverEffect = (seed?: string): HoverEffect => {
  const effects = Object.values(defaultEffects);
  if (seed) {
    const seedNumber = seed.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return effects[seedNumber % effects.length];
  }
  return effects[Math.floor(Math.random() * effects.length)];
};