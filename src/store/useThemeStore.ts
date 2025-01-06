import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Theme, PageTheme } from '@/types/theme';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

interface ThemeState {
  currentTheme: Theme | null;
  pageThemes: Map<string, Theme>;
  isLoading: boolean;
  error: string | null;
  theme: 'light' | 'dark' | 'system';
  fetchTheme: (themeId: string) => Promise<void>;
  fetchPageTheme: (pagePath: string) => Promise<void>;
  setCurrentTheme: (theme: Theme) => void;
  setTheme: (theme: 'light' | 'dark' | 'system') => void;
  applyTheme: (theme: Theme) => void;
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set, get) => ({
      currentTheme: null,
      pageThemes: new Map(),
      isLoading: false,
      error: null,
      theme: 'system',

      fetchTheme: async (themeId: string) => {
        try {
          set({ isLoading: true, error: null });
          const { data: themeData, error } = await supabase
            .from('themes')
            .select('*')
            .eq('id', themeId)
            .single();

          if (error) throw error;
          if (themeData) {
            const theme = themeData as Theme;
            set({ currentTheme: theme });
            get().applyTheme(theme);
          }
        } catch (error) {
          const errorMessage = error instanceof Error ? error.message : 'Failed to fetch theme';
          set({ error: errorMessage });
          toast({
            title: 'Error',
            description: errorMessage,
            variant: 'destructive',
          });
        } finally {
          set({ isLoading: false });
        }
      },

      fetchPageTheme: async (pagePath: string) => {
        try {
          set({ isLoading: true, error: null });
          
          // First try to get the page theme
          const { data: pageThemeData, error: pageThemeError } = await supabase
            .from('page_themes')
            .select(`
              *,
              theme:themes (
                *
              )
            `)
            .eq('page_path', pagePath)
            .maybeSingle();

          if (pageThemeError) throw pageThemeError;

          if (pageThemeData?.theme) {
            const theme = pageThemeData.theme as Theme;
            get().pageThemes.set(pagePath, theme);
            set({ currentTheme: theme });
            get().applyTheme(theme);
            return;
          }

          // If no page theme is found, fetch default theme
          const { data: defaultTheme, error: defaultThemeError } = await supabase
            .from('themes')
            .select('*')
            .eq('is_default', true)
            .maybeSingle();

          if (defaultThemeError) throw defaultThemeError;

          if (defaultTheme) {
            const theme = defaultTheme as Theme;
            set({ currentTheme: theme });
            get().applyTheme(theme);
          } else {
            console.warn('No default theme found');
          }
        } catch (error) {
          const errorMessage = error instanceof Error ? error.message : 'Failed to fetch page theme';
          set({ error: errorMessage });
          toast({
            title: 'Error',
            description: errorMessage,
            variant: 'destructive',
          });
        } finally {
          set({ isLoading: false });
        }
      },

      setCurrentTheme: (theme: Theme) => {
        set({ currentTheme: theme });
        get().applyTheme(theme);
      },

      setTheme: (theme: 'light' | 'dark' | 'system') => {
        set({ theme });
      },

      applyTheme: (theme: Theme) => {
        const root = document.documentElement;
        const { colors, effects } = theme.configuration;

        // Apply colors
        Object.entries(colors.cyber).forEach(([key, value]) => {
          if (typeof value === 'object') {
            Object.entries(value).forEach(([subKey, subValue]) => {
              root.style.setProperty(
                `--cyber-${key}-${subKey.toLowerCase()}`,
                subValue
              );
            });
          } else {
            root.style.setProperty(`--cyber-${key}`, value);
          }
        });

        // Apply glass effect properties
        Object.entries(effects.glass).forEach(([key, value]) => {
          root.style.setProperty(`--glass-${key}`, value);
        });

        // Store the applied theme in localStorage for persistence
        localStorage.setItem('current-theme', JSON.stringify(theme));
      },
    }),
    {
      name: 'theme-storage',
      partialize: (state) => ({
        currentTheme: state.currentTheme,
        pageThemes: Array.from(state.pageThemes.entries()),
        theme: state.theme,
      }),
    }
  )
);