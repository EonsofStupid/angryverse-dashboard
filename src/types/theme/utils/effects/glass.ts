import { CSSValue } from '../css';

export type FrostLevel = 0.1 | 0.2 | 0.3 | 0.4 | 0.5;
export type ReflectionStrength = 0.1 | 0.2 | 0.3;

export interface GlassEffects {
  background: string;
  blur: string;
  border: string;
  frost_levels: FrostLevel[];
  reflection_strength: ReflectionStrength[];
  shadow_composition?: {
    offset_y: CSSValue;
    blur_radius: CSSValue;
    spread_radius: CSSValue;
    opacity: number;
  };
}