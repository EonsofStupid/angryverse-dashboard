import { useEffect, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import { useThemeStore } from '@/store/useThemeStore';
import { ThemeContext } from '@/hooks/useTheme';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuthStore } from '@/store/useAuthStore';
import { useRoleCheck } from '@/hooks/useRoleCheck';
import { Theme } from '@/types/theme';
import { isValidThemeColor } from '@/types/theme/utils/css';

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
    console.log('Theme Application Start:', {
      currentTheme,
      isAdminRoute,
      themeMode: theme,
      route: location.pathname
    });

    if (!currentTheme?.configuration) {
      console.warn('No theme configuration found');
      return;
    }
    
    const root = document.documentElement;
    
    // Log theme mode application
    if (theme === 'dark') {
      root.classList.add('dark');
      console.log('Applied dark mode class');
    } else {
      root.classList.remove('dark');
      console.log('Removed dark mode class');
    }

    // Log route-specific theme class application
    console.log('Applying route theme:', {
      isAdminRoute,
      addingClass: isAdminRoute ? 'admin-theme' : 'site-theme',
      removingClass: isAdminRoute ? 'site-theme' : 'admin-theme'
    });

    if (isAdminRoute) {
      root.classList.add('admin-theme');
      root.classList.remove('site-theme');
    } else {
      root.classList.add('site-theme');
      root.classList.remove('admin-theme');
    }

    // Log current classes on root
    console.log('Current root classes:', root.classList.toString());

    // Apply and log colors
    const { colors } = currentTheme.configuration;
    console.log('Applying theme colors:', colors);

    if (colors?.cyber) {
      Object.entries(colors.cyber).forEach(([key, value]) => {
        if (typeof value === 'string' && isValidThemeColor(value)) {
          const variableName = `--theme-colors-cyber-${key}`;
          root.style.setProperty(variableName, value);
          console.log(`Set color variable: ${variableName} = ${value}`);
        } else if (typeof value === 'object' && value !== null) {
          Object.entries(value).forEach(([subKey, subValue]) => {
            if (typeof subValue === 'string' && isValidThemeColor(subValue)) {
              const variableName = `--theme-colors-cyber-${key}-${subKey.toLowerCase()}`;
              root.style.setProperty(variableName, subValue);
              console.log(`Set nested color variable: ${variableName} = ${subValue}`);
            }
          });
        }
      });
    }

    // Log computed styles for verification
    const computedStyle = getComputedStyle(root);
    console.log('Computed theme colors:', {
      dark: computedStyle.getPropertyValue('--theme-colors-cyber-dark'),
      primary: computedStyle.getPropertyValue('--theme-colors-cyber-pink'),
      secondary: computedStyle.getPropertyValue('--theme-colors-cyber-cyan'),
      background: computedStyle.getPropertyValue('--background'),
      foreground: computedStyle.getPropertyValue('--foreground')
    });
  }, [currentTheme, theme, isAdminRoute, location.pathname]);

  useEffect(() => {
    const initializeTheme = async () => {
      console.log('Theme initialization start:', {
        currentRoute: location.pathname,
        isAdminRoute,
        currentTheme: currentTheme?.name
      });

      try {
        console.log('Fetching theme data...');
        const { data: themeData, error: themeError } = await supabase
          .from('themes')
          .select('*')
          .eq(isAdminRoute ? 'name' : 'is_default', isAdminRoute ? 'Admin Theme' : true)
          .maybeSingle();

        console.log('Theme query result:', { themeData, themeError });

        if (themeError) {
          console.error('Error fetching theme:', themeError);
          throw themeError;
        }

        if (themeData) {
          console.log('Processing theme data:', themeData);
          const theme = themeData as Theme;
          setCurrentTheme(theme);
          console.log('Theme set successfully:', theme.name);
        } else {
          console.log('No theme found, checking page-specific theme...');
          const { data: pageTheme, error: pageError } = await supabase
            .from('page_themes')
            .select(`
              theme_id,
              themes (*)
            `)
            .eq('page_path', location.pathname)
            .maybeSingle();

          console.log('Page theme query result:', { pageTheme, pageError });

          if (pageError) {
            console.error('Error fetching page theme:', pageError);
            throw pageError;
          }

          if (pageTheme?.themes) {
            console.log('Setting page-specific theme:', pageTheme.themes);
            const theme = pageTheme.themes as Theme;
            setCurrentTheme(theme);
          }
        }

        await applyThemeVariables();
        console.log('Theme initialization complete');

      } catch (error) {
        console.error('Theme initialization failed:', error);
        toast({
          title: "Theme Error",
          description: "Using fallback theme due to connection issues.",
          variant: "destructive",
        });
      }
    };

    initializeTheme();
  }, [location.pathname, setCurrentTheme, toast, applyThemeVariables, isAdminRoute]);

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