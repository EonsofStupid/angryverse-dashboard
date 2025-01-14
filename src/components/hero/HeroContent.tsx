import React from 'react';
import { Button } from "../ui/button";
import { useThemeEffects } from "@/hooks/theme/useThemeEffects";

export const HeroContent = () => {
  const { effects } = useThemeEffects();
  
  const hoverTokens = effects?.interaction_tokens?.hover;
  const specialEffects = effects?.special_effect_tokens;

  const glowStyle = {
    filter: `drop-shadow(0 0 ${effects?.hover?.glow_strength || '10px'} var(--theme-primary))`,
    transition: `all ${effects?.animations?.timing?.normal || '300ms'} ${effects?.animations?.curves?.ease_out || 'cubic-bezier(0, 0, 0.2, 1)'}`,
  };

  const buttonHoverStyle = {
    transform: `scale(${hoverTokens?.scale_values?.[1] || 1.05})`,
    transition: `all ${effects?.animations?.timing?.normal || '300ms'} ${hoverTokens?.transition_curves?.[0] || 'ease-out'}`,
  };

  return (
    <div className="container mx-auto px-4 relative z-10">
      <div className="max-w-3xl mx-auto text-center space-y-8">
        <h1 
          className="text-4xl md:text-6xl font-cyber font-bold leading-tight animate-float"
          style={{
            textShadow: specialEffects?.neon?.glow_sizes?.[1] 
              ? `0 0 ${specialEffects.neon.glow_sizes[1]} var(--theme-primary)`
              : 'none'
          }}
        >
          Why Be The Best If{" "}
          <span 
            className="bg-clip-text text-transparent"
            style={{
              backgroundImage: `linear-gradient(to right, 
                var(--theme-primary), 
                var(--theme-secondary)
              )`,
              ...glowStyle
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
              background: `linear-gradient(to right, 
                var(--theme-primary), 
                var(--theme-secondary)
              )`,
              boxShadow: `0 0 ${effects?.hover?.glow_strength || '10px'} var(--theme-primary)`,
              ...buttonHoverStyle
            }}
          >
            Get Started
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="glass hover:scale-105 transition-all duration-500"
            style={{
              borderColor: 'var(--theme-secondary)',
              color: 'var(--theme-secondary)',
              ...buttonHoverStyle
            }}
          >
            Learn More
          </Button>
        </div>
      </div>
    </div>
  );
};