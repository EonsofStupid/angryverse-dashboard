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

  // Get motion tokens for animations
  const motionTokens = effects?.motion_tokens;
  const scrollTriggers = motionTokens?.scroll_triggers;

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
              box-shadow: 0 0 ${effects?.hover?.glow_strength || '10px'} var(--theme-gray-neutral);
            }
            50% { 
              transform: translateY(${effects?.interaction_tokens?.hover?.lift_distances?.[1] || '-4px'}) 
                        translateX(-10px) 
                        scale(${effects?.interaction_tokens?.hover?.scale_values?.[1] || '1.05'});
              box-shadow: 0 0 ${effects?.hover?.glow_strength || '10px'} var(--theme-gray-soft),
                         0 0 ${effects?.hover?.glow_strength || '20px'} var(--theme-gray-medium);
            }
          }

          .scroll-reveal {
            opacity: 0;
            transform: translateY(${scrollTriggers?.distances?.[1] || '20px'});
            transition: all ${effects?.animations?.timing?.normal || '300ms'} 
                       ${effects?.animations?.curves?.ease_out || 'cubic-bezier(0, 0, 0.2, 1)'};
          }

          .scroll-reveal.visible {
            opacity: 1;
            transform: translateY(0);
          }
        `}
      </style>
    </section>
  );
};