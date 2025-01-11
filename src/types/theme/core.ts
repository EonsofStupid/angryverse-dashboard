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
  
  // Check colors structure
  if (!config.colors?.cyber) {
    console.error('Missing colors.cyber configuration');
    return false;
  }

  const { cyber } = config.colors;
  if (typeof cyber.dark !== 'string') {
    console.error('Invalid cyber.dark color value:', cyber.dark);
    return false;
  }

  // Validate complex color objects
  const colorObjects = ['pink', 'cyan', 'green', 'yellow'];
  for (const color of colorObjects) {
    if (!cyber[color]?.DEFAULT || !cyber[color]?.hover || 
        typeof cyber[color].DEFAULT !== 'string' || 
        typeof cyber[color].hover !== 'string') {
      console.error(`Invalid ${color} color configuration:`, cyber[color]);
      return false;
    }
  }
  
  // Check typography structure
  if (!config.typography?.fonts) {
    console.error('Missing typography.fonts configuration');
    return false;
  }
  if (!Array.isArray(config.typography.fonts.sans)) {
    console.error('typography.fonts.sans must be an array');
    return false;
  }
  if (!Array.isArray(config.typography.fonts.cyber)) {
    console.error('typography.fonts.cyber must be an array');
    return false;
  }
  
  // Check effects structure
  if (!config.effects) {
    console.error('Missing effects configuration');
    return false;
  }

  // Validate required effect types
  const { effects } = config;
  
  // Validate glass effects
  if (!effects.glass || typeof effects.glass.background !== 'string' || 
      typeof effects.glass.blur !== 'string' || 
      typeof effects.glass.border !== 'string') {
    console.error('Invalid glass effects configuration:', effects.glass);
    return false;
  }

  // Validate hover effects
  if (!effects.hover || typeof effects.hover.scale !== 'number' || 
      typeof effects.hover.transition_duration !== 'string') {
    console.error('Invalid hover effects configuration:', effects.hover);
    return false;
  }

  // Validate animation effects
  if (!effects.animations?.timing || !effects.animations?.curves) {
    console.error('Invalid animation effects configuration:', effects.animations);
    return false;
  }

  return true;
}