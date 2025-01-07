import { useEffect, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import { useThemeStore } from '@/store/useThemeStore';
import { ThemeContext } from '@/hooks/useTheme';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import type { Theme, ThemeConfiguration } from '@/types/theme';

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
    if (!currentTheme?.configuration) return;

    const root = document.documentElement;
    const { colors, effects } = currentTheme.configuration;

    // Apply glass effect variables
    if (effects?.glass) {
      const { background, blur, border, blur_levels, opacity_levels, border_styles } = effects.glass;
      
      // Set glass effect CSS variables
      root.style.setProperty('--glass-blur', blur || 'md');
      root.style.setProperty('--glass-opacity', '0.3');
      root.style.setProperty('--glass-border', border || '1px solid rgba(255, 255, 255, 0.1)');
      
      if (blur_levels) {
        blur_levels.forEach((level, index) => {
          root.style.setProperty(`--glass-blur-${index}`, level);
        });
      }
      
      if (opacity_levels) {
        opacity_levels.forEach((level, index) => {
          root.style.setProperty(`--glass-opacity-${index}`, String(level));
        });
      }
      
      if (border_styles) {
        Object.entries(border_styles).forEach(([key, value]) => {
          root.style.setProperty(`--glass-border-${key}`, value);
        });
      }
    }

    // Apply color variables
    if (colors?.cyber) {
      Object.entries(colors.cyber).forEach(([key, value]) => {
        if (typeof value === 'string') {
          root.style.setProperty(`--cyber-${key}`, value);
        } else if (typeof value === 'object' && value !== null) {
          Object.entries(value).forEach(([subKey, subValue]) => {
            if (typeof subValue === 'string') {
              root.style.setProperty(
                `--cyber-${key}-${subKey.toLowerCase()}`,
                subValue
              );
            }
          });
        }
      });
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
          setCurrentTheme(themeData);
        } else {
          const { data: defaultTheme, error: defaultError } = await supabase
            .from('themes')
            .select('*')
            .eq('is_default', true)
            .maybeSingle();

          if (defaultError) throw defaultError;
          if (defaultTheme) {
            const themeData = defaultTheme as unknown as Theme;
            setCurrentTheme(themeData);
          }
        }

        applyThemeVariables();
      } catch (error) {
        console.error('Failed to initialize theme:', error);
        toast({
          title: "Theme Error",
          description: "Failed to load theme. Using default theme.",
          variant: "destructive",
        });
      }
    };

    initializeTheme();
  }, [location.pathname, setCurrentTheme, toast, applyThemeVariables]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background text-foreground">
        <div className="text-center space-y-4">
          <p className="text-xl font-semibold text-destructive">Theme Error</p>
          <p className="text-muted-foreground">{error.message}</p>
        </div>
      </div>
    );
  }

  const value = {
    currentTheme,
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