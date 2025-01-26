import type { Theme, ThemeEffects } from "@/types/theme";
import type { ValidationRule } from "./types";

export const themeValidationRules: ValidationRule[] = [
  {
    id: "glass-hover-conflict",
    name: "Glass and Hover Effect Conflict",
    type: "effect-composition",
    severity: "error",
    validate: (theme: Theme, effects: ThemeEffects) => {
      if (!effects.glass || !effects.hover) return true;
      return !(effects.glass.enabled && effects.hover.scale > 1.1);
    },
    message: "Glass effect with hover scale > 1.1 can cause visual artifacts"
  },
  {
    id: "animation-performance",
    name: "Animation Performance",
    type: "performance",
    severity: "warning",
    validate: (theme: Theme, effects: ThemeEffects) => {
      if (!effects.animations) return true;
      const timing = effects.animations.timing;
      return !Object.values(timing).some(duration => 
        parseInt(duration) < 100 || parseInt(duration) > 1000
      );
    },
    message: "Animation durations should be between 100ms and 1000ms for optimal performance"
  }
];