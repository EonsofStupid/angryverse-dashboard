import { create } from 'zustand';
import { supabase } from '@/integrations/supabase/client';
import type { Theme, ThemeConfiguration } from '@/types/theme/core';
import { defaultTheme } from '@/theme/config/defaultTheme';
import { convertDatabaseTheme } from '@/types/theme/utils/database';

interface ThemeState {
  currentTheme: Theme | null;
  isLoading: boolean;
  error: Error | null;
  theme: 'light' | 'dark' | 'system';
  setTheme: (theme: 'light' | 'dark' | 'system') => void;
  setCurrentTheme: (theme: Theme) => void;
  fetchPageTheme: (path: string) => Promise<void>;
}

export const useThemeStore = create<ThemeState>((set) => ({
  currentTheme: null,
  isLoading: false,
  error: null,
  theme: 'system',
  
  setTheme: (theme) => set({ theme }),
  
  setCurrentTheme: (theme) => set({ currentTheme: theme }),
  
  fetchPageTheme: async (path) => {
    set({ isLoading: true, error: null });
    
    try {
      // First try to get a page-specific theme
      const { data: pageThemeData, error: pageError } = await supabase
        .from('page_themes')
        .select(`
          theme_id,
          themes (*)
        `)
        .eq('page_path', path)
        .maybeSingle();

      if (pageError) throw pageError;

      // If we found a page-specific theme, use it
      if (pageThemeData?.themes) {
        const convertedTheme = convertDatabaseTheme(pageThemeData.themes);
        set({ 
          currentTheme: convertedTheme,
          isLoading: false 
        });
        return;
      }

      // If no page theme, get the default theme
      const { data: defaultThemeData, error: defaultError } = await supabase
        .from('themes')
        .select('*')
        .eq('is_default', true)
        .maybeSingle();

      if (defaultError) throw defaultError;

      // Use the fetched default theme or fall back to hardcoded default
      set({ 
        currentTheme: defaultThemeData ? convertDatabaseTheme(defaultThemeData) : defaultTheme,
        isLoading: false 
      });
    } catch (error) {
      console.error('Error in fetchPageTheme:', error);
      set({ 
        currentTheme: defaultTheme,
        isLoading: false,
        error: error instanceof Error ? error : new Error('Unknown error occurred')
      });
    }
  },
}));