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
      console.log('Applied admin theme class');
    } else {
      root.classList.add('site-theme');
      root.classList.remove('admin-theme');
      console.log('Applied site theme class');
    }

    // Apply colors from theme configuration
    const { colors } = currentTheme.configuration;
    if (colors?.cyber) {
      Object.entries(colors.cyber).forEach(([key, value]) => {
        if (typeof value === 'string' && isValidThemeColor(value)) {
          const variableName = `--theme-colors-cyber-${key}`;
          root.style.setProperty(variableName, value);
          console.log(`Setting color: ${variableName}:`, value);
        } else if (typeof value === 'object' && value !== null) {
          Object.entries(value).forEach(([subKey, subValue]) => {
            if (typeof subValue === 'string' && isValidThemeColor(subValue)) {
              const variableName = `--theme-colors-cyber-${key}-${subKey.toLowerCase()}`;
              root.style.setProperty(variableName, subValue);
              console.log(`Setting color: ${variableName}:`, subValue);
            }
          });
        }
      });
    }

    // Debug output of applied colors
    const computedStyle = getComputedStyle(root);
    console.log('Applied colors:', {
      dark: computedStyle.getPropertyValue('--theme-colors-cyber-dark'),
      primary: computedStyle.getPropertyValue('--theme-colors-cyber-pink'),
      secondary: computedStyle.getPropertyValue('--theme-colors-cyber-cyan'),
    });
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
