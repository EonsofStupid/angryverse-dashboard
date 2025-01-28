import React from 'react';
import { Database, Lock, UserPlus } from 'lucide-react';
import { useAuthStore } from '@/store/useAuthStore';
import { Button } from './ui/button';
import { motion } from 'framer-motion';
import { useThemeEffects } from '@/hooks/theme/useThemeEffects';
import { BackgroundContainer } from './backgrounds/BackgroundContainer';
import { CyberBackground } from './backgrounds/CyberBackground';
import { AnimatedLines } from './backgrounds/AnimatedLines';
import { GlitchOverlay } from './backgrounds/GlitchOverlay';

const nodes = [
  { id: 1, label: 'Users', icon: UserPlus },
  { id: 2, label: 'Posts', icon: Database },
  { id: 3, label: 'Analytics', icon: Database },
  { id: 4, label: 'Media', icon: Database },
];

const edges = [
  { from: 1, to: 2 },
  { from: 2, to: 3 },
  { from: 2, to: 4 },
];

export const VisualDatabase = () => {
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
      {/* Matrix Rain Effect - Primary */}
      <AnimatedLines 
        direction="vertical"
        color="#00ff00"
        speed={40}
        spacing={20}
        opacity={0.15}
      />
      
      {/* Matrix Rain Effect - Secondary */}
      <AnimatedLines 
        direction="vertical"
        color="#1affff"
        speed={20}
        spacing={25}
        opacity={0.1}
      />
      
      {/* Crossing Lines */}
      <AnimatedLines 
        direction="horizontal"
        color="var(--theme-colors-cyber-cyan)"
        speed={10}
        spacing={35}
        opacity={0.08}
      />
      
      {/* Base Cyber Background */}
      <CyberBackground 
        color="var(--theme-colors-cyber-purple)"
        opacity={0.15}
      />
      
      {/* Dynamic Glitch Effect */}
      <GlitchOverlay 
        intensity={0.3}
        frequency={1.8}
        color="var(--theme-colors-cyber-pink)"
      />
      
      <div className="w-full h-[600px] overflow-hidden rounded-xl bg-background/50 p-8 relative z-10">
        <div className={`relative ${!user ? 'filter blur-sm' : ''}`}>
          {nodes.map((node) => (
            <motion.div
              key={node.id}
              className="absolute p-4 rounded-lg w-40 h-40 flex flex-col items-center justify-center gap-2 hover:scale-112 transition-transform duration-300"
              style={{
                ...glassStyle,
                boxShadow: `0 0 20px var(--theme-colors-cyber-${node.id % 2 ? 'pink' : 'cyan'})40`,
              }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{
                opacity: 1,
                scale: 1,
                x: `${(node.id * 20)}%`,
                y: `${(node.id * 15)}%`,
              }}
              transition={{
                duration: 0.8,
                delay: node.id * 0.2,
                ease: [0.43, 0.13, 0.23, 0.96]
              }}
              whileHover={{
                scale: 1.12,
                boxShadow: `0 0 30px var(--theme-colors-cyber-${node.id % 2 ? 'pink' : 'cyan'})60`,
              }}
            >
              <node.icon className={`w-8 h-8 text-[var(--theme-colors-cyber-${node.id % 2 ? 'pink' : 'cyan'})]`} />
              <span className="text-sm font-medium">{node.label}</span>
              
              {/* Holographic effect */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-30 transition-opacity duration-500 rounded-lg overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent"
                     style={{
                       transform: 'translateX(-100%)',
                       animation: 'shine 3s ease-in-out infinite',
                     }} />
              </div>
            </motion.div>
          ))}

          {/* Edges */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none">
            {edges.map((edge, index) => {
              const fromNode = nodes.find(n => n.id === edge.from);
              const toNode = nodes.find(n => n.id === edge.to);
              if (!fromNode || !toNode) return null;

              return (
                <motion.line
                  key={index}
                  x1={`${fromNode.id * 20}%`}
                  y1={`${fromNode.id * 15}%`}
                  x2={`${toNode.id * 20}%`}
                  y2={`${toNode.id * 15}%`}
                  stroke="var(--theme-colors-cyber-cyan)"
                  strokeWidth="2"
                  strokeDasharray="5,5"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1.5, delay: 0.5 }}
                />
              );
            })}
          </svg>
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