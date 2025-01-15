import React from 'react';

export const DataStream = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div 
        className="absolute top-0 right-0 w-[15%] h-full"
        style={{
          background: 'linear-gradient(90deg, transparent, rgba(255, 192, 203, 0.05))',
          boxShadow: 'inset -20px 0 30px rgba(255, 192, 203, 0.06)',
          zIndex: 2
        }}
      >
        <div 
          className="absolute top-0 right-4 font-mono text-6xl whitespace-nowrap"
          style={{
            animation: 'dataStream 30s linear infinite',
            zIndex: 3
          }}
        >
          {Array.from({ length: 40 }).map((_, i) => {
            const progress = i / 40;
            const hue = 340 - (progress * 160);
            
            return (
              <div 
                key={i} 
                className="my-16 transition-all duration-300"
                style={{
                  opacity: 0.2,
                  color: `hsl(${hue}, 100%, 80%)`,
                  textShadow: '0 0 15px currentColor',
                  position: 'relative',
                  zIndex: 4
                }}
              >
                {['⌬', '⎔', '⌘', '⌥', '⎈', '⚡', '☢', '↯', '⚔', '☠', 
  '⚒', '⯐', '⯑', '⯒', '❖', '◈', '▣', '▤', '▥', '▦', 
  '✶', '✸', '✹', '✺', '✦', '✧', '✵', '⭘', '⭗', '⭖', 
  '☀', '☁', '☂', '★', '☆', '☽', '☾', '☼', '☿', '♠',
  '♣', '♥', '♦', '⚜', '⚙', '⚬', '✙', '✚', '✜', '✝',][
                  Math.floor(Math.random() * 20)
                ]}
                <div 
                  className="absolute left-0 w-full h-1"
                  style={{
                    background: `linear-gradient(to right, hsla(${hue}, 100%, 80%, 0.1), transparent)`,
                    transform: 'translateY(-50%)',
                    animation: 'pulse 2s ease-in-out infinite',
                    zIndex: -1
                  }}
                />
              </div>
            );
          })}
        </div>

        {Array.from({ length: 5 }).map((_, i) => {
          const progress = i / 5;
          const hue = 340 - (progress * 160);
          
          return (
            <div
              key={`orb-${i}`}
              className="absolute w-5 h-5 rounded-full"
              style={{
                right: `${Math.random() * 60 + 20}%`,
                top: `${(i * 20)}%`,
                animation: `float ${5 + i}s ease-in-out infinite`,
                background: `hsla(${hue}, 100%, 80%, 0.15)`,
                boxShadow: `0 0 50px hsla(${hue}, 100%, 80%, 0.2)`,
                zIndex: 5
              }}
            />
          );
        })}
      </div>
    </div>
  );
};
