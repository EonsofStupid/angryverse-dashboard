import { useState, useEffect } from 'react';
import { useTheme } from '@/hooks/useTheme';
import { Theme } from '@/types/theme';

export const useThemeTransition = () => {
  const { currentTheme } = useTheme();
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [previousTheme, setPreviousTheme] = useState<Theme | null>(null);

  useEffect(() => {
    if (currentTheme && previousTheme && currentTheme.id !== previousTheme.id) {
      setIsTransitioning(true);
      const timer = setTimeout(() => {
        setIsTransitioning(false);
      }, 300); // Match this with your CSS transition duration

      return () => clearTimeout(timer);
    }

    setPreviousTheme(currentTheme);
  }, [currentTheme, previousTheme]);

  return {
    isTransitioning,
    previousTheme,
    transitionClass: isTransitioning ? 'theme-transitioning' : '',
  };
};