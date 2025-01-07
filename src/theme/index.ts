import { Config } from "tailwindcss";
import { glassmorphismEffects } from "./effects/glassmorphism";
import { animationEffects } from "./effects/animations";
import { gradientEffects } from "./effects/gradients";
import { interactionEffects } from "./effects/interactions";

export const themeEffects: Partial<Config> = {
  theme: {
    extend: {
      ...glassmorphismEffects.theme?.extend,
      ...animationEffects.theme?.extend,
      ...gradientEffects.theme?.extend,
      ...interactionEffects.theme?.extend,
    },
  },
  plugins: [
    ...(glassmorphismEffects.plugins || []),
    ...(animationEffects.plugins || []),
    ...(gradientEffects.plugins || []),
    ...(interactionEffects.plugins || []),
  ],
};