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

export interface ThemeEffects {
  glass: GlassEffects;
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
export type DatabaseTheme = Omit<Theme, 'configuration'> & {
  configuration: Json;
  advanced_effects?: Json;
};

// Type guard to check if a JSON object matches ThemeConfiguration
export function isThemeConfiguration(obj: Json): obj is ThemeConfiguration {
  if (typeof obj !== 'object' || obj === null) return false;
  
  const config = obj as any;
  return (
    config.colors?.cyber &&
    config.typography?.fonts &&
    config.effects?.glass &&
    typeof config.effects.glass.background === 'string' &&
    typeof config.effects.glass.blur === 'string' &&
    typeof config.effects.glass.border === 'string'
  );
}

// Conversion function for database operations
export function convertDatabaseTheme(dbTheme: DatabaseTheme): Theme {
  if (!isThemeConfiguration(dbTheme.configuration)) {
    throw new Error('Invalid theme configuration structure');
  }

  return {
    ...dbTheme,
    configuration: dbTheme.configuration as ThemeConfiguration
  };
}