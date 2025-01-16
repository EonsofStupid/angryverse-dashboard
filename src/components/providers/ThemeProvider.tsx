import { useThemeStore } from "@/store/useThemeStore";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useAuthStore } from "@/store/useAuthStore";
import { createContext } from "react";
import type { Theme } from "@/types/theme";

export const ThemeContext = createContext<{
  theme: Theme | null;
  setTheme: (theme: Theme) => void;
  currentTheme: Theme | null;
  isLoading: boolean;
  error: Error | null;
  setCurrentTheme: (theme: Theme) => void;
} | null>(null);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const { 
    theme, 
    setTheme, 
    currentTheme, 
    isLoading, 
    error, 
    setCurrentTheme, 
    fetchPageTheme 
  } = useThemeStore();
  const { isAdmin } = useAuthStore();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname) {
      fetchPageTheme(location.pathname);
    }
  }, [location.pathname, fetchPageTheme]);

  const value = {
    theme,
    setTheme,
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
}