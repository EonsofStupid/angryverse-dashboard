import { useEffect, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import { useThemeStore } from '@/store/useThemeStore';
import { ThemeContext } from '@/hooks/useTheme';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuthStore } from '@/store/useAuthStore';
import { useRoleCheck } from '@/hooks/useRoleCheck';
import { Theme, DatabaseTheme, convertDatabaseTheme } from '@/types/theme';

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

  const isAdminRoute = location.pathname.startsWith('/admin');

  const applyThemeVariables = useCallback(() => {
    if (!currentTheme?.configuration) {
      console.log('No theme configuration found');
      return;
    }
    
    console.log('Applying theme:', currentTheme);
    const root = document.documentElement;
    
    // Apply theme mode class
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }

    // Apply route-specific theme class
    if (isAdminRoute) {
      root.classList.add('admin-theme');
      root.classList.remove('site-theme');
    } else {
      root.classList.add('site-theme');
      root.classList.remove('admin-theme');
    }

    // Apply colors from theme configuration
    const { colors } = currentTheme.configuration;
    if (colors?.cyber) {
      Object.entries(colors.cyber).forEach(([key, value]) => {
        if (typeof value === 'string') {
          root.style.setProperty(`--theme-colors-cyber-${key}`, value);
          console.log(`Setting color: --theme-colors-cyber-${key}:`, value);
        } else if (typeof value === 'object' && value !== null) {
          Object.entries(value).forEach(([subKey, subValue]) => {
            root.style.setProperty(
              `--theme-colors-cyber-${key}-${subKey.toLowerCase()}`,
              subValue as string
            );
            console.log(`Setting color: --theme-colors-cyber-${key}-${subKey.toLowerCase()}:`, subValue);
          });
        }
      });
    }

    // Apply effect configurations
    const { effects } = currentTheme.configuration;
    if (effects?.glass) {
      const { background, blur, border } = effects.glass;
      root.style.setProperty('--glass-background', background);
      root.style.setProperty('--glass-blur', blur);
      root.style.setProperty('--glass-border', border);
      console.log('Applied glass effects:', { background, blur, border });
    }
  }, [currentTheme, theme, isAdminRoute]);

  useEffect(() => {
    const initializeTheme = async () => {
      try {
        console.log('Fetching theme...');
        // Fetch theme based on route type
        const { data: themeData, error: themeError } = await supabase
          .from('themes')
          .select('*')
          .eq(isAdminRoute ? 'name' : 'is_default', isAdminRoute ? 'Admin Theme' : true)
          .maybeSingle();

        if (themeError) {
          console.error('Error fetching theme:', themeError);
          throw themeError;
        }

        if (themeData) {
          console.log('Fetched theme data:', themeData);
          const convertedTheme = convertDatabaseTheme(themeData as DatabaseTheme);
          setCurrentTheme(convertedTheme);
        } else {
          console.log('No theme found, checking page-specific theme...');
        }

        // If no theme found, check for page-specific theme
        if (!currentTheme) {
          const { data: pageTheme, error: pageError } = await supabase
            .from('page_themes')
            .select(`
              theme_id,
              themes (*)
            `)
            .eq('page_path', location.pathname)
            .maybeSingle();

          if (pageError) {
            console.error('Error fetching page theme:', pageError);
            throw pageError;
          }

          if (pageTheme?.themes) {
            console.log('Fetched page-specific theme:', pageTheme.themes);
            setCurrentTheme(convertDatabaseTheme(pageTheme.themes as DatabaseTheme));
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
  }, [location.pathname, setCurrentTheme, toast, applyThemeVariables, isAdminRoute, currentTheme]);

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
      {isLoading && (
        <div className="fixed top-4 right-4 flex items-center gap-2 bg-background/80 p-2 rounded-md">
          <Loader2 className="h-4 w-4 animate-spin text-primary" />
          <span className="text-sm">Loading theme...</span>
        </div>
      )}
    </ThemeContext.Provider>
  );
};