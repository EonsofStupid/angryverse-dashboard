import { create } from 'zustand';
import { supabase } from '@/integrations/supabase/client';
import type { Theme } from '@/types/theme';

interface ThemeState {
  currentTheme: Theme | null;
  isLoading: boolean;
  error: Error | null;
  theme: string;
  setTheme: (theme: string) => void;
  setCurrentTheme: (theme: Theme | null) => void;
  fetchPageTheme: (path: string) => Promise<void>;
}

const convertDatabaseTheme = (dbTheme: any): Theme => {
  return {
    id: dbTheme.id,
    name: dbTheme.name,
    description: dbTheme.description,
    is_default: dbTheme.is_default,
    status: dbTheme.status,
    configuration: dbTheme.configuration as Theme['configuration'],
    created_by: dbTheme.created_by,
    created_at: dbTheme.created_at,
    updated_at: dbTheme.updated_at,
  };
};

export const useThemeStore = create<ThemeState>((set) => ({
  currentTheme: null,
  isLoading: false,
  error: null,
  theme: 'dark',
  
  setTheme: (theme) => set({ theme }),
  
  setCurrentTheme: (theme) => set({ currentTheme: theme }),
  
  fetchPageTheme: async (path) => {
    set({ isLoading: true, error: null });
    console.log('Fetching theme for path:', path);
    
    try {
      // First try to get the page-specific theme
      const { data: pageTheme, error: pageError } = await supabase
        .from('page_themes')
        .select(`
          *,
          themes:theme_id (*)
        `)
        .eq('page_path', path)
        .maybeSingle();

      if (pageError) {
        console.error('Error fetching page theme:', pageError);
        throw pageError;
      }

      if (pageTheme?.themes) {
        console.log('Found page-specific theme:', pageTheme.themes);
        set({ 
          currentTheme: convertDatabaseTheme(pageTheme.themes),
          isLoading: false 
        });
        return;
      }

      console.log('No page-specific theme found, fetching default theme...');

      // If no page-specific theme, get the default theme
      const { data: defaultTheme, error: defaultError } = await supabase
        .from('themes')
        .select('*')
        .eq('is_default', true)
        .eq('status', 'active')
        .maybeSingle();

      if (defaultError) {
        console.error('Error fetching default theme:', defaultError);
        throw defaultError;
      }

      if (!defaultTheme) {
        console.error('No active default theme found in database');
        throw new Error('No active default theme found');
      }

      console.log('Found default theme:', defaultTheme);
      set({ 
        currentTheme: convertDatabaseTheme(defaultTheme),
        isLoading: false 
      });
    } catch (error) {
      console.error('Error in fetchPageTheme:', error);
      set({ 
        error: error instanceof Error ? error : new Error('Unknown error occurred'),
        isLoading: false 
      });
    }
  },
}));