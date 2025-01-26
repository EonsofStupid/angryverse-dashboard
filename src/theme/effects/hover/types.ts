import { CSSProperties } from 'react';

export type HoverEffectName = 'glow' | 'pulse' | 'neonTrace' | 'glitch';

export type HoverEffect = {
  name: HoverEffectName;
  className: string;
  style: CSSProperties;
  hoverStyle: CSSProperties;
};

export type HoverEffectConfig = {
  intensity?: number;
  color?: string;
  duration?: number;
  delay?: number;
};