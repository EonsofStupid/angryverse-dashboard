import { supabase } from '@/integrations/supabase/client';
import type { Theme, ThemeConfiguration } from '@/types/theme/core';
import { isThemeConfiguration } from '@/types/theme/core';

export const initializeTheme = async (pathname: string): Promise<Theme> => {
  // Try to get page-specific theme first
  const { data: pageTheme, error: pageError } = await supabase
    .from('page_themes')
    .select(`
      theme_id,
      themes (*)
    `)
    .eq('page_path', pathname)
    .maybeSingle();

  if (pageError) throw pageError;

  if (pageTheme?.themes) {
    const themeData = pageTheme.themes as any;
    if (!themeData.configuration || typeof themeData.configuration !== 'object') {
      throw new Error('Theme configuration is missing or invalid');
    }

    const configuration = themeData.configuration as unknown as ThemeConfiguration;
    if (!isThemeConfiguration(configuration)) {
      throw new Error('Invalid theme configuration structure');
    }

    return {
      id: themeData.id,
      name: themeData.name,
      description: themeData.description || '',
      is_default: themeData.is_default,
      status: themeData.status,
      configuration,
      created_by: themeData.created_by || '',
      created_at: themeData.created_at,
      updated_at: themeData.updated_at
    };
  }

  // Fallback to default theme
  const { data: defaultTheme, error: defaultError } = await supabase
    .from('themes')
    .select('*')
    .eq('is_default', true)
    .maybeSingle();

  if (defaultError) throw defaultError;

  if (!defaultTheme) {
    throw new Error('No default theme found');
  }

  if (!defaultTheme.configuration || typeof defaultTheme.configuration !== 'object') {
    throw new Error('Default theme configuration is missing or invalid');
  }

  const configuration = defaultTheme.configuration as unknown as ThemeConfiguration;
  if (!isThemeConfiguration(configuration)) {
    throw new Error('Invalid default theme configuration structure');
  }

  return {
    id: defaultTheme.id,
    name: defaultTheme.name,
    description: defaultTheme.description || '',
    is_default: defaultTheme.is_default,
    status: defaultTheme.status,
    configuration,
    created_by: defaultTheme.created_by || '',
    created_at: defaultTheme.created_at,
    updated_at: defaultTheme.updated_at
  };
}; 