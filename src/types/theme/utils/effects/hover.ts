import { CSSValue } from '../css';
import { Duration } from '../animation';

export interface ShadowComposition {
  offset_y: CSSValue;
  blur_radius: CSSValue;
  spread_radius: CSSValue;
  opacity: number;
}

export interface HoverEffects {
  scale: number;
  transition_duration: Duration;
  shadow_normal: string;
  shadow_hover: string;
  shadow_composition: ShadowComposition;
}