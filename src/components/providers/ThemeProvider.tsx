import { useEffect, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import { useThemeStore } from '@/store/useThemeStore';
import { ThemeContext, createThemeVariables } from '@/hooks/useTheme';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';

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

  // Memoize theme application to prevent unnecessary re-renders
  const applyThemeVariables = useCallback(() => {
    if (currentTheme) {
      createThemeVariables(currentTheme);
    }
  }, [currentTheme]);

  // Apply theme variables when the current theme changes
  useEffect(() => {
    if (currentTheme) {
      applyThemeVariables();
    }
  }, [applyThemeVariables, currentTheme]);

  // Initialize theme on mount and route changes
  useEffect(() => {
    const initializeTheme = async () => {
      try {
        await fetchPageTheme(location.pathname);
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
  }, [location.pathname, fetchPageTheme, toast]);

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