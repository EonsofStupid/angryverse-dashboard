import React from 'react';
import { Button } from "../ui/button";
import { useThemeEffects } from "@/hooks/theme/useThemeEffects";

export const HeroContent = () => {
  const { effects } = useThemeEffects();
  
  const buttonStyle = {
    transition: `all ${effects?.animations?.timing?.normal || '200ms'} ${effects?.animations?.curves?.ease_out || 'ease-out'}`,
    transform: `scale(${effects?.hover?.scale || 1})`,
    boxShadow: effects?.hover?.shadow_normal
  };

  const buttonHoverStyle = {
    transform: `scale(${effects?.hover?.scale || 1.05})`,
    boxShadow: effects?.hover?.shadow_hover
  };

  return (
    <div className="container mx-auto px-4 relative z-10">
      <div className="max-w-3xl mx-auto text-center space-y-8">
        <h1 className="text-4xl md:text-6xl font-cyber font-bold leading-tight animate-float">
          Why Be The Best If{" "}
          <span 
            className="bg-clip-text text-transparent"
            style={{
              backgroundImage: `linear-gradient(to right, 
                var(--theme-primary), 
                var(--theme-secondary)
              )`
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
              ...buttonStyle,
              background: `linear-gradient(to right, 
                var(--theme-primary), 
                var(--theme-secondary)
              )`,
              boxShadow: `0 0 var(--glow-strength-sm) var(--theme-primary)`,
              '&:hover': buttonHoverStyle
            }}
          >
            Get Started
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="glass hover:scale-105 transition-all duration-500"
            style={{
              ...buttonStyle,
              borderColor: 'var(--theme-secondary)',
              color: 'var(--theme-secondary)',
              '&:hover': buttonHoverStyle
            }}
          >
            Learn More
          </Button>
        </div>
      </div>
    </div>
  );
};