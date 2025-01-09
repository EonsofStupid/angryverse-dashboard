import React from 'react';
import { Database, Lock, UserPlus } from 'lucide-react';
import { useAuthStore } from '@/store/useAuthStore';
import { Button } from './ui/button';
import { motion } from 'framer-motion';
import { useThemeEffects } from '@/hooks/theme/useThemeEffects';

export const VisualDatabase = () => {
  const { user } = useAuthStore();
  const { effects } = useThemeEffects();

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

  const glassStyle = {
    background: effects?.glass?.background || 'rgba(255, 255, 255, 0.1)',
    backdropFilter: `blur(${effects?.glass?.blur || '8px'})`,
    border: effects?.glass?.border || '1px solid rgba(255, 255, 255, 0.1)',
    boxShadow: effects?.hover?.shadow_normal || '0 4px 6px rgba(0, 0, 0, 0.1)',
  };

  return (
    <div className="relative w-full h-[600px] overflow-hidden rounded-xl bg-background/50 p-8">
      <div className={`relative ${!user ? 'filter blur-sm' : ''}`}>
        {/* Nodes */}
        {nodes.map((node) => (
          <motion.div
            key={node.id}
            className="absolute p-4 rounded-lg w-40 h-40 flex flex-col items-center justify-center gap-2"
            style={{
              ...glassStyle,
              background: `linear-gradient(135deg, var(--theme-gray-${node.id % 2 ? 'neutral' : 'soft'}) / 0.1, var(--theme-gray-${node.id % 2 ? 'medium' : 'light'}) / 0.1)`,
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
              ease: [0.43, 0.13, 0.23, 0.96] // Using array format for cubic-bezier
            }}
            whileHover={{
              scale: effects?.hover?.scale || 1.05,
              boxShadow: effects?.hover?.shadow_hover || '0 8px 12px rgba(0, 0, 0, 0.15)',
            }}
          >
            <node.icon className="w-8 h-8 text-[var(--theme-gray-neutral)]" />
            <span className="text-sm font-medium">{node.label}</span>
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
                stroke="var(--theme-gray-neutral)"
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

      {/* CTA Overlay for unauthenticated users */}
      {!user && (
        <div className="absolute inset-0 flex items-center justify-center" style={glassStyle}>
          <motion.div
            className="text-center space-y-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Lock className="w-12 h-12 text-[var(--theme-gray-neutral)] mx-auto" />
            <h3 className="text-2xl font-bold">Unlock Full Access</h3>
            <p className="text-muted-foreground max-w-md">
              Join now to explore our cutting-edge visual database system
            </p>
            <Button 
              size="lg" 
              className="mt-4"
              style={{
                background: `linear-gradient(135deg, var(--theme-gray-neutral), var(--theme-gray-soft))`,
                transition: `all ${effects?.hover?.transition_duration || '300ms'} ease-out`,
              }}
            >
              <UserPlus className="w-4 h-4 mr-2" />
              Join Now
            </Button>
          </motion.div>
        </div>
      )}
    </div>
  );
};