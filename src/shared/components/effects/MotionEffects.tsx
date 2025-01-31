import { useEffect, useRef } from 'react';
import { useThemeEffects } from '@/hooks/theme/useThemeEffects';

export const MotionEffects = () => {
  const { effects } = useThemeEffects();
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    if (!effects?.motion_tokens?.scroll_triggers) return;

    const { thresholds, animation_types, directions, distances } = effects.motion_tokens.scroll_triggers;

    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const element = entry.target as HTMLElement;
            const animationType = element.dataset.animationType || animation_types[0];
            const direction = element.dataset.direction || directions[0];
            const distance = element.dataset.distance || distances[0];

            element.style.opacity = '1';
            element.style.transform = 'translate(0, 0)';
          }
        });
      },
      {
        threshold: thresholds,
      }
    );

    const elements = document.querySelectorAll('[data-scroll-animate]');
    elements.forEach((element) => {
      if (observerRef.current) {
        observerRef.current.observe(element);
      }
    });

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [effects?.motion_tokens?.scroll_triggers]);

  return null;
};