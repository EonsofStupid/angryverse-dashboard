// Base Types
export type ThemeMode = 'light' | 'dark' | 'system';
export type ThemeStatus = 'active' | 'inactive' | 'draft';
export type EffectPriority = 'database' | 'fallback' | 'hybrid';

// Theme Configuration Types
export interface ThemeConfiguration {
  colors: ThemeColors;
  typography: ThemeTypography;
  effects: ThemeEffects;
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

export interface ThemeTypography {
  fonts: {
    sans: string[];
    cyber: string[];
  };
}

export interface ThemeEffects {
  glass: GlassEffects;
  glow?: GlowEffects;
  matrix?: MatrixEffects;
}

// Effect Types
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
}

export interface GlowEffects {
  strengths: {
    sm: string;
    md: string;
    lg: string;
  };
  colors: {
    primary: string;
    secondary: string;
    accent: string;
  };
  animation: {
    pulse_opacity: number;
    pulse_scale: number;
    pulse_duration: string;
  };
}

export interface MatrixEffects {
  core: {
    speed: string;
    density: number;
    direction: 'up' | 'down' | 'left' | 'right';
    scale: number;
  };
  visual: {
    color_primary: string;
    color_secondary: string;
    opacity: number;
    blur: string;
    glow_strength: string;
  };
  characters: {
    charset: string;
    font_size: string;
    font_weight: number;
  };
  animation: {
    stagger: string;
    fade_distance: string;
    trail_length: number;
  };
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