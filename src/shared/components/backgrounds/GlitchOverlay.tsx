import { useEffect, useState } from 'react';
import { useThemeEffects } from '@/hooks/theme/useThemeEffects';

interface GlitchOverlayProps {
  intensity?: number;
  frequency?: number;
  color?: string;
  className?: string;
}

export const GlitchOverlay = ({
  intensity = 0.3,
  frequency = 2,
  color = 'var(--theme-colors-cyber-pink)',
  className = ''
}: GlitchOverlayProps) => {
  const { effects } = useThemeEffects();
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() < frequency / 10) {
        setOffset(Math.random() * intensity * 10);
        setTimeout(() => setOffset(0), 50);
      }
    }, 100);

    return () => clearInterval(interval);
  }, [frequency, intensity]);

  return (
    <div 
      className={`absolute inset-0 pointer-events-none ${className}`}
      style={{
        transform: `translateX(${offset}px)`,
        background: `linear-gradient(90deg, transparent, ${color}, transparent)`,
        opacity: offset ? 0.1 : 0,
        mixBlendMode: 'overlay',
        transition: `all ${effects?.animations?.timing?.fast || '100ms'} ${effects?.animations?.curves?.ease_out || 'cubic-bezier(0.4, 0, 0.2, 1)'}`,
      }}
    />
  );
};