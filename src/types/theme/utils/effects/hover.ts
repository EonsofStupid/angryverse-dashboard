import type { EffectState } from '../state';
import type { CSSValue, CSSColor, Duration } from '../css';

export interface HoverEffects extends EffectState {
  scale: number;
  lift: CSSValue;
  glow_strength: CSSValue;
  transition_duration: Duration;
  glow_color: CSSColor;
  glow_opacity: number;
  glow_spread: CSSValue;
  glow_blur: CSSValue;
  shadow_normal: string;
  shadow_hover: string;
}