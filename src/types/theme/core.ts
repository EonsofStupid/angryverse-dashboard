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
  if (!obj || typeof obj !== 'object') return false;
  
  const config = obj as any;
  
  // Check colors structure
  if (!config.colors?.cyber) return false;
  if (typeof config.colors.cyber.dark !== 'string') return false;
  
  // Check typography structure
  if (!config.typography?.fonts) return false;
  if (!Array.isArray(config.typography.fonts.sans)) return false;
  if (!Array.isArray(config.typography.fonts.cyber)) return false;
  
  // Check effects structure
  if (!config.effects) return false;
  if (!config.effects.glass || !config.effects.hover || !config.effects.animations) return false;
  
  return true;
}