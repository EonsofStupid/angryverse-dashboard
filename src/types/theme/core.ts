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
}

export function isThemeConfiguration(obj: unknown): obj is ThemeConfiguration {
  if (!obj || typeof obj !== 'object') {
    console.error('Theme configuration must be an object');
    return false;
  }

  const config = obj as any;

  // Check if basic structure exists
  if (!config.colors || !config.typography || !config.effects) {
    console.error('Missing required top-level properties:', { 
      hasColors: !!config.colors,
      hasTypography: !!config.typography,
      hasEffects: !!config.effects
    });
    return false;
  }

  // Validate colors structure
  const { cyber } = config.colors;
  if (!cyber || typeof cyber !== 'object') {
    console.error('Invalid cyber colors configuration');
    return false;
  }

  // Validate typography
  const { fonts } = config.typography;
  if (!fonts || !Array.isArray(fonts.sans) || !Array.isArray(fonts.cyber)) {
    console.error('Invalid typography configuration');
    return false;
  }

  // Validate effects
  const { effects } = config;
  if (!effects.glass || !effects.hover || !effects.animations) {
    console.error('Missing required effects:', {
      hasGlass: !!effects.glass,
      hasHover: !!effects.hover,
      hasAnimations: !!effects.animations
    });
    return false;
  }

  // If we made it here, the configuration is valid
  return true;
}