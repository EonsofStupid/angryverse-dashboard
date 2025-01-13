import { useEffect, useRef, useState } from 'react';

interface UseMotionObserverProps {
  threshold?: number;
  root?: Element | null;
  rootMargin?: string;
  triggerOnce?: boolean;
}

export const useMotionObserver = ({
  threshold = 0.1,
  root = null,
  rootMargin = '0px',
  triggerOnce = true
}: UseMotionObserverProps = {}) => {
  const elementRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [hasTriggered, setHasTriggered] = useState(false);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const shouldTrigger = entry.isIntersecting && (!triggerOnce || !hasTriggered);
        if (shouldTrigger) {
          setIsVisible(true);
          setHasTriggered(true);
        } else if (!triggerOnce) {
          setIsVisible(false);
        }
      },
      {
        threshold,
        root,
        rootMargin,
      }
    );

    observer.observe(element);

    return () => {
      observer.unobserve(element);
    };
  }, [threshold, root, rootMargin, triggerOnce, hasTriggered]);

  return { elementRef, isVisible };
};