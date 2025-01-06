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
  fetchTheme: (themeId: string) => Promise<void>;
  fetchPageTheme: (pagePath: string) => Promise<void>;
  setCurrentTheme: (theme: Theme) => void;
  applyTheme: (theme: Theme) => void;
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set, get) => ({
      currentTheme: null,
      pageThemes: new Map(),
      isLoading: false,
      error: null,

      fetchTheme: async (themeId: string) => {
        try {
          set({ isLoading: true, error: null });
          const { data: theme, error } = await supabase
            .from('themes')
            .select('*')
            .eq('id', themeId)
            .single();

          if (error) throw error;
          if (theme) {
            set({ currentTheme: theme as Theme });
            get().applyTheme(theme as Theme);
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
          const { data: pageTheme, error: pageThemeError } = await supabase
            .from('page_themes')
            .select('*, themes(*)')
            .eq('page_path', pagePath)
            .single();

          if (pageThemeError) throw pageThemeError;
          
          if (pageTheme?.themes) {
            const theme = pageTheme.themes as Theme;
            get().pageThemes.set(pagePath, theme);
            set({ currentTheme: theme });
            get().applyTheme(theme);
          } else {
            // Fetch default theme if no page theme is set
            const { data: defaultTheme, error: defaultThemeError } = await supabase
              .from('themes')
              .select('*')
              .eq('is_default', true)
              .single();

            if (defaultThemeError) throw defaultThemeError;
            if (defaultTheme) {
              set({ currentTheme: defaultTheme as Theme });
              get().applyTheme(defaultTheme as Theme);
            }
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
      }),
    }
  )
);