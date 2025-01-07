import { create } from 'zustand';
import { supabase } from '@/integrations/supabase/client';
import type { Theme, ThemeConfiguration } from '@/types/theme';

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

// Helper function to safely convert database theme to our Theme type
const convertDatabaseTheme = (dbTheme: any): Theme => {
  const configuration = dbTheme.configuration as ThemeConfiguration;
  
  // Validate the configuration structure
  if (!configuration?.colors?.cyber || !configuration?.typography?.fonts || !configuration?.effects?.glass) {
    throw new Error('Invalid theme configuration structure');
  }

  return {
    id: dbTheme.id,
    name: dbTheme.name,
    description: dbTheme.description || '',
    is_default: !!dbTheme.is_default,
    status: dbTheme.status || 'active',
    configuration: configuration,
    created_by: dbTheme.created_by,
    created_at: dbTheme.created_at,
    updated_at: dbTheme.updated_at
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
      // Fall back to default theme on error
      set({ 
        currentTheme: defaultTheme,
        isLoading: false,
        error: error instanceof Error ? error : new Error('Unknown error occurred')
      });
    }
  },
}));