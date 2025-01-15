import type { Theme, ThemeConfiguration } from '../core/types';
import type { Json } from '@/integrations/supabase/types';

export interface DatabaseTheme {
  id: string;
  name: string;
  description: string;
  is_default: boolean;
  status: Theme['status'];
  configuration: Json;
  created_by: string;
  created_at: string;
  updated_at: string;
  advanced_effects?: Json;
  effects_config?: Json;
  effects_details?: Json;
  gray_palette?: Json;
  interaction_tokens?: Json;
}

export const convertDatabaseTheme = (dbTheme: DatabaseTheme): Theme => {
  const configuration = dbTheme.configuration as unknown as ThemeConfiguration;
  if (!configuration?.colors || !configuration?.typography || !configuration?.effects) {
    throw new Error('Invalid theme configuration structure');
  }

  return {
    id: dbTheme.id,
    name: dbTheme.name,
    description: dbTheme.description,
    is_default: dbTheme.is_default,
    status: dbTheme.status,
    configuration,
    created_by: dbTheme.created_by,
    created_at: dbTheme.created_at,
    updated_at: dbTheme.updated_at
  };
};