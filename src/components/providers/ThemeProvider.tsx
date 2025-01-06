import { useEffect, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import { useThemeStore } from '@/store/useThemeStore';
import { ThemeContext, createThemeVariables } from '@/hooks/useTheme';
import { useToast } from '@/hooks/use-toast';

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