import { EffectState, CSSValue, CSSColor, Duration } from '@/types/theme';

export type CursorEffectType = 'follow' | 'trail' | 'spotlight' | 'ripple';

export interface CursorEffectState extends EffectState {
  type: CursorEffectType;
  size: CSSValue;
  color: CSSColor;
  delay: Duration;
  opacity: number;
  blur: CSSValue;
  zIndex: number;
  
  // Follow specific options
  follow: {
    smoothing: number;
    acceleration: number;
    magnetic_radius?: CSSValue;
  };
  
  // Trail specific options
  trail: {
    length: number;
    spacing: CSSValue;
    fade_duration: Duration;
    decay: number;
  };
  
  // Spotlight specific options
  spotlight: {
    radius: CSSValue;
    intensity: number;
    gradient: boolean;
    blend_mode: string;
  };
  
  // Ripple specific options
  ripple: {
    scale: number;
    duration: Duration;
    spread: CSSValue;
    initial_opacity: number;
  };
}