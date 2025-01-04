import { Button } from "./ui/button";

export const Hero = () => {
  return (
    <section className="min-h-screen pt-16 flex items-center relative overflow-hidden">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-r from-cyber-pink/5 via-cyber-cyan/5 to-cyber-purple/5 animate-pulse" />
      
      {/* Vertical scrolling code */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div 
          className="absolute top-0 left-0 w-[30%] h-full opacity-10 font-mono text-cyber-cyan"
          style={{
            animation: 'scrollCode 20s linear infinite',
            content: "'<div>...</div><span>...</span><code>...</code>'",
            whiteSpace: 'pre-wrap',
            lineHeight: '1.5em',
            fontSize: '0.8em'
          }}
        >
          {Array.from({ length: 50 }).map((_, i) => (
            <div key={i} className="my-2">
              {`const Component${i} = () => {
                return <div className="cyber">
                  <h${i % 6 + 1}>Cyber Element</h${i % 6 + 1}>
                </div>
              }`}
            </div>
          ))}
        </div>
      </div>
      
      {/* Retro Data Stream */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div 
          className="absolute top-0 right-0 w-[15%] h-full"
          style={{
            background: 'linear-gradient(90deg, transparent, rgba(57, 255, 20, 0.05))',
            boxShadow: 'inset -20px 0 30px rgba(57, 255, 20, 0.1)',
          }}
        >
          <div 
            className="absolute top-0 right-4 text-cyber-green font-mono text-2xl opacity-80 whitespace-nowrap"
            style={{
              animation: 'dataStream 12s linear infinite',
              textShadow: '0 0 10px rgba(57, 255, 20, 0.8)',
              fontFamily: 'monospace',
            }}
          >
            {Array.from({ length: 30 }).map((_, i) => (
              <div 
                key={i} 
                className="my-8 transform hover:scale-110 transition-transform"
                style={{
                  animationDelay: `${i * 0.2}s`,
                  opacity: Math.random() * 0.5 + 0.5,
                }}
              >
                {['⌬', '⎔', '⌘', '⌥', '⎈', '⚡', '☢', '↯', '⚔', '☠', '⚒', '⯐', '⯑', '⯒'][
                  Math.floor(Math.random() * 14)
                ]}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Glowing horizontal lines */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              className="absolute h-px w-full bg-gradient-to-r from-transparent via-cyber-cyan to-transparent"
              style={{
                top: `${20 * i}%`,
                animationDelay: `${i * 0.5}s`,
                animation: 'moveLeft 15s linear infinite'
              }}
            />
          ))}
        </div>
      </div>

      {/* Vertical glowing lines */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              className="absolute w-px h-full bg-gradient-to-b from-transparent via-cyber-pink to-transparent"
              style={{
                left: `${20 * i}%`,
                animationDelay: `${i * 0.5}s`,
                animation: 'moveUp 20s linear infinite'
              }}
            />
          ))}
        </div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center space-y-8">
          <h1 className="text-4xl md:text-6xl font-cyber font-bold leading-tight animate-float">
            Why Be The Best If{" "}
            <span className="text-gradient animate-pulse">No One Knows It?</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-300">
            Manage all your social media channels in one place. Create, schedule,
            and analyze your content across platforms.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button
              size="lg"
              className="bg-gradient-to-r from-cyber-pink to-cyber-purple hover:from-cyber-pink/90 hover:to-cyber-purple/90 transition-all duration-500 hover:scale-105"
            >
              Get Started
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="hover-glow border-cyber-cyan text-cyber-cyan hover:text-cyber-cyan/90 transition-all duration-500 hover:scale-105"
            >
              Learn More
            </Button>
          </div>
        </div>
      </div>

      <style>
        {`
          @keyframes moveLeft {
            from {
              transform: translateX(100%);
            }
            to {
              transform: translateX(-100%);
            }
          }
          
          @keyframes moveUp {
            from {
              transform: translateY(100%);
            }
            to {
              transform: translateY(-100%);
            }
          }
          
          @keyframes scrollCode {
            from {
              transform: translateY(0);
            }
            to {
              transform: translateY(-50%);
            }
          }

          @keyframes dataStream {
            from {
              transform: translateY(-100%);
            }
            to {
              transform: translateY(100%);
            }
          }
        `}
      </style>
    </section>
  );
};
