import { supabase } from "@/integrations/supabase/client";
import type { Theme, ThemeEffects } from "@/types/theme";
import type { ValidationResult, ThemeUsageLog } from "./types";
import { themeValidationRules } from "./rules";
import { validationResultToJson, effectsToJson } from "./types";
import { useAuthStore } from "@/store/useAuthStore";

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
      // Get the current user's role
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        console.warn('Theme usage logging skipped - no authenticated user');
        return;
      }

      const { data: roles } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', user.id)
        .single();

      // Only attempt to log if user is admin
      if (roles?.role === 'admin') {
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
        }
      } else {
        console.info('Theme usage logging skipped - user is not admin');
      }
    } catch (error) {
      console.error('Error logging theme usage:', error);
    }
  }
}