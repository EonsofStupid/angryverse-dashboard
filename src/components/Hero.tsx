import { ScrollingCode } from "./hero/ScrollingCode";
import { DataStream } from "./hero/DataStream";
import { GlowingLines } from "./hero/GlowingLines";
import { HeroContent } from "./hero/HeroContent";
import { useTheme } from "@/hooks/useTheme";

export const Hero = () => {
  const { currentTheme } = useTheme();

  return (
    <section className="min-h-screen pt-16 flex items-center relative overflow-hidden">
      {/* Background gradient using theme tokens */}
      <div 
        className="absolute inset-0" 
        style={{
          background: `linear-gradient(to bottom right, 
            var(--theme-primary) / 0.1,
            var(--theme-secondary) / 0.05,
            var(--theme-accent) / 0.1
          )`
        }}
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
              box-shadow: 0 0 var(--glow-strength-sm) var(--theme-primary);
            }
            50% { 
              transform: translateY(-20px) translateX(-10px) scale(1.05);
              box-shadow: 0 0 var(--glow-strength-md) var(--theme-primary),
                         0 0 var(--glow-strength-lg) var(--theme-secondary);
            }
          }
        `}
      </style>
    </section>
  );
};