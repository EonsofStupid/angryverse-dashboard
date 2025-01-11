// Base Types
export type ThemeMode = 'light' | 'dark' | 'system';
export type ThemeStatus = 'active' | 'inactive' | 'draft';
export type EffectPriority = 'database' | 'fallback' | 'hybrid';

// Theme Configuration Types
export interface ThemeConfiguration {
  colors: ThemeColors;
  typography: ThemeTypography;
  effects: ThemeEffects;
  gray_palette?: GrayPalette;
  effects_details?: EffectsDetails;
}

export interface ThemeColors {
  cyber: {
    dark: string;
    pink: {
      DEFAULT: string;
      hover: string;
    };
    cyan: {
      DEFAULT: string;
      hover: string;
    };
    purple: string;
    green: {
      DEFAULT: string;
      hover: string;
    };
    yellow: {
      DEFAULT: string;
      hover: string;
    };
  };
}

export interface GrayPalette {
  neutral: string;
  soft: string;
  medium: string;
  light: string;
  silver: string;
  dark: string;
  mid: string;
}

export interface ThemeTypography {
  fonts: {
    sans: string[];
    cyber: string[];
  };
}

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
  transition_duration: string;
  timing_function: string;
  shadow_normal: string;
  shadow_hover: string;
}

export interface GradientEffects {
  gray_combinations: Array<{
    start: string;
    end: string;
  }>;
  opacity_levels: number[];
}

export interface EffectsDetails {
  glass: GlassEffects;
  hover: HoverEffects;
  gradients: GradientEffects;
}

export interface ThemeEffects {
  glass: GlassEffects;
  hover?: HoverEffects;
  gradients?: GradientEffects;
}

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