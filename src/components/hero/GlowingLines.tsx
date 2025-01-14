import React from 'react';
import { useTheme } from "@/hooks/useTheme";
import { cn } from "@/lib/utils";

export const GlowingLines = () => {
  const { currentTheme } = useTheme();
  const animations = currentTheme?.configuration?.effects?.animations;

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute inset-0">
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            className={cn(
              "absolute h-px w-full",
              "animate-[moveLeft_3s_linear_infinite]",
              "bg-gradient-to-r from-transparent via-cyber-cyan to-transparent"
            )}
            style={{
              top: `${20 * i}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: animations?.timing?.very_slow || '3s'
            }}
          />
        ))}
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            className={cn(
              "absolute w-px h-full",
              "animate-[moveUp_3s_linear_infinite]",
              "bg-gradient-to-b from-transparent via-cyber-pink to-transparent"
            )}
            style={{
              left: `${20 * i}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: animations?.timing?.very_slow || '3s'
            }}
          />
        ))}
      </div>
    </div>
  );
};