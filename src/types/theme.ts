import type { Json } from '@/integrations/supabase/types';

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
    custom?: string;
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

export interface ThemeEffects {
  glass: GlassEffects;
  glow: GlowEffects;
  matrix: MatrixEffects;
}

export interface ThemeConfiguration {
  colors: ThemeColors;
  typography: ThemeTypography;
  effects: ThemeEffects;
}

export interface Theme {
  id: string;
  name: string;
  description?: string;
  is_default: boolean;
  status: 'active' | 'inactive' | 'draft';
  configuration: ThemeConfiguration;
  created_by?: string;
  created_at?: string;
  updated_at?: string;
}

// Helper type for database operations
export interface DatabaseTheme extends Omit<Theme, 'configuration'> {
  configuration: Json;
  advanced_effects?: Json;
}

// Helper function to check if an object has the required ThemeConfiguration structure
function hasThemeConfigurationStructure(obj: any): obj is Record<string, Json> {
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

// Type guard to check if a JSON object matches ThemeConfiguration
export function isThemeConfiguration(obj: Json): obj is Record<string, Json> {
  return hasThemeConfigurationStructure(obj);
}

// Conversion function for database operations
export function convertDatabaseTheme(dbTheme: DatabaseTheme): Theme {
  if (!isThemeConfiguration(dbTheme.configuration)) {
    throw new Error('Invalid theme configuration structure');
  }

  return {
    ...dbTheme,
    configuration: dbTheme.configuration as unknown as ThemeConfiguration
  };
}
