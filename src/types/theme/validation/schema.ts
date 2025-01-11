import { z } from 'zod';

// Base effect state schema
const effectStateSchema = z.object({
  enabled: z.boolean().optional(),
  priority: z.enum(['database', 'fallback', 'hybrid']).optional(),
  source: z.enum(['database', 'fallback']).optional()
});

// Glass effects schema
const glassEffectsSchema = effectStateSchema.extend({
  background: z.string(),
  blur: z.string(),
  border: z.string(),
  blur_levels: z.array(z.string()).optional(),
  opacity_levels: z.array(z.number()).optional(),
  border_styles: z.object({
    light: z.string(),
    medium: z.string(),
    heavy: z.string()
  }).optional()
});

// Animation timing schema
const animationTimingSchema = z.object({
  fast: z.string(),
  normal: z.string(),
  slow: z.string(),
  very_slow: z.string()
});

// Animation curves schema
const animationCurvesSchema = z.object({
  linear: z.string(),
  ease_out: z.string(),
  ease_in: z.string(),
  ease_in_out: z.string()
});

// Hover effects schema
const hoverEffectsSchema = effectStateSchema.extend({
  scale: z.number(),
  lift: z.string(),
  glow_strength: z.string(),
  transition_duration: z.string(),
  glow_color: z.string().optional(),
  glow_opacity: z.number().optional(),
  glow_spread: z.string().optional(),
  glow_blur: z.string().optional()
});

// Theme effects schema
const themeEffectsSchema = z.object({
  glass: glassEffectsSchema,
  hover: hoverEffectsSchema.optional(),
  animations: z.object({
    timing: animationTimingSchema,
    curves: animationCurvesSchema
  }).optional()
});

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

// Theme configuration schema
export const themeConfigurationSchema = z.object({
  colors: colorSchema,
  typography: typographySchema,
  effects: themeEffectsSchema
});

// Database theme row schema
export const databaseThemeRowSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  description: z.string().optional(),
  is_default: z.boolean(),
  status: z.enum(['active', 'inactive', 'draft']),
  configuration: z.unknown(),
  created_by: z.string().uuid().optional(),
  created_at: z.string().datetime().optional(),
  updated_at: z.string().datetime().optional()
});

// Types inferred from schemas
export type ThemeConfiguration = z.infer<typeof themeConfigurationSchema>;
export type DatabaseThemeRow = z.infer<typeof databaseThemeRowSchema>;

// Theme transformation function
export const transformDatabaseThemeRow = (row: DatabaseThemeRow) => {
  try {
    const configuration = themeConfigurationSchema.parse(row.configuration);
    return {
      ...row,
      configuration
    };
  } catch (error) {
    console.error('Invalid theme configuration:', error);
    throw new Error('Failed to validate theme configuration');
  }
};