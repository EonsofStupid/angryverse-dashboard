import React from 'react';
import { useTheme } from "@/hooks/useTheme";

export const GlowingLines = () => {
  const { currentTheme } = useTheme();
  const matrixEffects = currentTheme?.configuration?.effects?.special_effect_tokens?.matrix;
  const colors = currentTheme?.configuration?.colors?.cyber;

  return (
    <>
      {/* Horizontal lines */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 opacity-20" style={{ zIndex: 10 }}>
          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              className="absolute h-px w-full"
              style={{
                background: `linear-gradient(to right, transparent, ${colors?.cyan?.DEFAULT || '#00fff5'}, transparent)`,
                top: `${20 * i}%`,
                animationDelay: `${i * 0.5}s`,
                animation: `moveLeft ${matrixEffects?.glow_speed || '8s'} linear infinite`,
                filter: `drop-shadow(0 0 10px ${colors?.cyan?.DEFAULT || '#00fff5'})`,
                transform: 'translateZ(0)'
              }}
            />
          ))}
        </div>
      </div>

      {/* Vertical lines */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 opacity-20" style={{ zIndex: 10 }}>
          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              className="absolute w-px h-full"
              style={{
                background: `linear-gradient(to bottom, transparent, ${colors?.pink?.DEFAULT || '#ff007f'}, transparent)`,
                left: `${20 * i}%`,
                animationDelay: `${i * 0.5}s`,
                animation: `moveUp ${matrixEffects?.glow_speed || '8s'} linear infinite`,
                filter: `drop-shadow(0 0 10px ${colors?.pink?.DEFAULT || '#ff007f'})`,
                transform: 'translateZ(0)'
              }}
            />
          ))}
        </div>
      </div>
    </>
  );
};