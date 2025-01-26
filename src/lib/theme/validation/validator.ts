import { supabase } from "@/integrations/supabase/client";
import type { Theme, ThemeEffects } from "@/types/theme";
import type { ValidationResult, ThemeUsageLog } from "./types";
import { themeValidationRules } from "./rules";

export class ThemeValidator {
  static async validateTheme(theme: Theme, effects: ThemeEffects): Promise<ValidationResult> {
    const violations = [];

    for (const rule of themeValidationRules) {
      const isValid = rule.validate(theme, effects);
      if (!isValid) {
        violations.push({
          rule,
          message: rule.message,
          severity: rule.severity
        });
      }
    }

    return {
      valid: violations.length === 0,
      violations
    };
  }

  static async logThemeUsage(log: ThemeUsageLog) {
    try {
      const { error } = await supabase
        .from('theme_usage_logs')
        .insert({
          component_name: log.componentName,
          theme_id: log.themeName,
          effects_used: log.effectsUsed,
          validation_results: log.validationResults,
          page_path: log.pagePath
        });

      if (error) throw error;
    } catch (error) {
      console.error('Error logging theme usage:', error);
    }
  }
}