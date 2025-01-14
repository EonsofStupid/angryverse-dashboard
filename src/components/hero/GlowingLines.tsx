import React from 'react';
import { useThemeEffects } from "@/hooks/theme/useThemeEffects";

export const GlowingLines = () => {
  const { effects } = useThemeEffects();
  const specialEffects = effects?.special_effect_tokens;
  const neonGlowSize = specialEffects?.neon?.glow_sizes?.[1] || '4px';

  return (
    <>
      {/* Horizontal lines */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 opacity-20" style={{ zIndex: 0 }}>
          {Array.from({ length: 5 }).map((_, i) => {
            const progress = i / 5;
            const hue = 340 - (progress * 160);
            
            return (
              <div
                key={i}
                className="absolute h-px w-full"
                style={{
                  background: `linear-gradient(to right, transparent, hsl(${hue}, 100%, 80%), transparent)`,
                  top: `${20 * i}%`,
                  animationDelay: `${i * 0.5}s`,
                  animation: 'moveLeft 15s linear infinite',
                  filter: `drop-shadow(0 0 ${neonGlowSize} currentColor)`
                }}
              />
            );
          })}
        </div>
      </div>

      {/* Vertical lines */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 opacity-20" style={{ zIndex: 0 }}>
          {Array.from({ length: 5 }).map((_, i) => {
            const progress = i / 5;
            const hue = 340 - (progress * 160);
            
            return (
              <div
                key={i}
                className="absolute w-px h-full"
                style={{
                  background: `linear-gradient(to bottom, transparent, hsl(${hue}, 100%, 80%), transparent)`,
                  left: `${20 * i}%`,
                  animationDelay: `${i * 0.5}s`,
                  animation: 'moveUp 20s linear infinite',
                  filter: `drop-shadow(0 0 ${neonGlowSize} currentColor)`
                }}
              />
            );
          })}
        </div>
      </div>
    </>
  );
};