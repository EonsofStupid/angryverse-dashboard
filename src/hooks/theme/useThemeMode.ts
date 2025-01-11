import { useTheme } from "@/hooks/useTheme";
import { useEffect } from "react";

export const useThemeMode = () => {
  const { currentTheme } = useTheme();

  useEffect(() => {
    const root = document.documentElement;
    if (currentTheme?.configuration?.colors?.cyber?.dark) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [currentTheme]);

  return {
    isDark: !!currentTheme?.configuration?.colors?.cyber?.dark,
    currentTheme,
  };
};