import React from 'react';
import { useThemeEffects } from "@/hooks/theme/useThemeEffects";

export const ScrollingCode = () => {
  const { effects } = useThemeEffects();

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div 
        className="absolute top-0 left-0 w-[30%] h-full opacity-10 font-mono"
        style={{
          animation: 'scrollCode 20s linear infinite',
          content: "'<div>...</div><span>...</span><code>...</code>'",
          whiteSpace: 'pre-wrap',
          lineHeight: '1.5em',
          fontSize: '0.8em',
          zIndex: 1
        }}
      >
        {Array.from({ length: 50 }).map((_, i) => {
          const progress = i / 50;
          const hue = 340 - (progress * 160); // Transition from pink (340) to cyan (180)
          
          return (
            <div 
              key={i} 
              className="my-2"
              style={{
                color: `hsl(${hue}, 100%, 80%)`,
                transition: `color ${effects?.animations?.timing?.normal || '300ms'} ${effects?.animations?.curves?.ease_out || 'ease-out'}`
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