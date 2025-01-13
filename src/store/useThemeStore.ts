import { create } from 'zustand';
import { supabase } from '@/integrations/supabase/client';
import type { Theme, ThemeConfiguration } from '@/types/theme/core';

interface ThemeState {
  currentTheme: Theme | null;
  isLoading: boolean;
  error: Error | null;
  theme: string;
  setTheme: (theme: string) => void;
  setCurrentTheme: (theme: Theme | null) => void;
  fetchPageTheme: (path: string) => Promise<void>;
}

const baseEffectState = {
  enabled: true,
  priority: 'database' as const,
  source: 'database' as const,
};

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
        ...baseEffectState,
        background: 'rgba(0, 0, 0, 0.1)',
        blur: '8px',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        shadow_composition: {
          offset_y: '4px',
          blur_radius: '6px',
          spread_radius: '0px',
          opacity: 0.1
        }
      },
      hover: {
        ...baseEffectState,
        scale: 1.05,
        lift: '-4px',
        glow_strength: '10px',
        transition_duration: '300ms',
        glow_color: 'var(--theme-primary)',
        glow_opacity: 0.5,
        glow_spread: '4px',
        glow_blur: '8px',
        shadow_normal: '0 4px 6px rgba(0, 0, 0, 0.1)',
        shadow_hover: '0 8px 12px rgba(0, 0, 0, 0.15)'
      },
      animations: {
        ...baseEffectState,
        timing: {
          fast: '100ms',
          normal: '200ms',
          slow: '300ms',
          very_slow: '1000ms'
        },
        curves: {
          linear: 'linear',
          ease_out: 'cubic-bezier(0, 0, 0.2, 1)',
          ease_in: 'cubic-bezier(0.4, 0, 1, 1)',
          ease_in_out: 'cubic-bezier(0.4, 0, 0.2, 1)'
        }
      }
    }
  },
  created_by: '',
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString()
};

const convertDatabaseTheme = (dbTheme: any): Theme => {
  const configuration = dbTheme.configuration as ThemeConfiguration;
  
  if (!configuration?.colors?.cyber || !configuration?.typography?.fonts || !configuration?.effects?.glass) {
    throw new Error('Invalid theme configuration structure');
  }

  // Map database status to our ThemeStatus type
  const statusMap: Record<string, Theme['status']> = {
    'inactive': 'inactive',
    'active': 'active',
    'draft': 'draft'
  };

  return {
    id: dbTheme.id,
    name: dbTheme.name,
    description: dbTheme.description || '',
    is_default: !!dbTheme.is_default,
    status: statusMap[dbTheme.status] || 'draft',
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
