import { supabase } from '@/integrations/supabase/client';
import type { Theme } from '@/types/theme';
import { defaultTheme } from '../config/defaultTheme';

export const importThemeFromDatabase = async (themeId: string): Promise<Theme> => {
  try {
    const { data: theme, error } = await supabase
      .from('themes')
      .select('*')
      .eq('id', themeId)
      .maybeSingle();

    if (error) throw error;
    
    if (theme) {
      // Ensure type safety by validating the configuration structure
      const validatedTheme: Theme = {
        ...defaultTheme,
        ...theme,
        configuration: {
          ...defaultTheme.configuration,
          ...theme.configuration
        }
      };
      return validatedTheme;
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
      const validatedTheme: Theme = {
        ...defaultTheme,
        id: preset.id,
        name: preset.name,
        description: preset.description || '',
        configuration: {
          ...defaultTheme.configuration,
          ...preset.configuration
        }
      };
      return validatedTheme;
    }

    return defaultTheme;
  } catch (error) {
    console.error('Error importing theme preset:', error);
    return defaultTheme;
  }
};