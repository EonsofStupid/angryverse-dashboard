import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useThemeStore } from '@/store/useThemeStore';

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const { fetchPageTheme } = useThemeStore();
  const location = useLocation();

  useEffect(() => {
    // Fetch theme for current page
    fetchPageTheme(location.pathname);
  }, [location.pathname, fetchPageTheme]);

  return <>{children}</>;
};