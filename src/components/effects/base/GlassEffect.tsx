import { useTheme } from "@/hooks/useTheme";
import { useThemeEffects } from "@/hooks/theme/useThemeEffects";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface GlassEffectProps {
  children: ReactNode;
  className?: string;
  intensity?: number;
  blur?: string;
  opacity?: number;
}

export const GlassEffect = ({
  children,
  className,
  intensity = 0.1,
  blur = "8px",
  opacity = 0.1,
}: GlassEffectProps) => {
  const { currentTheme } = useTheme();
  const { effects } = useThemeEffects();

  const glassStyle = {
    background: `rgba(255, 255, 255, ${opacity})`,
    backdropFilter: `blur(${blur})`,
    WebkitBackdropFilter: `blur(${blur})`,
    border: "1px solid rgba(255, 255, 255, 0.1)",
  };

  return (
    <div 
      className={cn(
        "relative overflow-hidden rounded-lg transition-all duration-300",
        className
      )}
      style={glassStyle}
    >
      {children}
      
      {/* Shine effect overlay */}
      <div 
        className="absolute inset-0 opacity-0 group-hover:opacity-30 transition-opacity duration-500"
        style={{
          background: `linear-gradient(
            45deg,
            transparent 0%,
            rgba(255, 255, 255, ${intensity}) 45%,
            rgba(255, 255, 255, ${intensity * 1.5}) 50%,
            rgba(255, 255, 255, ${intensity}) 55%,
            transparent 100%
          )`,
        }}
      />
    </div>
  );
};