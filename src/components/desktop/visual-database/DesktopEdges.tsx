import React from 'react';
import { motion } from 'framer-motion';

const edges = [
  { from: 1, to: 2 },
  { from: 2, to: 3 },
  { from: 2, to: 4 },
];

export const DesktopEdges = () => {
  return (
    <svg className="absolute inset-0 w-full h-full pointer-events-none">
      {edges.map((edge, index) => (
        <motion.line
          key={index}
          x1={`${edge.from * 20}%`}
          y1={`${edge.from * 15}%`}
          x2={`${edge.to * 20}%`}
          y2={`${edge.to * 15}%`}
          stroke="var(--theme-colors-cyber-tesla)"
          strokeWidth="2"
          strokeDasharray="5,5"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.5, delay: 0.5 }}
        />
      ))}
    </svg>
  );
};