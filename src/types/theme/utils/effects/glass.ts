import type { EffectState } from '../state';

export interface GlassShadowComposition {
  offset_y: string;
  blur_radius: string;
  spread_radius: string;
  opacity: number;
}

export interface GlassEffects extends EffectState {
  background: string;
  blur: string;
  border: string;
  shadow_composition: GlassShadowComposition;
  blur_levels?: string[];
  opacity_levels?: number[];
  border_styles?: {
    light: string;
    medium: string;
    heavy: string;
  };
}