import React from 'react';
import { useTheme } from "@/hooks/useTheme";

export const DataStream = () => {
  const { currentTheme } = useTheme();
  const colors = currentTheme?.configuration?.colors?.cyber;
  const animations = currentTheme?.configuration?.effects?.animations;

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div 
        className="absolute top-0 right-4 font-mono text-6xl whitespace-nowrap"
        style={{
          animation: `dataStream ${animations?.timing?.very_slow || '15s'} linear infinite`,
          zIndex: 15,
          transform: 'translateZ(0)'
        }}
      >
        {Array.from({ length: 40 }).map((_, i) => (
          <div 
            key={i} 
            className="my-16 transition-all duration-300"
            style={{
              opacity: 0.3,
              color: colors?.cyan?.DEFAULT || '#00fff5',
              textShadow: `0 0 15px ${colors?.cyan?.DEFAULT || '#00fff5'}`,
              transform: 'translateZ(0)'
            }}
          >
            {['⌬', '⎔', '⌘', '⌥', '⎈', '⚡', '☢', '↯', '⚔', '☠', '⚒', '⯐', '⯑', '⯒', '❖', '◈', '▣', '▤', '▥', '▦'][
              Math.floor(Math.random() * 20)
            ]}
          </div>
        ))}
      </div>
    </div>
  );
};