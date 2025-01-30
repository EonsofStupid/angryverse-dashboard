import React from 'react';
import { Database, Lock, UserPlus } from 'lucide-react';
import { useAuthStore } from '@/store/useAuthStore';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { useThemeEffects } from '@/hooks/theme/useThemeEffects';
import { BackgroundContainer } from '@/components/backgrounds/BackgroundContainer';
import { CyberBackground } from '@/components/backgrounds/CyberBackground';
import { AnimatedLines } from '@/components/backgrounds/AnimatedLines';
import { GlitchOverlay } from '@/components/backgrounds/GlitchOverlay';
import { DesktopNodes } from './DesktopNodes';
import { DesktopEdges } from './DesktopEdges';

export const DesktopVisualDatabase = () => {
  const { user } = useAuthStore();
  const { effects } = useThemeEffects();

  const glassStyle = {
    background: 'rgba(255, 255, 255, 0.05)',
    backdropFilter: 'blur(12px)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  };

  return (
    <BackgroundContainer className="relative overflow-hidden bg-[radial-gradient(circle_at_center,#1f1f2e,#14141c)]">
      <AnimatedLines 
        direction="vertical"
        color="var(--theme-colors-cyber-matrix)"
        speed={40}
        spacing={20}
        opacity={0.15}
      />
      
      <AnimatedLines 
        direction="horizontal"
        color="var(--theme-colors-cyber-electric)"
        speed={10}
        spacing={35}
        opacity={0.08}
      />
      
      <CyberBackground 
        color="var(--theme-colors-cyber-plasma)"
        opacity={0.15}
      />
      
      <GlitchOverlay 
        intensity={0.3}
        frequency={1.8}
        color="var(--theme-colors-cyber-pink)"
      />
      
      <div className="w-full h-[600px] overflow-hidden rounded-xl bg-background/50 p-8 relative z-10">
        <div className={`relative ${!user ? 'filter blur-sm' : ''}`}>
          <DesktopNodes glassStyle={glassStyle} />
          <DesktopEdges />
        </div>

        {!user && (
          <div className="absolute inset-0 flex items-center justify-center backdrop-blur-md">
            <motion.div
              className="text-center space-y-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Lock className="w-12 h-12 text-[var(--theme-colors-cyber-pink)] mx-auto" />
              <h3 className="text-2xl font-bold">Unlock Full Access</h3>
              <p className="text-muted-foreground max-w-md">
                Join now to explore our cutting-edge visual database system
              </p>
              <Button 
                size="lg"
                className="mt-4 hover:scale-105 transition-transform duration-300"
                style={{
                  background: 'linear-gradient(135deg, var(--theme-colors-cyber-pink), var(--theme-colors-cyber-purple))',
                  boxShadow: '0 0 20px var(--theme-colors-cyber-pink)40',
                }}
              >
                <UserPlus className="w-4 h-4 mr-2" />
                Join Now
              </Button>
            </motion.div>
          </div>
        )}
      </div>
    </BackgroundContainer>
  );
};