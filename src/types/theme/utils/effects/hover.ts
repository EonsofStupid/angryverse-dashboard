import type { EffectState } from '../state';

export interface HoverEffects extends EffectState {
  scale: number;
  lift: string;
  glow_strength: string;
  transition_duration: string;
  glow_color: string;
  glow_opacity: number;
  glow_spread: string;
  glow_blur: string;
  shadow_normal: string;
  shadow_hover: string;
}