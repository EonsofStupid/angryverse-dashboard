import { z } from 'zod';
import type { Theme } from '../core';

// Base effect state schema
const effectStateSchema = z.object({
  enabled: z.boolean(),
  priority: z.enum(['database', 'fallback', 'hybrid']),
  source: z.enum(['database', 'fallback'])
}).strict();

// Animation timing and curves
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

// Hover effects
const hoverEffectsSchema = effectStateSchema.extend({
  scale: z.number(),
  lift: z.string(),
  glow_strength: z.string(),
  transition_duration: z.string(),
  glow_color: z.string().optional(),
  glow_opacity: z.number().optional(),
  glow_spread: z.string().optional(),
  glow_blur: z.string().optional(),
  shadow_normal: z.string().optional(),
  shadow_hover: z.string().optional()
});

// Glass effects
const glassEffectsSchema = effectStateSchema.extend({
  background: z.string(),
  blur: z.string(),
  border: z.string(),
  shadow_composition: z.object({
    offset_y: z.string(),
    blur_radius: z.string(),
    spread_radius: z.string(),
    opacity: z.number()
  }).optional()
});

// Theme effects
const themeEffectsSchema = z.object({
  glass: glassEffectsSchema,
  hover: hoverEffectsSchema,
  animations: z.object({
    timing: animationTimingSchema,
    curves: animationCurvesSchema
  })
}).strict();

// Colors schema
const colorSchema = z.object({
  cyber: z.object({
    dark: z.string(),
    pink: z.object({
      DEFAULT: z.string(),
      hover: z.string()
    }),
    cyan: z.object({
      DEFAULT: z.string(),
      hover: z.string()
    }),
    purple: z.string(),
    green: z.object({
      DEFAULT: z.string(),
      hover: z.string()
    }),
    yellow: z.object({
      DEFAULT: z.string(),
      hover: z.string()
    })
  })
});

// Typography schema
const typographySchema = z.object({
  fonts: z.object({
    sans: z.array(z.string()),
    cyber: z.array(z.string())
  })
});

export const themeConfigurationSchema = z.object({
  colors: colorSchema,
  typography: typographySchema,
  effects: themeEffectsSchema
});

export type ThemeConfiguration = z.infer<typeof themeConfigurationSchema>;

export function transformDatabaseThemeRow(row: any): Theme {
  const validatedConfig = themeConfigurationSchema.parse(row.configuration);
  
  return {
    id: row.id,
    name: row.name,
    description: row.description,
    is_default: row.is_default,
    status: row.status,
    configuration: validatedConfig,
    created_by: row.created_by,
    created_at: row.created_at?.toISOString(),
    updated_at: row.updated_at?.toISOString()
  };
}