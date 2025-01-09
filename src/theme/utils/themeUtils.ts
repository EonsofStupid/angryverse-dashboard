import type { Theme } from '@/types/theme';
import { supabase } from '@/integrations/supabase/client';
import { defaultTheme } from '../config/defaultTheme';
import { convertDatabaseTheme } from '@/types/theme';

export const mergeThemes = (base: Theme, override: Partial<Theme>): Theme => {
  return {
    ...base,
    ...override,
    configuration: {
      ...base.configuration,
      ...override.configuration,
      colors: {
        ...base.configuration.colors,
        ...override.configuration?.colors
      },
      typography: {
        ...base.configuration.typography,
        ...override.configuration?.typography
      },
      effects: {
        ...base.configuration.effects,
        ...override.configuration?.effects,
        glass: {
          ...base.configuration.effects.glass,
          ...override.configuration?.effects?.glass
        }
      }
    }
  };
};

export const createThemeVariables = (theme: Theme): void => {
  const root = document.documentElement;
  const { colors, effects } = theme.configuration;

  // Apply color variables
  Object.entries(colors.cyber).forEach(([key, value]) => {
    if (typeof value === 'string') {
      root.style.setProperty(`--theme-colors-cyber-${key}`, value);
    } else if (typeof value === 'object' && value !== null) {
      Object.entries(value).forEach(([subKey, subValue]) => {
        root.style.setProperty(
          `--theme-colors-cyber-${key}-${subKey.toLowerCase()}`,
          subValue as string
        );
      });
    }
  });

  // Apply glass effect variables
  if (effects.glass) {
    const { background, blur, border } = effects.glass;
    root.style.setProperty('--glass-background', background);
    root.style.setProperty('--glass-blur', blur);
    root.style.setProperty('--glass-border', border);
  }
};

export const getThemeFromPath = async (path: string): Promise<Theme> => {
  try {
    const { data: pageTheme } = await supabase
      .from('page_themes')
      .select(`
        theme_id,
        themes (*)
      `)
      .eq('page_path', path)
      .maybeSingle();

    if (pageTheme?.themes) {
      // Parse the JSON configuration if it's a string
      const parsedTheme = {
        ...pageTheme.themes,
        configuration: typeof pageTheme.themes.configuration === 'string'
          ? JSON.parse(pageTheme.themes.configuration)
          : pageTheme.themes.configuration,
        advanced_effects: typeof pageTheme.themes.advanced_effects === 'string'
          ? JSON.parse(pageTheme.themes.advanced_effects)
          : pageTheme.themes.advanced_effects
      };

      return convertDatabaseTheme(parsedTheme);
    }

    return defaultTheme;
  } catch (error) {
    console.error('Error fetching theme:', error);
    return defaultTheme;
  }
};