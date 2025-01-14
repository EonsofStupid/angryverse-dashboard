import React from 'react';
import { useTheme } from "@/hooks/useTheme";
import { cn } from "@/lib/utils";

export const GlowingLines = () => {
  const { currentTheme } = useTheme();
  const animations = currentTheme?.configuration?.effects?.animations;
  const colors = currentTheme?.configuration?.colors?.cyber;

  return (
    <>
      {/* Horizontal lines */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 opacity-20" style={{ zIndex: 2 }}>
          {Array.from({ length: 5 }).map((_, i) => {
            const progress = i / 5;
            const hue = 340 - (progress * 160);
            
            return (
              <div
                key={i}
                className="absolute h-px w-full"
                style={{
                  background: `linear-gradient(to right, transparent, ${colors?.cyan?.DEFAULT || '#00fff5'}, transparent)`,
                  top: `${20 * i}%`,
                  animationDelay: `${i * 0.5}s`,
                  animation: `moveLeft ${animations?.timing?.very_slow || '8s'} linear infinite`,
                  filter: `drop-shadow(0 0 10px currentColor)`
                }}
              />
            );
          })}
        </div>
      </div>

      {/* Vertical lines */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 opacity-20" style={{ zIndex: 2 }}>
          {Array.from({ length: 5 }).map((_, i) => {
            const progress = i / 5;
            const hue = 340 - (progress * 160);
            
            return (
              <div
                key={i}
                className="absolute w-px h-full"
                style={{
                  background: `linear-gradient(to bottom, transparent, ${colors?.pink?.DEFAULT || '#ff007f'}, transparent)`,
                  left: `${20 * i}%`,
                  animationDelay: `${i * 0.5}s`,
                  animation: `moveUp ${animations?.timing?.very_slow || '8s'} linear infinite`,
                  filter: `drop-shadow(0 0 10px currentColor)`
                }}
              />
            );
          })}
        </div>
      </div>
    </>
  );
};