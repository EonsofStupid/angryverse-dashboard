import { CSSValue } from '../css';
import type { EffectState } from '../state';

export interface GlassShadowComposition {
  offset_y: CSSValue;
  blur_radius: CSSValue;
  spread_radius: CSSValue;
  opacity: number;
}

export interface GlassEffects extends EffectState {
  background: string;
  blur: string;
  border: string;
  shadow_composition: GlassShadowComposition;
}