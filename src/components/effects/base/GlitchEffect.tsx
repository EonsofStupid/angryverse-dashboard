import { useTheme } from "@/hooks/useTheme";
import { useThemeEffects } from "@/hooks/theme/useThemeEffects";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface GlitchEffectProps {
  children: ReactNode;
  className?: string;
  intensity?: number;
  frequency?: number;
  colors?: [string, string];
}

export const GlitchEffect = ({
  children,
  className,
  intensity = 0.2,
  frequency = 2,
  colors = ["var(--theme-colors-cyber-pink)", "var(--theme-colors-cyber-cyan)"],
}: GlitchEffectProps) => {
  const { currentTheme } = useTheme();
  const { effects } = useThemeEffects();

  return (
    <div className={cn("relative", className)}>
      {/* Base content */}
      <div className="relative z-10">
        {children}
      </div>

      {/* Glitch layers */}
      <div
        className="absolute inset-0 opacity-70"
        style={{
          animation: `glitch-1 ${frequency}s infinite linear alternate-reverse`,
          clipPath: "polygon(0 0, 100% 0, 100% 45%, 0 45%)",
          transform: `translate(-${intensity * 10}px)`,
          background: colors[0],
          mixBlendMode: "screen",
        }}
      />
      <div
        className="absolute inset-0 opacity-70"
        style={{
          animation: `glitch-2 ${frequency * 1.5}s infinite linear alternate-reverse`,
          clipPath: "polygon(0 55%, 100% 55%, 100% 100%, 0 100%)",
          transform: `translate(${intensity * 10}px)`,
          background: colors[1],
          mixBlendMode: "screen",
        }}
      />

      <style>
        {`
          @keyframes glitch-1 {
            0%, 100% { transform: translate(0); }
            50% { transform: translate(${intensity * -10}px, ${intensity * 2}px); }
          }
          @keyframes glitch-2 {
            0%, 100% { transform: translate(0); }
            50% { transform: translate(${intensity * 10}px, ${intensity * -2}px); }
          }
        `}
      </style>
    </div>
  );
};