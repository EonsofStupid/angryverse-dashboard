import { ScrollingCode } from "./hero/ScrollingCode";
import { DataStream } from "./hero/DataStream";
import { GlowingLines } from "./hero/GlowingLines";
import { HeroContent } from "./hero/HeroContent";
import { useTheme } from "@/hooks/useTheme";

export const Hero = () => {
  const { currentTheme } = useTheme();
  
  const glassEffect = currentTheme?.configuration?.effects?.glass;
  const animations = currentTheme?.configuration?.effects?.animations;
  const specialEffects = currentTheme?.configuration?.effects?.special_effect_tokens;

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
        perspective: '1000px'
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
            100% { transform: translateY(-100%) translateZ(0); }
          }

          @keyframes float {
            0%, 100% { 
              transform: translateY(0) translateX(0) scale(1) translateZ(0);
              box-shadow: 0 0 10px var(--theme-colors-cyber-pink);
            }
            50% { 
              transform: translateY(-4px) translateX(-10px) scale(1.05) translateZ(0);
              box-shadow: 0 0 20px var(--theme-colors-cyber-pink),
                         0 0 30px var(--theme-colors-cyber-cyan);
            }
          }

          .scroll-reveal {
            opacity: 0;
            transform: translateY(20px);
            transition: all ${animations?.timing?.normal || '300ms'} 
                       ${animations?.curves?.ease_out || 'cubic-bezier(0, 0, 0.2, 1)'};
          }

          .scroll-reveal.visible {
            opacity: 1;
            transform: translateY(0);
          }

          .neon-text {
            text-shadow: 0 0 ${specialEffects?.neon?.glow_sizes?.[1] || '4px'} var(--theme-colors-cyber-pink);
            animation: neon-flicker ${specialEffects?.neon?.flicker_speeds?.[1] || '2s'} infinite;
          }

          @keyframes neon-flicker {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.8; }
          }
        `}
      </style>
    </section>
  );
};