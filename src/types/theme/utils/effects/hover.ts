import type { EffectState } from '../state';
import type { CSSColor, CSSValue, Duration } from '../css';

export interface HoverEffects extends EffectState {
  scale: number;
  lift: CSSValue;
  glow_strength: string;
  transition_duration: Duration;
  glow_color?: CSSColor;
  glow_opacity?: number;
  glow_spread?: string;
  glow_blur?: string;
  shadow_normal?: string;
  shadow_hover?: string;
}