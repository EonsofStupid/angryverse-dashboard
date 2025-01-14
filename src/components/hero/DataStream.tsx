import React from 'react';
import { useTheme } from "@/hooks/useTheme";
import { cn } from "@/lib/utils";

export const DataStream = () => {
  const { currentTheme } = useTheme();
  const specialEffects = currentTheme?.configuration?.effects?.special_effect_tokens;
  const matrix = specialEffects?.matrix;

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div 
        className={cn(
          "absolute inset-0",
          "before:absolute before:inset-0",
          "before:bg-gradient-to-b before:from-cyber-green/20 before:via-cyber-green/10 before:to-transparent"
        )}
        style={{
          '--matrix-speed': matrix?.speed_levels?.[0] || '2',
          '--matrix-density': matrix?.density_values?.[0] || '0.2'
        } as React.CSSProperties}
      >
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="matrix-rain"
            style={{
              left: `${i * 5}%`,
              animationDelay: `${Math.random() * 2}s`
            }}
          />
        ))}
      </div>
    </div>
  );
};