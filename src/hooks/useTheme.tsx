import { createContext, useContext } from 'react';
import { useThemeStore } from '@/store/useThemeStore';

export interface ThemeContextType {
  currentTheme: Theme | null;
  isLoading: boolean;
  error: Error | null;
  setCurrentTheme: (theme: Theme | null) => void;
  fetchPageTheme: (path: string) => Promise<void>;
  theme: string;
  setTheme: (theme: string) => void;
}

export const ThemeContext = createContext<ThemeContextType | null>(null);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const useThemeVariables = () => {
  const { currentTheme } = useTheme();

  const applyThemeVariables = () => {
    if (!currentTheme?.configuration) {
      console.warn('No theme configuration available');
      return;
    }

    const root = document.documentElement;
    const { colors, effects } = currentTheme.configuration;

    // Apply color variables
    Object.entries(colors.cyber).forEach(([key, value]) => {
      if (typeof value === 'string') {
        root.style.setProperty(`--cyber-${key}`, value);
      } else if (typeof value === 'object') {
        Object.entries(value).forEach(([subKey, subValue]) => {
          root.style.setProperty(`--cyber-${key}-${subKey}`, subValue as string);
        });
      }
    });

    // Apply glass effect variables
    Object.entries(effects.glass).forEach(([key, value]) => {
      root.style.setProperty(`--glass-${key}`, value);
    });
  };

  return { applyThemeVariables };
};