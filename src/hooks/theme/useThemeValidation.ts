import { useEffect } from 'react';
import { useTheme } from '@/hooks/useTheme';
import { ThemeValidator } from '@/lib/theme/validation/validator';
import { useLocation } from 'react-router-dom';

export const useThemeValidation = (componentName: string) => {
  const { currentTheme } = useTheme();
  const location = useLocation();

  useEffect(() => {
    if (!currentTheme?.configuration?.effects) return;

    const validateAndLog = async () => {
      const validationResult = await ThemeValidator.validateTheme(
        currentTheme,
        currentTheme.configuration.effects
      );

      await ThemeValidator.logThemeUsage({
        componentName,
        themeName: currentTheme.name,
        effectsUsed: Object.keys(currentTheme.configuration.effects),
        validationResults: validationResult,
        timestamp: new Date().toISOString(),
        pagePath: location.pathname
      });

      if (!validationResult.valid) {
        console.warn(
          `Theme validation warnings for ${componentName}:`,
          validationResult.violations
        );
      }
    };

    validateAndLog();
  }, [currentTheme, componentName, location.pathname]);

  return null;
};