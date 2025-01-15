import { useTheme } from "@/hooks/useTheme";

export const useNavTheme = () => {
  const { currentTheme } = useTheme();
  
  return {
    glassEffect: currentTheme?.configuration.effects.glass,
    hoverEffect: currentTheme?.configuration.effects.hover,
    animations: currentTheme?.configuration.effects.animations,
    colors: currentTheme?.configuration.colors.cyber
  };
};