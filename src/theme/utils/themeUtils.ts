import type { Theme, ThemeConfiguration } from '../config/types';
import { defaultTheme } from '../config/defaultTheme';

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
        if (typeof subValue === 'string') {
          root.style.setProperty(
            `--theme-colors-cyber-${key}-${subKey.toLowerCase()}`,
            subValue
          );
        }
      });
    }
  });

  // Apply glass effect variables
  Object.entries(effects.glass).forEach(([key, value]) => {
    if (typeof value === 'string') {
      root.style.setProperty(`--theme-glass-${key}`, value);
    }
  });
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
      return mergeThemes(defaultTheme, pageTheme.themes as Theme);
    }

    return defaultTheme;
  } catch (error) {
    console.error('Error fetching theme:', error);
    return defaultTheme;
  }
};