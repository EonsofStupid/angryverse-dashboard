import type { ThemeEffects } from './utils/effects';
import type { CSSColor } from './utils/css';

export type ThemeStatus = 'active' | 'inactive' | 'draft';

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
  gray?: {
    neutral: CSSColor;
    soft: CSSColor;
    medium: CSSColor;
    light: CSSColor;
    silver: CSSColor;
    dark: CSSColor;
    mid: CSSColor;
  };
}

export interface ThemeTypography {
  fonts: {
    sans: string[];
    cyber: string[];
  };
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
  status: ThemeStatus;
  configuration: ThemeConfiguration;
  created_by?: string;
  created_at?: string;
  updated_at?: string;
  advanced_effects?: Record<string, unknown>;
  gray_palette?: Record<string, string>;
  effects_details?: Record<string, unknown>;
}

export function isThemeConfiguration(obj: unknown): obj is ThemeConfiguration {
  if (!obj || typeof obj !== 'object') {
    console.error('Theme configuration must be an object');
    return false;
  }

  const config = obj as any;

  // Check required top-level properties
  if (!config.colors || !config.typography || !config.effects) {
    console.error('Missing required top-level properties:', { 
      hasColors: !!config.colors,
      hasTypography: !!config.typography,
      hasEffects: !!config.effects
    });
    return false;
  }

  // Check required effects
  if (!config.effects.glass || !config.effects.hover || !config.effects.animations) {
    console.error('Missing required effects:', {
      hasGlass: !!config.effects.glass,
      hasHover: !!config.effects.hover,
      hasAnimations: !!config.effects.animations
    });
    return false;
  }

  // Validate colors structure
  if (!config.colors.cyber || typeof config.colors.cyber !== 'object') {
    console.error('Invalid cyber colors configuration');
    return false;
  }

  // Validate typography structure
  if (!config.typography.fonts || !Array.isArray(config.typography.fonts.sans)) {
    console.error('Invalid typography configuration');
    return false;
  }

  return true;
}

export function convertDatabaseTheme(dbTheme: any): Theme {
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

  // Parse other JSON fields if they're strings
  const advanced_effects = typeof dbTheme.advanced_effects === 'string'
    ? JSON.parse(dbTheme.advanced_effects)
    : dbTheme.advanced_effects;

  const gray_palette = typeof dbTheme.gray_palette === 'string'
    ? JSON.parse(dbTheme.gray_palette)
    : dbTheme.gray_palette;

  const effects_details = typeof dbTheme.effects_details === 'string'
    ? JSON.parse(dbTheme.effects_details)
    : dbTheme.effects_details;

  return {
    ...dbTheme,
    configuration,
    advanced_effects,
    gray_palette,
    effects_details
  };
}