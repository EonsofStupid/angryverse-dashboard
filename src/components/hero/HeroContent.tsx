import React from 'react';
import { Button } from "../ui/button";
import { useTheme } from "@/hooks/useTheme";
import { useIsMobile } from "@/hooks/use-mobile";

export const HeroContent = () => {
  const { currentTheme } = useTheme();
  const isMobile = useIsMobile();
  const colors = currentTheme?.configuration?.colors?.cyber;
  const effects = currentTheme?.configuration?.effects;
  const animations = effects?.animations;
  const hover = effects?.hover;

  return (
    <div className="container mx-auto px-4 relative z-10">
      <div className="max-w-3xl mx-auto text-center space-y-6 md:space-y-8 py-12 md:py-20">
        <h1 
          className={`text-3xl md:text-6xl font-bold leading-tight neon-text ${
            isMobile ? 'px-2' : ''
          }`}
          style={{
            textShadow: `0 0 10px ${colors?.pink?.DEFAULT || '#ff007f'}`,
            animation: `float ${animations?.timing?.very_slow || '3s'} ease-in-out infinite`
          }}
        >
          Why Be The Best If{" "}
          <span 
            className="bg-clip-text text-transparent relative block mt-2 md:inline-block md:mt-0"
            style={{
              backgroundImage: `linear-gradient(to right, ${colors?.pink?.DEFAULT || '#ff007f'}, ${colors?.cyan?.DEFAULT || '#00fff5'})`,
              filter: `drop-shadow(0 0 ${hover?.glow_strength || '10px'} ${colors?.pink?.DEFAULT || '#ff007f'})`,
              textShadow: '-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000'
            }}
          >
            No One Knows It?
          </span>
        </h1>
        
        <p className="text-base md:text-xl text-gray-300/90 backdrop-blur-sm px-4 md:px-0">
          Manage all your social media channels in one place. Create, schedule,
          and analyze your content across platforms.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4 px-4 md:px-0">
          <Button
            size={isMobile ? "default" : "lg"}
            className="w-full sm:w-auto glass hover:scale-105 transition-all duration-500"
            style={{
              background: `linear-gradient(to right, ${colors?.pink?.DEFAULT || '#ff007f'}, ${colors?.cyan?.DEFAULT || '#00fff5'})`,
              boxShadow: `0 0 ${hover?.glow_strength || '10px'} ${colors?.pink?.DEFAULT || '#ff007f'}`,
              transform: `scale(${hover?.scale || 1.05})`,
              transition: `all ${animations?.timing?.normal || '300ms'} ${animations?.curves?.ease_out || 'cubic-bezier(0, 0, 0.2, 1)'}`,
              minHeight: isMobile ? '48px' : 'auto', // Ensure good touch target
              fontSize: isMobile ? '16px' : 'inherit' // Better readability on mobile
            }}
          >
            Get Started
          </Button>
          
          <Button
            variant="outline"
            size={isMobile ? "default" : "lg"}
            className="w-full sm:w-auto glass hover:scale-105 transition-all duration-500"
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