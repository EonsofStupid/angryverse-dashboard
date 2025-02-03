import { useTheme } from "@/hooks/useTheme";
import { useThemeEffects } from "@/hooks/theme/useThemeEffects";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface NeonEffectProps {
  children: ReactNode;
  className?: string;
  color?: string;
  intensity?: number;
  pulseSpeed?: string;
}

export const NeonEffect = ({
  children,
  className,
  color = "var(--theme-colors-cyber-pink)",
  intensity = 0.5,
  pulseSpeed = "2s",
}: NeonEffectProps) => {
  const { currentTheme } = useTheme();
  const { effects } = useThemeEffects();

  return (
    <div 
      className={cn(
        "relative transition-all duration-300",
        className
      )}
      style={{
        filter: `drop-shadow(0 0 ${intensity * 5}px ${color})
                drop-shadow(0 0 ${intensity * 10}px ${color})`,
        animation: `neon-pulse ${pulseSpeed} infinite alternate`
      }}
    >
      {children}

      <style>
        {`
          @keyframes neon-pulse {
            0%, 100% {
              opacity: ${0.8 + intensity * 0.2};
            }
            50% {
              opacity: ${0.6 + intensity * 0.2};
            }
          }
        `}
      </style>
    </div>
  );
};