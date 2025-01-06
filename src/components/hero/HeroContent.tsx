import React from 'react';
import { Button } from "../ui/button";

export const HeroContent = () => {
  return (
    <div className="container mx-auto px-4 relative z-10">
      <div className="max-w-3xl mx-auto text-center space-y-8">
        <h1 className="text-4xl md:text-6xl font-cyber font-bold leading-tight animate-float">
          Why Be The Best If{" "}
          <span className="text-gradient animate-glow">No One Knows It?</span>
        </h1>
        <p className="text-lg md:text-xl text-gray-300/90 backdrop-blur-sm">
          Manage all your social media channels in one place. Create, schedule,
          and analyze your content across platforms.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button
            size="lg"
            className="glass bg-gradient-to-r from-cyber-pink via-cyber-purple to-cyber-cyan hover:from-cyber-pink/90 hover:to-cyber-cyan/90 transition-all duration-500 hover:scale-105 animate-glow"
          >
            Get Started
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="glass hover-glow border-cyber-cyan text-cyber-cyan hover:text-cyber-cyan/90 transition-all duration-500 hover:scale-105"
          >
            Learn More
          </Button>
        </div>
      </div>
    </div>
  );
};