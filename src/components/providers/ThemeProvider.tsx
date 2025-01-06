import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useThemeStore } from '@/store/useThemeStore';
import { ThemeContext, useThemeVariables } from '@/hooks/useTheme';
import { useToast } from '@/hooks/use-toast';

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const { 
    currentTheme, 
    isLoading, 
    error, 
    fetchPageTheme, 
    setCurrentTheme 
  } = useThemeStore();
  const location = useLocation();
  const { toast } = useToast();
  const { applyThemeVariables } = useThemeVariables();

  useEffect(() => {
    const loadTheme = async () => {
      try {
        await fetchPageTheme(location.pathname);
      } catch (error) {
        toast({
          title: "Error loading theme",
          description: error instanceof Error ? error.message : "Failed to load theme",
          variant: "destructive",
        });
      }
    };

    loadTheme();
  }, [location.pathname, fetchPageTheme, toast]);

  // Apply theme variables whenever the current theme changes
  useEffect(() => {
    if (currentTheme) {
      applyThemeVariables();
    }
  }, [currentTheme, applyThemeVariables]);

  const value = {
    currentTheme,
    isLoading,
    error,
    setCurrentTheme,
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};