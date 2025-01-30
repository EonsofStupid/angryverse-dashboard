import React from 'react';
import { motion } from 'framer-motion';

const edges = [
  { from: 1, to: 2 },
  { from: 2, to: 3 },
  { from: 2, to: 4 },
];

export const MobileEdges = () => {
  return (
    <svg className="absolute inset-0 w-full h-full pointer-events-none">
      {edges.map((edge, index) => (
        <motion.line
          key={index}
          x1={`${edge.from * 15}%`}
          y1={`${edge.from * 12}%`}
          x2={`${edge.to * 15}%`}
          y2={`${edge.to * 12}%`}
          stroke="var(--theme-colors-cyber-tesla)"
          strokeWidth="1"
          strokeDasharray="3,3"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.5, delay: 0.5 }}
        />
      ))}
    </svg>
  );
};