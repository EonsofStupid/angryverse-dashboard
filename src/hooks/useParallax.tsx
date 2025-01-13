import { useEffect, useRef } from 'react';

interface UseParallaxProps {
  speed?: number;
  direction?: 'vertical' | 'horizontal';
  reverse?: boolean;
}

export const useParallax = ({
  speed = 0.1,
  direction = 'vertical',
  reverse = false
}: UseParallaxProps = {}) => {
  const elementRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const handleScroll = () => {
      const scrollPos = window.scrollY;
      const multiplier = reverse ? -1 : 1;
      
      if (direction === 'vertical') {
        element.style.transform = `translateY(${scrollPos * speed * multiplier}px)`;
      } else {
        element.style.transform = `translateX(${scrollPos * speed * multiplier}px)`;
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [speed, direction, reverse]);

  return elementRef;
};