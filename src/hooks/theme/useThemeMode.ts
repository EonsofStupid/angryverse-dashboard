import { useTheme } from '../useTheme';

export const useThemeMode = () => {
  const { currentTheme } = useTheme();
  
  return {
    currentTheme,
  };
};