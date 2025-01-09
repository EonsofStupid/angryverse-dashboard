import { CSSValue } from './css';
import { Duration, EasingFunction } from './animation';

export interface ThemeEffects {
  glass: {
    background: string;
    blur: string;
    border: string;
    blur_levels?: string[];
    opacity_levels?: number[];
    border_styles?: {
      light: string;
      medium: string;
      heavy: string;
    };
  };
  animations?: {
    timing: {
      fast: Duration;
      normal: Duration;
      slow: Duration;
      very_slow: Duration;
    };
    curves: {
      linear: EasingFunction;
      ease_out: EasingFunction;
      ease_in: EasingFunction;
      ease_in_out: EasingFunction;
    };
  };
  hover?: {
    scale: number;
    lift: CSSValue;
    glow_strength: string;
    transition_duration: Duration;
    glow_color?: string;
    glow_opacity?: number;
    glow_spread?: string;
    glow_blur?: string;
  };
  card?: {
    background_opacity: number;
    hover_opacity: number;
    shadow: string;
    hover_shadow: string;
  };
}