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
  animations?: {
    timing: {
      fast: string;
      normal: string;
      slow: string;
      very_slow: string;
    };
    curves: {
      linear: string;
      ease_out: string;
      ease_in: string;
      ease_in_out: string;
    };
  };
  hover?: {
    scale: number;
    lift: string;
    glow_strength: string;
    transition_duration: string;
  };
  card?: {
    background_opacity: number;
    hover_opacity: number;
    shadow: string;
    hover_shadow: string;
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
