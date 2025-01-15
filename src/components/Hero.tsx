import { ScrollingCode } from "./hero/ScrollingCode";
import { DataStream } from "./hero/DataStream";
import { GlowingLines } from "./hero/GlowingLines";
import { HeroContent } from "./hero/HeroContent";
import { useTheme } from "@/hooks/useTheme";

export const Hero = () => {
  const { currentTheme } = useTheme();
  
  const glassEffect = currentTheme?.configuration?.effects?.glass;

  const gradientStyle = {
    background: `linear-gradient(to bottom right, 
      var(--theme-colors-cyber-dark) / 0.1,
      var(--theme-colors-cyber-dark) / 0.05,
      var(--theme-colors-cyber-dark) / 0.1
    )`,
    boxShadow: glassEffect?.shadow_composition ? 
      `0 ${glassEffect.shadow_composition.offset_y} ${glassEffect.shadow_composition.blur_radius} rgba(0, 0, 0, ${glassEffect.shadow_composition.opacity})` :
      'none'
  };

  return (
    <section 
      className="min-h-screen pt-16 flex items-center relative overflow-hidden"
      style={{
        isolation: 'isolate' // Create new stacking context without perspective
      }}
    >
      <div 
        className="absolute inset-0" 
        style={gradientStyle}
      />
      
      <div className="relative w-full">
        <ScrollingCode />
        <DataStream />
        <GlowingLines />
        <HeroContent />
      </div>

      <style>
        {`
          @keyframes moveLeft {
            from { transform: translateX(100%) translateZ(0); }
            to { transform: translateX(-100%) translateZ(0); }
          }
          
          @keyframes moveUp {
            from { transform: translateY(100%) translateZ(0); }
            to { transform: translateY(-100%) translateZ(0); }
          }
          
          @keyframes scrollCode {
            from { transform: translateY(0) translateZ(0); }
            to { transform: translateY(-50%) translateZ(0); }
          }

          @keyframes dataStream {
            0% { transform: translateY(0) translateZ(0); }
            100% { transform: translateY(-50%) translateZ(0); }
          }

          @keyframes float {
            0%, 100% { 
              transform: translateY(0) translateX(0) scale(1);
              box-shadow: 0 0 10px var(--theme-colors-cyber-pink);
            }
            50% { 
              transform: translateY(-4px) translateX(-10px) scale(1.05);
              box-shadow: 0 0 20px var(--theme-colors-cyber-pink),
                         0 0 30px var(--theme-colors-cyber-cyan);
            }
          }
        `}
      </style>
    </section>
  );
};