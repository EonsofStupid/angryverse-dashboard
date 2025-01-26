import { useThemeEffects } from '@/hooks/theme/useThemeEffects';

interface AnimatedLinesProps {
  direction?: 'horizontal' | 'vertical';
  color?: string;
  speed?: number;
  spacing?: number;
  opacity?: number;
  className?: string;
}

export const AnimatedLines = ({
  direction = 'horizontal',
  color = 'var(--theme-colors-cyber-cyan)',
  speed = 1,
  spacing = 20,
  opacity = 0.1,
  className = ''
}: AnimatedLinesProps) => {
  const { effects } = useThemeEffects();

  return (
    <div 
      className={`absolute inset-0 ${className}`}
      style={{
        backgroundImage: `repeating-linear-gradient(
          ${direction === 'horizontal' ? '0deg' : '90deg'},
          transparent,
          transparent ${spacing - 1}px,
          ${color} ${spacing}px
        )`,
        backgroundSize: direction === 'horizontal' ? `100% ${spacing * 2}px` : `${spacing * 2}px 100%`,
        opacity,
        animation: `scan-line ${4 / speed}s linear infinite`,
        transition: `all ${effects?.animations?.timing?.normal || '300ms'} ${effects?.animations?.curves?.ease_out || 'cubic-bezier(0.4, 0, 0.2, 1)'}`,
      }}
    />
  );
};