import type { Theme, ThemeConfiguration } from '../core/types';
import type { Json } from '@/integrations/supabase/types';

export interface DatabaseTheme extends Omit<Theme, 'configuration'> {
  configuration: Json;
  advanced_effects?: Json;
  effects_config?: Json;
  effects_details?: Json;
  gray_palette?: Json;
  interaction_tokens?: Json;
}

export const convertDatabaseTheme = (dbTheme: DatabaseTheme): Theme => {
  return {
    id: dbTheme.id,
    name: dbTheme.name,
    description: dbTheme.description,
    is_default: dbTheme.is_default,
    status: dbTheme.status,
    configuration: dbTheme.configuration as ThemeConfiguration,
    created_by: dbTheme.created_by,
    created_at: dbTheme.created_at,
    updated_at: dbTheme.updated_at
  };
};