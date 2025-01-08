import { supabase } from '@/integrations/supabase/client';
import type { Theme } from '@/types/theme';
import { defaultTheme } from '../config/defaultTheme';
import { convertDatabaseTheme } from '@/types/theme';

export const importThemeFromDatabase = async (themeId: string): Promise<Theme> => {
  try {
    const { data: theme, error } = await supabase
      .from('themes')
      .select('*')
      .eq('id', themeId)
      .maybeSingle();

    if (error) throw error;
    
    if (theme) {
      return convertDatabaseTheme(theme);
    }

    return defaultTheme;
  } catch (error) {
    console.error('Error importing theme:', error);
    return defaultTheme;
  }
};

export const importThemePreset = async (presetId: string): Promise<Theme> => {
  try {
    const { data: preset, error } = await supabase
      .from('theme_presets')
      .select('*')
      .eq('id', presetId)
      .maybeSingle();

    if (error) throw error;
    
    if (preset) {
      return convertDatabaseTheme({
        id: preset.id,
        name: preset.name,
        description: preset.description || '',
        is_default: false,
        status: 'active',
        configuration: preset.configuration,
        created_at: preset.created_at,
        updated_at: preset.updated_at
      });
    }

    return defaultTheme;
  } catch (error) {
    console.error('Error importing theme preset:', error);
    return defaultTheme;
  }
};