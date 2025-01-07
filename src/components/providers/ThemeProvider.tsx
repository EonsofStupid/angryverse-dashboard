import { useEffect, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import { useThemeStore } from '@/store/useThemeStore';
import { ThemeContext } from '@/hooks/useTheme';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import type { Theme, ThemeConfiguration } from '@/types/theme';

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

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const { 
    currentTheme, 
    isLoading, 
    error,
    fetchPageTheme, 
    setCurrentTheme,
    theme,
    setTheme,
  } = useThemeStore();
  
  const location = useLocation();
  const { toast } = useToast();

  const applyThemeVariables = useCallback(() => {
    const themeToApply = currentTheme || defaultTheme;
    if (!themeToApply?.configuration) return;

    const root = document.documentElement;
    const { effects } = themeToApply.configuration;

    if (effects?.glass) {
      const { background, blur, border } = effects.glass;
      root.style.setProperty('--theme-glass-background', background);
      root.style.setProperty('--theme-glass-blur', blur);
      root.style.setProperty('--theme-glass-border', border);
    }
  }, [currentTheme]);

  useEffect(() => {
    const initializeTheme = async () => {
      try {
        const { data: pageTheme, error: pageError } = await supabase
          .from('page_themes')
          .select(`
            theme_id,
            themes (*)
          `)
          .eq('page_path', location.pathname)
          .maybeSingle();

        if (pageError) throw pageError;

        if (pageTheme?.themes) {
          const themeData = pageTheme.themes as unknown as Theme;
          if (!isValidThemeConfiguration(themeData.configuration)) {
            throw new Error('Invalid theme configuration structure');
          }
          setCurrentTheme(themeData);
        } else {
          const { data: defaultThemeData, error: defaultError } = await supabase
            .from('themes')
            .select('*')
            .eq('is_default', true)
            .maybeSingle();

          if (defaultError) throw defaultError;
          
          if (defaultThemeData) {
            const themeConfig = defaultThemeData.configuration as unknown;
            if (!isValidThemeConfiguration(themeConfig)) {
              throw new Error('Invalid theme configuration structure');
            }
            const dbTheme: Theme = {
              ...defaultThemeData,
              configuration: themeConfig as ThemeConfiguration
            };
            setCurrentTheme(dbTheme);
          } else {
            setCurrentTheme(defaultTheme);
          }
        }

        applyThemeVariables();
      } catch (error) {
        console.error('Failed to initialize theme:', error);
        setCurrentTheme(defaultTheme);
        applyThemeVariables();
        
        toast({
          title: "Theme Error",
          description: "Using fallback theme due to connection issues.",
          variant: "destructive",
        });
      }
    };

    initializeTheme();
  }, [location.pathname, setCurrentTheme, toast, applyThemeVariables]);

  const value = {
    currentTheme: currentTheme || defaultTheme,
    isLoading,
    error,
    setCurrentTheme,
    fetchPageTheme,
    theme,
    setTheme,
    applyThemeVariables,
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

// Helper function to validate theme configuration
const isValidThemeConfiguration = (config: unknown): config is ThemeConfiguration => {
  if (typeof config !== 'object' || !config) return false;
  
  const conf = config as any;
  return (
    conf.colors?.cyber &&
    conf.typography?.fonts &&
    conf.effects?.glass &&
    typeof conf.effects.glass.background === 'string' &&
    typeof conf.effects.glass.blur === 'string' &&
    typeof conf.effects.glass.border === 'string'
  );
};