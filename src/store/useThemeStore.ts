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

export const useThemeStore = create<ThemeState>((set) => ({
  currentTheme: null,
  isLoading: false,
  error: null,
  theme: 'dark',
  
  setTheme: (theme) => set({ theme }),
  
  setCurrentTheme: (theme) => set({ currentTheme: theme }),
  
  fetchPageTheme: async (path) => {
    set({ isLoading: true, error: null });
    
    try {
      // Use maybeSingle to prevent body stream errors
      const { data: defaultThemeData, error: defaultError } = await supabase
        .from('themes')
        .select('*')
        .eq('is_default', true)
        .eq('status', 'active')
        .maybeSingle();

      if (defaultError) throw defaultError;

      // If no default theme exists in the database, use the hardcoded default
      const baseTheme = defaultThemeData || {
        id: 'default',
        name: 'Default Theme',
        description: 'Default system theme',
        is_default: true,
        status: 'active',
        configuration: {
          colors: {
            cyber: {
              dark: '#1a1b26',
              pink: {
                DEFAULT: '#ff007f',
                hover: '#ff1a8c'
              },
              cyan: {
                DEFAULT: '#00fff5',
                hover: '#1affff'
              },
              purple: '#7928ca',
              green: {
                DEFAULT: '#4ade80',
                hover: '#22c55e'
              },
              yellow: {
                DEFAULT: '#fde047',
                hover: '#facc15'
              }
            }
          },
          typography: {
            fonts: {
              sans: ['Inter', 'sans-serif'],
              cyber: ['Inter', 'sans-serif']
            }
          },
          effects: {
            glass: {
              background: 'rgba(0, 0, 0, 0.1)',
              blur: '8px',
              border: '1px solid rgba(255, 255, 255, 0.1)'
            }
          }
        },
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };

      // Check for page-specific theme using maybeSingle
      const { data: pageTheme, error: pageError } = await supabase
        .from('page_themes')
        .select(`
          *,
          themes:theme_id (*)
        `)
        .eq('page_path', path)
        .maybeSingle();

      if (pageError) throw pageError;

      const finalTheme = pageTheme?.themes || baseTheme;
      
      set({ 
        currentTheme: finalTheme,
        isLoading: false 
      });
    } catch (error: any) {
      console.error('Error in fetchPageTheme:', error);
      set({ 
        error: error instanceof Error ? error : new Error('Unknown error occurred'),
        isLoading: false
      });
    }
  },
}));