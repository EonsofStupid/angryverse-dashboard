import { CSSProperties } from 'react';

export type HoverEffect = {
  className: string;
  style: CSSProperties;
  hoverStyle: CSSProperties;
};

const glowEffect: HoverEffect = {
  className: "transition-all duration-300",
  style: {
    position: 'relative',
    transition: 'all 0.3s ease',
  },
  hoverStyle: {
    filter: 'drop-shadow(0 0 15px var(--theme-colors-cyber-pink))',
    transform: 'translateY(-2px)',
  },
};

const pulseEffect: HoverEffect = {
  className: "transition-all duration-300",
  style: {
    position: 'relative',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  },
  hoverStyle: {
    transform: 'scale(1.05)',
    animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
  },
};

const neonTraceEffect: HoverEffect = {
  className: "transition-all duration-500 overflow-hidden neon-trace-effect",
  style: {
    position: 'relative',
    transition: 'all 0.5s ease',
  },
  hoverStyle: {
    transform: 'translateY(-2px)',
  },
};

const glitchEffect: HoverEffect = {
  className: "transition-all duration-300 glitch-effect",
  style: {
    position: 'relative',
    transition: 'all 0.3s ease',
  },
  hoverStyle: {
    transform: 'translate(2px, -2px)',
  },
};

export const hoverEffects = [
  glowEffect,
  pulseEffect,
  neonTraceEffect,
  glitchEffect,
];

export const getRandomHoverEffect = (): HoverEffect => {
  const randomIndex = Math.floor(Math.random() * hoverEffects.length);
  return hoverEffects[randomIndex];
};