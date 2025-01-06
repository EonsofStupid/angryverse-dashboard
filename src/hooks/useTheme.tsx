import { createContext, useContext } from 'react';
import { useThemeStore } from '@/store/useThemeStore';
import type { Theme } from '@/types/theme';

export interface ThemeContextType {
  currentTheme: Theme | null;
  isLoading: boolean;
  error: Error | null;
  setCurrentTheme: (theme: Theme | null) => void;
  fetchPageTheme: (path: string) => Promise<void>;
  theme: string;
  setTheme: (theme: string) => void;
  applyThemeVariables: () => void;
}

export const ThemeContext = createContext<ThemeContextType | null>(null);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const createThemeVariables = (currentTheme: Theme | null) => {
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
    } else if (typeof value === 'object' && value !== null) {
      Object.entries(value).forEach(([subKey, subValue]) => {
        if (typeof subValue === 'string') {
          root.style.setProperty(`--cyber-${key}-${subKey}`, subValue);
        }
      });
    }
  });

  // Apply glass effect variables
  Object.entries(effects.glass).forEach(([key, value]) => {
    if (typeof value === 'string') {
      root.style.setProperty(`--glass-${key}`, value);
    }
  });
};