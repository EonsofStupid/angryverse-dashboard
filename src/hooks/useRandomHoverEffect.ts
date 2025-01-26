import { useState, useEffect } from 'react';
import { HoverEffect, getRandomHoverEffect } from '@/lib/hover-effects';

export const useRandomHoverEffect = (seed?: string) => {
  const [effect, setEffect] = useState<HoverEffect | null>(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    // If seed is provided, use it to consistently generate the same effect for the same seed
    if (seed) {
      const seedNumber = seed.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
      const effectIndex = seedNumber % 4;
      setEffect(getRandomHoverEffect());
    } else {
      setEffect(getRandomHoverEffect());
    }
  }, [seed]);

  const hoverProps = {
    className: effect?.className || '',
    style: {
      ...effect?.style,
      ...(isHovered ? effect?.hoverStyle : {}),
    },
    onMouseEnter: () => setIsHovered(true),
    onMouseLeave: () => setIsHovered(false),
  };

  return hoverProps;
};