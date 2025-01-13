import type { ThemeEffects } from './utils/effects';
import type { ThemeColors } from './utils/colors';
import type { ThemeTypography } from './utils/typography';
import type { Theme, ThemeConfiguration } from './types';

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
  effects: ThemeEffects;
}

export type { Theme, ThemeEffects };

export function isThemeConfiguration(obj: unknown): obj is ThemeConfiguration {
  try {
    const { themeConfigurationSchema } = require('./validation/schema');
    themeConfigurationSchema.parse(obj);
    return true;
  } catch {
    return false;
  }
}