import type { ThemeEffects } from './utils/effects';
import type { ThemeColors } from './utils/colors';
import type { ThemeTypography } from './utils/typography';

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

export type { ThemeEffects };

export function isThemeConfiguration(obj: unknown): obj is ThemeConfiguration {
  try {
    const { themeConfigurationSchema } = require('./validation/schema');
    themeConfigurationSchema.parse(obj);
    return true;
  } catch {
    return false;
  }
}