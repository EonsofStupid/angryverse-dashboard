import React from 'react';
import { Database, UserPlus } from 'lucide-react';
import { motion } from 'framer-motion';

const nodes = [
  { id: 1, label: 'Users', icon: UserPlus },
  { id: 2, label: 'Posts', icon: Database },
  { id: 3, label: 'Analytics', icon: Database },
  { id: 4, label: 'Media', icon: Database },
];

interface DesktopNodesProps {
  glassStyle: React.CSSProperties;
}

export const DesktopNodes: React.FC<DesktopNodesProps> = ({ glassStyle }) => {
  return (
    <>
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
          
          <div className="absolute inset-0 opacity-0 group-hover:opacity-30 transition-opacity duration-500 rounded-lg overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent"
                 style={{
                   transform: 'translateX(-100%)',
                   animation: 'shine 3s ease-in-out infinite',
                 }} />
          </div>
        </motion.div>
      ))}
    </>
  );
};