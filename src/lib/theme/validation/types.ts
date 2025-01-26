import { z } from "zod";
import type { Theme, ThemeEffects } from "@/types/theme";

export type ValidationSeverity = "error" | "warning" | "info";

export interface ValidationRule {
  id: string;
  name: string;
  type: string;
  severity: ValidationSeverity;
  validate: (theme: Theme, effects: ThemeEffects) => boolean;
  message: string;
}

export interface ValidationResult {
  valid: boolean;
  violations: Array<{
    rule: ValidationRule;
    message: string;
    severity: ValidationSeverity;
  }>;
}

export interface ThemeUsageLog {
  componentName: string;
  themeName: string;
  effectsUsed: string[];
  validationResults: ValidationResult;
  timestamp: string;
  pagePath: string;
}