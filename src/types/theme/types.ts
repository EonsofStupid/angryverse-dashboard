import type { ThemeConfiguration } from './core';

export type ThemeStatus = 'active' | 'inactive' | 'draft';

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

export function isThemeConfiguration(obj: any): obj is ThemeConfiguration {
  return (
    obj &&
    typeof obj === 'object' &&
    'colors' in obj &&
    'typography' in obj &&
    'effects' in obj &&
    obj.effects &&
    typeof obj.effects === 'object' &&
    'glass' in obj.effects
  );
}

export type { ThemeConfiguration };