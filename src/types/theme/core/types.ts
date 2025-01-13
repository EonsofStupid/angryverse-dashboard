import type { ThemeEffects } from '../utils/effects';
import type { ThemeColors } from '../utils/colors';
import type { ThemeTypography } from '../utils/typography';

export type ThemeStatus = 'active' | 'draft' | 'archived';

export interface Theme {
  id: string;
  name: string;
  description: string;
  is_default: boolean;
  status: ThemeStatus;
  configuration: ThemeConfiguration;
  created_by: string;
  created_at: string;
  updated_at: string;
}

export interface ThemeConfiguration {
  colors: ThemeColors;
  typography: ThemeTypography;
  effects: ThemeEffects;
}