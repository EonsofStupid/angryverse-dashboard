import { useEffect, useState } from 'react';
import { useThemeEffects } from '@/hooks/theme/useThemeEffects';

export const CursorEffects = () => {
  const { effects } = useThemeEffects();
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [trails, setTrails] = useState<{ x: number; y: number; id: number }[]>([]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
      
      if (effects?.interaction_tokens?.hover?.effects?.includes('trail')) {
        setTrails(prev => [
          { x: e.clientX, y: e.clientY, id: Date.now() },
          ...prev.slice(0, 7)
        ]);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [effects?.interaction_tokens?.hover?.effects]);

  if (!effects?.interaction_tokens?.hover) return null;

  return (
    <>
      {effects.interaction_tokens.hover.effects?.includes('follow') && (
        <div 
          className="cursor-follow"
          style={{ 
            left: `${mousePos.x}px`, 
            top: `${mousePos.y}px` 
          }}
        />
      )}

      {effects.interaction_tokens.hover.effects?.includes('trail') && 
        trails.map((trail, i) => (
          <div
            key={trail.id}
            className="cursor-trail"
            style={{
              left: `${trail.x}px`,
              top: `${trail.y}px`,
              opacity: 1 - (i / trails.length)
            }}
          />
        ))
      }

      {effects.interaction_tokens.hover.effects?.includes('spotlight') && (
        <div
          className="cursor-spotlight"
          style={{
            left: `${mousePos.x}px`,
            top: `${mousePos.y}px`
          }}
        />
      )}
    </>
  );
};