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
}

export function isThemeConfiguration(obj: unknown): obj is ThemeConfiguration {
  if (!obj || typeof obj !== 'object') {
    console.error('Theme configuration must be an object');
    return false;
  }

  const config = obj as any;

  if (!config.colors || !config.typography || !config.effects) {
    console.error('Missing required top-level properties:', { 
      hasColors: !!config.colors,
      hasTypography: !!config.typography,
      hasEffects: !!config.effects
    });
    return false;
  }

  if (!config.effects.glass || !config.effects.hover || !config.effects.animations) {
    console.error('Missing required effects:', {
      hasGlass: !!config.effects.glass,
      hasHover: !!config.effects.hover,
      hasAnimations: !!config.effects.animations
    });
    return false;
  }

  return true;
}