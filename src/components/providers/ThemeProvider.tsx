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
  setCurrentTheme: (theme: Theme) => void;
} | null>(null);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const { 
    currentTheme, 
    setCurrentTheme, 
    isLoading, 
    error, 
    fetchPageTheme,
    theme: colorMode
  } = useThemeStore();
  const { isAdmin } = useAuthStore();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname) {
      fetchPageTheme(location.pathname);
    }
  }, [location.pathname, fetchPageTheme]);

  useEffect(() => {
    if (currentTheme?.configuration) {
      const root = document.documentElement;
      const { colors, effects } = currentTheme.configuration;
      
      // Set color mode
      root.setAttribute('data-theme', colorMode);
      
      // Apply theme colors
      if (colors?.cyber) {
        root.style.setProperty('--theme-colors-cyber-dark', colors.cyber.dark);
        root.style.setProperty('--theme-colors-cyber-pink', colors.cyber.pink.DEFAULT);
        root.style.setProperty('--theme-colors-cyber-pink-hover', colors.cyber.pink.hover);
        root.style.setProperty('--theme-colors-cyber-cyan', colors.cyber.cyan.DEFAULT);
        root.style.setProperty('--theme-colors-cyber-cyan-hover', colors.cyber.cyan.hover);
        root.style.setProperty('--theme-colors-cyber-purple', colors.cyber.purple);
      }

      // Apply effects
      if (effects?.glass) {
        root.style.setProperty('--glass-blur', effects.glass.blur);
        root.style.setProperty('--glass-opacity', '0.1');
        root.style.setProperty('--glass-border', effects.glass.border);
      }

      // Apply hover effects
      if (effects?.hover) {
        root.style.setProperty('--hover-scale', effects.hover.scale.toString());
        root.style.setProperty('--hover-lift', effects.hover.lift);
        root.style.setProperty('--hover-glow-strength', effects.hover.glow_strength);
      }
    }
  }, [currentTheme, colorMode]);

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
}