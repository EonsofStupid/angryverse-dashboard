import type { EffectState } from '../state';

export interface GlassEffects extends EffectState {
  background: string;
  blur: string;
  border: string;
  shadow_composition: {
    offset_y: string;
    blur_radius: string;
    spread_radius: string;
    opacity: number;
  };
}