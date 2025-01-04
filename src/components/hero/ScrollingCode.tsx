import React from 'react';

export const ScrollingCode = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div 
        className="absolute top-0 right-0 w-[30%] h-full opacity-20 font-mono"
        style={{
          animation: 'scrollCode 20s linear infinite',
          whiteSpace: 'pre-wrap',
          lineHeight: '1.5em',
          fontSize: '1em',
          zIndex: 1
        }}
      >
        {Array.from({ length: 50 }).map((_, i) => {
          const progress = i / 50; // Calculate progress (0 to 1)
          const hue = 340 - (progress * 160); // Transition from pink (340) to cyan (180)
          
          return (
            <div 
              key={i} 
              className="my-3"
              style={{
                color: `hsl(${hue}, 100%, 80%)`,
                transition: 'color 0.5s ease',
                transform: 'scale(1.2)'
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