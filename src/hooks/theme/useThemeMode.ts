import { useTheme } from "@/hooks/useTheme";
import { useEffect } from "react";
import { Theme } from "@/types/theme";

export const useThemeMode = () => {
  const { theme, setTheme, currentTheme } = useTheme();

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return {
    theme,
    setTheme,
    toggleTheme,
    isDark: theme === 'dark',
    currentTheme,
  };
};