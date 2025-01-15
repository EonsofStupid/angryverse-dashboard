import type { ThemeEffects } from './utils/effects';
import type { ThemeColors } from './utils/colors';
import type { ThemeTypography } from './utils/typography';
import type { ThemeConfiguration } from './validation/schema';

export type { ThemeConfiguration, ThemeEffects };

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

export function isThemeConfiguration(obj: unknown): obj is ThemeConfiguration {
  try {
    const { themeConfigurationSchema } = require('./validation/schema');
    themeConfigurationSchema.parse(obj);
    return true;
  } catch {
    return false;
  }
}