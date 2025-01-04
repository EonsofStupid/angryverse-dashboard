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
        {[0, 1].map((streamIndex) => (
          <div 
            key={streamIndex}
            className="absolute top-0 right-4 font-mono text-6xl whitespace-nowrap"
            style={{
              animation: 'dataStream 20s linear infinite',
              animationDelay: `${streamIndex * -10}s`,
              transform: `translateY(${streamIndex * -100}%)`,
              zIndex: 3
            }}
          >
            {Array.from({ length: 40 }).map((_, i) => {
              const progress = i / 40; // Calculate progress (0 to 1)
              const hue = 340 - (progress * 160); // Transition from pink (340) to cyan (180)
              
              return (
                <div 
                  key={i} 
                  className="my-16 transform transition-all duration-300"
                  style={{
                    animationDelay: `${i * 0.3}s`,
                    opacity: 0.3,
                    color: `hsl(${hue}, 100%, 80%)`,
                    textShadow: '0 0 15px currentColor',
                    transform: 'scale(1.2)',
                    position: 'relative',
                    zIndex: 4
                  }}
                >
                  {['⌬', '⎔', '⌘', '⌥', '⎈', '⚡', '☢', '↯', '⚔', '☠', '⚒', '⯐', '⯑', '⯒', '❖', '◈', '▣', '▤', '▥', '▦'][
                    Math.floor(Math.random() * 20)
                  ]}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
};