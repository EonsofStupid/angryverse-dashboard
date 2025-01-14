import React from 'react';
import { useTheme } from "@/hooks/useTheme";

export const DataStream = () => {
  const { currentTheme } = useTheme();
  const colors = currentTheme?.configuration?.colors?.cyber;
  const matrixEffects = currentTheme?.configuration?.effects?.special_effect_tokens?.matrix;

  // Double the content to create seamless loop
  const symbols = ['⌬', '⎔', '⌘', '⌥', '⎈', '⚡', '☢', '↯', '⚔', '☠', '⚒', '⯐', '⯑', '⯒', '❖', '◈', '▣', '▤', '▥', '▦'];
  const streamContent = [...Array(80)].map((_, i) => symbols[Math.floor(Math.random() * symbols.length)]);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 15 }}>
      <div 
        className="absolute top-0 right-4 font-mono text-6xl whitespace-nowrap"
        style={{
          animation: `dataStream ${matrixEffects?.speed_levels?.[1] || 15}s linear infinite`,
          transform: 'translateZ(0)'
        }}
      >
        {/* First set of symbols */}
        {streamContent.map((symbol, i) => (
          <div 
            key={`first-${i}`}
            className="my-16 transition-all duration-300"
            style={{
              opacity: 0.3,
              color: colors?.cyan?.DEFAULT || '#00fff5',
              textShadow: `0 0 15px ${colors?.cyan?.DEFAULT || '#00fff5'}`,
              transform: 'translateZ(0)'
            }}
          >
            {symbol}
          </div>
        ))}
        {/* Duplicate set for seamless loop */}
        {streamContent.map((symbol, i) => (
          <div 
            key={`second-${i}`}
            className="my-16 transition-all duration-300"
            style={{
              opacity: 0.3,
              color: colors?.cyan?.DEFAULT || '#00fff5',
              textShadow: `0 0 15px ${colors?.cyan?.DEFAULT || '#00fff5'}`,
              transform: 'translateZ(0)'
            }}
          >
            {symbol}
          </div>
        ))}
      </div>
    </div>
  );
};