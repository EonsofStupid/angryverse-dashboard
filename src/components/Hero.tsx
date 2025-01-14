import { ScrollingCode } from "./hero/ScrollingCode";
import { DataStream } from "./hero/DataStream";
import { GlowingLines } from "./hero/GlowingLines";
import { HeroContent } from "./hero/HeroContent";
import { useTheme } from "@/hooks/useTheme";
import { useThemeEffects } from "@/hooks/theme/useThemeEffects";

export const Hero = () => {
  const { currentTheme } = useTheme();
  const { effects } = useThemeEffects();

  const gradientStyle = {
    background: `linear-gradient(to bottom right, 
      var(--theme-colors-cyber-dark) / 0.1,
      var(--theme-colors-cyber-dark) / 0.05,
      var(--theme-colors-cyber-dark) / 0.1
    )`,
    boxShadow: effects?.glass?.shadow_composition ? 
      `0 ${effects.glass.shadow_composition.offset_y} ${effects.glass.shadow_composition.blur_radius} rgba(0, 0, 0, ${effects.glass.shadow_composition.opacity})` :
      'none'
  };

  return (
    <section 
      className="min-h-screen pt-16 flex items-center relative overflow-hidden"
      style={{
        perspective: effects?.interaction_tokens?.tilt?.perspective_values?.[2] || '1000px'
      }}
    >
      <div 
        className="absolute inset-0" 
        style={gradientStyle}
      />
      
      <ScrollingCode />
      <DataStream />
      <GlowingLines />
      <HeroContent />
    </section>
  );
};