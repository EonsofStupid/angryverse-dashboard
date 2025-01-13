// Core imports
import { z } from 'zod';

// CSS & Style Types
export type CSSUnit = 'px' | 'rem' | 'em' | 'vh' | 'vw' | '%';
export type CSSValue<T extends CSSUnit = 'px'> = `${number}${T}`;
export type HSLValue = `${number} ${number}% ${number}%`;
export type CSSVariable = `var(--${string})`;
export type Duration = `${number}${'ms' | 's'}`;
export type TimingFunction = 
  | 'linear' 
  | 'ease' 
  | 'ease-in' 
  | 'ease-out' 
  | 'ease-in-out' 
  | `cubic-bezier(${number},${number},${number},${number})`;

export type CSSColor = 
  | `#${string}` 
  | `rgb(${number}, ${number}, ${number})`
  | `rgba(${number}, ${number}, ${number}, ${number})`
  | `hsl(${HSLValue})`
  | `hsla(${HSLValue}, ${number})`
  | CSSVariable;

// Base Effect State
export type EffectPriority = 'database' | 'fallback' | 'hybrid';
export type EffectSource = 'database' | 'fallback';

export interface BaseEffectState {
  enabled: boolean;
  priority: EffectPriority;
  source: EffectSource;
}

// Theme Colors
export interface ThemeColors {
  cyber: {
    dark: CSSColor;
    pink: {
      DEFAULT: CSSColor;
      hover: CSSColor;
    };
    cyan: {
      DEFAULT: CSSColor;
      hover: CSSColor;
    };
    purple: CSSColor;
    green: {
      DEFAULT: CSSColor;
      hover: CSSColor;
    };
    yellow: {
      DEFAULT: CSSColor;
      hover: CSSColor;
    };
  };
}

// Typography
export interface ThemeTypography {
  fonts: {
    sans: string[];
    cyber: string[];
  };
}

// Animation Types
export type AnimationDirection = 'normal' | 'reverse' | 'alternate' | 'alternate-reverse';
export type AnimationFillMode = 'none' | 'forwards' | 'backwards' | 'both';

export interface AnimationState extends BaseEffectState {
  direction: AnimationDirection;
  fillMode: AnimationFillMode;
  iterationCount: number | 'infinite';
  delay: Duration;
}

// Glass Effects
export interface GlassEffects extends BaseEffectState {
  background: string;
  blur: string;
  border: string;
  shadow_composition?: {
    offset_y: CSSValue;
    blur_radius: CSSValue;
    spread_radius: CSSValue;
    opacity: number;
  };
  blur_levels?: string[];
  opacity_levels?: number[];
  border_styles?: {
    light: string;
    medium: string;
    heavy: string;
  };
}

// Hover Effects
export interface HoverEffects extends BaseEffectState {
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

// Animation Effects
export interface AnimationEffects extends BaseEffectState {
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

// Special Effects
export interface SpecialEffectTokens extends BaseEffectState {
  glitch?: {
    intensity_levels: number[];
    frequency_values: number[];
    color_schemes: string[][];
  };
  neon?: {
    glow_sizes: string[];
    flicker_speeds: string[];
  };
  matrix?: {
    speed_levels: number[];
    density_values: number[];
  };
}

// Motion Effects
export interface MotionTokens extends BaseEffectState {
  paths?: {
    ease_curves: string[];
    preset_paths: string[];
  };
  scroll_triggers?: {
    thresholds: number[];
    animation_types: string[];
    directions: string[];
    distances: string[];
  };
}

// Interaction Tokens
export interface InteractionTokens extends BaseEffectState {
  hover?: {
    lift_distances: CSSValue[];
    scale_values: number[];
    transition_curves: string[];
    shadow_levels: string[];
  };
  magnetic?: {
    strength_levels: number[];
    radius_values: number[];
    smoothing_values: number[];
  };
  tilt?: {
    max_tilt_values: number[];
    perspective_values: number[];
    scale_values: number[];
  };
}

// Theme Effects
export interface ThemeEffects {
  glass: GlassEffects;
  hover: HoverEffects;
  animations: AnimationEffects;
  interaction_tokens?: InteractionTokens;
  special_effect_tokens?: SpecialEffectTokens;
  motion_tokens?: MotionTokens;
}

// Theme Configuration
export interface ThemeConfiguration {
  colors: ThemeColors;
  typography: ThemeTypography;
  effects: ThemeEffects;
}

// Theme Status
export type ThemeStatus = 'active' | 'inactive' | 'draft';

// Complete Theme Type
export interface Theme {
  id: string;
  name: string;
  description?: string;
  is_default: boolean;
  status: ThemeStatus;
  configuration: ThemeConfiguration;
  created_by?: string;
  created_at?: string;
  updated_at?: string;
}

// Validation Schema
export const themeConfigurationSchema = z.object({
  colors: z.object({
    cyber: z.object({
      dark: z.string(),
      pink: z.object({
        DEFAULT: z.string(),
        hover: z.string()
      }),
      cyan: z.object({
        DEFAULT: z.string(),
        hover: z.string()
      }),
      purple: z.string(),
      green: z.object({
        DEFAULT: z.string(),
        hover: z.string()
      }),
      yellow: z.object({
        DEFAULT: z.string(),
        hover: z.string()
      })
    })
  }),
  typography: z.object({
    fonts: z.object({
      sans: z.array(z.string()),
      cyber: z.array(z.string())
    })
  }),
  effects: z.object({
    glass: z.object({
      enabled: z.boolean(),
      priority: z.enum(['database', 'fallback', 'hybrid']),
      source: z.enum(['database', 'fallback']),
      background: z.string(),
      blur: z.string(),
      border: z.string()
    }),
    hover: z.object({
      enabled: z.boolean(),
      priority: z.enum(['database', 'fallback', 'hybrid']),
      source: z.enum(['database', 'fallback']),
      scale: z.number(),
      lift: z.string(),
      glow_strength: z.string(),
      transition_duration: z.string()
    }),
    animations: z.object({
      timing: z.object({
        fast: z.string(),
        normal: z.string(),
        slow: z.string(),
        very_slow: z.string()
      }),
      curves: z.object({
        linear: z.string(),
        ease_out: z.string(),
        ease_in: z.string(),
        ease_in_out: z.string()
      })
    })
  })
});

// Type Guards
export function isThemeConfiguration(obj: unknown): obj is ThemeConfiguration {
  if (!obj || typeof obj !== 'object') return false;
  
  const config = obj as ThemeConfiguration;
  
  return !!(
    config.colors?.cyber &&
    config.typography?.fonts &&
    config.effects?.glass &&
    config.effects?.hover &&
    config.effects?.animations
  );
}

// Utility Types
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

export type ThemeUpdate = DeepPartial<ThemeConfiguration>;

export type ThemeValidator = {
  [K in keyof ThemeConfiguration]: (value: ThemeConfiguration[K]) => boolean;
};