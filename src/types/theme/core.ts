import type { ThemeEffects } from './utils/effects';
import type { ThemeColors } from './utils/colors';
import type { ThemeTypography } from './utils/typography';
import type { Theme, ThemeConfiguration } from './types';

export interface ThemeConfiguration {
  colors: ThemeColors;
  typography: ThemeTypography;
  effects: ThemeEffects;
}

export type { Theme, ThemeEffects };