import { useEffect, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import { useThemeStore } from '@/store/useThemeStore';
import { ThemeContext } from '@/hooks/useTheme';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

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

  // Apply theme variables based on configuration
  const applyThemeVariables = useCallback(() => {
    if (!currentTheme?.configuration) return;

    const root = document.documentElement;
    const { colors, effects } = currentTheme.configuration;

    // Apply glass effect variables
    if (effects?.glass) {
      const { blur_levels, opacity_levels, border_styles } = effects.glass;
      
      // Set glass effect CSS variables
      root.style.setProperty('--glass-blur', blur_levels?.[2] || 'md'); // Default to medium blur
      root.style.setProperty('--glass-opacity', String(opacity_levels?.[2] || 0.3)); // Default to medium opacity
      
      if (border_styles?.light) {
        root.style.setProperty('--glass-border', border_styles.light);
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

  // Initialize theme on mount and route changes
  useEffect(() => {
    const initializeTheme = async () => {
      try {
        // First try to get page-specific theme
        const { data: pageTheme, error: pageError } = await supabase
          .from('page_themes')
          .select(`
            theme_id,
            themes (*)
          `)
          .eq('page_path', location.pathname)
          .maybeSingle();

        if (pageError) throw pageError;

        // If no page theme, get default theme
        if (!pageTheme) {
          const { data: defaultTheme, error: defaultError } = await supabase
            .from('themes')
            .select('*')
            .eq('is_default', true)
            .maybeSingle();

          if (defaultError) throw defaultError;
          if (defaultTheme) {
            setCurrentTheme(defaultTheme);
          }
        } else if (pageTheme.themes) {
          setCurrentTheme(pageTheme.themes);
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

  // Show loading state
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  // Show error state
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