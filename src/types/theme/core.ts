import type { ThemeEffects } from './utils/effects';
import type { ThemeColors } from './utils/colors';
import type { ThemeTypography } from './utils/typography';
import type { Theme } from './types';

export interface ThemeConfiguration {
  colors: {
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
  };
  typography: {
    fonts: {
      sans: string[];
      cyber: string[];
    };
  };
  effects: {
    glass: ThemeEffects['glass'];
    hover: ThemeEffects['hover'];
    animations: ThemeEffects['animations'];
  };
}

// Ensure type validation
export function isThemeConfiguration(obj: unknown): obj is ThemeConfiguration {
  if (!obj || typeof obj !== 'object') return false;
  
  const config = obj as ThemeConfiguration;
  
  // Check colors structure
  if (!config.colors?.cyber) return false;
  if (typeof config.colors.cyber.dark !== 'string') return false;
  if (!config.colors.cyber.pink?.DEFAULT || !config.colors.cyber.pink.hover) return false;
  if (!config.colors.cyber.cyan?.DEFAULT || !config.colors.cyber.cyan.hover) return false;
  if (typeof config.colors.cyber.purple !== 'string') return false;
  if (!config.colors.cyber.green?.DEFAULT || !config.colors.cyber.green.hover) return false;
  if (!config.colors.cyber.yellow?.DEFAULT || !config.colors.cyber.yellow.hover) return false;
  
  // Check typography structure
  if (!config.typography?.fonts) return false;
  if (!Array.isArray(config.typography.fonts.sans)) return false;
  if (!Array.isArray(config.typography.fonts.cyber)) return false;
  
  // Check effects structure
  if (!config.effects?.glass || !config.effects.hover || !config.effects.animations) return false;
  
  return true;
}

export type { Theme, ThemeEffects };