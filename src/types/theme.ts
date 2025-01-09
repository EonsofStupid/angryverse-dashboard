// Base Types
export type ThemeMode = 'light' | 'dark' | 'system';
export type ThemeStatus = 'active' | 'inactive' | 'draft';
export type EffectPriority = 'database' | 'fallback' | 'hybrid';

// CSS & Style Types
export type CSSUnit = 'px' | 'rem' | 'em' | 'vh' | 'vw' | '%';
export type CSSValue<T extends CSSUnit = 'px'> = `${number}${T}`;
export type CSSColor = `#${string}` | `rgb(${number}, ${number}, ${number})` | `rgba(${number}, ${number}, ${number}, ${number})`;
export type TimingFunction = 'linear' | 'ease' | 'ease-in' | 'ease-out' | 'ease-in-out' | `cubic-bezier(${number}, ${number}, ${number}, ${number})`;
export type Duration = `${number}ms` | `${number}s`;

// Effect Base State
export interface EffectState {
  enabled: boolean;
  priority: EffectPriority;
  source: 'database' | 'fallback';
}

// Glass Effect
export interface GlassEffects extends EffectState {
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

// Glow Effect
export interface GlowEffects extends EffectState {
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

// Matrix Effect
export interface MatrixEffects extends EffectState {
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

// Theme Colors
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

// Theme Typography
export interface ThemeTypography {
  fonts: {
    sans: string[];
    cyber: string[];
  };
}

// Theme Effects
export interface ThemeEffects {
  glass: GlassEffects;
  glow?: GlowEffects;
  matrix?: MatrixEffects;
}

// Theme Configuration
export interface ThemeConfiguration {
  colors: ThemeColors;
  typography: ThemeTypography;
  effects: ThemeEffects;
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

// Database Theme Type
export interface DatabaseTheme extends Omit<Theme, 'configuration'> {
  configuration: Record<string, any> | string;
  advanced_effects?: Record<string, any> | string;
}

// Type Guards and Validation
export function isThemeConfiguration(obj: any): obj is ThemeConfiguration {
  return (
    obj &&
    typeof obj === 'object' &&
    'colors' in obj &&
    'typography' in obj &&
    'effects' in obj &&
    obj.effects &&
    typeof obj.effects === 'object' &&
    'glass' in obj.effects
  );
}

// Conversion Utility
export function convertDatabaseTheme(dbTheme: DatabaseTheme): Theme {
  // Parse configuration if it's a string
  const configuration = typeof dbTheme.configuration === 'string'
    ? JSON.parse(dbTheme.configuration)
    : dbTheme.configuration;

  if (!isThemeConfiguration(configuration)) {
    throw new Error('Invalid theme configuration structure');
  }

  // Ensure effect state properties are present
  if (!configuration.effects.glass.enabled) {
    configuration.effects.glass = {
      enabled: true,
      priority: 'database' as const,
      source: 'database' as const,
      ...configuration.effects.glass
    };
  }

  return {
    ...dbTheme,
    configuration
  };
}

// CSS Variable Mapping Types
export type ThemeVariableMap = {
  [K in keyof ThemeConfiguration]: K extends 'effects'
    ? {
        [E in keyof ThemeConfiguration['effects']]: `--theme-${string}`;
      }
    : `--theme-${string}`;
};

// Utility Types for Theme Operations
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

export type ThemeUpdate = DeepPartial<ThemeConfiguration>;

export type ThemeValidator = {
  [K in keyof ThemeConfiguration]: (value: ThemeConfiguration[K]) => boolean;
};
