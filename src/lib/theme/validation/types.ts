import { z } from "zod";
import type { Theme, ThemeEffects } from "@/types/theme";
import type { Json } from "@/integrations/supabase/types";

export type ValidationSeverity = "error" | "warning" | "info";

export interface ValidationRule {
  id: string;
  name: string;
  type: string;
  severity: ValidationSeverity;
  validate: (theme: Theme, effects: ThemeEffects) => boolean;
  message: string;
}

export interface ValidationViolation {
  ruleId: string;
  ruleName: string;
  message: string;
  severity: ValidationSeverity;
}

export interface ValidationResult {
  valid: boolean;
  violations: ValidationViolation[];
}

export interface ThemeUsageLog {
  componentName: string;
  themeName: string;
  effectsUsed: string[];
  validationResults: ValidationResult;
  pagePath: string;
}

// Helper function to convert ValidationResult to Json type
export function validationResultToJson(result: ValidationResult): Json {
  return {
    valid: result.valid,
    violations: result.violations.map(v => ({
      ruleId: v.ruleId,
      ruleName: v.ruleName,
      message: v.message,
      severity: v.severity
    }))
  };
}

// Helper function to convert effects used to Json type
export function effectsToJson(effects: string[]): Json {
  return effects;
}