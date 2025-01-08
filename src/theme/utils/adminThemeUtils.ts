import type { Theme } from '@/types/theme';
import { adminTheme } from '../config/adminTheme';
import { supabase } from '@/integrations/supabase/client';

export const loadAdminTheme = async (): Promise<Theme> => {
  try {
    const { data: themeData, error } = await supabase
      .from('themes')
      .select('*')
      .eq('name', 'Admin Theme')
      .maybeSingle();

    if (error) throw error;
    
    if (themeData) {
      // Ensure the configuration matches our ThemeConfiguration type
      const theme: Theme = {
        ...adminTheme,
        ...themeData,
        configuration: {
          ...adminTheme.configuration,
          ...(typeof themeData.configuration === 'object' ? themeData.configuration : {})
        }
      };
      return theme;
    }
    
    return adminTheme;
  } catch (error) {
    console.error('Error loading admin theme:', error);
    return adminTheme;
  }
};

export const applyAdminTheme = (theme: Theme) => {
  const root = document.documentElement;
  const { colors, effects } = theme.configuration;

  // Apply color variables
  Object.entries(colors.cyber).forEach(([key, value]) => {
    if (typeof value === 'string') {
      root.style.setProperty(`--admin-${key}`, value);
    } else if (typeof value === 'object' && value !== null) {
      Object.entries(value).forEach(([subKey, subValue]) => {
        if (typeof subValue === 'string') {
          root.style.setProperty(
            `--admin-${key}-${subKey.toLowerCase()}`,
            subValue
          );
        }
      });
    }
  });

  // Apply glass effect variables
  Object.entries(effects.glass).forEach(([key, value]) => {
    if (typeof value === 'string') {
      root.style.setProperty(`--admin-glass-${key}`, value);
    }
  });
};