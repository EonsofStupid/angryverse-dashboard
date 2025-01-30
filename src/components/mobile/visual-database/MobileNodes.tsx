import React from 'react';
import { Database, UserPlus } from 'lucide-react';
import { motion } from 'framer-motion';

const nodes = [
  { id: 1, label: 'Users', icon: UserPlus },
  { id: 2, label: 'Posts', icon: Database },
  { id: 3, label: 'Analytics', icon: Database },
  { id: 4, label: 'Media', icon: Database },
];

interface MobileNodesProps {
  glassStyle: React.CSSProperties;
}

export const MobileNodes: React.FC<MobileNodesProps> = ({ glassStyle }) => {
  return (
    <>
      {nodes.map((node) => (
        <motion.div
          key={node.id}
          className="absolute p-3 rounded-lg w-32 h-32 flex flex-col items-center justify-center gap-2"
          style={{
            ...glassStyle,
            boxShadow: `0 0 20px var(--theme-colors-cyber-${node.id % 2 ? 'pink' : 'cyan'})40`,
          }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{
            opacity: 1,
            scale: 1,
            x: `${(node.id * 15)}%`,
            y: `${(node.id * 12)}%`,
          }}
          transition={{
            duration: 0.8,
            delay: node.id * 0.2,
            ease: [0.43, 0.13, 0.23, 0.96]
          }}
          whileTap={{
            scale: 0.95,
            transition: { duration: 0.1 }
          }}
        >
          <node.icon className={`w-6 h-6 text-[var(--theme-colors-cyber-${node.id % 2 ? 'pink' : 'cyan'})]`} />
          <span className="text-xs font-medium text-center">{node.label}</span>
        </motion.div>
      ))}
    </>
  );
};