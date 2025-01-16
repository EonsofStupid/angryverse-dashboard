import { createContext, useContext } from 'react';
import type { Theme } from '@/types/theme';

export interface ThemeContextType {
  currentTheme: Theme | null;
  isLoading: boolean;
  error: Error | null;
  setCurrentTheme: (theme: Theme | null) => void;
  fetchPageTheme: (path: string) => Promise<void>;
  applyThemeVariables: () => void;
  isAdmin: boolean;
}

export const ThemeContext = createContext<ThemeContextType | null>(null);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};