import { ThemeProvider as NextThemeProvider } from "next-themes";
import { useThemeStore } from "@/store/useThemeStore";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useAuthStore } from "@/store/useAuthStore";
import { createContext } from "react";
import type { Theme } from "@/types/theme";

export const ThemeContext = createContext<{
  currentTheme: Theme | null;
  isLoading: boolean;
  error: Error | null;
  setCurrentTheme: (theme: Theme | null) => void;
  fetchPageTheme: (path: string) => Promise<void>;
  applyThemeVariables: () => void;
  isAdmin: boolean;
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
    // Apply different theme based on route
    if (location.pathname.startsWith("/admin") && isAdmin) {
      setTheme("admin");
    } else {
      setTheme("default");
    }
  }, [location.pathname, isAdmin, setTheme]);

  const applyThemeVariables = useCallback(() => {
    if (!currentTheme) return;
    
    // Apply theme variables to document root
    const root = document.documentElement;
    const { colors, effects } = currentTheme.configuration;
    
    if (colors.cyber) {
      root.style.setProperty('--theme-primary', colors.cyber.pink.DEFAULT);
      root.style.setProperty('--theme-primary-hover', colors.cyber.pink.hover);
      root.style.setProperty('--theme-secondary', colors.cyber.cyan.DEFAULT);
      root.style.setProperty('--theme-secondary-hover', colors.cyber.cyan.hover);
    }
    
    if (effects.glass) {
      root.style.setProperty('--glass-blur', effects.glass.blur);
      root.style.setProperty('--glass-opacity', '0.1');
      root.style.setProperty('--glass-border', effects.glass.border);
    }
  }, [currentTheme]);

  useEffect(() => {
    applyThemeVariables();
  }, [currentTheme, applyThemeVariables]);

  return (
    <ThemeContext.Provider 
      value={{
        currentTheme,
        isLoading,
        error,
        setCurrentTheme,
        fetchPageTheme,
        applyThemeVariables,
        isAdmin
      }}
    >
      <NextThemeProvider
        attribute="class"
        defaultTheme={theme}
        value={{
          default: "default",
          admin: "admin",
        }}
      >
        {children}
      </NextThemeProvider>
    </ThemeContext.Provider>
  );
}