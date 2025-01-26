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
  className: "transition-all duration-500 overflow-hidden",
  style: {
    position: 'relative',
    transition: 'all 0.5s ease',
    '&::before': {
      content: '""',
      position: 'absolute',
      top: '0',
      left: '-100%',
      width: '100%',
      height: '2px',
      background: 'linear-gradient(90deg, transparent, var(--theme-colors-cyber-cyan))',
      transition: 'left 0.5s ease',
    },
  },
  hoverStyle: {
    '&::before': {
      left: '100%',
    },
  },
};

const glitchEffect: HoverEffect = {
  className: "transition-all duration-300",
  style: {
    position: 'relative',
    transition: 'all 0.3s ease',
  },
  hoverStyle: {
    transform: 'translate(2px, -2px)',
    '&::before': {
      content: '""',
      position: 'absolute',
      top: '0',
      left: '-2px',
      width: 'calc(100% + 4px)',
      height: '100%',
      background: 'var(--theme-colors-cyber-purple)',
      opacity: '0.5',
      clipPath: 'polygon(0 0, 100% 0, 100% 45%, 0 45%)',
    },
    '&::after': {
      content: '""',
      position: 'absolute',
      bottom: '0',
      left: '2px',
      width: 'calc(100% - 4px)',
      height: '100%',
      background: 'var(--theme-colors-cyber-cyan)',
      opacity: '0.5',
      clipPath: 'polygon(0 55%, 100% 55%, 100% 100%, 0 100%)',
    },
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