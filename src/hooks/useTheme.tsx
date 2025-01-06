import { useContext, createContext } from 'react';
import { Theme } from '@/types/theme';
import { useThemeStore } from '@/store/useThemeStore';

interface ThemeContextValue {
  currentTheme: Theme | null;
  isLoading: boolean;
  error: string | null;
  setCurrentTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}

export function useThemeVariables() {
  const { currentTheme } = useTheme();
  
  const applyThemeVariables = () => {
    if (!currentTheme) return;
    
    const root = document.documentElement;
    const { colors, effects } = currentTheme.configuration;

    // Apply colors
    Object.entries(colors.cyber).forEach(([key, value]) => {
      if (typeof value === 'object') {
        Object.entries(value).forEach(([subKey, subValue]) => {
          root.style.setProperty(
            `--cyber-${key}-${subKey.toLowerCase()}`,
            subValue
          );
        });
      } else {
        root.style.setProperty(`--cyber-${key}`, value);
      }
    });

    // Apply glass effect properties
    Object.entries(effects.glass).forEach(([key, value]) => {
      root.style.setProperty(`--glass-${key}`, value);
    });
  };

  return { applyThemeVariables };
}