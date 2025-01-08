import { useEffect, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import { useThemeStore } from '@/store/useThemeStore';
import { ThemeContext } from '@/hooks/useTheme';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuthStore } from '@/store/useAuthStore';
import { useRoleCheck } from '@/hooks/useRoleCheck';
import type { Theme, DatabaseTheme, convertDatabaseTheme } from '@/types/theme';

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

  const { user } = useAuthStore();
  const { hasRole: isAdmin } = useRoleCheck(user, 'admin');
  
  const location = useLocation();
  const { toast } = useToast();

  const applyThemeVariables = useCallback(() => {
    if (!currentTheme?.configuration) return;
    const root = document.documentElement;
    const { effects } = currentTheme.configuration;

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
        // Only admins can set page-specific themes
        if (isAdmin) {
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
            const themeData = convertDatabaseTheme(pageTheme.themes as DatabaseTheme);
            setCurrentTheme(themeData);
          }
        }

        // If no page theme or not admin, load default theme
        if (!currentTheme) {
          const { data: defaultThemeData, error: defaultError } = await supabase
            .from('themes')
            .select('*')
            .eq('is_default', true)
            .maybeSingle();

          if (defaultError) throw defaultError;
          
          if (defaultThemeData) {
            setCurrentTheme(convertDatabaseTheme(defaultThemeData as DatabaseTheme));
          }
        }

        applyThemeVariables();
      } catch (error) {
        console.error('Failed to initialize theme:', error);
        toast({
          title: "Theme Error",
          description: "Using fallback theme due to connection issues.",
          variant: "destructive",
        });
      }
    };

    initializeTheme();
  }, [location.pathname, setCurrentTheme, toast, applyThemeVariables, isAdmin, currentTheme]);

  const value = {
    currentTheme,
    isLoading,
    error,
    setCurrentTheme,
    fetchPageTheme,
    theme,
    setTheme,
    applyThemeVariables,
    isAdmin,
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};