import type { EffectState } from '../state';
import type { CSSColor, CSSValue } from '../css';

export interface GlassEffects extends EffectState {
  background: string;
  blur: string;
  border: string;
  shadow_composition?: {
    offset_y: CSSValue;
    blur_radius: CSSValue;
    spread_radius: CSSValue;
    opacity: number;
  };
  blur_levels?: string[];
  opacity_levels?: number[];
  border_styles?: {
    light: string;
    medium: string;
    heavy: string;
  };
}