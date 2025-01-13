import type { Theme, ThemeConfiguration, ThemeStatus } from '../core';
import type { Json } from '@/integrations/supabase/types';

export interface DatabaseTheme extends Omit<Theme, 'status' | 'configuration'> {
  status: 'active' | 'draft' | 'archived';  // Matches database enum
  configuration: Json;
  advanced_effects?: Json;
  effects_config?: Json;
  effects_details?: Json;
  gray_palette?: Json;
  interaction_tokens?: Json;
}

export const convertDatabaseTheme = (dbTheme: DatabaseTheme): Theme => {
  const configuration = typeof dbTheme.configuration === 'string' 
    ? JSON.parse(dbTheme.configuration) 
    : dbTheme.configuration;

  if (!configuration || typeof configuration !== 'object') {
    throw new Error('Invalid theme configuration structure');
  }

  return {
    id: dbTheme.id,
    name: dbTheme.name,
    description: dbTheme.description || '',
    is_default: dbTheme.is_default,
    status: dbTheme.status,
    configuration: configuration as ThemeConfiguration,
    created_by: dbTheme.created_by,
    created_at: dbTheme.created_at,
    updated_at: dbTheme.updated_at
  };
};