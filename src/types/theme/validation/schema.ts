// src/types/theme/validation/schema.ts
import { z } from 'zod';
import type { Theme, ThemeStatus } from '../types';

// Base effect state schema - all required
const effectStateSchema = z.object({
  enabled: z.boolean(),
  priority: z.enum(['database', 'fallback', 'hybrid']),
  source: z.enum(['database', 'fallback'])
}).strict();

// Animation timing and curves - all required
const animationTimingSchema = z.object({
  fast: z.string(),
  normal: z.string(),
  slow: z.string(),
  very_slow: z.string()
}).strict();

const animationCurvesSchema = z.object({
  linear: z.string(),
  ease_out: z.string(),
  ease_in: z.string(),
  ease_in_out: z.string()
}).strict();

// Hover effects - all required
const hoverEffectsSchema = effectStateSchema.extend({
  scale: z.number(),
  lift: z.string(),
  glow_strength: z.string(),
  transition_duration: z.string(),
  glow_color: z.string(),
  glow_opacity: z.number(),
  glow_spread: z.string(),
  glow_blur: z.string(),
  shadow_normal: z.string(),
  shadow_hover: z.string()
});

// Glass effects - all required
const glassEffectsSchema = effectStateSchema.extend({
  background: z.string(),
  blur: z.string(),
  border: z.string(),
  shadow_composition: z.object({
    offset_y: z.string(),
    blur_radius: z.string(),
    spread_radius: z.string(),
    opacity: z.number()
  }).strict()
});

// Theme effects - all core effects required
const themeEffectsSchema = z.object({
  glass: glassEffectsSchema,
  hover: hoverEffectsSchema,
  animations: z.object({
    timing: animationTimingSchema,
    curves: animationCurvesSchema
  }).strict()
}).strict();

// Colors schema - all required
const colorSchema = z.object({
  cyber: z.object({
    dark: z.string(),
    pink: z.object({
      DEFAULT: z.string(),
      hover: z.string()
    }).strict(),
    cyan: z.object({
      DEFAULT: z.string(),
      hover: z.string()
    }).strict(),
    purple: z.string(),
    green: z.object({
      DEFAULT: z.string(),
      hover: z.string()
    }).strict(),
    yellow: z.object({
      DEFAULT: z.string(),
      hover: z.string()
    }).strict()
  }).strict()
}).strict();

// Typography schema - all required
const typographySchema = z.object({
  fonts: z.object({
    sans: z.array(z.string()),
    cyber: z.array(z.string())
  }).strict()
}).strict();

// Complete theme configuration schema
export const themeConfigurationSchema = z.object({
  colors: colorSchema,
  typography: typographySchema,
  effects: themeEffectsSchema
}).strict();

// Database row validation
export const databaseThemeRowSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  description: z.string().optional(),
  is_default: z.boolean(),
  status: z.enum(['active', 'inactive', 'draft']),
  configuration: themeConfigurationSchema,
  created_by: z.string().uuid().optional(),
  // Convert string-based datetimes into real JS Dates
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional()
}).strict();

// Type inference
export type ThemeConfiguration = z.infer<typeof themeConfigurationSchema>;
export type DatabaseThemeRow = z.infer<typeof databaseThemeRowSchema>;

// Transform function
export const transformDatabaseThemeRow = (row: DatabaseThemeRow): Theme => {
  // Validate the configuration
  const validatedConfig = themeConfigurationSchema.parse(row.configuration);

  return {
    id: row.id,
    name: row.name,
    description: row.description,
    is_default: row.is_default,
    status: row.status as ThemeStatus,
    configuration: validatedConfig,
    created_by: row.created_by,
    created_at: row.created_at,
    updated_at: row.updated_at
  };
};