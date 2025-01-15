import React from 'react';
import { useTheme } from "@/hooks/useTheme";

export const ScrollingCode = () => {
  const { currentTheme } = useTheme();
  const colors = currentTheme?.configuration?.colors?.cyber;
  const matrixEffects = currentTheme?.configuration?.effects?.special_effect_tokens?.matrix;

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div 
        className="absolute top-0 left-0 w-[30%] h-[200%] font-mono"
        style={{
          animation: `scrollCode ${matrixEffects?.speed_levels?.[0] || 30}s linear infinite`,
          whiteSpace: 'pre-wrap',
          lineHeight: '1.5em',
          fontSize: '0.8em',
          opacity: 0.3,
          zIndex: 15,
          transform: 'translateZ(0)'
        }}
      >
        {Array.from({ length: 50 }).map((_, i) => (
          <div 
            key={i} 
            className="my-2"
            style={{
              color: colors?.pink?.DEFAULT || '#ff007f',
              textShadow: `0 0 5px ${colors?.pink?.DEFAULT || '#ff007f'}`,
              transition: 'color 0.5s ease'
            }}
          >
            {`const Component${i} = () => {
              return <div className="cyber">
                <h${i % 6 + 1}>Cyber Element</h${i % 6 + 1}>
              </div>
            }`}
          </div>
        ))}
      </div>
    </div>
  );
};