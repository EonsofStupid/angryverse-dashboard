import { Config } from "tailwindcss";
import { glassEffects } from "./effects/glass";
import { animationEffects } from "./effects/animations";
import { colorEffects } from "./effects/colors";
import { textureEffects } from "./effects/textures";
import { interactionEffects } from "./effects/interactions";
import { specialEffects } from "./effects/special";

export const themeEffects: Partial<Config> = {
  theme: {
    extend: {
      ...glassEffects.theme?.extend,
      ...animationEffects.theme?.extend,
      ...colorEffects.theme?.extend,
      ...textureEffects.theme?.extend,
      ...interactionEffects.theme?.extend,
      ...specialEffects.theme?.extend,
    },
  },
  plugins: [
    ...(glassEffects.plugins || []),
    ...(animationEffects.plugins || []),
    ...(colorEffects.plugins || []),
    ...(textureEffects.plugins || []),
    ...(interactionEffects.plugins || []),
    ...(specialEffects.plugins || []),
  ],
};