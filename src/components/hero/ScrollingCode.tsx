import React from 'react';
import { useTheme } from "@/hooks/useTheme";

export const ScrollingCode = () => {
  const { currentTheme } = useTheme();
  const colors = currentTheme?.configuration?.colors?.cyber;
  const animations = currentTheme?.configuration?.effects?.animations;

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div 
        className="absolute top-0 left-0 w-[30%] h-full opacity-10 font-mono"
        style={{
          animation: `scrollCode ${animations?.timing?.very_slow || '20s'} linear infinite`,
          whiteSpace: 'pre-wrap',
          lineHeight: '1.5em',
          fontSize: '0.8em',
          zIndex: 1
        }}
      >
        {Array.from({ length: 50 }).map((_, i) => {
          const progress = i / 50;
          const hue = 340 - (progress * 160);
          
          return (
            <div 
              key={i} 
              className="my-2"
              style={{
                color: colors?.pink?.DEFAULT || '#ff007f',
                transition: 'color 0.5s ease'
              }}
            >
              {`const Component${i} = () => {
                return <div className="cyber">
                  <h${i % 6 + 1}>Cyber Element</h${i % 6 + 1}>
                </div>
              }`}
            </div>
          );
        })}
      </div>
    </div>
  );
};