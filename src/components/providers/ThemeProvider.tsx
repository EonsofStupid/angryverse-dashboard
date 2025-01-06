import { useEffect, useCallback } from 'react';
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
    setCurrentTheme,
  } = useThemeStore();
  const location = useLocation();
  const { toast } = useToast();
  const { applyThemeVariables } = useThemeVariables();

  // Memoize theme application to prevent unnecessary re-renders
  const applyTheme = useCallback(() => {
    if (currentTheme) {
      applyThemeVariables();
    }
  }, [currentTheme, applyThemeVariables]);

  // Apply theme variables when the current theme changes
  useEffect(() => {
    let mounted = true;
    
    if (mounted) {
      applyTheme();
    }

    return () => {
      mounted = false;
    };
  }, [applyTheme]);

  const value = {
    currentTheme,
    isLoading,
    error,
    setCurrentTheme,
    fetchPageTheme,
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};