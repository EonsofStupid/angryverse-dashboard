import { CSSProperties } from 'react';

export interface GlassEffect {
  background: string;
  blur: string;
  border: string;
  opacity: number;
  shadow?: string;
}

export interface GlassEffectConfig {
  intensity?: number;
  color?: string;
  borderOpacity?: number;
  shadowIntensity?: number;
}