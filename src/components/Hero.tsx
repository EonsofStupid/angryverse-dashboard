import { ScrollingCode } from "./hero/ScrollingCode";
import { DataStream } from "./hero/DataStream";
import { GlowingLines } from "./hero/GlowingLines";
import { HeroContent } from "./hero/HeroContent";
import { useTheme } from "@/hooks/useTheme";

export const Hero = () => {
  const { currentTheme } = useTheme();

  return (
    <section className="min-h-screen pt-16 flex items-center relative overflow-hidden">
      {/* Enhanced gradient background using theme colors */}
      <div className="absolute inset-0 bg-gradient-to-br from-[var(--cyber-primary-default)]/10 via-[var(--cyber-secondary-default)]/5 to-[var(--cyber-accent-default)]/10 animate-pulse" />
      
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

          @keyframes pulse {
            0%, 100% { opacity: var(--glass-opacity); }
            50% { opacity: calc(var(--glass-opacity) + 0.2); }
          }

          @keyframes float {
            0%, 100% { transform: translateY(0) translateX(0) scale(1); }
            50% { transform: translateY(-20px) translateX(-10px) scale(1.05); }
          }
        `}
      </style>
    </section>
  );
};