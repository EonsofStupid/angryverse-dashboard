import { CSSColor, CSSValue } from './css';
import { Duration, TimingFunction } from './animation';
import type { HoverConfig } from './interactions';

export interface GlassEffects {
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
  shadow_composition?: {
    offset_y: string;
    blur_radius: string;
    spread_radius: string;
    opacity: number;
  };
}

export interface HoverEffects {
  scale: number;
  lift: string;
  glow_strength: string;
  transition_duration: Duration;
  glow_color?: CSSColor;
  glow_opacity?: number;
  glow_spread?: string;
  glow_blur?: string;
  shadow_normal?: string;
  shadow_hover?: string;
  config?: HoverConfig;
}

export interface AnimationEffects {
  timing: {
    fast: Duration;
    normal: Duration;
    slow: Duration;
    very_slow: Duration;
  };
  curves: {
    linear: TimingFunction;
    ease_out: TimingFunction;
    ease_in: TimingFunction;
    ease_in_out: TimingFunction;
  };
}

export interface GradientEffects {
  gray_combinations: Array<{
    start: CSSColor;
    end: CSSColor;
  }>;
  opacity_levels: number[];
}

export interface ThemeEffects {
  glass: GlassEffects;
  hover: HoverEffects;
  animations: AnimationEffects;
  gradients: GradientEffects;
}