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
      var(--theme-gray-neutral) / 0.1,
      var(--theme-gray-soft) / 0.05,
      var(--theme-gray-medium) / 0.1
    )`,
    boxShadow: effects?.glass?.shadow_composition ? 
      `0 ${effects.glass.shadow_composition.offset_y} ${effects.glass.shadow_composition.blur_radius} rgba(0, 0, 0, ${effects.glass.shadow_composition.opacity})` :
      'none'
  };

  return (
    <section className="min-h-screen pt-16 flex items-center relative overflow-hidden">
      <div 
        className="absolute inset-0" 
        style={gradientStyle}
      />
      
      <ScrollingCode />
      <DataStream />
      <GlowingLines />
      <HeroContent />

      <style>
        {`
          @keyframes moveLeft {
            from { transform: translateX(100%); }
            to { transform: translateX(-100%); }
          }
          
          @keyframes moveUp {
            from { transform: translateY(100%); }
            to { transform: translateY(-100%); }
          }
          
          @keyframes scrollCode {
            from { transform: translateY(0); }
            to { transform: translateY(-50%); }
          }

          @keyframes dataStream {
            0% { transform: translateY(0); }
            100% { transform: translateY(-100%); }
          }

          @keyframes float {
            0%, 100% { 
              transform: translateY(0) translateX(0) scale(1);
              box-shadow: 0 0 var(--glow-strength-sm) var(--theme-gray-neutral);
            }
            50% { 
              transform: translateY(-20px) translateX(-10px) scale(1.05);
              box-shadow: 0 0 var(--glow-strength-md) var(--theme-gray-soft),
                         0 0 var(--glow-strength-lg) var(--theme-gray-medium);
            }
          }
        `}
      </style>
    </section>
  );
};