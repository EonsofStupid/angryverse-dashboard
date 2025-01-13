import { z } from 'zod';

// Base Types
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

// Effect State
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

// Glass Effects
export interface GlassEffects extends BaseEffectState {
  background: string;
  blur: string;
  border: string;
  shadow_composition: {
    offset_y: string;
    blur_radius: string;
    spread_radius: string;
    opacity: number;
  };
  blur_levels: string[];
  opacity_levels: number[];
  border_styles: {
    light: string;
    medium: string;
    heavy: string;
  };
}

// Hover Effects
export interface HoverEffects extends BaseEffectState {
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

// Motion Tokens
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

// Theme Effects
export interface ThemeEffects {
  // Base Effects (Required)
  glass: GlassEffects;
  hover: HoverEffects;
  animations: AnimationEffects;

  // Advanced Effects (Required)
  interaction_tokens: InteractionTokens;
  special_effect_tokens: SpecialEffectTokens;
  motion_tokens: MotionTokens;

  // Effect State
  enabled: boolean;
  priority: EffectPriority;
  source: EffectSource;
}

// Theme Configuration Interface
export interface ThemeConfiguration {
  colors: ThemeColors;
  typography: ThemeTypography;
  effects: ThemeEffects;
  
  // Advanced Configuration
  advanced_effects?: {
    glass?: {
      types: ('frosted' | 'tinted' | 'reflective' | 'patterned')[];
      frost_levels: number[];
      tint_colors: ('primary' | 'secondary' | 'accent')[];
      reflection_strength: number[];
      patterns: ('dots' | 'lines' | 'grid' | 'noise')[];
    };
    animations?: {
      hover: ('scale' | 'glow' | 'lift' | 'shine')[];
      loading: ('pulse' | 'spin' | 'bounce' | 'shimmer')[];
      page_transitions: ('fade' | 'slide' | 'zoom' | 'flip')[];
    };
  };
  
  // Effect Details
  effects_details?: {
    glass?: {
      blur_levels: string[];
      background_opacity: number;
      border_opacity: number;
      shadow_composition: {
        offset_y: string;
        blur_radius: string;
        spread_radius: string;
        opacity: number;
      };
    };
    hover?: {
      scale: number;
      transition_duration: string;
      timing_function: string;
      shadow_normal: string;
      shadow_hover: string;
    };
  };
}

// Complete Theme Interface
export interface Theme {
  id: string;
  name: string;
  description: string;
  is_default: boolean;
  status: 'active' | 'draft' | 'archived';
  configuration: ThemeConfiguration;
  advanced_effects?: Record<string, unknown>;
  effects_details?: Record<string, unknown>;
  created_by?: string;
  created_at: string;
  updated_at: string;
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
      border: z.string(),
      shadow_composition: z.object({
        offset_y: z.string(),
        blur_radius: z.string(),
        spread_radius: z.string(),
        opacity: z.number()
      }),
      blur_levels: z.array(z.string()),
      opacity_levels: z.array(z.number()),
      border_styles: z.object({
        light: z.string(),
        medium: z.string(),
        heavy: z.string()
      })
    }),
    hover: z.object({
      enabled: z.boolean(),
      priority: z.enum(['database', 'fallback', 'hybrid']),
      source: z.enum(['database', 'fallback']),
      scale: z.number(),
      lift: z.string(),
      glow_strength: z.string(),
      transition_duration: z.string(),
      glow_color: z.string(),
      glow_opacity: z.number(),
      glow_spread: z.string(),
      glow_blur: z.string(),
      shadow_normal: z.string(),
      shadow_hover: z.string()
    }),
    animations: z.object({
      enabled: z.boolean(),
      priority: z.enum(['database', 'fallback', 'hybrid']),
      source: z.enum(['database', 'fallback']),
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
    }),
    interaction_tokens: z.object({
      hover: z.object({
        lift_distances: z.array(z.string()),
        scale_values: z.array(z.number()),
        transition_curves: z.array(z.string()),
        shadow_levels: z.array(z.string())
      }),
      magnetic: z.object({
        strength_levels: z.array(z.number()),
        radius_values: z.array(z.number()),
        smoothing_values: z.array(z.number())
      }),
      tilt: z.object({
        max_tilt_values: z.array(z.number()),
        perspective_values: z.array(z.number()),
        scale_values: z.array(z.number())
      })
    })
  })
});
