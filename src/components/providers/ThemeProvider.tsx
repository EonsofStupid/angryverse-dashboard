import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useThemeStore } from '@/store/useThemeStore';
import { ThemeContext } from '@/hooks/useTheme';
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