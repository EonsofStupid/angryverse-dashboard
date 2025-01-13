import { useEffect, useState } from 'react';
import { useThemeEffects } from '@/hooks/theme/useThemeEffects';

export const CursorEffects = () => {
  const { effects } = useThemeEffects();
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [trails, setTrails] = useState<{ x: number; y: number; id: number }[]>([]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
      
      // Only add trail if cursor effects are enabled in the theme
      if (effects?.interaction_tokens?.cursor?.effects?.includes('trail')) {
        setTrails(prev => [
          { x: e.clientX, y: e.clientY, id: Date.now() },
          ...prev.slice(0, 7)
        ]);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [effects?.interaction_tokens?.cursor?.effects]);

  // If no cursor effects are configured, don't render anything
  if (!effects?.interaction_tokens?.cursor) return null;

  return (
    <>
      {/* Follow cursor effect */}
      {effects.interaction_tokens.cursor.effects?.includes('follow') && (
        <div 
          className="cursor-follow"
          style={{ 
            left: `${mousePos.x}px`, 
            top: `${mousePos.y}px`,
            transform: 'translate(-50%, -50%)',
            position: 'fixed',
            width: '20px',
            height: '20px',
            backgroundColor: effects.interaction_tokens.cursor.colors?.primary || 'var(--theme-primary)',
            borderRadius: '50%',
            pointerEvents: 'none',
            zIndex: 9999,
            opacity: 0.6,
            transition: 'transform 0.15s ease-out'
          }}
        />
      )}

      {/* Trail effect */}
      {effects.interaction_tokens.cursor.effects?.includes('trail') && 
        trails.map((trail, i) => (
          <div
            key={trail.id}
            className="cursor-trail"
            style={{
              position: 'fixed',
              left: `${trail.x}px`,
              top: `${trail.y}px`,
              width: '8px',
              height: '8px',
              backgroundColor: effects.interaction_tokens.cursor.colors?.primary || 'var(--theme-primary)',
              borderRadius: '50%',
              pointerEvents: 'none',
              zIndex: 9998,
              opacity: 1 - (i / trails.length),
              transform: 'translate(-50%, -50%)',
              transition: 'opacity 0.3s ease-out'
            }}
          />
        ))
      }

      {/* Spotlight effect */}
      {effects.interaction_tokens.cursor.effects?.includes('spotlight') && (
        <div
          className="cursor-spotlight"
          style={{
            position: 'fixed',
            left: `${mousePos.x}px`,
            top: `${mousePos.y}px`,
            width: '200px',
            height: '200px',
            background: 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 70%)',
            transform: 'translate(-50%, -50%)',
            pointerEvents: 'none',
            zIndex: 9997,
            mixBlendMode: 'overlay'
          }}
        />
      )}
    </>
  );
};