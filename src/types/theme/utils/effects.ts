import { CSSValue } from './css';
import { Duration, EasingFunction } from './animation';

/**
 * Defines the structure for glass effect styles, animations, hover behaviors,
 * and gradient configurations within your theme.
 */
export interface ThemeEffects {
  /**
   * Glass styling configuration.
   */
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
    shadow_composition?: {
      offset_y: string;
      blur_radius: string;
      spread_radius: string;
      opacity: number;
    };
  };

  /**
   * Animation presets for timing and curves.
   */
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

  /**
   * Hover effects configuration, including glow and shadow behaviors.
   */
  hover?: {
    scale: number;
    lift: CSSValue;
    glow_strength: string;
    transition_duration: Duration;
    glow_color?: string;
    glow_opacity?: number;
    glow_spread?: string;
    glow_blur?: string;
    shadow_normal?: string;
    shadow_hover?: string;
  };

  /**
   * Gradient configurations with predefined combinations.
   */
  gradients?: {
    gray_combinations: Array<{
      start: string;
      end: string;
    }>;
    opacity_levels: number[];
  };
}