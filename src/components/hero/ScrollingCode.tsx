import React from 'react';
import { useTheme } from "@/hooks/useTheme";
import { cn } from "@/lib/utils";

export const ScrollingCode = () => {
  const { currentTheme } = useTheme();
  const animations = currentTheme?.configuration?.effects?.animations;

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div 
        className={cn(
          "absolute top-0 left-0 w-[30%] h-full opacity-10 font-mono",
          "animate-[scrollCode_20s_linear_infinite]"
        )}
        style={{
          content: "'<div>...</div><span>...</span><code>...</code>'",
          whiteSpace: 'pre-wrap',
          lineHeight: '1.5em',
          fontSize: '0.8em',
          zIndex: 1,
          animationDuration: animations?.timing?.very_slow || '20s'
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
                color: `hsl(${hue}, 100%, 80%)`,
                transition: `color ${animations?.timing?.normal || '300ms'} ${animations?.curves?.ease_out || 'ease'}`
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