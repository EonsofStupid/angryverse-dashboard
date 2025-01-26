import { supabase } from "@/integrations/supabase/client";
import type { Theme, ThemeEffects } from "@/types/theme";
import type { ValidationResult, ThemeUsageLog } from "./types";
import { themeValidationRules } from "./rules";
import { validationResultToJson, effectsToJson } from "./types";

export class ThemeValidator {
  static async validateTheme(theme: Theme, effects: ThemeEffects): Promise<ValidationResult> {
    const violations = [];

    for (const rule of themeValidationRules) {
      const isValid = rule.validate(theme, effects);
      if (!isValid) {
        violations.push({
          ruleId: rule.id,
          ruleName: rule.name,
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
          theme_id: log.themeId,
          effects_used: effectsToJson(log.effectsUsed),
          validation_results: validationResultToJson(log.validationResults),
          page_path: log.pagePath
        });

      if (error) {
        console.error('Error logging theme usage:', error);
        throw error;
      }
    } catch (error) {
      console.error('Error logging theme usage:', error);
    }
  }
}