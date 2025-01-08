import { supabase } from '@/integrations/supabase/client';
import type { Theme } from '../config/types';
import { defaultTheme } from '../config/defaultTheme';

export const importThemeFromDatabase = async (themeId: string): Promise<Theme> => {
  try {
    const { data: theme, error } = await supabase
      .from('themes')
      .select('*')
      .eq('id', themeId)
      .maybeSingle();

    if (error) throw error;
    
    return theme ? theme as Theme : defaultTheme;
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
      return {
        ...defaultTheme,
        ...preset,
        configuration: {
          ...defaultTheme.configuration,
          ...preset.configuration
        }
      };
    }

    return defaultTheme;
  } catch (error) {
    console.error('Error importing theme preset:', error);
    return defaultTheme;
  }
};