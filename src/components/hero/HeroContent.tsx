import React from 'react';
import { Button } from "../ui/button";
import { useTheme } from "@/hooks/useTheme";

export const HeroContent = () => {
  const { currentTheme } = useTheme();
  const colors = currentTheme?.configuration?.colors?.cyber;
  const effects = currentTheme?.configuration?.effects;
  const animations = effects?.animations;
  const hover = effects?.hover;

  return (
    <div className="container mx-auto px-4 relative z-10">
      <div className="max-w-3xl mx-auto text-center space-y-8">
        <h1 
          className="text-4xl md:text-6xl font-bold leading-tight neon-text"
          style={{
            textShadow: `0 0 10px ${colors?.pink?.DEFAULT || '#ff007f'}`,
            animation: `float ${animations?.timing?.very_slow || '3s'} ease-in-out infinite`
          }}
        >
          Why Be The Best If{" "}
          <span 
            className="bg-clip-text text-transparent"
            style={{
              backgroundImage: `linear-gradient(to right, ${colors?.pink?.DEFAULT || '#ff007f'}, ${colors?.cyan?.DEFAULT || '#00fff5'})`,
              filter: `drop-shadow(0 0 ${hover?.glow_strength || '10px'} ${colors?.pink?.DEFAULT || '#ff007f'})`
            }}
          >
            No One Knows It?
          </span>
        </h1>
        
        <p className="text-lg md:text-xl text-gray-300/90 backdrop-blur-sm">
          Manage all your social media channels in one place. Create, schedule,
          and analyze your content across platforms.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button
            size="lg"
            className="glass hover:scale-105 transition-all duration-500"
            style={{
              background: `linear-gradient(to right, ${colors?.pink?.DEFAULT || '#ff007f'}, ${colors?.cyan?.DEFAULT || '#00fff5'})`,
              boxShadow: `0 0 ${hover?.glow_strength || '10px'} ${colors?.pink?.DEFAULT || '#ff007f'}`,
              transform: `scale(${hover?.scale || 1.05})`,
              transition: `all ${animations?.timing?.normal || '300ms'} ${animations?.curves?.ease_out || 'cubic-bezier(0, 0, 0.2, 1)'}`
            }}
          >
            Get Started
          </Button>
          
          <Button
            variant="outline"
            size="lg"
            className="glass hover:scale-105 transition-all duration-500"
            style={{
              borderColor: colors?.cyan?.DEFAULT || '#00fff5',
              color: colors?.cyan?.DEFAULT || '#00fff5',
              transform: `scale(${hover?.scale || 1.05})`,
              transition: `all ${animations?.timing?.normal || '300ms'} ${animations?.curves?.ease_out || 'cubic-bezier(0, 0, 0.2, 1)'}`
            }}
          >
            Learn More
          </Button>
        </div>
      </div>
    </div>
  );
};