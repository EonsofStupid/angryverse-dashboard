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

  // Apply glow effect variables
  if (effects.glow) {
    const { strengths, colors, animation } = effects.glow;
    
    // Strengths
    Object.entries(strengths).forEach(([key, value]) => {
      root.style.setProperty(`--glow-strength-${key}`, value);
    });
    
    // Colors
    Object.entries(colors).forEach(([key, value]) => {
      root.style.setProperty(`--glow-color-${key}`, value);
    });
    
    // Animation
    root.style.setProperty('--glow-pulse-opacity', animation.pulse_opacity.toString());
    root.style.setProperty('--glow-pulse-scale', animation.pulse_scale.toString());
    root.style.setProperty('--glow-pulse-duration', animation.pulse_duration);
  }

  // Apply matrix effect variables
  if (effects.matrix) {
    const { core, visual, characters, animation } = effects.matrix;
    
    // Core
    Object.entries(core).forEach(([key, value]) => {
      root.style.setProperty(`--matrix-${key}`, value.toString());
    });
    
    // Visual
    Object.entries(visual).forEach(([key, value]) => {
      root.style.setProperty(`--matrix-${key.replace('_', '-')}`, value.toString());
    });
    
    // Characters
    Object.entries(characters).forEach(([key, value]) => {
      root.style.setProperty(`--matrix-${key}`, value.toString());
    });
    
    // Animation
    Object.entries(animation).forEach(([key, value]) => {
      root.style.setProperty(`--matrix-animation-${key.replace('_', '-')}`, value.toString());
    });
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
      return convertDatabaseTheme(pageTheme.themes);
    }

    return defaultTheme;
  } catch (error) {
    console.error('Error fetching theme:', error);
    return defaultTheme;
  }
};
