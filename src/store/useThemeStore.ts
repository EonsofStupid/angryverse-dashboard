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

const defaultTheme: Theme = {
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
    
    try {
      // First try to get the default theme
      const { data: defaultThemeData, error: defaultError } = await supabase
        .from('themes')
        .select('*')
        .eq('is_default', true)
        .eq('status', 'active')
        .maybeSingle();

      if (defaultError) {
        console.error('Error fetching default theme:', defaultError);
        throw defaultError;
      }

      // If no default theme exists in the database, use the hardcoded default
      const baseTheme = defaultThemeData ? convertDatabaseTheme(defaultThemeData) : defaultTheme;

      // Then check for page-specific theme
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

      // Use page theme if exists, otherwise use base theme
      const finalTheme = pageTheme?.themes ? convertDatabaseTheme(pageTheme.themes) : baseTheme;
      
      set({ 
        currentTheme: finalTheme,
        isLoading: false 
      });
    } catch (error) {
      console.error('Error in fetchPageTheme:', error);
      // If there's an error, fall back to the default theme
      set({ 
        currentTheme: defaultTheme,
        isLoading: false,
        error: error instanceof Error ? error : new Error('Unknown error occurred')
      });
    }
  },
}));