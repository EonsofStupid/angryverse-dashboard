import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useThemeStore } from '@/store/useThemeStore';
import { ThemeContext } from '@/hooks/useTheme';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';
import { useAuthStore } from '@/store/useAuthStore';
import { useRoleCheck } from '@/hooks/useRoleCheck';
import { applyThemeVariables } from '@/utils/theme/applyTheme';
import { initializeTheme } from '@/utils/theme/initializeTheme';

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const { toast } = useToast();
  const { user } = useAuthStore();
  const { hasRole: isAdmin } = useRoleCheck(user, 'admin');
  const [isInitialized, setIsInitialized] = useState(false);
  
  const {
    currentTheme,
    setCurrentTheme,
    isLoading,
    error,
    fetchPageTheme
  } = useThemeStore();

  useEffect(() => {
    if (!isInitialized) {
      console.log('Initializing theme...');
      const init = async () => {
        try {
          const theme = await initializeTheme(location.pathname);
          setCurrentTheme(theme);
          setIsInitialized(true);
        } catch (error) {
          console.error('Theme initialization failed:', error);
          toast({
            title: "Theme Error",
            description: "Failed to load theme configuration",
            variant: "destructive"
          });
        }
      };
      init();
    }
  }, [isInitialized, location.pathname, setCurrentTheme, toast]);

  useEffect(() => {
    if (currentTheme?.configuration) {
      console.log('Applying theme variables:', currentTheme.configuration);
      applyThemeVariables(currentTheme);
    }
  }, [currentTheme]);

  const value = {
    currentTheme,
    isLoading,
    error,
    setCurrentTheme,
    fetchPageTheme,
    isAdmin,
    applyThemeVariables: () => applyThemeVariables(currentTheme)
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
      
      {error && (
        <div className="fixed top-4 right-4 bg-destructive/80 text-destructive-foreground p-2 rounded-md">
          Theme error: {error.message}
        </div>
      )}
    </ThemeContext.Provider>
  );
};
